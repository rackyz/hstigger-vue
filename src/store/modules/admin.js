/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */

import API from '@/plugins/axios'
import UTIL from '../util.js'
const state = {
  accounts:[],
  enterprises:[],
  modules:[],
  rss:[],
  status:{},
  logs:[]
}

const getters = {
  accounts(state){
    return state.accounts
  },
  status(state){
    return state.status
  },
  enterprises(state){
    return state.enterprises
  },
  modules(state){
    return state.modules
  },
  rss(state){
    return state.rss
  },
  logs(state){
    return state.logs
  }
}

const actions = {
  GetLogs({commit}){
    return new Promise((resolve,reject)=>{
      API.CORE.GET_LOGS().then(res=>{
        commit('saveLogs',res.data.data)
        resolve()
      }).catch(reject)
    })
    
  },
  GetStatus({commit}){
    return new Promise((resolve, reject) => {
      API.CORE.GET_ACCOUNTS().then(res => {
        let accounts = res.data.data
        commit('saveAccounts', accounts)
        resolve()
      }).catch(reject)
    })
  },
  // USERS/ACCOUNTS
  ListUsers({commit}){
    return new Promise((resolve,reject)=>{
       API.CORE.GET_ACCOUNTS().then(res => {
          let accounts = res.data.data
          commit('initAccounts', accounts)
          resolve()
       }).catch(reject)
    })
  },
  CreateUsers({commit},users){
    return new Promise((resolve,reject)=>{
      API.CORE.POST_ACCOUNTS(users).then(res => {
        let resInfoArray = res.data.data
        users.forEach((v,i)=>{
          Object.assign(v,resInfoArray[i])
        })
        commit("saveAccounts", users)
        resolve()
      }).catch(reject)
    })
  },
  ResetPassword({commit},user_id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.RESET_PASSWORD(user_id_list).then(res=>{
        commit('pathAccounts',user_id_list.map(id=>({id,changed:false})))
        resolve()
        
      }).catch(reject)
    })
  },
  ChangePassword({commit},{id,password}){
    return new Promise((resolve,reject)=>{
      API.CORE.CHANGE_PASSWORD({id,password}).then(res=>{
         commit('patchAccount', {
           id,changed:1
         })
        resolve()
      }).catch(reject)
    })
  },
  LockAccounts({commit},user_id_list){
    if(user_id_list && !Array.isArray(user_id_list))
      user_id_list = [user_id_list]
    return new Promise((resolve, reject) => {
      API.CORE.LOCK_ACCOUNTS(user_id_list).then(res => {
        commit('patchAccounts', user_id_list.map(id => ({
          id,
          locked:1
        })))
        resolve()

      }).catch(reject)
    })
  },
  UnlockAccounts({commit},user_id_list){
      if (user_id_list && !Array.isArray(user_id_list))
        user_id_list = [user_id_list]
     return new Promise((resolve, reject) => {
       API.CORE.UNLOCK_ACCOUNTS(user_id_list).then(res => {
         commit('patchAccounts', user_id_list.map(id => ({
           id,
           locked: 0
         })))
         resolve()

       }).catch(reject)
     })
  },
  PatchUser({commit,dispatch},user){
    return new Promise((resolve,reject)=>{
      if(user.id)
        return API.CORE.PATCH_ACCOUNT(user,{param:{id:user.id}}).then(res=>{
          let resInfo = res.data.data
          Object.assign(user, resInfo)
          commit("patchAccount", user)
          resolve()
        }).catch(reject)
      else
        dispatch('CreateUsers',[user]).then(resolve).catch(reject)
    })
  },
  DeleteUser({commit},user_id){
    return new Promise((resolve,reject)=>{
      API.CORE.DEL_ACCOUNT({param:{id:user_id}}).then(res=>{
        commit('removeAccount', user_id)
        resolve()
      }).catch(reject)
    })
  },
  
  DeleteUsers({
    commit
  }, userid_list) {
    return new Promise((resolve, reject) => {
      API.CORE.DEL_ACCOUNTS(userid_list).then(res => {
        commit('removeAccount', user_id)
        resolve()
      }).catch(reject)
    })
  },

  // ENTERPRISES
  GetEnterprises({commit}){
    return new Promise((resolve,reject)=>{
      API.CORE.GET_ENTERPRISES().then(res=>{
        commit('saveEnterprises',res.data.data)
        resolve(res.data.data)
      }).catch(reject)
    })
  },

  PatchEnterprise({commit},item){
    if(item.id == undefined){
      return new Promise((resolve,reject)=>{
        API.CORE.POST_ENTERPRISE(item).then(res=>{
          let updateInfo = res.data.data
          Object.assign(item,updateInfo)
          commit('saveEnterprises',[item])
          resolve()
        }).catch(reject)
      }) 
    }else{
      return new Promise((resolve,reject)=>{
        API.CORE.PATCH_ENTERPRISE(item,{
            param: {
              id: item.id
            }
          }).then(res => {
           let updateInfo = res.data.data
           Object.assign(item, updateInfo)
           commit('saveEnterprises', [item])
           resolve()
        }).catch(reject)
      })
    }
  },
  

  DeleteEnterprises({commit},id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.DEL_ENTERPRISES(id_list).then(res=>{
        commit('deleteEnterprises',id_list)
        resolve()
      }).catch(reject)
    })
     
  },

  LockEnterprises({commit},id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.LOCK_ENTERPRISES(id_list).then(res=>{
        commit('saveEnterprises',id_list.map(v=>({id:v,state:2})))
        resolve()
      }).catch(reject)
    })
     
  },
  UnlockEnterprises({commit},id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.UNLOCK_ENTERPRISES(id_list).then(res=>{
        commit('saveEnterprises',id_list.map(v=>({id:v,state:1})))
        resolve()
      }).catch(reject)
    })
     
  },


  GetModules({commit}){
    return new Promise((resolve,reject)=>{
      API.CORE.GET_MODULES().then(res=>{
        commit("saveModules",res.data.data)
        resolve()
      }).catch(reject)
    })
  },
  PatchModule({commit},item){
    return new Promise((resolve,reject)=>{
      if(item.id){
        API.CORE.PATCH_MODULE(item,{param:{id:item.id}}).then(res=>{
          commit("saveModules",[item])
          resolve()
        }).catch(reject)
      }else{
        API.CORE.POST_MODULE(item).then(res=>{
          let createInfo = res.data.data
          Object.assign(item,createInfo)
          commit("saveModules",[item])
          resolve()
        }).catch(reject)
      }
    })
  },

  DeleteModules({commit},id_list){
    return new Promise((resolve, reject) => {
      API.CORE.DEL_MODULES(id_list).then(res=>{
         commit("deleteModules", id_list)
         resolve()
      }).catch(reject)
     
    })
  },

  GetRss({commit}){
    return new Promise((resolve,reject)=>{
      API.CORE.GET_RSS().then(res=>{
        commit("saveRss",res.data.data)
        resolve()
      }).catch(reject)
    })
  },

  PatchRSS({commit},item){
    if(!item.id)
      return new Promise((resolve,reject)=>{
        API.CORE.POST_RSS(item).then(res=>{
          Object.assign(item,res.data.data)
          commit("saveRss",[item])
          resolve()
        }).catch(reject)
      })
    else
      return new Promise((resolve,reject)=>{
        API.CORE.PATCH_RSS(item,{param:{id:item.id}}).then(res=>{
          
          commit("saveRss",[item])
          resolve()
        }).catch(reject)
      })
  },

  DeleteRss({commit},id_list){
    return new Promise((resolve,reject)=>{
      API.CORE.DEL_RSS(id_list).then(res=>{
        commit("deleteRss",id_list)
        resolve()
      }).catch(reject)
    })
  },
  


  // FILE
  // [in] local files objects
  // [out] paired file-name file-path string
  upload:({commit},files)=>{
    return new Promise((resolve,reject)=>{
      let file_db_objects = files.map(v=>({
        name:v.name,
        ext:v.ext,
        size:v.size,
        url: API.MakeCOSURL(v.name)
      }))
      API.CORE.POST_FILES(file_db_objects).then(res=>{

      })
    })
    
  }

  // APPLICATIONS

 
}

