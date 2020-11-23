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
          commit('initAccounts', accounts)
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
  ResetPassword({commit},user_id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.RESET_PASSWORD(user_id_list).then(res=>{
        commit('pathAccounts',user_id_list.map(id=>({id,changed:false})))
        resolve()
        
      }).catch(reject)
    })
  },
  ChangePassword({commit},{id,password}){
    return new Promise((resolve,reject)=>{
      API.CORE.CHANGE_PASSWORD({id,password}).then(res=>{
         commit('patchAccount', {
           id,changed:1
         })
        resolve()
      }).catch(reject)
    })
  },
  LockAccounts({commit},user_id_list){
    if(user_id_list && !Array.isArray(user_id_list))
      user_id_list = [user_id_list]
    return new Promise((resolve, reject) => {
      API.CORE.LOCK_ACCOUNTS(user_id_list).then(res => {
        commit('patchAccounts', user_id_list.map(id => ({
          id,
          locked:1
        })))
        resolve()

      }).catch(reject)
    })
  },
  UnlockAccounts({commit},user_id_list){
      if (user_id_list && !Array.isArray(user_id_list))
        user_id_list = [user_id_list]
     return new Promise((resolve, reject) => {
       API.CORE.UNLOCK_ACCOUNTS(user_id_list).then(res => {
         commit('patchAccounts', user_id_list.map(id => ({
           id,
           locked: 0
         })))
         resolve()

       }).catch(reject)
     })
  },
  PatchUser({commit,dispatch},user){
    return new Promise((resolve,reject)=>{
      if(user.id)
        return API.CORE.PATCH_ACCOUNT(user,{param:{id:user.id}}).then(res=>{
          let resInfo = res.data.data
          Object.assign(user, resInfo)
          commit("patchAccount", user)
          resolve()
        }).catch(reject)
      else
        dispatch('CreateUsers',[user])
        resolve()
    })
  },
  DeleteUser({commit},user_id){
    return new Promise((resolve,reject)=>{
      API.CORE.DEL_ACCOUNT({param:{id:user_id}}).then(res=>{
        commit('removeAccount', user_id)
        resolve()
      }).catch(reject)
    })
  },
  DeleteUsers({
    commit
  }, userid_list) {
    return new Promise((resolve, reject) => {
      API.CORE.DEL_ACCOUNTS(userid_list).then(res => {
        commit('removeAccount', user_id)
        resolve()
      }).catch(reject)
    })
  }

  // ENTERPRISES




  // APPLICATIONS

 
}

const mutations = {
  initAccounts(state, accounts) {
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
      state.accounts.splice(index,1,Object.assign(state.accounts[index],account))
  },
  patchAccounts(state,items){
    items.forEach(v=>{
      mutations.patchAccount(state,v)
    })
  },
  removeAccount(state,id){
    let index = state.accounts.findIndex(v=>v.id == id)
    if (index != -1)
      state.accounts.splice(index,1)
  },
  removeAccounts(state,id_list = []){
    id_list.forEach(v=>{
      mutations.removeAccount(state,v)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
