var path = require('path')
var webpack = require('webpack')       //调用webpack内置DllPlugin插件
var AssetsPlugin = require('assets-webpack-plugin') // 生成文件名，配合HtmlWebpackPlugin增加打包后dll的缓存
module.exports = {
  entry: {
    vueLibs: [
      'vue/dist/vue.esm.js',
      'vue-infinite-loading',
      'vee-validate',
      'vue-resource',
      'framework7-vue'
    ],
    libs: [
      'babel-polyfill',
      'velocity-animate',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static'),
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../libConfig/[name]-mainfest.json'),
      name: '[name]_library',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './libConfig'
    }),
  ],
}
