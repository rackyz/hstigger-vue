const config = require('@/config')
const PACKS = {
  CORE_API:{
    // core
    LOGIN: "POST /sessions",
    WHO_AM_I: "GET /sessions/current",
    //
  },

  FILE_API:{

  }
}


const getAPI = function(api_name, {
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
  apiObject = {
    method:method.toLowerCase(),
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

  apiObject.url = server + apiObject.url

  return apiObject
}

export default {
  getAPI
} 