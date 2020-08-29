
const {
  Mock,
  MOCK_API,
  ReturnData,
  ThrowError
} = require('./util')
const crypto = require('crypto')

const users = [{
  id: 1,
  name: '马骍',
  user:'admin',
  pass: crypto.createHash("md5").update('123456').digest('hex'),
  role: [1]
}, {
  id: 2,
  name: '胡佳翰',
  user:'test',
  pass: crypto.createHash("md5").update('test').digest('hex'),
  role: [2]
}]


MOCK_API('LOGIN', req => {
  let {
    user,
    password
  } = JSON.parse(req.body)

  let current_user = users.find(v=>v.user == account)
  if (!current_user)
    return ThrowError('用户名不存在')

  if (password == current_user.pass)
      return ReturnData({
        id: current_user.id,
        name: current_user.name,
        role: current_user.role,
        user: current_user.user
      })
  else
      return ThrowError('密码错误')
})

MOCK_API('WHO_IS',req=>{
  let {token} = JSON.parse(req.body)
  let user = users.find(v=>v.id == token)
  if(user){
     return ReturnData({
       id: user.id,
       name: user.name,
       role: user.role,
       user: user.user
     })
  }else{
    return ThrowError('登录状态失效')
  }
})


