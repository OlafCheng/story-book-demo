// 构建入口文件
const components = require('./get-components')();
const fs = require('fs');
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const path = require('path');
const chalk = require('chalk');

const OUTPUT_PATH = path.join(__dirname, '../src/index.js');
const IMPORT_TEMPLATE = 'import {{name}} from \'{{dir}}\';';
const MATIN_TEMPLATE = `{{include}}

export default {
{{list}}
};
`;

const includeComponentTemplate = [];
const listTemplate = [];

components.forEach(obj => {
  const componentsName = uppercamelcase(obj.dir);
  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentsName,
    dir: obj.dir,
    index: obj.index
  }));

  listTemplate.push(`  ${componentsName}`);
})

const template = render(MATIN_TEMPLATE, {
  include: includeComponentTemplate.join('\n'),
  list: listTemplate.join(',\n')
})

fs.writeFileSync(OUTPUT_PATH, template);
console.log(`${chalk.white('[')}build entry${chalk.white(']')} DONE: ${chalk.green.bold(OUTPUT_PATH)}`);