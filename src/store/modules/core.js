
/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */

const API = require('@/api')
const crypto = require('crypto')
const state = {
  session:{},
  types:[],
  users:[],
  deps:[],
  roles:[],
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
      name: '小微项目管理',
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
    "notice": {
      key: 'notice',
      name: '通知',
      path: '/app/notice',
      version: '1.0.0'
    },
    "meeting": {
      key: 'meeting',
      name: '会议记录',
      path: '/app/meeting',
      version: '1.0.0'
    },
    "archive": {
      key: 'archive',
      name: '档案管理',
      path: '/app/task',
      version: '1.0.0',
      dev: true
    },
    "disk":{
      key:'disk',
      name:"临时文件存储",
      path:'/app/disk',
      version:'1.0.0'
    },
    "projects":{
      key:'projects',
      name:' 工程项目管理',
      path:'/app/projects',
      version:'2.0.0',
      dev: true
    },
    "admin":{
      key:"admin",
      name:"后台管理",
      path:"/core/admin",
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
    },
    "depEarly": {
      key: 'depEarly',
      name: "前期部",
      path: '/app/dep-early',
      version: '1.0.0',
    },
    "dep-chief-engineer": {
      key: 'dep-chief-engineer',
      name: "总师部",
      path: '/app/dep-chief-engineer',
      version: '1.0.0',
    },
    "depFinance": {
      key: 'depFinance',
      name: "财务室内",
      path: '/app/dep-finance',
      version: '1.0.0',
    },
    "depManagement": {
      key: 'depManagement',
      name: "经营部",
      path: '/app/dep-management',
      version: '1.0.0',
    }
  },
  app_groups: [
    {
      name:"通用模块",
      icon:'supervisor',
      subs: ['notice', 'task', 'meeting','disk', 'archive']
    },
    {
      name:"部门模块",
      icon:'depart',
      subs: ['depCEO','depChiefEngineer',
        'depEarly', 'depFinance', 'depManagement'
      ]
    },
    {
      name:'总控',
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
      name:"开发与后台管理",
      icon:'parameter',
      subs:['admin','it-projects','it-request']
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
  },
  users(state){
    return state.users
  },
  deps(state){
    return state.deps
  },
  roles(state){
    return state.roles
  },
}

const actions = {
  whoami({commit}){
    let token = localStorage.getItem('hs-token')
    console.log('token:',token)
    return new Promise((resolve,reject)=>{
      if(!token)
        reject()
      let data = {}
      let headers = {
        Authorization: token
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

    return new Promise((resolve, reject) => {
       API.request('LOGIN', {
           data: {
             user,
             password
           }
         }).then(res => {
          let session = res.data.data
          localStorage.setItem('hs-token', session.token)
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
      API.request('SAVE_ACCELERATES',{
        data:acc_list
      }).then(res=>{
          commit('saveAcc', acc_list)
          resolve()
      }).catch(reject)
    })
   
  },
  GetUsers({commit}){
    return new Promise((resolve,reject)=>{
      API.request('GET_USERS').then(res=>{
        commit('saveUsers',res.data.data)
        resolve()
      }).catch(reject)
    })
  }
}

const mutations = {
  save(state,session){
    API.SetAuthorization(session.token)
    localStorage.setItem('hs-token',session.token)
    
    state.session = session
    if(session.system){
      state.users = session.system.users
      state.roles = session.system.roles
      state.deps = session.system.deps
    }

    mutations.saveAcc(state,session.acclist)
  },
  logout(state){
    state.session = {}
    localStorage.removeItem('hs-token')
  },
  saveAcc(state, acc_list) {
    console.log('save_list',acc_list)
    state.acc_list = [...acc_list]
  },
  saveUsers(state,users){
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
