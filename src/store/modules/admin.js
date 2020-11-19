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
  // USERS/ACCOUNTS
  ListUsers({commit}){
    return new Promise((resolve,reject)=>{
       API.CORE.GET_ACCOUNTS().then(res => {
          let accounts = res.data.data
          commit('saveAccounts', accounts)
          resolve()
       }).catch(reject)
    })
  },
  CreateUsers({commit},users){
    return new Promise((resolve,reject)=>{
      API.CORE.POST_ACCOUNTS(users).then(res => {
        let resInfoArray = res.data.data
        users.forEach((v,i)=>{
          Object.assign(v,resInfoArray[i])
        })
        commit("saveAccounts", users)
        resolve()
      }).catch(reject)
    })
  },
  PatchUser({commit,dispatch},user){
    return new Promise((resolve,reject)=>{
      if(user.id)
        return API.CORE.PATCH_ACCOUNT(user,{param:{id:user.id}}).then(res=>{
          let resInfo = res.data.data
          commit("patchAccount", resInfo)
          resolve()
        }).catch(reject)
      else
        dispatch('CreateUsers',[user])
    })
  },
  DeleteUser({commit},user_id){
    return new Promise((resolve,reject)=>{
      API.CORE.DEL_ACCOUNT({param:{id:user_id}}).then(res=>{
        commit('removeAccount', user_id)
        resolve()
      }).catch(reject)
    })
  }

  // ENTERPRISES




  // APPLICATIONS

 
}

const mutations = {
  saveUsers(state, accounts) {
    state.accounts = accounts
  },
  saveAccounts(state,accounts){
    accounts.forEach(v=>{
       state.accounts.push(v)
    })
  },
  patchAccount(state,account){
    let index = state.accounts.findIndex(v=>v.id === account.id)
    if(index != -1)
      state.accounts.splice(index,1,state.Object.assign(accounts[index],account))
  },
  removeAccount(state,id){
    let index = state.accounts.findIndex(v=>v.id == id)
    if (index != -1)
      state.accounts.splice(index,1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
