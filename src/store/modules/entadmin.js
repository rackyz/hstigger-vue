
import API from '@/plugins/api'
import UTIL from '../util.js'
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
     console.log("ENT:",API)
    return new Promise((resolve,reject)=>{
      API.SERVER.entadmin.LIST_EMPLOYEES().then(res => {
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
      API.SERVER.entadmin.POST_EMPLOYEES(e).then(res=>{
        let user = Object.assign({},e,res.data.data)
        commit('SaveUser',user)
        resolve(user)
      }).catch(e=>{
        reject(e)
      })
    })
  },
  DeleteUser({commit},id){
    return new Promise((resolve, reject) => {
      API.SERVER.entadmin.DELETE_EMPLOYEES({param:id}).then(res => {
        commit('removeUser', id)
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
         API.SERVER.entadmin.PATCH_EMPLOYEES(e,{param:{id:e.id}}).then(res => {
           let user = Object.assign({}, e, res.data.data)
           commit('SaveUser', user)
           resolve(user)
         }).catch(e => {
           reject(e)
         })
      }else{
         API.SERVER.entadmin.POST_EMPLOYEES(e).then(res => {
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
