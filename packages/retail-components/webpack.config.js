/*
    ./webpack.config.js
*/
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'retail-components-umd.js',
    library: 'retail-components.js',
    libraryTarget: 'umd',
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
