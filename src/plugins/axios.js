import axios from 'axios'
import Vue from 'vue'
import config from '../config'
import APIs from '../api'

let axiosClient = axios.create({
  baseURL: process.env.NODE_ENV !== 'production'?config.devServer:config.prodServer,
  timeout: config.timeout
})

// 初始化头部配置
axiosClient.defaults.headers = config.defaultHeaders

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

let requestAPI = {}

const MakeAxoisRequest = (token)=>({id,query,data})=>{
  let [,method,url_pattern] = /^(.*)\/(.*)/.match(token)
  if(id != undefined)
    url_pattern = url_pattern.replace(`:id`,id)
  
  if(Object.keys(query).length > 0){
    url_pattern += Object.keys(query).map(v=>`${v}=${query[v]}`).join('&')
  }
  let url = url_pattern
  console.error('[parse]:',token,method,url)
  return axiosClient.request({
    url,
    method,
    data,
  })
}


Object.entries(APIs).forEach(([key,token])=>{
  console.log(key,token)
  requestAPI[key] = MakeAxoisRequest(token)
})

Vue.prototype.$api = requestAPI


var axiosCOSClient = axios.create({
  baseURL: config.cosServer
})

export default {
   axiosClient,
   axiosCOSClient
}

