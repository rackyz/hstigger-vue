<template>
    <iframe :src='src' v-if="url" />
    <span v-else>该文件无法预览</span>
</template>

<script>
let server = 'url'
export default {
   props:['url'],
  computed:{
   
    src(){
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