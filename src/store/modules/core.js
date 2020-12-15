
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
  rss:[],
  isLogin:false,
  roles:[],
  projects:[],
  current_enterprise:null,
  my_enterprises:[],
  modules:[],
  acc_list: [],
  user_rss:[]
}


const getters = {
  isLogin(state){
    return state.isLogin
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
  projects(state){
    return state.session.my_projects
  },
  current_enterprise(state){
    return state.current_enterprise
  },
   apps(state) {
       let o = {}
       state.modules.forEach(v => {
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
  user_rss(state){
    return state.user_rss
  },
  my_rss(state){
    return state.rss.filter(v=>state.user_rss.includes(v.id))
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
  flows(state){
    return state.session.flows
  },
  my_flows(state){
    return state.session.user_flows
  },
  deps(state){
    return state.deps
  },
  roles(state){
    return state.roles
  },
  settings(state){
    return state.session.settings
  },
  enterprises(state){
    return state.session.enterprises
  },
  _get_flow_dep_manager:state=>dep_id=>{
    if(dep_id == 0)
      return ['ed49e690-3b83-11eb-8e1e-c15d5c7db744']
    else if (dep_id == 1) //房建：章建良 李增义 汤海平
      return ['ed4a8300-3b83-11eb-8e1e-c15d5c7db744', 'ed4a34b4-3b83-11eb-8e1e-c15d5c7db744','']
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
    if(!state.types)
      return []
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
        return state.types.map(v=>v.key)
    },
  getRoles: state => type_id => {
    return state.roles.filter(v => v.type_id == type_id)
  },
}

const actions = {
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
  whoami({commit,dispatch}){
    let token = localStorage.getItem('hs-token')
    let enterprise_id = localStorage.getItem('current_enterprise')
  
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
        console.log("SESSION:",session)
        if (enterprise_id && !enterprise_id != self && session.enterprises.find(v => v.id == enterprise_id) == null)
          commit('ClearEnterprise')
        if(!enterprise_id && session.my_enterprises.length > 0){
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
      console.log("Set Enterprise")
      API.CORE.SetEnterprise(ent_id)
      API.ENT.SetEnterprise(ent_id)
      API.ENT_ADMIN.SetEnterprise(ent_id)
      localStorage.setItem('current_enterprise',ent_id)
      
      state.current_enterprise = ent_id
    }else{
      mutations.ClearEnterprise(state)
    }

   
  },
  ClearEnterprise(state){
    API.CORE.ClearEnterprise()
    API.ENT.ClearEnterprise()
    API.ENT_ADMIN.ClearEnterprise()
    localStorage.removeItem('current_enterprise')
    state.current_enterprise = null
  },
  save(state,session){
    API.CORE.SetAuthorization(session.token)
    if (session.type > 0)
      API.ENT.SetAuthorization(session.token)
    if (session.type  > 1)
      API.ADMIN.SetAuthorization(session.token)
    
    if(session.ent_admin)
      API.ENT_ADMIN.SetAuthorization(session.token)

    localStorage.setItem('hs-token',session.token)
    state.session = session
     state.types = session.types //SaveTypes(session.types)
    state.users = session.users
    state.modules = session.modules
    state.rss = session.rss
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
