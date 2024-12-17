/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This script is being used to overwrite the default names in the kangaroo.config.ts to test
 * releases in the official kangaroo repo
 */

const path = require('path');
const fs = require('fs');

let kangarooConfigString = fs.readFileSync('kangaroo.config.ts', 'utf-8');
kangarooConfigString = kangarooConfigString.replace(
  'org.holochain.kangaroo-electron',
  'org.holochain.kangaroo-electron-test'
);

kangarooConfigString = kangarooConfigString.replace(
  'Holochain Kangaroo Electron',
  'Holochain Kangaroo Electron (Test)'
);

fs.writeFileSync('kangaroo.config.ts', kangarooConfigString, 'utf-8');
