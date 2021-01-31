
/** Store.Core
 *  @功能描述 用户的登录状态/信息/基础数据/系统路由
 */
import API from '@/plugins/axios'
import HSAPI from '@/plugins/api'
var SERVER = HSAPI.GetServerAPI()
console.log("SERVER:",SERVER)
const state = {
    list: [],
    
}

const getters = {
    list(state){
        return state.list
    },
    listByUser:(state)=>(id,positionId)=>{
        let mylist = state.list

        return mylist
    },
    get:(state)=>(id)=>{
        return state[id] || {}
    },
    getByIds:(state)=>(ids=[])=>{
        return state.list.filter(v=>ids.includes(v.id))
    },
    getStateText:(state)=>(s=0)=>{
        const stateTexts = ['组建中','进行中','已竣工','已归档']
        return stateTexts[s]
    },
    getStateColor:(state)=>(s=0)=>{
        const colors = ['#00000077', '#ffa70475', '#034a03b3', '#33556696']
        return colors[s]
    },

    // statistic
    getCount:(state)=>(year=moment().year())=>{
        return 383
    },
    getAmount: (state) => (year = moment().year())=>{
        return 203452341
    },
    getHumans: (state) => (year = moment().year()) => {
        return 432
    },
    getBills: (state) => (year = moment().year()) => {
      return 80034231
    },
    getCost: (state) => (year = moment().year()) => {
      return 23245321
    },
    getTransferred: (state) => (year = moment().year()) => {
      return 68455668
    },

    getActivities:state=>{
        return [{
            id:21,
            project_name:'奉化中学',
            event:'项目竣工，开票30.0万',
            date:'2020-08-28'
        }, {
          id: 21,
          project_name: '奉化中学',
          event: '上传了年度计划',
          date: '2020-08-28'
        }, {
          id: 21,
          project_name: '奉化中学',
          event: '上传了会议记录',
          date: '2020-08-28'
        }, {
          id: 21,
          project_name: '奉化中学',
          event: '上传了人员计划',
          date: '2020-08-28'
        }, {
          id: 21,
          project_name: '奉化中学',
          event: '更新了月度人员计划',
          date: '2020-08-28'
        }, {
          id: 21,
          project_name: '奉化中学',
          event: '项目竣工，开票30.0万',
          date: '2020-08-28'
        }, {
          id: 21,
          project_name: '奉化中学',
          event: '项目竣工，开票30.0万',
          date: '2020-08-28'
        },]
    },
    getOrderList:state=>{
        return [{
            id:1,
            project:'奉化中学',
            value:'32.3万'
        },{
            id:2,
            project:'钟公庙中学',
            value:'21.3万'
        },{
            id:1,
            project:'钟公庙中学',
            value:'12.3万'
        },{
            id:1,
            project:'钟公庙中学',
            value:'12.3万'
        },{
            id:1,
            project:'钟公庙中学',
            value:'12.3万'
        },{
            id:1,
            project:'钟公庙中学',
            value:'12.3万'
        },{
            id:1,
            project:'钟公庙中学',
            value:'12.3万'
        },{
            id:1,
            project:'钟公庙中学',
            value:'12.3万'
        },{
            id:1,
            project:'钟公庙中学',
            value:'12.3万'
        },{
            id:1,
            project:'钟公庙中学',
            value:'12.3万'
        }]
    }
}

const actions = {
    get:({commit},id)=>{
        return new Promise((resolve,reject)=>{
            console.log(SERVER)
            SERVER.enterprise.GET_PROJECTS({param:{id},query:{q:"full"}}).then(res=>{
                let item = res.data.data

                item.positions = [{
                    id: 1,
                    name: '项目经理',
                    role: "charger",
                    type: "system",
                    user: 'UID00000001',

                }, {
                    id: 2,
                    name: '前期管理',
                    type: "system",
                    user: 'UID00000001',

                }, {
                    id: 3,
                    name: '技术管理',
                    type: "system",
                    user: 'UID00000001',

                }, {
                    id: 4,
                    name: '设计管理',
                    type: "system",
                    user: 'UID00000001',

                }, {
                    id: 5,
                    name: '合约管理',
                    type: "system",
                    user: 'UID00000001',

                }, {
                    id: 6,
                    name: '招投标管理',
                    type: "system",
                    user: 'UID00000001',
                    task: 'TASK'

                }, {
                    id: 7,
                    name: '机电管理',
                    type: "system",
                    user: 'UID00000001',
                    task: 'TASK'

                }, {
                    id: 8,
                    name: '造价管理',
                    type: "system",
                    user: 'UID00000001',
                    task: 'TASK'

                }],
                commit('save',item)
                resolve(item)
            }).catch(reject)
        })
    },
    getList({commit}){
        return new Promise((resolve,reject)=>{
          SERVER.enteprise.LIST_PROJECTS().then(res=>{
                commit("saveList",res.data.data)
                resolve(res.data.data)
            }).catch(reject)
        })
    },
    create({commit,dispatch},projectItem){
        return new Promise((resolve,reject)=>{
          API.CORE.POST_PROJECT(projectItem).then(res=>{
                let id = res.data.data
                projectItem.id = id
                dispatch('user/addConcernProject', [id], {
                    root: true
                })
                commit("save", projectItem)
                resolve(id)
            }).catch(reject)
        })
    },
    patch({commit},projectItem){
        console.log('patch:',projectItem)
        return new Promise((resolve, reject) => {
            if(projectItem.id){
                API.CORE.PATCH_PROJECT(projectItem,{param:{id:projectItem.id}}).then(res => {
                    let updateInfo = res.data.data
                    Object.assign(projectItem,updateInfo)
                    commit("save", projectItem)
                    resolve()
                }).catch(reject)
            }else{
                API.CORE.POST_PROJECT(projectItem).then(res => {
                    let updateInfo = res.data.data
                    Object.assign(projectItem,updateInfo)
                    commit("save", projectItem)
                    resolve()
                }).catch(reject)
            }
          
        })
    }
  
}

const mutations = {
    init_api(state,api){
        SERVER = api
    },
    saveList(state,list){
        // preprocesser
        list.forEach(v=>{
            let item = v
            if (item.images) {
                item._images = item.images.split(';').map(v => v.split(',')).map(v =>
                    cosService + v[1]
                )
                if (item._images && item.images.length > 1)
                    item.avatar = item._images[0]
            }
        })
        state.list = list
    },
    save(state,item){
         if (item.images) {
             item._images = item.images.split(';').map(v => v.split(',')).map(v => 
                 cosService + v[1]
             )
             if (item._images && item.images.length > 1)
                 item.avatar = item._images[0]
         }
        let index = state.list.findIndex(v=>v.id == item.id)
        let fullItem = index != -1 ?Object.assign({}, state.list[index], item):item
        if(index != -1)
            Vue.set(state.list, index, fullItem)
        else
            state.list.push(fullItem)

        if(state[item.id])
            Vue.set(state, item.id, fullItem)
        else
            Vue.set(state, item.id, fullItem)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}