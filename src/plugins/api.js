import axios from 'axios'
import config from '../config'
let o = {}

let apiAxios = axios.create({baseURL:config.server,timeout:3000})
apiAxios.defaults.headers = {
    "api-version": "v0"
}
apiAxios.SetAuthorization = function (token) {
  if (token)
    apiAxios.defaults.headers.Authorization = token
}

apiAxios.SetEnterprise = function (ent_id) {
  if (ent_id)
    apiAxios.defaults.headers.Enterprise = ent_id
  else
    delete apiAxios.defaults.headers.Enterprise
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
   return (config, data)=>{
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
o.API = {}
const createAPI = (axiosClient,apiObject)=>{
  console.log('createAPI:',apiObject)
  for(let group_key in apiObject){
    let apis = {}
    console.log('key:', group_key)
    for (let api_key in apiObject[group_key]) {
      let api = apiObject[group_key][api_key]
      if(!api)
        console.error('unexpected API object:',group_key,api_key)
      apis[api_key] = createAPIPromise(axiosClient,api.url, api.option || {})
    }
    let UppercaseGroupKey = group_key
    axiosClient[UppercaseGroupKey] = apis
   
    o.API[UppercaseGroupKey] = apis
  }
  console.log('api:',o.API)
  return o.API
}

o.initAPI = async (vue) => {
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
          vue.api = o.API
        resolve(o.API)
      }).catch(e => {
        console.error(e)
        reject("API Loading Failed:"+e)
      })
    }else{
      resolve(o.API)
    }
  })

}

// foreach server



export default o