"use strict"
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
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

  // 配置ESLINT
  config.module
    .rule('eslint')
    .test(/\.js$/)
    .pre()
    .include
    .add(/src/)
    .end()
    .exclude
    .add(/node_modules/)
    .end()
    .use('eslint')
    .loader('eslint-loader')
    .options({
      rules: {
        semi: 'off'
      }
    });

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

  // MODULES - 模块配置

  // CDN引入 - 名称映射
  config.externals({
    "vue": "Vue",
    "iview": "iview",
    "moment": "moment",
    "axios": "axios"
  })


  // 目录别名映射
  config.resolve.alias
    .set('@pages', resolve('src/pages'))
    .set('@components', resolve('src/components'))
    .set('@utils', resolve('src/utils'))
    .set('@assets', resolve('src/assets'))
    .set('@', resolve('src'))

}

module.exports = {
  outputDir:"./dist",
  chainWebpack: Chained
}