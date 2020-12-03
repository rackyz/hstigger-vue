
<template>
  <Card class="panel" padding='0' style='margin-top:10px;'>
       <div class='card-title'><Icon type='md-folder-open' size='19' /> 临时文件  {{loading?' - 读取中...':''}} <span style='float:right;' class='card-more' @click='RouteTo("/core/self/file")'>MORE</span></div>
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
               <div class='flex-wrap' @click='PreDownload(f.id)'>
                 <div class="file-icon" :style="`background:${getFileExtColor(f.ext)}`">
                   
                    <span>{{f.ext}}</span>
                    </div>
                 
                 
                  <div class="title">{{f.name}} <img class='new' src="https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/kt/new.gif" v-if="isNew(f.created_at)" /></div>
                  </div>

               <div class='flex-wrap'>
               <a @click='Delete(f)' href='#' style='margin-left:5px;border:1px solid #dfdfdf;'><Icon type='md-trash' size='20' color='#aaa'></Icon></a>
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
       console.log("EXT:",ext)
			const colors = {
				doc: "blue",
				docx: "blue",
				rar: "purple",
				pptx: "orange",
				ppt: "orange",
				xls: "green",
        xlsx: "green",
        jpg:"purple",
        psd:"darkcyan",
        png:"#aaa",
        gif:"green"
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
    Delete(f){
      this.Confirm(`确定删除文件'${f.name}'`,()=>{
        this.$store.dispatch('DeleteFiles',[f.id])
      })
    },
    PreDownload(file_id){
      this.CORE.GET_FILE({param:{id:file_id}}).then(res=>{
        
        let url = res.data.data
      
        this.Download(this.makeURL(url))
      }).catch(e=>{
        this.Error(e)
      })
    },
    isNew(date){
      return moment().isAfter(moment(date).subtract(3,'days'))
    }
   }
}
</script>
<style lang="less" scoped>
.content{
  padding:5px 10px;
  

}
</style>