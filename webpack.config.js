const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = () => {
  return {
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
            options: {
              presets: ['env'],
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            }
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
