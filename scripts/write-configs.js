/* eslint-disable @typescript-eslint/no-var-requires */
const jsYaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const tsNode = require('ts-node');

tsNode.register();

const kangarooConfig = require(path.join(process.cwd(), 'kangaroo.config.ts')).default;

if (!process.env.KANGAROO_DEV) {
  // CHECK THAT NO DEFAULT VALUES ANYMORE
  if (kangarooConfig.appId === 'org.holochain.kangaroo-electron')
    throw new Error(
      "The appId field in 'kangaroo.config.ts' is still using the default value. Change it to the appId of your app."
    );
  if (kangarooConfig.productName === 'Holochain Kangaroo Electron')
    throw new Error(
      "The productName field in 'kangaroo.config.ts' is still using the default value. Change it to the productName of your app."
    );
}

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
