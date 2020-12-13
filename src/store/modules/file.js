/** Store/File
 *  @功能描述 文件上传/下载服务，状态/进度管理
 */
import API from '@/plugins/axios'
 var CancelToken = axios.CancelToken
 const getFileExt = (url) => {

   if (url) {
     let ext = url.substring(url.lastIndexOf(".") + 1)
     return ext
   }
 }

 const state = {
   list: [],
   uploadingList: []
 }

 const getters = {
   files(state) {
     return state.list
   },
   uploadingFiles(state) {
     return state.uploadingList
   },
   makeURL:(state)=>(path)=>{
     return API.CORE.config.baseURL + path 
   }
 }

 const actions = {
   query({
     commit
   }) {
     return new Promise((resolve, reject) => {
       API.CORE.GET_FILES({query:{q:'mine'}}).then(res => {
         commit('saveList', res.data.data)
         resolve()
       })
     })

   },
   
   upload({
     commit,
     rootState
   }, {
     files,
     vdisk
   }) {
     return new Promise((resolve, reject) => {
       if (!files)
         reject("files is undefined")
       let cosAuthorization = rootState.core.session.coskey
       if (!cosAuthorization) {
         reject("COS授权失败")
       }

       if (!files.length)
         files = [files]

       let fileObjects = Object.values(files).map(f => ({
         name: f.name,
         size: f.size,
         ext: getFileExt(f.name),
         vdisk: vdisk || 'ref'
       }))
       console.log('store/file/uploading:', files, fileObjects)
       // post file info to cloud server
       return API.CORE.POST_FILES(fileObjects).then(res => {
         let resFiles = res.data.data
         commit('upload', fileObjects)

         // upload each file to COS server
         return Promise.all(
           fileObjects.map((v, i, a) => {
             commit('setUploadingFileState', {
               files: a,
               file: a[i],
               state: {
                 loading: true,
                 id: resFiles[i].id,
                 inputor: resFiles[i].inputor,
                 inputTime: resFiles[i].inputTime
               }
             })
             let file = files[i]
             let filekey = "files/" + resFiles[i].url

             file.loading = true

             var formdata = new FormData()
             formdata.append('key', filekey)
             formdata.append('file', files[i])
             fileObjects[i].source = CancelToken.source()

            console.log('start cos uploading...')
             return API.COS.post('', formdata, {
               'content-type': 'multipart/form-data',
               headers: {
                 Authorization: cosAuthorization
               },
               cancelToken: fileObjects[i].source.token,
               onUploadProgress: progressEvent => {
                 let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                 commit('setUploadingFileState', {
                   files: fileObjects,

                   file: a[i],
                   state: {
                     percent: complete
                   }
                 })
               }
             }).then(() => {
               // single file upload successfully
               commit('setUploadingFileState', {
                 files: fileObjects,
                 file: a[i],
                 state: {
                   url: resFiles[i].url,
                   loading: undefined,
                   source: undefined
                 }
               })
               resolve(resFiles[i])
              
             }).catch(e => {
               if (e && e.message == "取消上传") {
                 commit('cancelUploading', a[i])
                 resolve()
               }
               reject({
                 e,
                 file: a[i]
               })
             })
           })).then(res => {
           // all file uploaded successfully
           commit('append', fileObjects)
           resolve(resFiles)
         })
       }).catch((err) => {
         if (typeof err == 'object') {
           var {
             e,
             file
           } = err
           console.error('file-error:', err)
           commit('setUploadingFileState', {
             files: fileObjects,
             file,
             state: {
               error: e
             }
           })
           reject(e)
         } else {
           reject(e)
         }
       })
     })

   },
   DeleteFiles({commit},id_list){
     return new Promise((resolve,reject)=>{
      API.CORE.DEL_FILES(id_list).then(res=>{
        let results = res.data.data || []
        console.log(results)
      
        commit('LocalDeleteFiles',id_list)
        resolve(id_list)
      }).catch(reject)
      
   })
  }
 }

 const mutations = {
   saveList(state, list) {
     state.list = list
   },
   append(state, list) {
     state.list = state.list.concat(list)
     state.uploadingList = []
   },
   save(state, item) {
     let index = state.list.find(v => v.id == item.id)
     if (index == -1) {
       state.list.push(item)
     } else {
       state.list.splice(index, 1, item)
     }
   },
   upload(state, uploadFiles) {
     state.uploadingList.concat(uploadFiles)
   },
   setUploadingFileState(state, fileOption = {}) {
     if (fileOption.file && fileOption.state)
       Object.assign(fileOption.file, fileOption.state)
     state.uploadingList = fileOption.files
   },

   cancelUploading(state, file) {
     state.uploadingList = []
   },
   LocalDeleteFiles(state,id_list){
     let files = state.list
     files = files.filter(f=>!id_list.includes(f.id))
     state.list = files
   }
 }

 export default {
   namespaced: true,
   state,
   getters,
   actions,
   mutations
 }