"use strict"
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
const config = require('./src/config')
const QCloudCosPlugin = require('webpack-cos-plugin');
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
    .use('babel-loader',[{presets:["es2015"]}])
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
     "iview": "iview",
     "hsui": "hsui",
     "moment": "moment",
     "axios": "axios"
   })

     config.plugin('qcloud-cos')
       .use(QCloudCosPlugin, [{
         auth: {
           region: 'ap-shanghai',
           SecretId: 'AKID673paDhy3FlL4nGhrt3Xt7EAxZLxnvAD',
           SecretKey: '2ta8XqzwoY1MWVgkeMyQhmrqfkfPyMya',
           // Bucket 名称
           fileBucket: 'nbgz-pmis',
         },
         bucket: {
           Bucket: 'cloud-1257839135',
           Region: 'ap-shanghai'
         },
         cosBaseDir: '',
         project: '',
         useVersion: true,
         existCheck: false
       }])
     


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
 publicPath:'https://cloud-1257839135.cos.ap-shanghai.myqcloud.com/hstigger-vue/0.1.0/',
  outputDir:"./dist",
  chainWebpack: Chained
}
