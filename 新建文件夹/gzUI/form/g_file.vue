<style lang="less">

.gz-file{
    overflow-y:auto;
    .ivu-tooltip-rel{
        height:100%;
    }

    .gz-file-item{
        width:100%;
        height:40px;
        margin-left:5px;
        margin-top:5px;
        background:#eee;
        img{
            width:35px;
            height:35px;
            margin:5px;
            margin-bottom:0;
            border-radius: 2px;
            position: relative;
            border:1px solid #333;
        }

        .file-icon{
            width:60px;
            height:30px;
            margin:5px;
            border-radius: 2px;
            display: flex;
            align-items: center;;
            justify-content: center;
            span{
                border:none;
                position: relative;
                bottom:0;
                color:#fff;
                z-index: 10;
                line-height: auto;
                box-shadow: none;
            }
        }

        i{
            font-size:20px;
        }
        .name{
            width:100%;
            text-align: left;
        }

        .download{
            margin-right:10px;
            color:rgb(29, 157, 248);
            display: flex;
            justify-content: flex-end;
            span:hover{
                color:rgb(96, 180, 240);
                cursor: pointer;
            }
            width:120px;
        }
    }
}

.gz-file:hover{
    background:#fff;
}
</style>
<template>
<div class='gz-form-item gz-file' :class="!editable?'gz-disabled-item':''">
<span class='gz-label' v-if="label">
        {{label}}
</span>
<div class='gz-image-wrapper'>
    <template v-if="option.list">
         <template v-for="(f,i) in files">
            <div class='gz-file-item flex-between' :key="i">
                <div style="width:70px;">
                <template v-if="isImage(getFileExt(f.name))">
                    <img :src='getFullURL(f.url)' @click="s_download(f.url,f.name)" />
                </template>
                <template v-else>
                    <div class="file-icon" @click="s_download(f.url,f.name)" :style="`background:${getFileExtColor(f.name)}`">
                   
                    <span>{{getFileExt(f.name)}}</span>
                    </div>
                </template>
                </div>
                <div class="name">
                    {{getFileName(f.name)}}
                </div>
                <div class="download">
                        <span @click="s_download(f.url,f.name)" >下载</span>
                        <span  @click="remove(i)" v-if="editable" style="margin-left:10px;">移除</span>
                </div>
                
                <span v-if="f.loading" style='color:red;position:absolute;top:0;left:0;right:0;background:rgba(33,33,33,0.5);color:yellowgreen;text-align:center;'>{{f.percent || "已完成"}}</span>
                <Spin fix v-if="f.loading" />
                
            </div>
            </template>
    </template>
    <template v-else>
    <template v-for="(f,i) in files">
    <div class='gz-image' :key="i">
        <Tooltip style="width:100%;height:100%;" :content="getFileName(f.name)" placement="bottom" transfer>
         <template v-if="isImage(getFileExt(f.name))">
            <img :src='getFullURL(f.url)' @click="s_download(f.url,f.name)" />
         </template>
         <template v-else>
             <div class="file-icon" @click="s_download(f.url,f.name)" :style="`background:${getFileExtColor(f.name)}`">
             <Icon type="ios-document-outline" />
             <span>{{getFileExt(f.name)}}</span>
             </div>
        </template>
         
         </Tooltip>
          <span v-if="f.loading" style='color:red;position:absolute;top:0;left:0;right:0;background:rgba(33,33,33,0.5);color:yellowgreen;text-align:center;'>{{f.percent || "已完成"}}</span>
         <Spin fix v-if="f.loading" />
         <Icon type="md-close" v-if="editable" class='gz-button l-close-btn' @click="remove(i)" />
        
    </div>
    </template>
    </template>
    <div v-if="!editable && files.length == 0" style="margin:10px 20px;color:#aaa;">
        无
    </div>
    <div class='gz-image-add' v-if="editable">
        <Icon type='md-add' />
       
        <input type='file' :multiple="isMultiple" :accept="acceptType" ref='file' @change='handleUpload' :index="index" style='width:100%;height:100%;' />
    </div>
     <!-- <div class='gz-image-add' @click="modalFileSelector=true">
         <Icon type='ios-folder-open' />
        <Icon type='md-add' style="position:absolute;right:5px;bottom:5px;background:#fff;font-size:14px;padding:2px;border-radius:2px;" />
       
    </div> -->

    
