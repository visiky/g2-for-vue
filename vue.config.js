const path = require('path')
const configs = require('./config')

const config = process.env.NODE_ENV === 'production' ? configs.build : configs.dev

module.exports = {
  productionSourceMap: configs.build.productionSourceMap ? '#source-map' : false,
  // https://cli.vuejs.org/config/#baseurl
  baseUrl: config.assetsPublicPath,
  // https://cli.vuejs.org/config/#outputdir
  outputDir: config.outputPath,
  pages: {
    index: {
      entry: path.resolve(__dirname, './src/index.js'),
      template: './public/index.html'
    },
    demo: {
      entry: path.resolve(__dirname, './demo/index.js'),
      template: './demo/index.html'
    }
  },
  configureWebpack: {
    // https://cli.vuejs.org/guide/build-targets.html#vue-vs-js-ts-entry-files
    output: {
      libraryExport: 'default'
    }
  },
  // @see https://github.com/neutrinojs/webpack-chain#getting-started
  chainWebpack: config => {
    config.module
      .rule('compile')
      .test(/\.js$/)
      .include
      .add('src')
      .add('node_modules/@antv')
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          ['es2015', { modules: false }]
        ]
      })
  },
  css: {
    loaderOptions: {
      // pass options to less-loader
      less: {
      }
    }
  }
}
