/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const tsNode = require('ts-node');
const downloadFile = require('./download');

tsNode.register();

const kangarooConfig = require(path.join(process.cwd(), 'kangaroo.config.ts')).default;

if (kangarooConfig.webhapp && kangarooConfig.webhapp.url) {
  // If there is already a webhapp file in the pouch folder throw an error.
  const webhappDir = path.join(process.cwd(), 'pouch');
  const webhappDirContent = fs.readdirSync(webhappDir);
  if (webhappDirContent.find((file) => file.endsWith('.webhapp'))) {
    throw new Error(
      'Error: There is already a .webhapp file in the pouch folder. Either remove the .webhapp from the pouch folder or remove the webhapp field from kangaroo.config.ts'
    );
  }

  const webhappPath = path.join(webhappDir, 'kangaroo.webhapp');
  console.log('Downloading .webhapp from ', kangarooConfig.webhapp.url);
  downloadFile(kangarooConfig.webhapp.url, webhappPath, kangarooConfig.webhapp.sha256);
} else {
  console.log('No webhapp URL specified in kangaroo.config.ts. Skip downloading.');
}
