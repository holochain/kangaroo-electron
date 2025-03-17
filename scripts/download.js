/* eslint-disable @typescript-eslint/no-var-requires */
const childProcess = require('child_process');
const crypto = require('crypto');
const fs = require('fs');


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

module.exports = downloadFile;