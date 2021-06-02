import API from '@/plugins/axios'
import HSAPI from '@/plugins/api'
const SERVER = HSAPI.SERVER
const crypto = require('crypto')
const state = {
  item:{}
}

const getters = {
  item(state){
    return state.item
  }
}

const actions = {
  get_data({commit,rootState},id){
    console.log(rootState.API)
    rootState.API.enterprise.GET_TRAININGS({param:{id}}).then(res=>{
      commit('save_data',res.data.data)
    })
  }
}

const mutations = {
  save_data(state,item){
    state.item = item
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
