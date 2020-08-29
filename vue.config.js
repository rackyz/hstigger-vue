"use strict"
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
const config = require('./src/config')
const clean = new CleanWebpackPlugin()
function resolve(dir) {
  return path.join(__dirname, dir)
}
const Chained = config=>{
  // 配置入口
  config
    .entry('index')
    .add('./src/main.js')
    .end()

  // MODULES - 模块配置
  // 配置ESLINT
  // config.module
  //   .rule('eslint')
  //   .test(/\.js$/)
  //   .pre()
  //   .include
  //   .add(/src/)
  //   .end()
  //   .exclude
  //   .add(/node_modules/)
  //   .end()
  //   .use('eslint')
  //   .loader('eslint-loader')
  //   .options({
  //     rules: {
  //       semi: 'off'
  //     }
  //   });

  // 加载字体

  // 配置BABEL
  config.module
    .rule('babel')
    .test(/\.js$/)
    .use('babel-loader')
    .loader('babel-loader')


  config.module.rules.delete('eslint')


  // PLGUINS - 插件配置
  // [clean-webpack-plugin] 清理dist目录
  config
    .plugin('clean')
    .use(clean, [
      ['dist'], {
        root: __dirname,
        dry: false
      }
    ])

  // CDN引入 - 名称映射
  config.externals({
    "vue": "Vue",
    "iview":"iview",
    "moment": "moment",
    "axios": "axios"
  })

  config.module.rule('eslint').clear()

  // 目录别名映射
  config.resolve.alias
    .set('@pages', resolve('src/pages'))
    .set('@components', resolve('src/components'))
    .set('@utils', resolve('src/utils'))
    .set('@assets', resolve('src/assets'))
    .set('@', resolve('src'))

  // WARNING:xx.js was preloaded using link preload but not used within a few seconds from the window 's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
  config.plugins.delete('preload')

  config.devServer.port(80)
    .hot(true)

}


module.exports = {
  outputDir:"./dist",
  chainWebpack: Chained
}
