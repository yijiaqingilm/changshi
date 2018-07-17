var webpack = require('webpack')
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var HappyPack = require('happypack')
var os = require('os')
var happyPackThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    'f7': 'Framework7',
    'wx': 'jWeixin',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'pages': resolve('src/pages'),
      'components': resolve('src/components'),
      'directives': resolve('src/directives'),
      'static': resolve('src/assets/static'),
      'api': resolve('src/api'),
      'lib': resolve('src/lib'),
      'section': resolve('src/section'),
      'config': resolve('src/config'),
      'font': resolve('src/fonts'),
      'mixins': resolve('src/mixins'),
      'router': resolve('src/router'),
      'sysConfig': resolve('config'),
      'store': resolve('src/store'),
      'css': resolve('src/css')

    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          resolve('src/api'),
          resolve('src/components'),
          resolve('src/config'),
          resolve('src/directives'),
          resolve('src/filters'),
          resolve('src/router'),
          resolve('src/section'),
          resolve('src/store'),
          resolve('src/pages/user'),
          resolve('src/pages/gardener'),
          resolve('src/pages/geomaner'),
          resolve('src/pages/sell'),
          resolve('src/pages/store'),
          /*resolve('src/pages'),*/
        ],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },

      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        loader: 'happypack/loader?id=happy-babel-js',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/vue-echarts'),
          resolve('node_modules/resize-detector')
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|TTF)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    noParse: /node_modules\/(jquey|framework7|moment|chart\.js)/,
  },
  plugins: [new HappyPack({
    id: 'happy-babel-js',
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyPackThreadPool,
  })]
}
