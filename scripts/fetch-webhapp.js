/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const tsNode = require('ts-node');
const childProcess = require('child_process');

tsNode.register();

const kangarooConfig = require(path.join(process.cwd(), 'kangaroo.config.ts')).default;

function downloadFile(url, targetPath, expectedSha256Hex, chmod = false) {
  console.log('Downloading from ', url);
  childProcess.exec(`curl -f -L --output ${targetPath} ${url}`, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
      throw new Error('Failed to fetch resource.');
    } else {
      const fileBytes = fs.readFileSync(targetPath);
      const hasher = crypto.createHash('sha256');
      hasher.update(fileBytes);
      const sha256Hex = hasher.digest('hex');
      if (sha256Hex !== expectedSha256Hex)
        throw new Error(
          `sha256 does not match the expected sha256. Got ${sha256Hex} but expected ${expectedSha256Hex}`
        );

      console.log('Download successful. sha256 of file (hex): ', sha256Hex);
      if (chmod) {
        fs.chmodSync(targetPath, 511);
        console.log('Gave executable permission to file.');
      }
    }
  });
}

if (kangarooConfig.webhapp.url) {
  // If there is already a webhapp file in the puch folder throw an error.
  const webhappDir = fs.readdirSync(path.join(process.cwd(), 'pouch'));
  if (webhappDir.find((file) => file.endsWith('.webhapp'))) {
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
