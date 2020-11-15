const axios = require('axios')
const config = require('../config')


let Clients = {}
config.Servers.forEach((server,i)=>{
  var axiosClient = axios.create({baseURL:server.Connection.baseURL,
    timeout: server.Connection.timeout})

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
        return Promise.reject("tokenoutofdate")
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

  let client = {name:server.Name, getAPI,axios:axiosClient, apis:server.API}

  client.SetAuthorization = function(token){
    axiosClient.defaults.headers.Authorization = token
  }

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

      if(config && config.headers)
        requestObject.headers = config.headers
      return axiosClient.request(requestObject)
    }
  })
  Clients[server.Name] = client
})


var COS = axios.create({
  baseURL: config.cosServer
})

Clients.COS = COS

export default Clients

