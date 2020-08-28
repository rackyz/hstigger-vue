
const {
  Mock,
  MOCK_API,
  ReturnData,
  ThrowError
} = require('./util')
const crypto = require('crypto')


MOCK_API('LOGIN', req => {
  let ADMIN_PASS = crypto.createHash("md5").update('123456').digest('hex')
  let TEST_PASS = crypto.createHash("md5").update('test').digest('hex')
  let {
    user,
    password
  } = JSON.parse(req.body)

  if (user == 'admin' && password == ADMIN_PASS)
      return ReturnData({
        id:1,
        name:'马骍',
        role:[1]
      })
  else if (user == 'test' && password == TEST_PASS)
      return ReturnData({
        id: 2,
        name: '胡佳翰',
        role: [2]
      })
  else
      return ThrowError('密码错误')
})


