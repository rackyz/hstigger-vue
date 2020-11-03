<template>
  <div class='hs-container welcome'>Welcome
    <div class='desc'>欢迎使用企业信息平台</div>
    <Button class='start' @click="RouteTo('/core/dashboard')">开始</Button>
  </div>
</template>

<script>
export default {
  metaInfo:{
    title:'欢迎'
  }
}
</script>
<style lang="less" scoped>
.welcome{
  height:100%; 

  background: #373B44;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4286f4, #373B44);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4286f4, #373B44); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-image:url(https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/cloud/pexels-pixabay-316093.jpg);
  background-size:100% 140%;

  color:#fff;
  text-shadow:2px 2px 5px #000;
  font-size: 80px;
  text-align: center;
  padding-top:200px;
  font-weight: bold;

  .desc{
    font-size:50px;
    font-weight: normal;
  }

  .start{
    width:200px;
    height:65px;
    font-size:35px;
    color:#000;
    background:linear-gradient(to bottom right,rgb(255, 255, 255),rgb(225, 223, 223));
    border:2px solid rgb(179, 179, 179);
    transition: all 0.5s;
  }

  .start:hover{
    background:linear-gradient(to bottom right,rgb(255, 255, 128),rgb(234, 228, 81));
   
    transition: all 0.5s;
    border:2px solid rgb(252, 211, 5);
  }

  .start:active{
    position: relative;
    right:-2px;
    bottom:-2px;
  }
}
</style>