<template>
    <iframe :src='src' v-if="url" />
    <span v-else>该文件无法预览</span>
</template>

<script>
let server = 'url'
export default {
   props:['url'],
  computed:{
    isDOC(){
      if(this.url.slice(-3) == 'doc')
        return true
    },
    src(){
      if(this.isDOC){
        return "https://view.officeapps.live.com/op/view.aspx?src="+this.url
      }
      return this.url
    }
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