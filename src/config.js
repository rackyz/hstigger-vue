module.exports = {
  // axios 配置参数
  devServer: 'http://192.168.14.40:5858', 
  prodServer: "https://www.nbgzpmis.xyz:10000",
  timeout:5000,
  defaultHeaders:{
      "api-version": "v0"
  },
  // cos 文件服务器
  cosServer:'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com'
}