const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'tab-select/index': '../src/tab-select'
  },
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
        test: /\.(ts|tsx)$/,
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
        test: /\.jsx$/,
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
};