import axios from 'axios'
import config from '../config'
let o = {}
let API_OBJECT = null


o.InitStore = async ()=>{
  return new Promise((resolve,reject)=>{
     if (!API_OBJECT) {
       axios.get(config.server, {
         headers: {
           ['api-version']: '1.0.0'
         }
       }).then(res => {
         API_OBJECT = res.data.data
         resolve(API_OBJECT)
         o.inited = true
       }).catch(e => {
         reject("API Loading Failed:",e)
       })
     }
  })
 
}




export default o