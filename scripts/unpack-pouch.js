/* eslint-disable @typescript-eslint/no-var-requires */
const rustUtils = require("@holochain/hc-spin-rust-utils");
const path = require("path");
const fs = require("fs");

const webhappDir = fs.readdirSync(path.join(process.cwd(), "pouch"));
const webhappFilename = webhappDir.find((file) => file.endsWith(".webhapp"));
if (!webhappFilename) throw new Error("No webhapp file found in pouch folder.");
const webhappPath = path.join(process.cwd(), "pouch", webhappFilename);

const resourcesDir = path.join(process.cwd(), "resources");
const uiDir = path.join(resourcesDir, "ui");
fs.mkdirSync(uiDir, { recursive: true });


rustUtils.saveHappOrWebhapp(
  webhappPath,
  'kangaroo',
  uiDir,
  resourcesDir
);
