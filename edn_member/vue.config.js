// const fs = require('fs')
// const webpack = require('webpack')
module.exports = {
  publicPath: '/member/',

  devServer: {
    disableHostCheck: true,
    proxy: 'http://localhost:8080'
    // https: {
    //   key: fs.readFileSync('./src/assets/https/mmember.udn.com-key.pem'),
    //   cert: fs.readFileSync('./src/assets/https/mmember.udn.com.pem')
    // }
  },

  // chainWebpack: (config) => {
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .tap(options => { Object.assign({}, options, { name: '[name].[ext]' }) })
  // },
  // css: {
  //   extract: {
  //     filename: '[name].css',
  //     chunkFilename: '[name].css'
  //   }
  // },
  runtimeCompiler: true,

  configureWebpack: {
    output: {
      libraryExport: 'default'
      // filename: '[name].js',
      // chunkFilename: '[name].js'
    }
  },

  pwa: {
    iconPath: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'

    }
  },

  productionSourceMap: false
}
