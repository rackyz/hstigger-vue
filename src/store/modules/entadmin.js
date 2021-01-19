
import API from '@/plugins/axios'
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
    return new Promise((resolve,reject)=>{
      API.ENT_ADMIN.GET_USERS().then(res=>{
        let users = res.data.data
        commit('SaveUsers',users)
        resolve(users)
      })
    })
  },
  CreateEmployee(e){
    return new Promise((resolve,reject)=>{
      API.ENT_ADMIN.POST_USER(e).then(res=>{
        let user = Object.assign({},e,res.data.data)
        commit('SaveUser',user)
        resolve(user)
      }).catch(e=>{
        reject(e)
      })
    })
  }

}

const mutations = {
  SaveUsers(state,users){
    state.users = users
  },
  SaveUser(state,user){
    let index = state.users.findIndex(u=>u.id == user.id)
    if(index != -1)
      state.users.splice(index,1,user)
    else
      state.users.splice(0,user)
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
