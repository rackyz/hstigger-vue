const { resolve } = require("core-js/fn/promise")

/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */
const {axiosClient} = '@/plugins/axios'

const state = {
  session:{},
  types:[]
}


const getters = {
  session(state){
    return state.session
  }
}

const actions = {
  login({commit},{account,password}){
    return new Promise((resolve, reject) => {
       axiosClient.post('sessions', {
         account,
         password
       }).then(res => {
          let session = res.data.data
          commit('save',session)
          resolve(session)
       }).catch(reject)
    })
  }
}

const mutations = {
  save(state,session){
    state.session = session
  }
}

