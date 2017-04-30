const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FlowWebpackPlugin = require('flow-webpack-plugin')
const webpack = require('webpack')

const resolveEnv = env => (a, b) =>
  env === 'prod' ? a : b

module.exports = env => {
  console.log('Webpack building with env=' + env) // eslint-disable-line
  const isProd = resolveEnv(env)
  return {
    stats: 'minimal',
    context: path.resolve(__dirname, 'client'),
    entry: {
      app: __dirname + '/client/src/index.js',
      vendor: [
        'babel-polyfill',
        'core-js/es6/promise',
        'whatwg-fetch',
      ]
    },
    output: {
      filename: isProd('[name].[hash].js', '[name].js'),
      path: path.resolve(__dirname, './client/build'),
      publicPath: '/public/'
    },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    plugins: [
      new FlowWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(isProd('production', 'development'))
        }
      }),
      ...isProd(
        [
          new webpack.optimize.UglifyJsPlugin({
            comments: false,
            beautify: false,
            sourceMap: false,
            compress: {
              warnings: false,
              screw_ie8: true,
              dead_code: true,
              unused: true
            }
          }) ,
          new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
          new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity,
            filename: '[name].[hash].js'
          }),
        ],
        []
      ),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: __dirname
        }
      }),
      new HtmlWebpackPlugin({
        template: __dirname + '/client/public/index.html',
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
          }
        },
        {
          test:    /\.css$/,
          include: `${__dirname}/client`,
          loader: ExtractTextPlugin.extract({
            loader:         'css-loader',
            fallbackLoader: 'style-loader',
          }),
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader?' + JSON.stringify({
            name: '[name]_[hash]',
            prefixize: true
          })
        }
      ],
    },
  }
}
