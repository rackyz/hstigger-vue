
/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */

import { resolve } from 'path'

const API = require('@/api')
const crypto = require('crypto')
const state = {
  session:{},
  types:[],
  apps:{
    "meeting-room-reservation":{
      key: "meeting-room-reservation",
      name:'会议室预约',
      path: '/app/meeting-room-reservation',
      version:'1.0.4',
      dev: true
    },
    "tiny-project-bill": {
      key: "tiny-project-bill",
      name: '小微项目票据管理',
      path: '/app/tiny-project-bill',
      version: '1.0.0'
    },
    "project-bill":{
      key: "project-bill",
      name:"开票管理",
      path:'/app/tiny-project-bill',
      version:'1.0.0',
      dev: true
    },
    "claim-back": {
      key: "claim-back",
      name: "报销管理",
      path: '/app/tiny-project-bill',
      version: '1.0.0',
      dev: true
    },
    "fi-report":{
      key: "fi-report",
      name: "财务综合报表",
      path: '/app/tiny-project-bill',
      version: '1.0.0',
      dev: true
    },
    "task":{
      key:'task',
      name:'工作流',
      path:'/app/task',
      version:'1.0.0'
    },
    "archive": {
      key: 'archive',
      name: '档案管理',
      path: '/app/task',
      version: '1.0.0',
      dev: true
    },
    "projects":{
      key:'projects',
      name:'项目综合管理',
      path:'/app/projects',
      version:'2.0.0',
      dev: true
    },
    "it-projects":{
      key:"it-projects",
      name:'开发项目管理',
      path:'/app/it-projects',
      version:'1.0.0',
      dev: true
    },
    "it-request":{
      key:'it-request',
      name:"需求工单",
      path:'/app/it-request',
      version:'1.0.0',
      dev:true
    }
  },
  app_groups: [
    {
      name:"通用模块",
      icon:'supervisor',
      subs: ['task','archive']
    },
    {
      name:'工程项目管理',
      icon:'xiangmu1',
      subs:['projects']
    },
    {
      name:'行政管理',
      icon:'jinxingzhong',
      subs:['meeting-room-reservation']
    },
    {
      name:'财务管理',
      icon:'money',
      subs:['project-bill','tiny-project-bill','claim-back','fi-report']
    },{
      name:"开发管理",
      icon:'parameter',
      subs:['it-projects','it-request']
    }
  ],
  acc_list: []
}


const getters = {
  session(state){
    return state.session
  },
  apps(state){
    return state.apps
  },
  app_groups(state){
    return state.app_groups
  },
  acc_list(state){
    return state.acc_list
  }
}

const actions = {
  whoami({commit}){
    let token = localStorage.getItem('hs-token')
    return new Promise((resolve,reject)=>{
      if(!token)
        reject()
      let data = {}
      let headers = {
        Authentication: token
      }
      if (process.env.VUE_APP_MOCK)
        data.token = token
      API.request('WHO_IS', {data,headers}).then(res => {
        let session = res.data.data
        commit('save', session)
        resolve(session)
      }).catch(reject)
    })
  },
  login({commit},{user,password}){
     var md5 = crypto.createHash("md5")
     md5.update(password)
     password = md5.digest('hex')
     console.log("md5:",password)

    return new Promise((resolve, reject) => {
       API.request('LOGIN', {
           data: {
             user,
             password
           }
         }).then(res => {
          let session = res.data.data
          commit('save',session)
          resolve(session)
       }).catch(reject)
    })
  },
  logout({commit}){
    return new Promise((resolve,reject)=>{
      commit('logout')
      resolve()
    })
  },
  saveAcc({commit},acc_list){
    // REMOTE 
    return new Promise((resolve,reject)=>{
       commit('saveAcc', acc_list)
       resolve()
    })
   
  }
}

const mutations = {
  save(state,session){
    localStorage.setItem('hs-token',session.id)
    state.session = session
  },
  logout(state){
    state.session = {}
    localStorage.removeItem('hs-token')
  },
  saveAcc(state, acc_list) {
    console.log('save_list',acc_list)
    state.acc_list = [...acc_list]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
