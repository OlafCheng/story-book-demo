/*
    ./webpack.config.js
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './dist/index.html',
  inject: 'body',
});

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'tslint-loader',
          },
          {
            loader: 'awesome-typescript-loader',
          },
        ],
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react'],
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [HtmlWebpackPluginConfig],
};
