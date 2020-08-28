<template>
    <iframe :src='src' />
</template>

<script>
let server = 'http:///192.168.14.40:82/_apps/'
 if(process.env.NODE_ENV  == 'production')
      server = 'https://cloud.nbgzpmis.xyz/_apps/'
export default {
  computed:{
    src(){
      console.log('appkey:',this.$route)
      let appkey =  this.$route.params.appkey
     
      return server+appkey
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