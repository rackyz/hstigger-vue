
/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */
import API from '@/plugins/axios'
import HSAPI from '@/plugins/api'
const SERVER = HSAPI.SERVER
const crypto = require('crypto')
const state = {
  session:{},
  types:[],
  users:[],
  deps:[],
  contracts:[],
  ent_types:[],
  projects:[],
  rss:[],
  isLogin:false,
  roles:[],
  my_projects:[{
    id:"123",
    code:"N2020931",
    name:"慈城高中"
  }],
  
  current_enterprise:null,
  my_enterprises:[],
  modules:[],
  acc_list: [],
  user_rss:[],
  employees:[],
  loading:false
}


const getters = {
  loading(state){
    return state.loading
  },
  isLogin(state){
    return state.isLogin
  },

  contracts(state){
    return state.contracts
  },
  getUser:(state)=>(id)=>{
    return state.users.find(v=>v.id == id)
  },
  dashboard_path(state){
    if(state.session.type == 3)
      return "/core/admin/dashboard"
    else if(state.session.type == 2)
      return  "/core/eadmin/dashboard"
    else
      return "/core/dashboard"
  },
  uid(state){
    return state.session.user_id
  },  
  username(state){
    return state.session.name
  },
  my_enterprises(state){
    return state.my_enterprises
  },
  my_projects(state) {
    return state.projects.filter(v=>v.charger == state.session.id)
  },
  current_enterprise(state){
    return state.current_enterprise
  },
  current_ent(state){
    return state.session.enterprises.find(v=>v.id == state.current_enterprise)
  },
   apps(state) {
       let o = {}
       state.modules.forEach(v => {
         if(v.disabled)
          return
         o[v.key] = Object.assign({}, v)
         o[v.key].path = o[v.key].url
       })
       return o
      },
      app_groups(state) {
          let types = getters.getTypes(state)('ModuleType') || []
          if (types) {
            state.modules.forEach(v => {
              let t = types.find(t => v.type == t.value)
              if (t) {
                if (t.subs) {
                  t.subs.push(v.key)
                } else {
                  t.subs = [v.key]
                }
              }

            })
          }
          return types
        },
  session(state){
    return state.session
  },
  projects(state){
    return state.projects
  },
  user_rss(state){
    return state.user_rss
  },
  my_rss(state){
    return state.rss.filter(v=>state.user_rss.includes(v.id))
    //return state.user_rss.map(v=>state.rss.find(r=>r.id == v)).filter(v=>v)
  },
  rss(state){
    return state.rss
  },
  acc_list(state){
    return state.acc_list
  },
  users(state){
    return state.users
  },
  employees(state){
    return state.employees
  },
  flows(state){
    return state.session.flows
  },
  my_flows(state){
    return state.session.user_flows
  },
  deps(state){
    return state.session.deps
  },
  my_deps(state){
    return state.session.my_deps
  },
  my_tasks(state) {
    return state.session.my_tasks
  },
  roles(state){
    return state.session.roles
  },
  my_roles(state){
    return state.session.my_roles
  },
  settings(state){
    return state.session.settings
  },
  get_project:(state)=>(id)=>{
    if(Array.isArray(state.projects))
      return state.projects.find(v=>v.id == id) || {}
    else
      return {}
  },
  enterprises(state){
    return state.session.enterprises
  },
  _get_flow_dep_manager:state=>dep_id=>{
    if(dep_id == 0)
      return ['ed49e690-3b83-11eb-8e1e-c15d5c7db744']
    else if (dep_id == 1) //房建：章建良 李增义 汤海平
      return ['ed4a8300-3b83-11eb-8e1e-c15d5c7db744', 'ed4a34b4-3b83-11eb-8e1e-c15d5c7db744', 'b8cabcb0-4014-11eb-813c-c1c9b9ee54e7']
    else if (dep_id == 2) //市政： 王勤轰 玄先涛 庄辉
      return ['ed4a5be7-3b83-11eb-8e1e-c15d5c7db744', 'ed4a5c0b-3b83-11eb-8e1e-c15d5c7db744', 'ed4a82f9-3b83-11eb-8e1e-c15d5c7db744']
    else if (dep_id == 3) //管理： 顾震 刘勇 吴献国
      return ['ed49e6d0-3b83-11eb-8e1e-c15d5c7db744', 'ed4a34be-3b83-11eb-8e1e-c15d5c7db744', 'ed4a5bf7-3b83-11eb-8e1e-c15d5c7db744']
    else if(dep_id == 4)  // 装修
      return ['ed4a82fb-3b83-11eb-8e1e-c15d5c7db744']
    else if(dep_id == 5) // 造价 钱敏
      return ['ed4a8301-3b83-11eb-8e1e-c15d5c7db744']
    else if(dep_id == 6) // BIM
      return ['ed49e690-3b83-11eb-8e1e-c15d5c7db744']
      
      
      //BIM：詹红岩
      //造价： 钱敏
      //装修： 竺家君
      //行政： 詹红岩
  },
  getTypes:(state)=>key=>{
    if(!state.types && !state.ent_types)
      return []

    let typeRoot = state.ent_types.find(v => v.key == key)
    if (typeRoot)
      return state.ent_types.filter(v => v.parent_id == typeRoot.id)
    else {
      typeRoot = state.types.find(v => v.key == key)
      if (typeRoot)
        return state.types.filter(v => v.parent_id == typeRoot.id)
      else {
        return []
      }
    }
    },
    getType:(state)=>id=>{
      return state.types.find(v=>v.id == id)
    },
     getTypesByKey: (state) => key => {
       let type = state.types.find(v=>v.key == key)
       if(type)
        return state.types.filter(v => v.parent_id == type.id)
      else
        return []
     },
    types(state){
        return state.types
    },
    keys(state){
        return state.types.map(v=>v.key)
    },
  getRoles: state => type_id => {
    return state.roles.filter(v => v.type_id == type_id)
  },
  getDep:state=>id=>{
    return state.deps.find(v=>v.id) || {}
  },
  getTypeById:state=>(id)=>{
    return state.types.find(v=>v.id == id) || {}
  },
  getTypeByValue:state=>(key,val)=>{
    return getters.getTypes(state)(key).find(v=>v.value == val) || {}
  }
}

