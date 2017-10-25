const fs = require('fs');
const path = require('path');

// 为 readme 创建 alias
module.exports = function createAlias(packagesDir) {
  const packages = fs.readdirSync(packagesDir);

  return packages
  .filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory())
  .reduce((alias, p) => {
    alias[`docs/${p}$`] = path.join(packagesDir, p, '/readme.md');
    
    // 针对 storybook-readme 写的 alias, 在 storybook-readme 发新版后，可能需要删掉
    alias['storybook-readme$'] = path.resolve(__dirname, '../node_modules/storybook-readme/with-readme.js')

    return alias;
  }, {});
};