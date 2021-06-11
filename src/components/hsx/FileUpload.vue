<template>
  <a @click.self="onClickSlot" style="color:yellow;">
      
      <slot></slot>
      <input type="file" ref='file' style="visibility:hidden;position:absolute;"  @change="handleUpload" :accept="accept" :multiple="multiple" /> 
      <a v-if="value && editable" style="margin-left:10px;color:yellow;" @click.prevent="onSelectFile">重传</a>
      <br />
      <span style='color:#aaa'>{{value}}</span>
  </a>
</template>

<script>
export default {
  data(){
    return {
      file:{}
    }
  },
  props:['value','accept','multiple','editable'],
  methods:{
    onClickSlot(e){
      if(this.value || !this.editable)
        this.DownloadWithName(this.value,'作业')
      else
        this.onSelectFile(e)
      
    },
    onSelectFile(e){
      this.$refs.file.click()
    },
    getFileExt(url) {
			if (url) {
				let ext = url.substring(url.lastIndexOf(".") + 1);
				return ext;
			}
    },
    onUploadProgressList(percent){
      this.percent = percent

    },
    handleUpload(e){
      let file = this.$refs.file.files[0]
      let fileObject = {
        name: file.name,
        size: file.size,
                ext: this.getFileExt(file.name),
              
                loading:true,
        vdisk:  "ref",
            };
      this.file = fileObject
      this.$store.dispatch('file/upload',{files:[fileObject],onProgress:this.onUploadProgressList}).then(res=>{
        
              if(!Array.isArray(res))
                throw("文件上传失败")
              fileObject.url = res[0].url
              this.value = fileObject.url
              this.$emit('change',fileObject.url)
            })

        
    
      },
    
  }
}
</script>

<style>

</style>