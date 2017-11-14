const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
  output: {
    path: __dirname,
    publicPath: '/',
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './dist/css/style.css',
      allChunks: true
    })
  ]
});