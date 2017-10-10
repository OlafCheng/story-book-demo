/**
 * Build Lib
 * Steps:
 * 1. lint
 * 2. 构建入口文件
 * 3. 构建每个组件对应的 JS 文件
 * 4. 构建每个组件对应的 CSS 文件
 * 5. 打包 JS 文件，生成 retail-components-umd.js & retail-components-umd.min.js
 * 6. 生成每个组件目录下的 style 入口
 */
const chalk = require('chalk');
require('shelljs/global');

const padZero = num => (num < 10 ? '0' : '') + num;

const log = (status, action) => {
  const now = new Date();
  const clock = `${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;
  console.log(`${chalk.white('[')}${chalk.gray(clock)}${chalk.white(']')} ${status} '${action ? chalk.cyan.bold(action) : ''}'`);
};

const execFlow = (cmd) => {
  log('Starting', cmd);
  exec(`npm run ${cmd} --slient`);
  log('Finished', cmd);
}

execFlow('lint');// lint
execFlow('build:entry');// 构建入口文件
execFlow('build:components');// 构建每个组件对应的 js 文件
execFlow('build:css');// 构建每个组件对应的 CSS 文件
execFlow('build:retail-components');// 打包 js 文件，生成 umd 和压缩文件
execFlow('build:style-entry');// 构建每个组件目录下的 style 入口