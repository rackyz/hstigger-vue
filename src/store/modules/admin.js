/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */

const API = require('@/api')
const state = {
  users:[],
  deps:[],
  roles:[],
}

const getters = {
  users(state){
    return state.users
  },
  roles(state){
    return state.roles
  },
  deps(state){
    return state.deps
  },
  getRoles: state => type_id => {
    return state.roles.filter(v => v.type_id == type_id)
  },
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
  },

  // ROLE
  queryRoles:({commit})=>{
    return new Promise((resolve,reject)=>{
      return API.request('GET_ROLES').then(res=>{
        let items = res.data.data
        commit('saveRoles', items)
        resolve()
      }).catch(reject)
    })
  },
    patchRole: ({
      commit
    }, item) => {
      return new Promise((resolve, reject) => {
        let role = {
          icon: item.icon,
          type_id: item.type_id,
          name: item.name,
          color: item.color,
          desc: item.desc
        }
        if (item.id) {
          let id = item.id
          return API.request('UPDATE_ROLE', {param:{id},data:role}).then(res => {
            commit('saveRole')
            resolve()
          }).catch(reject)
        }else{
          return API.request('CREATE_ROLE',{data:role}).then(res=>{
            let updateInfo = res.data.data
            Object.assign(item, updateInfo)
            commit('saveRole', item)
            resolve()
          }).catch(reject)
        }

      })
    },

    // LOGS
    queryLogs({commit}){
      return new Promise((resolve,reject)=>{
        return API.request('GET_LOGS').then(res=>{
          commit('saveLogs',r)
        })
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
  },
  saveRoles(state, items) {
    state.roles = items
  },
  saveRole(state, role) {
     let index = state.roles.findIndex(v => v.id == role.id)
     if (index != -1) {
       let item = Object.assign({}, state.roles[index], role)
       state.roles.splice(index, 1, item)
     } else
       state.roles.push(role)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
