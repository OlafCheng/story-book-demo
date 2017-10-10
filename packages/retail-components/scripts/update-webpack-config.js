// 更新 webpack.prod.config.js
// 以便正常打包
const components = require('./get-components')();
const fs = require('fs');
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');
const path = require('path');

const ENTRY_TEMPLATE = `    '{{target}}': '{{source}}'`;
const ENTRIES_TEMPLATE = `{
{{entries}}
  }`;
const MAIN_TEMPLATE = `const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {{entries}},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib')
  },
  plugins: [
    new UglifyJSPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', 'json']
  },
  module: {
    rules: [
      {
        test: /\\.(ts|tsx)$/,
        use: [
          {
            loader: 'tslint-loader'
          },
          {
            loader: 'awesome-typescript-loader'
          }
        ],
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          }
        ]
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
  ]
};`;

const entriesTemplate = [];

components.forEach(obj => {
  entriesTemplate.push(render(ENTRY_TEMPLATE, {
    target: `${obj.dir}/${obj.index.split('\.')[0]}`,
    source: `../src/${obj.dir}`
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

console.log('[update webpack config] DONE:' + OUTPUT_FILE);