</div>  
</div>
</template>
<script>
import axios from 'axios'
const cosService = 'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com'
let axiosCOSClient = axios.create({ baseURL: cosService})
 var CancelToken = axios.CancelToken
import {mapGetters} from 'vuex'
 

/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {cb} 
 */
function getBlob(url,cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
                if (xhr.status === 200) {
                    cb(xhr.response);
                }
        };
        xhr.send();
}

/**
 * 保存
 * @param  {Blob} blob     
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
    } else {
            var link = document.createElement('a');
            var body = document.querySelector('body');

            link.href = window.URL.createObjectURL(blob);
            link.download = filename;

            // fix Firefox
            link.style.display = 'none';
            body.appendChild(link);
            
            link.click();
            body.removeChild(link);

            window.URL.revokeObjectURL(link.href);
    };
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
function download(url, filename) {
    getBlob(url, function(blob) {
        saveAs(blob, filename);
    });
};


export default {
    data(){
        return {
            files:[],
        }
    },
    mounted(){
        if(this.value){
            this.files = this.value.split(';').map(item=>{
                                let [name,url] = item.split(',')
                                return {name,url}
                            })

        this.$forceUpdate()
        }
    },
    props:{
         index:{
            type:[Number,String] 
        },
        label:{
            type:String
        },
        value:{
            type:String
           
        },
        parent:{
            type:Object
        },
        editable:{
            type:Boolean
        },
        option:{
            type:Object,
            default:{}
        },
        axiosServer:{
            type:Object
        }
    },
    watch:{
        value:{
            handler(v){
                try{
                    if(this.value){
                        this.files = this.value.split(';').map(item=>{
                                let [name,url] = item.split(',')
                                return {name,url}
                            })
                    }else{
                        this.files = []
                    }
                  
                }catch(e){
                    console.error('格式错误:',e)
                    this.files = []
                }
            },
            deep:true,
            immediate:true
        }
    },
    computed:{
        ...mapGetters('user',{userinfo:'userinfo'}),
        isMultiple(){
            return this.option.multiple == undefined? true:this.option.multiple
        },
        acceptType(){
            if(this.option.type === "image")
                return "image/*"
            else
                return ""
        }
        },

    methods:{
        s_download(url,name){
           let fullurl = this.getFullURL(url)
           download(fullurl,name)
        },
        getFullURL(key){
            return cosService + '/files/' + key
        },
        handleUpload(e,retryCount=1){
            
           let that = this
           let files = e.srcElement.files
           if(!files)
                return
           let fileObjects = Object.values(files).map(f=>({
               name:f.name,
               size:f.size,
               ext:that.getFileExt(f.name),
               vdisk:this.option.vdisk || 'ref'
           }))
           
           this.axiosServer.post('files',fileObjects).then(res=>{
               let resFiles = res.data.data
               that.files = that.files.concat(fileObjects)
                return Promise.all(fileObjects.map((v,i,a)=>{
                    a[i].loading = true
                    a[i].id = resFiles[i].id
                    let file =  files[i]
                    let filekey = "files/"+resFiles[i].url
                    
                    
                     file.loading = true
                      
                     var formdata = new FormData()
                        formdata.append('key',filekey)
                        formdata.append('file', files[i])

                      
                        fileObjects[i].source = CancelToken.source()
                        return axiosCOSClient.post(cosService,formdata,{ 
                            'content-type': 'multipart/form-data',headers:{Authorization:that.userinfo.coskey
                            },
                            cancelToken:fileObjects[i].source.token,
                            onUploadProgress: progressEvent => {
                                let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                                that.$set(fileObjects[i],'percent',complete)
                            }
                        }).then(res=>{
                            a[i].url = resFiles[i].url
                            delete a[i].loading
                            delete fileObjects[i].source
                            that.$forceUpdate()
                          
                           
                        }).catch(e=>{
                            if(e && e.message == "取消上传"){
                                console.error("EXCEP",e)
                                that.cancelUploading(that.files.findIndex(f=>f==fileObjects[i]))
                                return
                            }
                            return Promise.reject({e,file})
                        })
                })).then(res=>{
                   that.emitChange()
                })

           }).catch((err)=>{
                console.error(err)
               var {e,file} = err
              
                if(typeof(e)=="string"){
                    if(e.includes('403')){
                        if(retryCount){
                            that.$store.dispatch('user/authCOS').then(res=>{
                                that.handleUpload(e,0)
                            })
                        }
                    }
                }else{
                    that.$Modal.warning({
                        title:"图片上传",
                        content:e
                    })
                
                }
                
             
                that.remove(that.files.findIndex(f=>f==e))
            })          
        },
        getFileName(url){
            if(url){
                let fileName = url.replace(/(.*\/)*([^.]+)/i,"$2");
                return fileName
            }
        },  
        getFileExt(url){
            
            if(url){
                let ext = url.substring(url.lastIndexOf(".")+1)
                    return ext
            }
        },
        isImage(ext){
            const imgexts = ['jpg','jpeg','png','gif']
            return imgexts.includes(ext)
        },
        getFileExtColor(url){
            let ext = this.getFileExt(url)
            const colors = {
                doc:"blue",
                docx:"blue",
                rar:"purple",
                pptx:"orange",
                ppt:"orange",
                xls:"green",
                xlsx:"green"
            }

            return colors[ext] || "#333"
        },
        onAddSelectedFiles(files){
            this.files = this.files.concat(files.filter(f=>this.files.findIndex(v=>v.id==f.id) == -1))
        
            this.modalFileSelector = false
        },
        push(u){
            this.files.push(u)
            
            return (this.files.length-1)
        },
        cancelUploading(index){
            if(index == -1)
                return
            if(this.files[index] && this.files[index].source){
                this.files[index].source.cancel('取消上传')
            }
            this.files.splice(index,1)
        },
        emitChange(){
             this.$emit('change',this.files.map(v=>v.name+','+v.url).join(';')) 
        },
        remove(index){
            if(this.files[index] && this.files[index].source){
                this.files[index].source.cancel('取消上传')
               
            }
            this.files.splice(index,1)
            this.emitChange()
        }
    }
}
</script>
<style lang="less">
.gz-image-wrapper{
    display: flex;
    flex-wrap: wrap;
    margin-top:20px;
    padding-bottom:10px;
    padding-right:10px;
}
.gz-image{
     position: relative;
    display: inline-block;
    background: #fff;
    height:60px;
    color: #ddd;
    text-decoration: none;
    display: flex;
    align-items:center;
    justify-content: center;
    border:1px solid #dfdfdf;
    margin-left:10px;
    margin-top:10px;
    width:60px;
    height:60px;
    overflow: visible;

    cursor: pointer;

    img{
        width:90%;
        height:90%;
        margin:5%;
    }
}

.gz-image-add{
    
    .gz-image;
    input{
        position: absolute;
         cursor: pointer !important;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        font-size:0;
    }

    
    i{
        font-size:30px;
        cursor: pointer !important;
        color:#aaa;
    }
}

.gz-image-add:hover{
    cursor: pointer;
    background:yellow;
}

.l-close-btn{
    position: absolute;
    font-size:14px;
    right:-5px;
    top:-5px;
    width:20px;
    height:20px;
    background:darkred;
    border:1px solid #333;
    color:white;
    border-radius: 50%;
    padding:2px;
     display: none;
     z-index:10;
}

.l-close-btn:hover{
    filter:brightness(1.2);
    cursor:pointer;
   
}

.gz-image:hover{
     background: rgb(246, 255, 208);
     color:#eee;

     .l-close-btn{
        display: block;
    }
}

.file-icon{
    color:#fff;
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight:  bold;
    text-shadow: 1px 1px 1px #333;
    i{
        position: absolute;
        top:2px;
        left:2px;
        bottom:2px;
        right:2px;
        font-size:56px;
    }

    span{
        position: relative;
        box-shadow: 1px 1px 1px #333;
        bottom:-10px;
        font-size:10px;
        background:inherit;
        width:40px;
        text-align: center;
        text-transform:uppercase;
        height:18px;
        line-height:16px;
        border:2px solid #fff;
    }
}
</style>
