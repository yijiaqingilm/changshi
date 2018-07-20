// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
let debug = process.env.NODE_ENV !== 'production'
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    globals: {
      __DEBUG__: false,
      serverUrl: JSON.stringify('http://127.0.0.1:5005'),
      VERSION: JSON.stringify('V.1.0')
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8008,
    autoOpenBrowser: true,
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {
      // 测试服务器
      '/api': {
        /*本地测试服务*/
        /* target: 'http://easy-mock.com/mock/590a8d177a878d73716eb90e/zhuzhu',*/

        /*测试环境地址*/
        target: 'http://api.changshi.showtou.com',
        /* target: 'http://192.168.1.121',*/
        changeOrigin: true
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true,
    globals: {
      __DEBUG__: true,
      serverUrl: JSON.stringify('http://127.0.0.1:8080/api'),
      VERSION: JSON.stringify('V.1.0')
    }
  },
}
