

import UTIL from '../util.js'
var SERVER = {}
const state = {
  users:[],
  enterprises:[],
  deps:[],
  roles:[]
}

const getters = {
  users(state){
    return state.users
  },
  deps(state){
    return state.deps
  },
  roles(state){
    return state.roles
  }
}

const actions = {
  GetUsers({commit}){
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.LIST_EMPLOYEES().then(res => {
        let users = res.data.data
        commit('SaveUsers',users)
        resolve(users)
      }).catch(reject)
    })
  },
  GetDeps({commit}){
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.LIST_DEPS().then(res=>{
        let deps = res.data.data
        commit('SaveDeps',deps)
        resolve(deps)
      }).catch(reject)
    })
  },
  GetRoles({commit}){
      return new Promise((resolve, reject) => {
        SERVER.entadmin.LIST_ROLES().then(res => {
          let items = res.data.data
          commit('SaveRoles', items)
          resolve(items)
        }).catch(reject)
      })
  },
  CreateRole({
    commit
  }, item) {
    return new Promise((resolve, reject) => {
      SERVER.entadmin.POST_ROLES(item).then(res => {
        item = Object.assign({}, item, res.data.data)
        commit('SaveRoles', [item])
        resolve(item)
      }).catch(reject)
    })
  },
  RemoveRole({
      commit
    }, item_id) {
      return new Promise((resolve, reject) => {
        SERVER.entadmin.DELETE_ROLES({
          param: {
            id:item_id
          }
        }).then(res => {
         
          commit('ReomveRoles', [item_id])
           resolve()
        }).catch(reject)
      })
    },
    PatchRole({
      commit
    }, item) {
        
      if (item.id) {
        return new Promise((resolve, reject) => {
        let id = item.id
        delete item.id

        SERVER.entadmin.PATCH_ROLES(item, {
          param: {
            id
          }
        }).then(res => {
           item = Object.assign({}, item, res.data.data)
           item.id = id
          commit("SaveRoles", [item])
          resolve()
        }).catch(reject)
        })
      }else{
        return actions.CreateRole({commit},item)
      }
      
    },
  CreateDep({commit},dep){
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.POST_DEPS(dep).then(res=>{
        dep = Object.assign({},dep,res.data.data)
        commit('SaveDeps',[dep])
        resolve(dep)
      }).catch(reject)
    })
  },
  RemoveDep({commit},dep_id){
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.DELETE_DEPS({param:{id:dep_id}}).then(res=>{
        commit('RemoveDeps',[dep_id])
        resolve()
      }).catch(reject)
    })
  },
  PatchDep({commit},dep){
    return new Promise((resolve,reject)=>{
       if (dep.id) {
         let id = dep.id
         delete dep.id
         SERVER.entadmin.PATCH_DEPS(data, {
           param: {
             id
           }
         }).then(res => {
            dep.id = dep
           commit("SaveDeps", [dep])
         }).catch(reject)
       } else {
         actions.CreateDep({
           commit
         }, dep)
       }
       resolve(dep)
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
  PatchUserDeps({commit},{id,deps}){
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.PATCH_USER_DEPS(deps,{param:{id}}).then(res=>{
        commit('SaveUser',{id,deps})
        resolve()
      }).catch(e=>{
      reject(e)
      })
    })
  },
  PatchUserRoles({commit},{id,roles}){
    return new Promise((resolve,reject)=>{
      SERVER.entadmin.PATCH_USER_ROLES(roles,{param:{id}}).then(res=>{
        commit('SaveUser',{id,roles})
        resolve()
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
  },
  SaveDeps(state,deps){
    UTIL.LocalSaveItems(state,'deps',deps)
  },
  RemoveDeps(state,dep_ids){
    UTIL.LocalDeleteItems(state,"deps",dep_ids)
  },
  RemoveRoles(state, id_list) {
    UTIL.LocalDeleteItems(state, "roles", id_list)
  },
   SaveRoles(state, items) {
     UTIL.LocalSaveItems(state, "roles", items)
   }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
