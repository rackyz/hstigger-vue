const axios = require('axios')
const config = require('../config')

let API_OBJECT = null
if(!API_OBJECT){
  axios.get(config.server, {
    headers: {
      ['api-version']: '1.0.0'
    }
  }).then(res => {
    console.log('GET_API:',res.data.data)
    API_OBJECT = res.data.data
  }).catch(e=>{
    console.log("GET_API_FAILED:",e)
  })
}


let Clients = {}
config.Servers.forEach((server,i)=>{
  var axiosClient = axios.create({baseURL:server.Connection.baseURL,
    timeout: server.Connection.timeout})
  
  let client = {name:server.Name, getAPI,axios:axiosClient, apis:server.API, config:server.Connection}

  // 初始化头部配置
  axiosClient.defaults.headers = server.Connection.defaultHeaders || {}

  // axios 请求 预处理
  axiosClient.interceptors.request.use(config => {
    return config;
  }, err => {
    return Promise.resolve(err);
  })

  // axios 响应 预处理
  axiosClient.interceptors.response.use(data => {
    if (data && data.data && data.data.code === -1) {
      return Promise.reject((data.data.error ? data.data.error : (data.data.message ? data.data.message : '未知')))
    }
    return data;
  }, err => {
    if (err.message && err.message.includes('timeout')) {
      return Promise.reject('网络连接超时')
    }

    if (err.response) {
      if (err.response.status == 504 || err.response.status == 404) {
        return Promise.reject(`网络连接失败:[${err.response.status}]`)
      } else if (err.response.status == 403) {
        return Promise.reject('403-权限不足,请联系管理员!')
      } else if (err.response.status == 401) {
        client.Clear()
        window.location.reload()
        return Promise.reject()
      } else {
        return Promise.reject(`${err.response.status}] ${err}`)
      }
    }

    if (err.config && err.config.method == 'options') {
      return Promise.reject('服务器访问失败')
    }
    return Promise.reject(err);
  })


  const getAPI = function (api_name, {
    param,
    query
  } = {}) {
    let apiObject = null
    let api_path = server.API[api_name]
    if (!api_path)
      throw (`API_NAME(${api_name}) is not defined`)
    let [method, path] = api_path.split(' ')
    if (!method || !path)
      throw (`INCORRECT API_PATH : ${api_path}`)
    apiObject = {
      method: method.toLowerCase(),
      url: path
    }

    if (param) {
      let keys = Object.keys(param)
      keys.forEach(key => {
        if (keys)
          apiObject.url = apiObject.url.replace(':' + key, param[key])
      })
    }

    if (query) {
      let keys = Object.keys(query)
      if (keys)
        apiObject.url = apiObject.url + '?' + keys.map(key => `${key}=${query[key]}`).join('&')
    }

    return apiObject
  }


  client.SetAuthorization = function(token){
   if(token)
      client.axios.defaults.headers.Authorization = token
  }

  client.SetEnterprise = function(ent_id){
    if(ent_id)
      client.axios.defaults.headers.Enterprise = ent_id
  }

  client.ClearEnterprise = function(){
    delete client.axios.defaults.headers.Enterprise
  }

  client.Clear = function(){
    delete client.axios.defaults.headers.Authorization
    delete client.axios.defaults.headers.Enterprise
    localStorage.removeItem('hs-token')
    localStorage.removeItem('current_enterprise')
  }

  client.buffer = {}

  Object.entries(server.API).forEach(([k,v]) => {
    client[k] = (data, config) => {
      let apiObject = getAPI(k, config)
      if (apiObject.method === 'get' || apiObject.method == 'delete') {
        config = data
        data = undefined
      }
      apiObject = getAPI(k,config)
      
      let requestObject = {
        ...apiObject,
        data
      }
      
      if(config ){
        if ( config.headers)
          requestObject.headers = config.headers
        if (config.timeout) {
          requestObject.timeout = config.timeout
        }
      }
        
      // return new Promise((resolve,reject)=>{
      //   client_buffer[]
      // })
      return axiosClient.request(requestObject)
    }
  })
  Clients[server.Name] = client
  
})


var COS = axios.create({
  baseURL: config.cosServer
})
COS.baseURL = config.cosServer

Clients.COS = COS

export default Clients

