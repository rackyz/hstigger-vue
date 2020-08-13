const config = require('@/config')
const Mock = require('mockjs')
const API = require('@/api')

Mock.setup({
  timeout: '300-600'
})


let server = config.devServer
if (process.env.NODE_ENV == 'production')
  server = config.prodServer

const ThrowError = (message) => {
  return {
    code: -1,
    message
  }
}
const ReturnData = (data) => {
  return {
    code: 0,
    data
  }
}

const MOCK_API = (api_name, cb) => {
  let api = API.getAPI(api_name)
  api.url = server + api.url
  Mock.mock(api.url, api.method, cb)
}

module.exports = {
  Mock,
  MOCK_API,
  ThrowError,
  ReturnData
}