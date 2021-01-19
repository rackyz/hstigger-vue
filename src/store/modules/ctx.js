import API from '@/plugins/api'
import StoreHelper from '@/plugins/store'
const crypto = require('crypto')
const state = {
  inited:false,
  session:{},
  device: {},
  system:{},
  settings:{
    'carouselItems': [
      'https://0.rc.xiniu.com/g2/M00/69/6E/CgAGe1qyZlmASLyrAAGyA_2qGhI991.jpg', 'https://0.rc.xiniu.com/g2/M00/74/66/CgAGfFqybHSASqOJAAG0X-7T_CE140.jpg', 'https://0.rc.xiniu.com/g2/M00/74/66/CgAGfFqybmKAbbjbAAIU5dmkL2Q999.jpg', 'https://0.rc.xiniu.com/g2/M00/74/67/CgAGfFqycBCAU_jIAADq26QFyfA452.jpg', 'https://0.rc.xiniu.com/g2/M00/74/6E/CgAGfFqy-USALTiwAAFLju9reN4177.jpg', 'https://0.rc.xiniu.com/g2/M00/74/6E/CgAGfFqy-lqAKVk5AARabS29hqw136.jpg', 'https://0.rc.xiniu.com/g2/M00/74/6E/CgAGfFqy-3GAZDPsAALcYj4xSQ8618.jpg', 'https://0.rc.xiniu.com/g2/M00/74/6F/CgAGfFqy_HmAXd6OAAHVsN5ras8815.jpg'
    ]
  }
}

const getters = {
  inited(state){
    return state.inited
  },
  session(state){
    return state.session
  },
  device(state){
    return state.device
  },
  settings(state){
    return state.settings
  }
}

const actions = {
  Init:({commit},vue)=>{
    commit('StartLoading')
    return new Promise((resolve)=>{
      API.initAPI(vue).then(() => {
         commit('SaveDevice')
        window.onresize = () => {
          commit('SaveDevice')
        }
        resolve()
      }).catch(e=>{
        reject('API加载失败:'+e)
      }).finally(e=>{
        commit('EndLoading')
      })
    })
  },

  Login:({commit},{user,password})=>{
    return new Promise((resolve,reject)=>{
      password = crypto.createHash("md5").update(password).digest('hex')
      API.SERVER.Clear()
      API.SERVER.public.LOGIN({
          account: user,
          password
        }).then(res => {
        let session = res.data.data
        commit('SaveSession', session)
        resolve(session)
      }).catch(reject)
    })
  },
  Logout:()=>{
    return new Promise((resolve,reject)=>{
      API.SERVER.public.LOGOUT().then(res=>{
        console.log("退出成功")
        resolve()
      })
    })
  }
}

const mutations = {
  SaveDevice:(state)=>{
    state.device = {
      href:document.location.href,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      pixelRatio: window.devicePixelRatio,
      agent:navigator.userAgent
    }
  },
  SaveSession:(state,data)=>{
    state.session = data
  }
}



let o = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

StoreHelper.UseLoading(o)

export default o
