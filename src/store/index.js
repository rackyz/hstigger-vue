
import Vuex from 'vuex'
const debug = process.env.NODE_ENV !== 'production'

let modules = require.context('./modules',true, /\.js$/)


export default new Vuex.Store({
  modules,
  strict: debug
})