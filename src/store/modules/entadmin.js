
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
      })
    })
  }

}

const mutations = {
  SaveUsers(state,users){
    state.users = users
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
