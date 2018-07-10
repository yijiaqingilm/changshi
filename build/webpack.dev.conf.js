var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var bundleConfig = require('../libConfig/bundle-config')
var defineConfig = Object.assign({'process.env': config.dev.env}, config.globals)
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#source-map', /* #cheap-module-eval-source-map*/
  plugins: [
    new webpack.DefinePlugin(defineConfig),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('../libConfig/libs-mainfest'),
    }),
    new webpack.DllReferencePlugin({
      manifest: require('../libConfig/vueLibs-mainfest'),
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      vueLibJsName: bundleConfig.vueLibs.js,
      libJsName: bundleConfig.libs.js,
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de/),
    new FriendlyErrorsPlugin()
  ]
})
