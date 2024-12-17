/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const png2icons = require('png2icons');

generateIcons();

function generateIcons() {
  const uiDir = path.join('resources', 'ui');
  const buildDir = 'build';

  const pngPath = path.join(uiDir, 'icon.png');
  const icoPath = path.join(uiDir, 'icon.ico');
  const icnsPath = path.join(uiDir, 'icon.icns');

  const pngOutPath = path.join(buildDir, 'icon.png');
  const icoOutPath = path.join(buildDir, 'icon.ico');
  const icnsOutPath = path.join(buildDir, 'icon.icns');

  if (!fs.existsSync(pngPath)) {
    console.warn("WARNING: No icon.png found in your webhapp's UI assets.");
    return;
  }

  fs.cpSync(pngPath, pngOutPath);

  const pngBuffer = fs.readFileSync(pngPath);

  if (!fs.existsSync(icoPath)) {
    console.log('Generating icon.ico');
    const icoIcon = png2icons.createICO(pngBuffer, png2icons.BICUBIC2, 0, false, true);
    fs.writeFileSync(icoOutPath, icoIcon);
  }

  if (!fs.existsSync(icnsPath)) {
    console.log('Generating icon.icns');
    const icnsIcon = png2icons.createICNS(pngBuffer, png2icons.BILINEAR, 0);
    fs.writeFileSync(icnsOutPath, icnsIcon);
  }
}
