<template>
<div
  class='hs-loading-bar'
>
<div class='inner'>

</div>
</div>
</template>
<script>
export default{

}
</script>
<style lang='less' scoped>
.hs-loading-bar{
  height:1px;
  width:100%;
  background:#000;
  overflow:visible;
  .inner{
    width:100px;
    height:1px;
    background:#5ae;
    box-shadow:1px 1px 1px #5de;
    filter:drop-shadow(1px 1px 5px #5ae);
    position:absolute;
    animation:progress 10s infinite ease-in-out;
    left:30px;
  }
}

@keyframes progress{
  0%{
    left:-100px;
    width:60px;

  }
  50%{
    width:100px;
  }
  100%{
    left:100%;
    width:80px;
  }
}
</style>