const path = require('path')
const projectConfig = require('../webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    root: path.join(__dirname, "../client/src")
  },
  module: {
    loaders: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   loader: 'babel-loader'
      // },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
        }),
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader?' + JSON.stringify({
          name: '[name]_[hash]',
          prefixize: true
        })
      }
    ]
  }
}
