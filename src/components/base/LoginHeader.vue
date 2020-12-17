<template>
  <div class="system-name">
    
    <div class="caption">企业信息平台</div> 
    <div class="version">
     NINGBO GAOZHUAN EIP PLATFORM <span style='color:gold'>v1.0</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>


.system-name{
 
  color:#fff;
  display:flex;
  flex-direction:column;
  .caption{
     font-size:2.6rem;
    text-shadow:1px 1px 1px #000;
  }

  
}
.version{
  font-size:10px;
  
     margin-top:-5px;
  border-radius: 5px;
  line-height:20px;
  padding:0;
  padding-right:5px;
  text-align: center;
  color:#aaa;
  i{
    position:relative;
    top:-1px;
    padding:0px 1px;
  }
}
</style>