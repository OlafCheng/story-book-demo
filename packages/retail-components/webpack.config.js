/*
    ./webpack.config.js
*/
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'retail-components-umd.js',
    library: 'retail-components.js',
    libaryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
    umdNamedDefine: true
  },
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
            loader: 'source-map-loader'
          },
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
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
