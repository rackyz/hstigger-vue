const state = {
  dep:{

  }
}

const getters = {
  dep(state){
    return state.dep
  }
}

const mutations = {
  save(state,item){
    state.dep = item
  }
}

const actions = {
  getData({commit,rootState},dep_id){
    return new Promise((resolve,reject)=>{
      rootState.API.enterprise.GET_DEPS({param:{id:dep_id}}).then(res=>{
        let data = res.data.data
        commit('save',data)
        resolve(data)
      })
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