const mutations = {
  initAccounts(state, accounts) {
    state.accounts = accounts
  },
  saveAccounts(state,accounts){
    accounts.forEach(v=>{
       state.accounts.push(v)
    })
  },
  patchAccount(state,account){
    let index = state.accounts.findIndex(v=>v.id === account.id)
    if(index != -1)
      state.accounts.splice(index,1,Object.assign(state.accounts[index],account))
  },
  patchAccounts(state,items){
    items.forEach(v=>{
      mutations.patchAccount(state,v)
    })
  },
  removeAccount(state,id){
    let index = state.accounts.findIndex(v=>v.id == id)
    if (index != -1)
      state.accounts.splice(index,1)
  },
  removeAccounts(state,id_list = []){
    id_list.forEach(v=>{
      mutations.removeAccount(state,v)
    })
  },
  saveEnterprises(state,items){
    UTIL.LocalSaveItems(state,'enterprises',items)
  },
  deleteEnterprises(state,id){
    UTIL.LocalDeleteItem(state,'enterprises',id)
  },
  saveModules(state, items) {
      UTIL.LocalSaveItems(state, 'modules', items)
    },
    deleteModules(state, id) {
      UTIL.LocalDeleteItem(state, 'modules', id)
    },
    saveRss(state,items){
      UTIL.LocalSaveItems(state,'rss',items)
    },
    deleteModules(state,id){
      UTIL.LocalDeleteItem(state,'rss',id)
    },
    saveLogs(state,items){
      UTIL.LocalSaveItems(state,'logs',items)
    }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
