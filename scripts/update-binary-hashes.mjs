import { Octokit } from 'octokit';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
require('tsx/cjs');

const OWNER = 'holochain';
const REPO = 'holochain';

const configPath = path.join(process.cwd(), 'kangaroo.config.ts');
const kangarooConfig = require(configPath).default;

const token = process.env.GH_TOKEN;
const client = new Octokit({ auth: token });

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replaces the sha256 value for each target key found in `updates`, but only within the given
// slice of the config source text, so that keys shared between the holochain and lair sha256
// maps don't cross-match. Values that already match are left untouched, making this idempotent.
function applySha256Updates(blockText, updates, binName) {
  let result = blockText;
  const applied = [];
  for (const [target, newHash] of Object.entries(updates)) {
    const pattern = new RegExp(
      `(['"])${escapeRegExp(target)}\\1(\\s*:\\s*)(['"])([0-9a-f]{64})\\3`
    );
    const match = pattern.exec(result);
    if (!match) {
      console.warn(
        `  ! [${binName}] could not find existing entry for '${target}' in kangaroo.config.ts, skipping`
      );
      continue;
    }

    const oldHash = match[4];
    if (oldHash === newHash) {
      continue;
    }

    const replacement = `${match[1]}${target}${match[1]}${match[2]}${match[3]}${newHash}${match[3]}`;
    result = result.slice(0, match.index) + replacement + result.slice(match.index + match[0].length);
    applied.push({ target, oldHash, newHash });
  }
  return { text: result, applied };
}

async function findDigest(release, assetName) {
  const asset = release.assets.find((a) => a.name === assetName);
  if (!asset) {
    return { status: 'missing-asset' };
  }
  if (!asset.digest || !asset.digest.startsWith('sha256:')) {
    return { status: 'missing-digest' };
  }
  return { status: 'ok', sha256: asset.digest.slice('sha256:'.length) };
}

async function collectUpdates(release, existingSha256, binName, assetNameFor) {
  const updates = {};
  let skipped = 0;
  for (const target of Object.keys(existingSha256)) {
    const assetName = assetNameFor(target);
    const result = await findDigest(release, assetName);
    if (result.status !== 'ok') {
      console.warn(`  ! [${binName}] ${result.status} for asset '${assetName}', skipping '${target}'`);
      skipped += 1;
      continue;
    }
    updates[target] = result.sha256;
  }
  return { updates, skipped };
}

const tag = `holochain-${kangarooConfig.bins.holochainVersion}`;
console.log(`Looking up release '${tag}' on ${OWNER}/${REPO}...`);

let release;
try {
  const response = await client.request(`GET /repos/${OWNER}/${REPO}/releases/tags/${tag}`);
  release = response.data;
} catch (e) {
  throw new Error(`Could not find a release tagged '${tag}' on ${OWNER}/${REPO}: ${e.message}`);
}
console.log(`Found release '${release.name ?? tag}' (${release.assets.length} asset(s))`);

if (release.assets.length === 0) {
  throw new Error(
    `Release '${tag}' has no assets yet. The binaries for this release may still be building/uploading upstream - try again later.`
  );
}

const feature = kangarooConfig.bins.holochainFeature;
const { updates: holochainUpdates, skipped: holochainSkipped } = await collectUpdates(
  release,
  kangarooConfig.bins.holochain.sha256,
  'holochain',
  (target) => `holochain-${feature ? `${feature}-` : ''}${target}`
);
const { updates: lairUpdates, skipped: lairSkipped } = await collectUpdates(
  release,
  kangarooConfig.bins.lair.sha256,
  'lair',
  (target) => `lair-keystore-${target}`
);

const totalTargets =
  Object.keys(kangarooConfig.bins.holochain.sha256).length +
  Object.keys(kangarooConfig.bins.lair.sha256).length;
const totalSkipped = holochainSkipped + lairSkipped;

if (totalSkipped === totalTargets) {
  throw new Error(
    `Could not verify any binary hash against release '${tag}' - all ${totalTargets} target(s) were skipped (see warnings above). Refusing to report success.`
  );
}

const rawText = fs.readFileSync(configPath, 'utf-8');

const holochainBlockStart = rawText.indexOf('holochain: {');
const lairBlockStart = rawText.indexOf('lair: {');
if (holochainBlockStart === -1 || lairBlockStart === -1 || lairBlockStart < holochainBlockStart) {
  throw new Error("Could not locate the 'holochain' and 'lair' bins blocks in kangaroo.config.ts");
}

const prefix = rawText.slice(0, holochainBlockStart);
const holochainBlock = rawText.slice(holochainBlockStart, lairBlockStart);
const lairBlock = rawText.slice(lairBlockStart);

const holochainResult = applySha256Updates(holochainBlock, holochainUpdates, 'holochain');
const lairResult = applySha256Updates(lairBlock, lairUpdates, 'lair');

const allApplied = [
  ...holochainResult.applied.map((c) => ({ bin: 'holochain', ...c })),
  ...lairResult.applied.map((c) => ({ bin: 'lair', ...c })),
];

if (allApplied.length === 0) {
  console.log(`All ${totalTargets - totalSkipped} verified sha256 hash(es) are already up to date. No changes made.`);
} else {
  const newText = prefix + holochainResult.text + lairResult.text;
  fs.writeFileSync(configPath, newText, 'utf-8');
  console.log('Updated sha256 hashes in kangaroo.config.ts:');
  for (const change of allApplied) {
    console.log(`  [${change.bin}] ${change.target}: ${change.oldHash} -> ${change.newHash}`);
  }
}

if (totalSkipped > 0) {
  console.warn(
    `Warning: ${totalSkipped}/${totalTargets} target(s) could not be verified against release '${tag}' (see warnings above) and were left unchanged.`
  );
}
