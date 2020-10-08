module.exports = {
  // axios 配置参数
  Server: process.env.NODE_ENV == 'production' ? "https://www.nbgzpmis.xyz:10000"
 :'http://192.168.0.109:5858',
  timeout:5000,
  defaultHeaders:{
      "api-version": "v0"
  },
  // cos 文件服务器
  cosServer:'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com'
}