/* eslint-disable @typescript-eslint/no-var-requires */
const tsNode = require('ts-node');
const path = require('path');

tsNode.register();

const kangarooConfig = require(path.join(process.cwd(), 'kangaroo.config.ts')).default;

console.log(kangarooConfig.appId);
