
import {axiosClient,axiosCosClient} from '@/plugins/axios'
const PACKS = {
  CORE_API:{
    // core
    LOGIN: "POST /sessions",
    WHO_IS: "GET /sessions/current",
    //
  },

  FILE_API:{

  }
}

export const getAPI = function(api_name, {
  param,
  query
} = {}, pack_name = 'CORE_API', ) {
  let apiObject = null
  let PACK = PACKS[pack_name]
  if(!PACK)
    throw(`PACK_NAME(${pack_name}) is not defined`)
  let api_path = PACK[api_name]
  if (!api_path)
    throw (`API_NAME(${api_name}) is not defined`)
  let [method, path] = api_path.split(' ')
  if(!method || !path)
    throw (`INCORRECT API_PATH : ${api_path}`)
  apiObject = {
    method : method.toLowerCase(),
    url: path
  }

  if (param) {
    let keys = Object.keys(param)
    keys.forEach(key => {
      apiObject.url = apiObject.replace(':' + key, param[key])
    })
  }

  if (query) {
    let keys = Object.keys(query)
    apiObject.url = apiObject.url + keys.map(key => `${key}=${query[key]}`).join('&')
  }

  return apiObject
}
export const request = (api_name, {
  param,
  query,
  data,
  headers
}={}, PACK = 'CORE_API') => {
  let apiObject = getAPI(api_name, {
    PACK,
    param,
    query
  })
  return axiosClient.request({
    ...apiObject,
    data,
    headers
  })
}

