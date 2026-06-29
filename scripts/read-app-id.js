const path = require('path');

require('tsx/cjs');

const kangarooConfig = require(path.join(process.cwd(), 'kangaroo.config.ts')).default;

console.log(kangarooConfig.appId);
