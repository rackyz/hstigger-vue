
/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */

const API = require('@/api')
const crypto = require('crypto')
const state = {
  session:{},
  types:[],
  app_groups: [
    {
      name:'财务管理',
      icon:'ios-dollar',
      subs:[{
        name:'小微项目票据管理',
        path:'/tiny-project-bill'
      }]
    }
  ]
}


const getters = {
  session(state){
    return state.session
  },
  app_groups(state){
    return state.app_groups
  }
}

const actions = {
  whoami({commit}){
    let token = localStorage.getItem('token')
    return new Promise((resolve,reject)=>{
      API.request('WHO_IS',{},{Authentication:token}).then(res=>{
        let session = res.data.data
        commit('save', session)
        resolve(session)
      }).catch(reject)
    })
  },
  login({commit},{account,password}){
     var md5 = crypto.createHash("md5")
     md5.update(password)
     password = md5.digest('hex')
     console.log("md5:",password)

    return new Promise((resolve, reject) => {
       API.request('LOGIN', {
           data: {
             account,
             password
           }
         }).then(res => {
          let session = res.data.data
          commit('save',session)
          resolve(session)
       }).catch(reject)
    })
  }
}

const mutations = {
  save(state,session){
    state.session = session
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
