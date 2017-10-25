const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const createAlias = require('./createAlias');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', 'json'],
    alias: createAlias(path.resolve(__dirname, '../src'))
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
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
        test: /\.js$/,
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
        test: /\.(sass|scss)$/,
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
};