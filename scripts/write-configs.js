/* eslint-disable @typescript-eslint/no-var-requires */
const jsYaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const tsNode = require('ts-node');

tsNode.register();

const PLACEHOLDER_APP_ID = 'org.holochain.kangaroo-electron';
const PLACEHOLDER_PRODUCT_NAME = 'Holochain Kangaroo Electron';

const kangarooConfig = require(path.join(process.cwd(), 'kangaroo.config.ts')).default;

if (!process.env.KANGAROO_DEV) {
  // Check that no default placeholder values are being used for appId and productName, otherwise
  // devs might accidentally deploy different apps under the default appId/productName instead
  // of their own chosen appId/productName
  if (kangarooConfig.appId === PLACEHOLDER_APP_ID)
    throw new Error(
      "The appId field in 'kangaroo.config.ts' is still using the placeholder value. Change it to the appId of your app."
    );
  if (kangarooConfig.productName === PLACEHOLDER_PRODUCT_NAME)
    throw new Error(
      "The productName field in 'kangaroo.config.ts' is still using the placeholder value. Change it to the productName of your app."
    );
}

if (kangarooConfig.bootstrapUrl === 'https://dev-test-bootstrap2.holochain.org/') {
  console.log(`

         ⚠️   WARNING  ⚠️

The bootstrapUrl field in kangaroo.config.ts is still set to the testing bootstrap server URL.
This server has no availability guarantees whatsoever and is meant for testing purposes only.

If you want to deploy your app to end-users, make sure to run your own
instance of a bootstrap server or use a server that has guaranteed availability
for the lifetime of your apps network(s).

Changing the bootstrap URL after deployment of your app can result in a network partition
among users of your app.

  `);
}

if (kangarooConfig.signalUrl === 'wss://dev-test-bootstrap2.holochain.org/') {
  console.log(`

         ⚠️   WARNING  ⚠️

The signalUrl in kangaroo.config.ts is still set to the testing signaling server URL.
This server has no availability guarantees whatsoever and is meant for testing purposes only.

If you want to deploy your app to end-users, make sure to run your own
instance of a signaling server or use a server that has guaranteed availability
for the lifetime of your apps network(s).

Changing the signaling server URL after deployment of your app can result in a
network partition among users of your app.

`);
}

if (
  kangarooConfig.iceUrls.includes('stun:stun-0.main.infra.holo.host:443') ||
  kangarooConfig.iceUrls.includes('stun:stun-1.main.infra.holo.host:443')
) {
  console.log(`

         ⚠️   WARNING  ⚠️

The iceUrls field in kangaroo.config.ts contains testing ICE server URLs.
These servers have no availability guarantees whatsoever and are meant
for testing purposes only.

If you want to deploy your app to end-users, make sure to run your own
instances of ICE servers or use public ones that have guaranteed availability
for the lifetime of your apps network(s).
`);
}

fs.mkdirSync('resources', { recursive: true });

// Store config to json file
fs.writeFileSync(
  path.join('resources', 'kangaroo.config.json'),
  JSON.stringify(kangarooConfig, undefined, 2),
  'utf-8'
);

// Copy conductor config template to resources folder
fs.copyFileSync(
  path.join(process.cwd(), 'templates', 'conductor-config.yaml'),
  path.join('resources', 'conductor-config.yaml')
);

// Overwrite package.json values
const packageJsonString = fs.readFileSync('package.json', 'utf-8');
const packageJSON = JSON.parse(packageJsonString);
packageJSON.name = kangarooConfig.appId;
packageJSON.version = kangarooConfig.version;

fs.writeFileSync('package.json', JSON.stringify(packageJSON, undefined, 2), 'utf-8');

const eletronBuilderYml = jsYaml.load(
  fs.readFileSync(path.join(process.cwd(), 'templates', 'electron-builder-template.yml'))
);

eletronBuilderYml.appId = kangarooConfig.appId;
eletronBuilderYml.productName = kangarooConfig.productName;
eletronBuilderYml.win.executableName = kangarooConfig.appId;

fs.writeFileSync('electron-builder.yml', jsYaml.dump(eletronBuilderYml), 'utf-8');
