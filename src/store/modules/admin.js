/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */

import API from '@/plugins/axios'
const state = {
  accounts:[],
  status:{}
}

const getters = {
  accounts(state){
    return state.accounts
  },
  status(state){
    return state.status
  }
}

const actions = {
  GetStatus({commit}){
    return new Promise((resolve, reject) => {
      API.CORE.GET_ACCOUNTS().then(res => {
        let accounts = res.data.data
        commit('saveAccounts', accounts)
        resolve()
      }).catch(reject)
    })
  },
  ListUsers({commit}){
    return new Promise((resolve,reject)=>{
       API.CORE.GET_ACCOUNTS().then(res => {
          let accounts = res.data.data
          commit('saveAccounts', accounts)
          resolve()
       }).catch(reject)
    })
  },
 
}

const mutations = {
  saveUsers(state, accounts) {
    state.accounts = accounts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
