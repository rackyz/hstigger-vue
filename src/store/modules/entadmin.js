
import UTIL from '../util.js'
var SERVER = {}
const state = {
  users:[],
  enterprises:[],
  modules:[],
  rss:[],
  status:{},
  logs:[],
  flows:[]
}

const getters = {
  users(state){
    return state.users
  }
}

const actions = {
  GetUsers({commit}){
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.LIST_EMPLOYEES().then(res => {
        let users = res.data.data
        commit('SaveUsers',users)
        resolve(users)
      })
    })
  },
  CreateEmployee({
      commit
    }, e) {
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.POST_EMPLOYEES(e).then(res=>{
        let user = Object.assign({},e,res.data.data)
        commit('SaveUser',user)
        resolve(user)
      }).catch(e=>{
        reject(e)
      })
    })
  },
  ResetPassword({commit},user_id_list){
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.RESET_PASSWORD(user_id_list).then(res=>{
        commit('SaveUsers',user_id_list.map(id=>({id,changed:false})))
        resolve()
        
      }).catch(reject)
    })
  },
  LockAccounts({commit},user_id_list){
    if(user_id_list && !Array.isArray(user_id_list))
      user_id_list = [user_id_list]
    return new Promise((resolve, reject) => {
      SERVER.entadmin.LOCK_ACCOUNTS(user_id_list).then(res => {
        commit('SaveUsers', user_id_list.map(id => ({
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
      SERVER.entadmin.UNLOCK_ACCOUNTS(user_id_list).then(res => {
         commit('SaveUsers', user_id_list.map(id => ({
           id,
           locked: 0
         })))
         resolve()

       }).catch(reject)
     })
  },
  DeleteUser({commit},id){
    return new Promise((resolve, reject) => {
      SERVER.entadmin.DELETE_EMPLOYEES({param:id}).then(res => {
        commit('SaveUser', id)
        resolve(user)
      }).catch(e => {
        reject(e)
      })
    })
  },
  PatchUser({
      commit
    }, e) {
    return new Promise((resolve,reject)=>{
      if(e.id){
         SERVER.entadmin.PATCH_EMPLOYEES(e,{param:{id:e.id}}).then(res => {
           let user = Object.assign({}, e, res.data.data)
           commit('SaveUser', user)
           resolve(user)
         }).catch(e => {
           reject(e)
         })
      }else{
         SERVER.entadmin.POST_EMPLOYEES(e).then(res => {
           let user = Object.assign({}, e, res.data.data)
           commit('SaveUser', user)
           resolve(user)
         }).catch(e => {
           reject(e)
         })
      }
    })
  }

}

const mutations = {
  init(state,api){
    SERVER = api
  },
  SaveUsers(state, users) {
    UTIL.LocalSaveItems(state, 'users', users)
  },
  SaveUser(state,user){
    UTIL.LocalSaveItems(state,'users',[user])
  },
  removeUser(state,id){
    UTIL.LocalDeleteItem(state,'users',id)
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