const actions = {
  init({commit}){
    return new Promise((resolve,reject)=>{
      commit('init')
    })
  },
  update_tasks({commit},data){
    return new Promise((resolve,reject)=>{
      commit('update_my_tasks',data)
      resolve()
    })
  },
  auth({state},path){
    console.log("AUTHED:",path,state)
    return new Promise((resolve,reject)=>{
      if (path.indexOf("/core/admin") == 0) {
        if (state.session.type != 3)
            resolve(false)
        
      }else if(path.indexOf("/core/eadmin") == 0){
        if(state.session.type != 2)
          resolve(false)
      }

      resolve(true)
    })
  },
  debug_change_user({commit},id){
    return new Promise((resolve,reject)=>{
      API.CORE.DEBUG_CHANGE_USER({id}).then(res=>{
        let session = res.data.data
          commit('login')
         commit('save', session)
         commit('saveAcc', session.user_menus)
          let enterprise_id = localStorage.getItem('current_enterprise')
         if (!enterprise_id || session.enterprises.find(v => v.id == enterprise_id) == null)
           commit('ClearEnterprise')

         resolve(session)
      }).catch(reject)
    })
  },
  whoami({commit,dispatch},e){
    let token = localStorage.getItem('hs-token')
    let enterprise_id = e || localStorage.getItem('current_enterprise')
  
    commit('SetCurrentEnterprise',enterprise_id)
    return new Promise((resolve,reject)=>{
      if(!token)
        reject()
      let data = {}
      let headers = {
        Authorization: token
      }
      if (process.env.VUE_APP_MOCK)
        data.token = token
      API.CORE.WHO_IS({headers}).then(res => {
        let session = res.data.data
        commit('login')
        commit('save', session)
        commit('saveAcc',session.user_menus)
        if (enterprise_id && enterprise_id != "self" && session.enterprises.find(v => v.id == enterprise_id) == null)
          commit('ClearEnterprise')
        else if(!enterprise_id && session.my_enterprises.length > 0){
          commit('SetCurrentEnterprise',session.my_enterprises[0])
          dispatch('whoami')
        }
        resolve(session)
      }).catch(reject)
    })
  },
  SetCurrentEnterprise({
      commit
    }, ent_id) {
    return new Promise((resolve,reject)=>{
      commit('SetCurrentEnterprise', ent_id)
      resolve()
    })
  },
  
  login({commit},{user,password}){
    var md5 = crypto.createHash("md5")
    md5.update(password)
    password = md5.digest('hex')
    localStorage.removeItem('hs-token')
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
      API.CORE.LOGOUT().then(res=>{
        commit('logout')
        resolve()
      })
      
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
  update_my_tasks(state,data){
    if(data &&data.id)
    {
      let index = state.session.my_tasks.findIndex(e=>e.id == data.id)
      if(index == -1)
        return
      let newItem = Object.assign({}, state.session.my_tasks[index], data)
      state.session.my_tasks.splice(index, 1, newItem)

    }

  },
  init(state){
    state = {
      session: {},
      types: [],
      users: [],
      deps: [],
      rss: [],
      isLogin: false,
      roles: [],
      my_projects: [{
        id: "123",
        code: "N2020931",
        name: "慈城高中"
      }],

      current_enterprise: null,
      my_enterprises: [],
      modules: [],
      acc_list: [],
      ent_types:[],
      user_rss: [],
      loading: false
    }
  },
  SetLocalRss(state,list){
    state.rss = list
    state.my_rss.sort((a,b)=>{
      let aIndex = list.findIndex(v=>v.id == a)
      let bIndex =list.findIndex(v=>v.id == b)
      return aIndex > bIndex ? 1:-1
    })
  },
  login(state){
    state.isLogin = true
  },
  toggleRss(state,key){
    let rss = state.user_rss
    let index = rss.findIndex(v=>v == key)
    if(index != -1)
      rss.splice(index,1)
    else
      rss.push(key)
  },
  SetCurrentEnterprise(state, ent_id) {
    if(ent_id && ent_id != 'self'){
      API.CORE.SetEnterprise(ent_id)
      SERVER.SetEnterprise(ent_id)
      API.ENT.SetEnterprise(ent_id)
      API.ENT_ADMIN.SetEnterprise(ent_id)
      localStorage.setItem('current_enterprise',ent_id)
      
      state.current_enterprise = ent_id
    }else{
      mutations.ClearEnterprise(state)
      state.current_enterprise = 'self'
    }
  },
  ClearEnterprise(state){
    API.CORE.ClearEnterprise()
    SERVER.ClearEnterprise()
    API.ENT.ClearEnterprise()
    API.ENT_ADMIN.ClearEnterprise()
    localStorage.removeItem('current_enterprise')
    state.current_enterprise = null
  },
  save(state,session){
    API.CORE.SetAuthorization(session.token)
    SERVER.SetAuthorization(session.token)
    API.ENT.SetAuthorization(session.token)
    if (session.isAdmin)
      API.ADMIN.SetAuthorization(session.token)
    
    if(session.isEntAdmin)
      API.ENT_ADMIN.SetAuthorization(session.token)

    localStorage.setItem('hs-token',session.token)
    state.session = session
     state.types = session.types //SaveTypes(session.types)
    state.users = session.users
    state.modules = session.modules
    state.employees = session.employees
    state.projects = session.projects
    state.contracts = session.contracts
    state.rss = session.rss
    state.ent_types = session.ent_types
    state.user_rss = Array.isArray(state.rss) ? state.rss.map(v => v.id):[]
    if (Array.isArray(session.my_enterprises))
      return state.my_enterprises = session.my_enterprises.map(
        v => session.enterprises.find(e => e && e.id == v))
   
    // state.projects = session.projects
    // state.deps.forEach(v=>v.list = state.users.find(u=>Array.isArray(u.deps)?u.deps.includes(v):null))  
  },
  logout(state){
     state.isLogin = false
    state.session = {}
    mutations.init(state)
    SERVER.Clear()
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
  saveUserinfo:(state,userinfo)=>{
   Object.assign(state.session,userinfo) 
  },
  saveProject:(state,project)=>{
    let index = state.projects.findIndex(v=>v.id == project.id)
    if(index == -1)
      state.projects.push(project)
    else
      state.projects.splice(index,1,project)
  },
  delProject:(state,project_id)=>{
    let index = state.projects.findIndex(v => v.id == project_id)
    if(index != -1)
      state.projects.splice(index,1)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
