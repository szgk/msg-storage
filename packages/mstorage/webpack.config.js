const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['@babel/polyfill', './src/main.ts'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'mstorage',
    libraryTarget: 'umd',
    globalObject  : 'this',
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new ProgressBarPlugin()
  ]
}
