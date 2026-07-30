import { Octokit } from 'octokit';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
require('tsx/cjs');
const { isTestServerUrl } = require('./lib/test-server.js');

const OWNER = 'holochain';
const REPO = 'holochain';

const CHECK_MODE = process.argv.includes('--check');

// The platform targets kangaroo builds for. Both sha256 maps in
// kangaroo.config.ts must contain exactly these keys.
const EXPECTED_TARGETS = [
  'x86_64-unknown-linux-gnu',
  'aarch64-unknown-linux-gnu',
  'x86_64-pc-windows-msvc.exe',
  'x86_64-apple-darwin',
  'aarch64-apple-darwin',
];

// Known-compatible npm dependency series (major.minor) per Holochain
// series. Extend this map when adopting a new Holochain series; the check
// fails loudly when the configured Holochain version is not listed here.
const DEP_COMPAT = {
  '0.7': {
    '@holochain/client': '0.21',
    '@holochain/hc-spin-rust-utils': '0.700',
  },
};

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

function checkPlatformTargets(problems) {
  const bins = [
    ['holochain', kangarooConfig.bins.holochain.sha256],
    ['lair', kangarooConfig.bins.lair.sha256],
  ];
  for (const [binName, sha256Map] of bins) {
    for (const target of EXPECTED_TARGETS) {
      if (!(target in sha256Map)) {
        problems.push(`[${binName}] missing sha256 entry for platform target '${target}'`);
      }
    }
    for (const target of Object.keys(sha256Map)) {
      if (!EXPECTED_TARGETS.includes(target)) {
        problems.push(`[${binName}] unexpected sha256 entry '${target}' is not a supported platform target`);
      }
    }
  }
}

async function checkBinChecksums(release, releaseTag, sha256Map, binName, assetNameFor, problems) {
  for (const [target, configuredSha256] of Object.entries(sha256Map)) {
    const assetName = assetNameFor(target);
    const result = await findDigest(release, assetName);
    if (result.status === 'missing-asset') {
      problems.push(`[${binName}] release '${releaseTag}' has no asset '${assetName}' (for target '${target}')`);
    } else if (result.status === 'missing-digest') {
      problems.push(`[${binName}] asset '${assetName}' has no sha256 digest on GitHub`);
    } else if (result.sha256 !== configuredSha256) {
      problems.push(
        `[${binName}] sha256 mismatch for '${target}': kangaroo.config.ts has ${configuredSha256} but release asset '${assetName}' has ${result.sha256}`
      );
    }
  }
}

function checkDependencyVersions(problems) {
  const semver = require('semver');
  const holochainVersion = kangarooConfig.bins.holochainVersion;
  const parsed = semver.parse(holochainVersion);
  if (!parsed) {
    problems.push(`holochainVersion '${holochainVersion}' in kangaroo.config.ts is not valid semver`);
    return;
  }
  const series = `${parsed.major}.${parsed.minor}`;
  const compat = DEP_COMPAT[series];
  if (!compat) {
    problems.push(
      `no known compatible dependency versions for Holochain ${series}.x - extend DEP_COMPAT in scripts/update-binary-hashes.mjs`
    );
    return;
  }
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8')
  );
  for (const [depName, expectedSeries] of Object.entries(compat)) {
    const range = packageJson.dependencies[depName];
    if (!range) {
      problems.push(`package.json has no dependency '${depName}'`);
      continue;
    }
    const minVersion = semver.minVersion(range);
    if (!minVersion) {
      problems.push(`could not parse version '${range}' of dependency '${depName}'`);
      continue;
    }
    const depSeries = `${minVersion.major}.${minVersion.minor}`;
    if (depSeries !== expectedSeries) {
      problems.push(
        `dependency '${depName}' is '${range}' (series ${depSeries}) but Holochain ${holochainVersion} needs series ${expectedSeries}`
      );
    }
  }
}

function warnAboutTestServers() {
  const servers = [
    ['bootstrapUrl', kangarooConfig.bootstrapUrl],
    ['relayUrl', kangarooConfig.relayUrl],
  ];
  for (const [field, url] of servers) {
    if (isTestServerUrl(url)) {
      console.warn(
        `⚠️  ${field} ('${url}') points at a test server. Test servers have no availability guarantees - do not ship a production release with this setting.`
      );
    }
  }
}

const tag = `holochain-${kangarooConfig.bins.holochainVersion}`;
const feature = kangarooConfig.bins.holochainFeature;
const holochainAssetName = (target) =>
  `holochain-${feature ? `${feature}-` : ''}${target}`;
const lairAssetName = (target) => `lair-keystore-${target}`;

async function fetchRelease() {
  console.log(`Looking up release '${tag}' on ${OWNER}/${REPO}...`);
  let release;
  try {
    const response = await client.request(`GET /repos/${OWNER}/${REPO}/releases/tags/${tag}`);
    release = response.data;
  } catch (e) {
    throw new Error(`Could not find a release tagged '${tag}' on ${OWNER}/${REPO}: ${e.message}`, {
      cause: e,
    });
  }
  console.log(`Found release '${release.name ?? tag}' (${release.assets.length} asset(s))`);
  return release;
}

if (CHECK_MODE) {
  const problems = [];

  checkPlatformTargets(problems);
  checkDependencyVersions(problems);
  warnAboutTestServers();

  let release;
  try {
    release = await fetchRelease();
  } catch (e) {
    problems.push(e.message);
  }
  if (release && release.assets.length === 0) {
    problems.push(
      `Release '${tag}' has no assets yet. The binaries for this release may still be building/uploading upstream.`
    );
    release = undefined;
  }
  if (release) {
    await checkBinChecksums(
      release,
      tag,
      kangarooConfig.bins.holochain.sha256,
      'holochain',
      holochainAssetName,
      problems
    );
    await checkBinChecksums(
      release,
      tag,
      kangarooConfig.bins.lair.sha256,
      'lair',
      lairAssetName,
      problems
    );
  }

  if (problems.length > 0) {
    console.error(`\nkangaroo.config.ts is NOT consistent with Holochain release '${tag}':`);
    for (const problem of problems) {
      console.error(`  ✗ ${problem}`);
    }
    process.exit(1);
  }
  console.log(`kangaroo.config.ts is consistent with Holochain release '${tag}'.`);
} else {
  const release = await fetchRelease();

  if (release.assets.length === 0) {
    throw new Error(
      `Release '${tag}' has no assets yet. The binaries for this release may still be building/uploading upstream - try again later.`
    );
  }

  const { updates: holochainUpdates, skipped: holochainSkipped } = await collectUpdates(
    release,
    kangarooConfig.bins.holochain.sha256,
    'holochain',
    holochainAssetName
  );
  const { updates: lairUpdates, skipped: lairSkipped } = await collectUpdates(
    release,
    kangarooConfig.bins.lair.sha256,
    'lair',
    lairAssetName
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
}
