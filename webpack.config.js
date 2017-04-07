const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

module.exports = () => {
  return {
    entry: {
      app: './client/src/index.js',
      vendor: [
        'babel-polyfill',
        'core-js/es6/promise',
        'whatwg-fetch',
      ]
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, './client/build'),
      publicPath: '/public/'
    },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    devtool: 'cheap-eval-source-map',
    performance: {
      hints: false
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/public/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        minChunks: Infinity,
        filename: '[name].[hash].js'
      }),
    ],
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'client/src')],
      extensions: ['.webpack.js', '.web.js', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader',
          }),
        },
      ],
    },
  }
}
