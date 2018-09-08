const path = require('path')

module.exports = {
  build: {
    env: { NODE_ENV: 'production' },
    index: path.resolve(__dirname, '../demo/index.html'),
    assetsRoot: path.resolve(__dirname, '../demo'),
    assetsPublicPath: '.',
    productionSourceMap: false
  },
  dev: {
    env: { NODE_ENV: 'development' },
    port: 8080,
    autoOpenBrowser: true,
    assetsPublicPath: '/'
  }
}
