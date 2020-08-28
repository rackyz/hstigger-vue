

import Vuex from 'vuex'
const debug = process.env.NODE_ENV !== 'production'

let moduleFiles = require.context('./modules',true, /\.js$/)

let modules = {}
moduleFiles.keys().forEach(f=>{
  let [,key] = f.match(/\.\/(.+)\.js$/)
  let file = moduleFiles(f)
  if(file && file.default)
    modules[key] = file.default 
})
console.log('STORE INIT SUCCESS')

export default new Vuex.Store({
  modules,
  strict: debug
})