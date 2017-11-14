const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './src/index.js',
    './scss/style.scss'
  ],
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'sass-loader'
        ]
      })
    }, {
      test: /\.gif$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }, {
      test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff'
      }
    }, {
      test: /\.ttf(\?[a-z0-9#=&.]+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/octet-stream'
      }
    }, {
      test: /\.eot(\?[a-z0-9#=&.]+)?$/,
      loader: 'file-loader'
    }, {
      test: /\.svg(\?[a-z0-9#=&.]+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/svg+xml'
      }
    }]
  }
};