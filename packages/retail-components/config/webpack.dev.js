module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'retail-components-umd.js',
    library: 'retail-components.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
    umdNamedDefine: true
  }
}