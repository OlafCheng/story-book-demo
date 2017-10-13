const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const createMap = () => {
  const packageDir = path.resolve(__dirname, '../src');
  const packages = fs.readdirSync(packageDir);

  return packages
    .filter(dir => fs.statSync(path.join(packageDir, dir)).isDirectory())
    .reduce((alias, dir) => {
      const regexp = `^${dir}(.*)$`;
      const actual = `<rootDir>/src/${dir}$1`;

      alias[regexp] = actual;
      return alias;
    }, {});
}

const CONFIG_PATH = '../jest.config.json';
const jestConfig = require(CONFIG_PATH);
jestConfig.moduleNameMapper = createMap();

fs.writeFileSync(require.resolve(CONFIG_PATH), JSON.stringify(jestConfig, null, '  '));

console.log(`${chalk.white('[')}${chalk.bold.green('Update Jest Config')}${chalk.white(']')}: ${chalk.bold.red('DONE!')}`)