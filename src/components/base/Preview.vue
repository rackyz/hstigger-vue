<template>
    <iframe :src='src' v-if="src" />
    <span v-else style="margin:10px;">该文件格式 {{getFileExt(url)}} 无法预览,点击<a :href="url">下载</a></span>
</template>

<script>
let server = 'url'
export default {
   props:['url'],
  computed:{
    isOffice(){
      const exts = ['doc','docx','xls','xlsx','ppt','pptx']
      if(exts.includes(this.getFileExt(this.url)))
        return true
    },
    isPreviewable(){
      const exts = ['pdf','gif','jpeg','png','jpg']
      if(exts.includes(this.getFileExt(this.url)))
        return true
    },
    src(){
      if(this.isOffice){
        return "https://view.officeapps.live.com/op/view.aspx?src="+this.url
      }else if(this.isPreviewable)
        return this.url
    }
  },methods:{
    getFileExt(url) {
			if (url) {
				let ext = url.substring(url.lastIndexOf(".") + 1);
				return ext;
			}
		},
  }
}
</script>

<style lang="less" scoped>
iframe{
  width:100%;
  height:100%;
  border:none;
  position: relative;
  z-index:0;
}
</style>