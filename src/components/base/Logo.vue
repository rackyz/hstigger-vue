<template>
  <div class="l-logo flex-wrap">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597294262168&di=766402bd010bddcbdebb401f0f16f510&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F18%2F20160618173836_mxY4d.gif" />
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
    margin-right:10px;
    border:2px solid #222;
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
