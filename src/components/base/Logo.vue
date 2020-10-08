<template>
  <div class="l-logo flex-wrap">
    <img src="https://file-1301671707.cos.ap-chengdu.myqcloud.com/nbgz.png" />
    <a href="/core">企业信息平台</a>
    <span class='l-version'>v 1.0.0</span>
  </div>
 
</template>

<script>
  export default {
    name: 'BaseImage',
  }
</script>
<style lang="less" scoped>
.l-logo{
  display: flex;
  align-items: center;
  font-weight: bold;
  color:#fff;
  font-size:16px;
  margin-right:10px;
  img{
    width:30px;
    height:30px;
    margin-right:5px;
    border:1px solid rgb(0, 100, 131);
  }

  a{
    color:#fff;filter:drop-shadow(1px 1px 2px #000)
  }

  .l-version{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size:10px;
    padding:0px 5px;
    background:#39f;
    margin-left:10px;
    border-radius: 10px;
    text-shadow: 1px 1px 1px #333;
  }
  
}

</style>
