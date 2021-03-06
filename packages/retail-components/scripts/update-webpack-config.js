// 更新 webpack.prod.js

const components = require('./get-components')();
const fs = require('fs');
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const path = require('path');

const ENTRY_TEMPLATE = `    '{{target}}': '{{source}}'`;
const ENTRIES_TEMPLATE = `{
{{entries}}
  }`;
const MAIN_TEMPLATE = `/**
 * webpack.prod.js 由 scripts/update-webpack-config.js 生成
 * 直接修改，无法生效
 */
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const createAlias = require('./createAlias');

module.exports = {
  entry: {{entries}},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', 'json'],
    alias: createAlias(path.resolve(__dirname, '../src'))
  },
  module: {
    rules: [
      {
        test: /\\.tsx$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'tslint-loader'
          }
        ],
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\\.jsx$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      {
        test: /\\.(sass|scss)$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
};`;

const entriesTemplate = [];

components.forEach(obj => {
  entriesTemplate.push(render(ENTRY_TEMPLATE, {
    target: `${obj.dir}/${obj.index.split('\.')[0]}`,
    source: path.resolve(__dirname, `../src/${obj.dir}`)
  }))
});

const entries = render(ENTRIES_TEMPLATE, {
  entries: entriesTemplate.join(',\n')
})

const entry = render(MAIN_TEMPLATE, {
  entries
})

const OUTPUT_FILE = path.join(__dirname, '../config/webpack.prod.js')
fs.writeFileSync(OUTPUT_FILE, entry);

console.log('[update webpack config] DONE: ' + OUTPUT_FILE);
