import API from '@/plugins/axios'
import HSAPI from '@/plugins/api'
const moment = require('moment')
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
    rootState.API.enterprise.GET_TRAININGS({param:{id}}).then(res=>{
      commit('save_data',res.data.data)
    })
  },
  patch({commit,rootState},{id,data}){
     rootState.API.enterprise.PATCH_TRAININGS(data,{
       param: {
         id
       }
     }).then(res => {
       commit('update_date', data)
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

const SetTrainingStateFromDuratin = (item={})=>{
  let now = moment()
  if(item.started_at){
    if (now.isAfter(moment(item.started_at))) {
      if(item.finished_at){
        if (now.isAfter(moment(item.finished_at))){
          item.stateText = '已结束'
          item.stateColor = 'red'
          return
        }  
      }
      item.stateText = '疯狂进行中'
      item.stateColor = 'orange'
      
    }else{
      item.stateText = '火热报名中'
      item.stateColor = 'green'
    }
  }else{
    item.stateText = '准备中'
    item.stateColor = '#333'
  }

}

const mutations = {
  save_data(state,item){
    SetTrainingStateFromDuratin(item)
    state.item = item
  },
  update_date(state,item){
    
    let newItem = Object.assign(state.item, item)
    SetTrainingStateFromDuratin(newItem)
    state.item = newItem
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
