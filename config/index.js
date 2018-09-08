const path = require('path')

module.exports = {
  build: {
    env: { NODE_ENV: 'production' },
    assetsPublicPath: '.',
    // productionGzipExtensions: ['js', 'css'],
    indexEntry: path.resolve(__dirname, '../src/index.js')
  },
  dev: {
    env: { NODE_ENV: 'development' },
    assetsPublicPath: '/',
    indexEntry: path.resolve(__dirname, '../src/index.js')
  }
}
