/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const tsNode = require('ts-node');
const downloadFile = require('./download');

tsNode.register();

const kangarooConfig = require(path.join(process.cwd(), 'kangaroo.config.ts')).default;

const binariesDir = path.join('resources', 'bins');
fs.mkdirSync(binariesDir, { recursive: true });

let targetEnding;
switch (process.platform) {
  case 'linux':
    targetEnding = 'x86_64-unknown-linux-gnu';
    break;
  case 'win32':
    targetEnding = 'x86_64-pc-windows-msvc.exe';
    break;
  case 'darwin':
    switch (process.arch) {
      case 'arm64':
        targetEnding = 'aarch64-apple-darwin';
        break;
      case 'x64':
        targetEnding = 'x86_64-apple-darwin';
        break;
      default:
        throw new Error(`Got unexpected macOS architecture: ${process.arch}`);
    }
    break;
  default:
    throw new Error(`Got unexpected OS platform: ${process.platform}`);
}

const binariesAppendix = kangarooConfig.appId.slice(0, 10).replace(' ', '-');

const holochainBinaryFilename = `holochain-v${
  kangarooConfig.bins.holochain.version
}-${binariesAppendix}${process.platform === 'win32' ? '.exe' : ''}`;

const lairBinaryFilename = `lair-keystore-v${kangarooConfig.bins.lair.version}-${binariesAppendix}${
  process.platform === 'win32' ? '.exe' : ''
}`;

function downloadHolochainBinary() {
  const holochainBinaryRemoteFilename = `holochain-v${kangarooConfig.bins.holochain.version}-${targetEnding}`;
  const holochainBinaryUrl = `https://github.com/matthme/holochain-binaries/releases/download/holochain-binaries-${kangarooConfig.bins.holochain.version}/${holochainBinaryRemoteFilename}`;
  const destinationPath = path.join(binariesDir, holochainBinaryFilename);
  downloadFile(
    holochainBinaryUrl,
    destinationPath,
    kangarooConfig.bins.holochain.sha256[targetEnding],
    true
  );
}

function downloadLairBinary() {
  const lairBinaryRemoteFilename = `lair-keystore-v${kangarooConfig.bins.lair.version}-${targetEnding}`;
  const lairBinaryUrl = `https://github.com/matthme/holochain-binaries/releases/download/lair-binaries-${kangarooConfig.bins.lair.version}/${lairBinaryRemoteFilename}`;
  const destinationPath = path.join(binariesDir, lairBinaryFilename);
  downloadFile(lairBinaryUrl, destinationPath, kangarooConfig.bins.lair.sha256[targetEnding], true);
}

downloadHolochainBinary();
downloadLairBinary();
