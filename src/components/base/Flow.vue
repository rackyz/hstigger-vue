<template>
  <div class="hs-contaner-full" style='padding:0;'>
    <div class='paper-view'>
    
    </div>
    <div class='side-wrapper' style='right:0px;'>
        <Card>
        图
      </Card>
        <Card style='margin-top:10px;'>
        操作
      </Card>
    </div>
    <div class='side-wrapper' style='left:0px;'>
         <Card>
        表单
      </Card>
    </div>
  </div>
</template>

<script>
export default {
 props:['key']
}
</script>

<style lang="less" scoped>
.paper-view{
  border:1px solid #aaa;
  width:963px;
  margin:0px auto;
  min-height:1000px;
  background:linear-gradient(to bottom right,#fff,#eee,#fff);
  
}

.side-wrapper{
  position:absolute;
  top:0px;
  width:300px;
  min-height:1000px;
  background:#333;
}
</style>