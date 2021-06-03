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
  },
  enable_join({commit,rootState},id){
    rootState.API.enterprise.PATCH_TRAININGS(null, {
      param: {
        id
      },
      query: {
        q: 'enable_join'
      }
    }).then(res=>{
      commit('update_date', {
        id,
        enable_join: true
      })
    })
  },
   disable_join({
     commit,
     rootState
   }, id) {
     rootState.API.enterprise.PATCH_TRAININGS(null, {
       param: {
         id
       },
       query: {
         q: 'disable_join'
       }
     }).then(res => {
       commit('update_date', {
         id,
         enable_join: false
       })
     })
   }
}

const mutations = {
  save_data(state,item){
    state.item = item
  },
  update_date(state,item){
    state.item = Object.assign(state.item,item)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
