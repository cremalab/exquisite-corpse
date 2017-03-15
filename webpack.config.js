const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './public/src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/build/'),
    filename: '[name]_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader',
      }),
    }],
  },
}
