
/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */
import API from '@/plugins/axios'
const crypto = require('crypto')
const state = {
  session:{},
  types:[],
  users:[],
  deps:[],
  isLogin:false,
  roles:[],
  projects:[],
  current_enterprise:null,
  my_enterprises:[],
  modules:[],
  apps:{
    
    "task":{
      key:'task',
      name:'任务与计划',
      path:'/app/task',
      version:'1.0.0',
       dev: true
    },
    "archive": {
      key: 'archive',
      name: '资料库',
      path: '/app/task',
      version: '1.0.0',
       dev: true
    },
    "disk":{
      key:'disk',
      name:"网络硬盘",
      path:'/app/disk',
      version:'1.0.0',
       dev: true
    },
    "projects":{
      key:'projects',
      name:'营业综合',
      path:'/core/bi/panel',
      version:'2.0.0'
    },
    "charts":{
      key:'projects',
      name:'图表分析',
      path:'/core/bi/chart',
      version:'2.0.0'
    },
    "data":{
      key:'projects',
      name:'数据分析',
      path:'/core/bi/dataanalysize',
      version:'2.0.0'
    },
    "admin":{
      key:"admin",
      name:"后台管理",
      path:"/core/admin",
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
       dev: true
    },
    "dep-chief-engineer": {
      key: 'dep-chief-engineer',
      name: "总师部",
      path: '/app/dep-chief-engineer',
      version: '1.0.0',
       dev: true
    },
    "depFinance": {
      key: 'depFinance',
      name: "财务室",
      path: '/core/fi/dashboard',
      version: '1.0.0',
    },
    "depManagement": {
      key: 'depManagement',
      name: "经营部",
      path: '/app/dep-management',
      version: '1.0.0',
       dev: true
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
      name:'业务模块',
      icon:'xiangmu1',
      subs: ['projects','charts','data'
      ]
    },
    {
      name:'行政综合',
      icon:'jinxingzhong',
      subs:['meeting-room-reservation']
    },
    {
      name:'财务报销',
      icon:'money',
      subs:['project-bill','claim-back','fi-report']
    },{
      name:"系统配置",
      icon:'parameter',
      subs:['admin','it-request']
    }
  ],
  acc_list: []
}


