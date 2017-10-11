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
 * 请不要直接在这里修改 webpack 配置文件
 * 这份配置文件是由 ../scripts/update-webpack-config.js 生成的
 * 直接在这里修改会不生效
 */
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const createAlias = require('./createAlias');

console.log(createAlias(path.resolve(__dirname, '../src')));

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
        test: /\\.js$/,
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
  externals: [
    {
      react: {
        amd: 'react',
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react'
      },
      'react-dom': {
        amd: 'react-dom',
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom'
      }
    }
  ],
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
