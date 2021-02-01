import axios from 'axios'
import config from '../config'
var o = {}

let apiAxios = axios.create({baseURL:config.server,timeout:3000})
apiAxios.defaults.headers = {
    "api-version": "v0"
}
// axios 响应 预处理
apiAxios.interceptors.response.use(data => {
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
      apiAxios.Clear()
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
o.SERVER = {axios:apiAxios}
o.SERVER.SetAuthorization = function (token) {
  if (token)
    apiAxios.defaults.headers.Authorization = token
}

o.SERVER.SetEnterprise = function (ent_id) {
  if (ent_id)
    apiAxios.defaults.headers.Enterprise = ent_id
  else
    delete apiAxios.defaults.headers.Enterprise
}

o.SERVER.ClearEnterprise = function () {
  delete apiAxios.defaults.headers.Enterprise
}

o.SERVER.Clear = function () {
  delete apiAxios.defaults.headers.Authorization
  delete apiAxios.defaults.headers.Enterprise
  localStorage.removeItem('hs-token')
  localStorage.removeItem('current_enterprise')
}

 const getAPI = function (api_path, {
   param,
   query
 } = {}) {
   let apiObject = null
   if (!api_path)
     throw `api_path is empty`
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

const createAPIPromise = (axiosClient,api_path)=>{
   return (data, config)=>{
      let apiObject = getAPI(api_path, config)
      if (apiObject.method === 'get' || apiObject.method == 'delete') {
        config = data
        data = undefined
      }
      apiObject = getAPI(api_path, config)

      let requestObject = {
        ...apiObject,
        data
      }

      if (config) {
        if (config.headers)
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
   
}
const createAPI = (axiosClient,apiObject)=>{
  for(let group_key in apiObject){
    let apis = {}
    for (let api_key in apiObject[group_key]) {
      let api = apiObject[group_key][api_key]
      if(!api)
        console.error('unexpected API object:',group_key,api_key)
      apis[api_key] = createAPIPromise(axiosClient,api.url, api.option || {})
    }
    let UppercaseGroupKey = group_key
    axiosClient[UppercaseGroupKey] = apis
   
    o.SERVER[UppercaseGroupKey] = apis
  }
  return o.SERVER
}

o.initAPI = async (vue) => {
  
  o.SERVER = {}
  return new Promise((resolve, reject) => {
    if (!o.inited) {
      axios.get(config.server, {
        headers: {
          ['api-version']: '1.0.0'
        }
      }).then(res => {
        createAPI(apiAxios, res.data.data)
        o.inited = true
        if(vue)
          vue.prototype.api = o.SERVER
        console.log("API inited:",o.SERVER)
        resolve(o.API)
       
      }).catch(e => {
        console.error(e)
        reject("API Loading Failed:"+e)
      })
    }else{
      resolve(o.SERVER)
    }
  })

}


// Tencent COS Server
var COS = axios.create({
  baseURL: config.cosServer
})
COS.baseURL = config.cosServer
o.COS = COS
o.GetServerAPI = ()=>{
  return o.SERVER
}
export default o