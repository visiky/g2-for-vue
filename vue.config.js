const config = require('./config')

module.exports = {
  productionSourceMap: config.build.productionSourceMap,
  // https://cli.vuejs.org/config/#baseurl
  baseUrl: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath,
  // https://cli.vuejs.org/config/#outputdir
  outputDir: config.build.assetsRoot,
  pages: {
    // 默认进入demo
    index: {
      // entry for the page
      entry: './demo/main.js',
      // the source template
      template: 'public/index.html'
    }
  }
}
