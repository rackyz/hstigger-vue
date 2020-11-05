<template>
  <div class="l-logo flex-wrap">
    <img src="https://file-1301671707.cos.ap-chengdu.myqcloud.com/nbgz.png" />
    <a href="/core"><span style='color:rgb(35, 240, 255)'>N</span>EIP</a> <span style='font-size:17px;color:#aaa;'>1.0</span>
    
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
  font-family:Arial;
  font-size:18px;
  margin-right:10px;
  padding:2px 5px;
  text-shadow:1px 1px 1px #333;
  img{
    width:25px;
    height:25px;
    margin-right:5px;
    border:1px solid rgb(0, 100, 131);
    filter:drop-shadow(1px 1px 1px #333);
    box-shadow:1px 1px 2px #333;
  }

  a{
    color:#fff;filter:drop-shadow(1px 1px 2px #000)
  }

  .l-version{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size:10px;
    padding:0px 5px;
    color:#999;
    
    margin-left:3px;
    border-radius: 3px;
    text-shadow: 1px 1px 1px #333;
  }
  
}

</style>
