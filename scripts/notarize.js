const fs = require('fs');
const path = require('path');
const { notarize } = require('@electron/notarize');

module.exports = async function (params) {
  if (process.platform !== 'darwin') {
    return;
  }

  console.log('afterSign hook triggered', params);

  const appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`);
  if (!fs.existsSync(appPath)) {
    console.log(`Skip notarizing. No app found at path ${appPath}.`);
    return;
  }

  console.log(`Notarizing app found at ${appPath}.`);

  await notarize({
    appPath: appPath,
    appleId: process.env.APPLE_ID_EMAIL,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
    teamId: process.env.APPLE_TEAM_ID,
  });

  console.log(`Done notarizing.`);
};
