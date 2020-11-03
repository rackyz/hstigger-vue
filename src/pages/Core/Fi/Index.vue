<template>
  <div class='hs-container'>
    <div class='caption'>
      <div class='title'>财务管理 <div class='sub'>Financial Management</div></div>

      <ul class='menus'>
          <li class='active'>首页</li>
          <li>开票</li>
          <li>报销</li>
          <li>领用金</li>
      </ul>
    </div>
    <div style='height:calc(100% - 80px)'>
      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.caption{
  height:80px;
  filter:drop-shadow(1px 1px 3px #aaa);
  border-bottom:1px solid #aaa;
  background:#fff;
  display: flex;
  align-items: center;
  padding:0 15px;
  .title{
    font-size:25px;
    line-height:25px;
    .sub{
      font-size:18px;
    }
  }
  .menus{
    position: absolute;
    bottom:0;
    left:250px;
    list-style: none;
    display: flex;
    li{
      margin-right:5px;
      border:1px solid #000;
      border-bottom:none;
      width:80px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background:linear-gradient(to bottom right,rgb(91, 90, 90),rgb(108, 108, 108));
      text-align: center;
      color:#fff;
      text-shadow: 1px 1px 1px #333;
      cursor: pointer;
    }

    .active{
      background:#369;
      position: relative;
      width:120px;
      transition: all 0.5s;
    }
  }
}
</style>