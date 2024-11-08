/* eslint-disable @typescript-eslint/no-var-requires */
const { emptyDirSync } = require('fs-extra');
const { resolve } = require('path');
const { exec, execSync } = require('child_process');

const modelPath = resolve(__dirname, './src/apifox/models');
const apiPath = resolve(__dirname, './src/apifox/apis');

emptyDirSync(modelPath);
emptyDirSync(apiPath);

execSync(
  `openapi-generator generate -i https://barry-public-assets.oss-cn-beijing.aliyuncs.com/openapi/chameleon/swagger.json -g typescript-fetch -o ./src/apifox`,
);

const filePath = resolve(__dirname, '../src/apifox/runtime.ts');

execSync(`prettier --write .`);

// exec(`git checkout -- ${filePath}`, (error) => {
//   if (error) {
//     console.error(`apifox/runtime.ts 撤销失败: ${error}`);
//     return;
//   }
// });
