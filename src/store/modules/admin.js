/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */

import API from '@/plugins/axios'
import UTIL from '../util.js'
const state = {
  accounts:[],
  enterprises:[],
  status:{}
}

const getters = {
  accounts(state){
    return state.accounts
  },
  status(state){
    return state.status
  },
  enterprises(state){
    return state.enterprises
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
        dispatch('CreateUsers',[user]).then(resolve).catch(reject)
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
  },

  // ENTERPRISES
  GetEnterprises({commit}){
    return new Promise((resolve,reject)=>{
      API.CORE.GET_ENTERPRISES().then(res=>{
        commit('saveEnterprises',res.data.data)
        resolve(res.data.data)
      }).catch(reject)
    })
  },

  PatchEnterprise({commit},item){
    if(item.id == undefined){
      return new Promise((resolve,reject)=>{
        API.CORE.POST_ENTERPRISE(item).then(res=>{
          let updateInfo = res.data.data
          Object.assign(item,updateInfo)
          commit('saveEnterprises',[item])
          resolve()
        }).catch(reject)
      }) 
    }else{
      return new Promise((resolve,reject=>{
        API.CORE.PATCH_ENTERPROSE({param:{id}},item).then(res=>{
           let updateInfo = res.data.data
           Object.assign(item, updateInfo)
           commit('saveEnterprises', [item])
           resolve()
        }).catch(reject)
      }))
    }
  },

  DeleteEnterprises({commit},id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.DEL_ENTERPRISES(id_list).then(res=>{
        commit('deleteEnterprises',id_list)
        resolve()
      }).catch(reject)
    })
     
  },

  LockEnterprises({commit},id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.LOCK_ENTERPRISES(id_list).then(res=>{
        commit('saveEnterprises',id_list.map(v=>({id:v,state:2})))
        resolve()
      }).catch(reject)
    })
     
  },
  UnlockEnterprises({commit},id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.UNLOCK_ENTERPRISES(id_list).then(res=>{
        commit('saveEnterprises',id_list.map(v=>({id:v,state:1})))
        resolve()
      }).catch(reject)
    })
     
  },

  // FILE
  // [in] local files objects
  // [out] paired file-name file-path string
  upload:({commit},files)=>{
    return new Promise((resolve,reject)=>{
      let file_db_objects = files.map(v=>({
        name:v.name,
        ext:v.ext,
        size:v.size,
        url: API.MakeCOSURL(v.name)
      }))
      API.CORE.POST_FILES(file_db_objects).then(res=>{

      })
    })
    
  }

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
  },
  saveEnterprises(state,items){
    UTIL.LocalSaveItems(state,'enterprises',items)
  },
  deleteEnterprises(state,id){
    UTIL.LocalDeleteItem(state,'enterprises',id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