const getters = {
  isLogin(state){
    return state.isLogin
  },
  my_enterprises(state){
    return state.my_enterprises
  },
  current_enterprise(state){
    return state.current_enterprise
  },
  session(state){
    return state.session
  },
  apps(state){
    let o = {}
    state.modules.forEach(v=>{
      o[v.key] = Object.assign({},v)
      o[v.key].path = o[v.key].url
    })
    return o
  },
  app_groups(state){
    let types =  getters.getTypes(state)('ModuleType') || []
    if(types){
    state.modules.forEach(v=>{
      let t = types.find(t=>v.type == t.value)
      if(t){
        if(t.subs){
          t.subs.push(v.key)
        }else{
          t.subs = [v.key]
        }
      }

    })
  }
    return types
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
  projects(){
    return state.projects
  },
  getTypes:(state)=>key=>{
    let typeRoot = state.types.find(v=>v.key == key)
    if(typeRoot)
        return state.types.filter(v=>v.parent_id == typeRoot.id)
    else{
      console.error("KEY is not exist:",key)
      return []
    }
    },
     getTypesByID: (state) => id => {
        return state.types.filter(v => v.parent_id == id)
     },
    types(state){
        return state.types
    },
    keys(state){
        return state.types.filter(v=>v.key)
    },
  getRoles: state => type_id => {
    return state.roles.filter(v => v.type_id == type_id)
  },
}

const actions = {
  whoami({commit,dispatch}){
    let token = localStorage.getItem('hs-token')
    return new Promise((resolve,reject)=>{
      if(!token)
        reject()
      let data = {}
      let headers = {
        Authorization: token
      }
      if (process.env.VUE_APP_MOCK)
        data.token = token

      let current_enterprise_id = localStorage.getItem('current_enterprise')
      
     

      API.CORE.WHO_IS({headers}).then(res => {
        let session = res.data.data
        console.log('WHOAMI-session:',session)
        commit('login')
        commit('save', session)
        commit('saveAcc',session.user_menus)
        if (!current_enterprise_id || session.enterprises.find(v => v.id == current_enterprise_id) == null)
          if(session.my_enterprises.length > 0)
            current_enterprise_id = session.my_enterprises[0]

        dispatch('SetCurrentEnterprise', current_enterprise_id)
        resolve(session)
      }).catch(reject)
    })
  },
  SetCurrentEnterprise({
      commit
    }, ent_id) {
    return new Promise((resolve,reject)=>{
      API.CORE.SetEnterprise(ent_id)
      commit('SetCurrentEnterprise', ent_id)
      resolve()
    })
  },
  login({commit},{user,password}){
    var md5 = crypto.createHash("md5")
    md5.update(password)
    password = md5.digest('hex')
    localStorage.removeItem('hs-token')
    localStorage.removeItem('hs-enterprise')
    API.CORE.Clear()
    return new Promise((resolve, reject) => {
       API.CORE.LOGIN({
             account:user,
             password
           }).then(res => {
          let session = res.data.data
          localStorage.setItem('hs-token', session.token)
          commit('login')
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
      API.CORE.SAVE_ACCELERATES({value:acc_list}).then(res=>{
          commit('saveAcc', acc_list)
          resolve()
      }).catch(reject)
    })
   
  },
  GetUsers({commit}){
    return new Promise((resolve,reject)=>{
      API.CORE.GET_USERS().then(res=>{
        commit('saveUsers',res.data.data)
        resolve()
      }).catch(reject)
    })
  },
  Patch({commit},item){
    return new Promise((resolve,reject)=>{
        if(item.id){
              return API.CORE.PATCH_TYPE(item,{param:{id}}).then(res => {
                  let udpateInfo = res.data.data
                  if (udpateInfo)
                      Object.assign(item, udpateInfo)
                  commit('localPatchType', item)
                  resolve(item)
              }).catch(reject)
        }else{
             return API.CORE.POST_TYPE(item).then(res => {
                 let udpateInfo = res.data.data
                 Object.assign(item, udpateInfo)
                 commit('localPatchType', item)
                 resolve(item)
             }).catch(reject)
        }
    })
},
Delete({commit},ids){
    let idlist = ids.join(',')
    return new Promise((resolve,reject)=>{
        return API.CORE.DEL_TYPES({param:{id:idlist}}).then(res => {
            commit('localDeleteType', ids)
            resolve(ids)
        }).catch(reject)
    })
},
  addConcernProject: ({
    commit
  }, project_ids) => {
      return new Promise((resolve, reject) => {
          API.CORE.ADD_CONCERN_PROJECTS(project_ids).then(profile => {
              commit('AddConcernProjects', project_ids)
              resolve()
          }).catch(e => {
              reject(e)
          })
      })
  },
  removeConcernProject: ({
      commit
  }, project_ids) => {
      return new Promise((resolve, reject) => {
        API.CORE.DEL_CONCERN_PROJECTS(project_ids).then(profile => {
              commit('DelConcernProjects', project_ids)
              resolve()
          }).catch(e => {
              reject(e)
          })
      })
  },
  resetConcernProject: ({
      commit
  }, project_ids) => {
      return new Promise((resolve, reject) => {
        API.CORE.RESET_CONCERN_PROJECTS(project_ids).then(profile => {
              commit('ResetConcernProject', project_ids)
              resolve()
          }).catch(e => {
              reject(e)
          })
      })
  },
}

const SaveTypes = data=>{
   data.forEach(v => {
     v.count = 0
   })
   data.forEach(v => {
     if (v.parent_id) {
       let t = data.find(x => x.id == v.parent_id)
       if (t)
         t.count++
     }
   })
   return data
}

const mutations = {
  login(state){
    state.isLogin = true
  },
  SetCurrentEnterprise(state, ent_id) {
   
    localStorage.setItem('current_enterprise',ent_id)
    state.current_enterprise = ent_id
  },
  save(state,session){
    API.CORE.SetAuthorization(session.token)
    localStorage.setItem('hs-token',session.token)
    state.session = session
     state.types = session.types //SaveTypes(session.types)
    state.users = session.users
    state.modules = session.modules
    if (Array.isArray(session.my_enterprises))
      return state.my_enterprises = session.my_enterprises.map(
        v => session.enterprises.find(e => e && e.id == v))
   
    // state.projects = session.projects
    // state.deps.forEach(v=>v.list = state.users.find(u=>Array.isArray(u.deps)?u.deps.includes(v):null))  
  },
  logout(state){
     state.isLogin = false
    state.session = {}
    localStorage.removeItem('hs-token')
  },
  saveAcc(state, acc_list) {
    state.acc_list = [...acc_list]
  },
  saveUsers(state,users){
    state.users = users
  },
  localPatchTypes(state,item){
       

    let index = state.types.findIndex(v=>v.id == item.id)
    if(index != -1){
        item = Object.assign({}, state.types[index], item)
        state.types.splice(index, 1, item)
    }
    else{
        state.types.splice(state.types.length - 1, 0, item)
        if (item && item.parent_id) {
            let index = state.types.findIndex(v => v.id == item.parent_id)
            if (index != -1) {
                state.types[index].count++
            }
        }
    }
},
localDeleteTypes(state,ids){
    ids.forEach(id=>{
         let index = state.types.findIndex(v => v.id == id)
         if (index != -1)
             state.types.splice(index, 1)
    })
   
},

  // Concerned Projects
  AddConcernProjects: (state, ids = []) => {
    state.session.concerned = state.session.concerned.concat(ids)
    let session = Object.assign({}, state.session)
    state.session = session

  },
  DelConcernProjects: (state, ids = []) => {
      ids.forEach(v => {
          let index = state.session.concerned.findIndex(s => s == v)
          if (index != -1)
              state.session.concerned.splice(index, 1)
      })
      let session = Object.assign({}, state.session)
      state.session = session
  },
  ResetConcernProject: (state, ids = []) => {
      state.session.concerned = ids
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
