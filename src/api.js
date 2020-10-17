
import AxiosClient from '@/plugins/axios'

const PACKS = {
  CORE_API:{
    // core
    LOGIN: "POST /sessions",
    WHO_IS: "GET /sessions/current",
    GET_ACCLERATES: "GET /acclerates",
    SAVE_ACCELERATES: "POST /accelerates",
    GET_USERS:"GET /users",
    GET_USER:"GET /users/:id",
    POST_USER:"POST /users",
    POST_USERS:"POST /users/create-users",
    PATCH_USER:"PATCH /users/:id",
    DEL_USER:"DELETE /users/:id",
    DEL_USERS:"POST /users/delete",
    // MESSAGE
    GET_MESSAGES: "GET /messages",
    READ_MEESAGE: "PATCH /messages/:id",
    // admin
    GET_ROLES:"GET /roles",
    CREATE_ROLE:"POST /roles",
    DEL_ROLE:"DELTE /roles/:id",
    UPDATE_ROLE:"PATCH /roles/:id",

    GET_LOGS:"GET /logs",
    GET_LOG:"GET /logs/:id",

    GET_DUMPS: "GET /backups",
    MAKE_DUMP: "GET /tools/mysqldump"
  },

  FILE_API:{

  }
}

  export const SetAuthorization = function(token){
    AxiosClient.axios.defaults.headers.Authorization = token
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
        if(keys)
          apiObject.url = apiObject.url.replace(':' + key, param[key])
      })
    }

    if (query) {
      let keys = Object.keys(query)
      if(keys)
        apiObject.url = apiObject.url +'?' +  keys.map(key => `${key}=${query[key]}`).join('&')
    }

    return apiObject
  }
  export const request = (api_name, {
    param,
    query,
    data,
    headers = {}
  }={}, PACK = 'CORE_API') => {
    console.log("REQUEST:",api_name,'param:',param,'query:',query,'data:',data,'headers:',headers)
    let apiObject = getAPI(api_name, {
      PACK,
      param,
      query
    })
    return AxiosClient.axios.request({
      ...apiObject,
      data,
      headers
    })
  }

