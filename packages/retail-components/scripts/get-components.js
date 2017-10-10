const fs = require('fs');
const path = require('path');

module.exports = function() {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../src'));
  const excludes = ['index.js', '.DS_Store'];
  const componentsDirs = dirs.filter(dir => excludes.indexOf(dir) === -1);

  return componentsDirs.map(dir => {
    const files = fs.readdirSync(path.resolve(__dirname, `../src/${dir}`));
    const index = files.filter(fileName => fileName.indexOf('index') !== -1)[0];
    return {
      dir,
      index
    }
  });
}