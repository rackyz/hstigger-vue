
const Mock = require('mockjs')
const AxiosClients = require('@/plugins/axios')

Mock.setup({
  timeout: '300-600'
})

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

const MOCK_API = (server_name,api_name, cb) => {
  let api = AxiosClients[server_name].getAPI(api_name)
  Mock.mock(api.fullURL, api.method, cb)
}

module.exports = {
  Mock,
  MOCK_API,
  ThrowError,
  ReturnData
}