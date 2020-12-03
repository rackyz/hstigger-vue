
<style lang="less" >

.card-title{
  margin:0;
  padding:5px 10px;
  border-bottom:1px solid #eee;
  width:inherit !important;
  text-align: left;
}

</style>
<template>
  <Card class="panel" padding='0' style='margin-top:10px;'>
       <div class='card-title'><Icon type='md-folder-open' size='19' /> 临时文件 / {{loading?'读取中...':''}} <span style='float:right'>MORE</span></div>
        <Upload
        multiple
        style="margin:5px;"
        type="drag"
        :show-upload-list='false'
        :before-upload="onUploadFile">
        <div style="padding: 20px 0;">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽文件到此处上传个人临时文件</p>
        </div>
       
    </Upload>
     <div class="content">
            <template v-for="f in files">
            <div :key="f.id" class="file-item">
               <div class='flex-wrap'>
                 <div class="file-icon" :style="`background:${getFileExtColor(f.name)}`">
                   
                    <span>{{f.ext}}</span>
                    </div>
                 
                 
                  <div class="title">{{f.name}} <img class='new' src="https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/kt/new.gif" v-if="isNew(f.created_at)" /></div>
                  </div>

               <div class='flex-wrap'>
               <a @click='PreDownload(f.id)' href='#' style='border:1px solid #dfdfdf;'><Icon type='md-download'  size='20' /></a>
               <a @click='PreDelete(f.id)' href='#' style='margin-left:5px;border:1px solid #dfdfdf;'><Icon type='md-trash' size='20' color='#aaa'></Icon></a>
               </div>
            </div>
          </template>
         
        </div>
    <Card dis-hover style="margin-top:10px;" padding="0" v-if="uploadingFiles.length != 0">
        上传中...<br />
        {{uploadingFiles.map(v=>`${v.name}(${v.percent})`).join(',')}}
      </Card>
     
    </Card>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      loading:false
    }
  },
  mounted(){
    this.getData()
  },

    computed:{
      ...mapGetters('file',['files','uploadingFiles','makeURL']),
    },
   methods:{
     getData(){
       this.loading = true
       this.$store.dispatch('file/query').then(res=>{

       }).finally(e=>{
         this.loading = false
       })
     },
     getFileExtColor(ext) {
       ext = ext.toLowerCase()
			const colors = {
				doc: "blue",
				docx: "blue",
				rar: "purple",
				pptx: "orange",
				ppt: "orange",
				xls: "green",
				xlsx: "green",
			};

			return colors[ext] || "#333";
		},
     onUploadFile(e){
      
      this.$store.dispatch('file/upload',{files:e}).then(res=>{
        this.Success({
          title:'上传成功',
          desc:"文件已上传完毕"
        })
      }).catch(e=>{
         this.Error(e)
      })
      return false
    },
    PreDownload(file_id){
      this.CORE.GET_FILE({param:{id:file_id}}).then(res=>{
        
        let url = res.data.data
        console.log("URL:",this.makeURL(url))
        return
        this.Download(this.makeURL(url))
      }).catch(e=>{
        this.Error(e)
      })
    },
    isNew(date){
      return moment().isBefore(moment(date).subtract(3,'days'))
    }
   }
}
</script>
<style lang="less" scoped>
.content{
  padding:5px 10px;
  .file-item{
    width:100%;
    background:#eee;
    display: flex;
    align-items: center;
    background:#fff;
    justify-content: space-between;
    padding:3px 0;


    .file-icon{
            width:60px;
            height:30px;
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
  }

  .title{
    padding:0 5px;
    width:200px;
    text-overflow: ellipsis;
    background:linear-gradient(to right,#eee,#eeeeee00);
    height:30px;
    line-height:30px;
    white-space: nowrap;
  }
}
</style>