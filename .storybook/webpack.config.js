// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

/*
    ./webpack.config.js
*/
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './dist/index.html',
//   inject: 'body',
// });

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
              presets: ['env', 'react'],
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
  // plugins: [HtmlWebpackPluginConfig],
};
