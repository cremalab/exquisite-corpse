const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './client/src/index.js',
  output: {
    publicPath: '/public/',
    path: path.resolve(__dirname, './client/build'),
    filename: '[name]_bundle.js',
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'client/src')],
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
        },
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
