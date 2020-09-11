/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */

const API = require('@/api')
const state = {
  users:[]
}

const getters = {
  users(state){
    return state.users
  }
}

const actions = {
  ListUsers({commit}){
    return new Promise((resolve,reject)=>{
       API.request('GET_USERS', {
          query: {
            q: 'full'
          }
       }).then(res => {
          let users = res.data.data
          commit('saveUsers', users)
          resolve()
       }).catch(reject)
    })
  },
  CreateUsers({commit},data){
    return new Promise((resolve,reject)=>{
      API.request('POST_USERS',{data}).then(res=>{
        let users = res.data.data
        users.filter(v=>v.id).forEach(u=>{
          commit('saveUser',u)
        })
        resolve(res.data.data)
      }).catch(e=>{
        if(typeof e == 'object' && e.error)
          reject(e.error)
      })
    })
  },
  PatchUser({commit},data){
    return new Promise((resolve,reject)=>{
      if(!data.id){
           API.request('POST_USER', {
             data
           }).then(res => {
             commit('saveUser',Object.assign({},data,res.data.data))
             resolve()
           }).catch(reject)
      }else{
         API.request('PATCH_USER', {
           param: {
             id: data.id
           },
           data
         }).then(res => {
           commit('saveUser', Object.assign({}, data, res.data.data))
           resolve()
         }).catch(reject)
      }
    })
  },
  LockUser({commit},id){
    return actions.PatchUser({commit},{id,state:1})
  },
  UnlockUser({commit},id){
    return actions.PatchUser({commit},{id,state:0})
  },
  ResetPassword({commit},{id,password='123456'}){
    return actions.PatchUser({commit},{id,password})
  },
  DeleteUser({commit},id){
     return new Promise((resolve, reject) => {
       API.request('DEL_USER', {
         param: {
           id
         }
       }).then(res => {
         commit('deleteUser', id)
         resolve()
       }).catch(reject)
     })
  },
  DeleteUsers({commit},ids){
    return new Promise((resolve,reject)=>{
      API.request('DEL_USERS',{
        data:ids
      }).then(res=>{
        commit('deleteUsers',ids)
        resolve()
      }).catch(reject)
    })
  }
}

const mutations = {
  saveUsers(state,users){
    state.users = users
  },
  saveUser(state,user){
    
    let index = state.users.findIndex(v=>v.id == user.id)
    if(index != -1){
      let item = Object.assign({},state.users[index],user)
      state.users.splice(index,1,item)
    }
    else
      state.users.push(user)
  },
  deleteUser(state,id){
    let index = state.users.findIndex(v => v.id == id)
    if (index != -1) {
      state.users.splice(index, 1)
    }
  },
  deleteUsers(state,ids){
    ids.forEach(v=>{
      mutations.deleteUser(state,v)
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
