<template>
  <div class='hs-container' style='background:#fff;height:100%;'>
    <div class='hs-group'>
      <div class='hs-group-title'>用户登录</div>
      <div class='hs-item'>
        启用新用户注册 <i-switch></i-switch>
      </div>
      <div class='hs-item'>
         启用第三方平台登录 <i-switch></i-switch>
      </div>
    </div>
    
     <div class='hs-group'>
      <div class='hs-group-title'>菜单栏</div>
      <div class='hs-item'>
        快捷访问可自定义的最大数量 <InputNumber size='small' style='width:60px;margin-right:5px;' />
      </div>
      <div class='hs-item'>
         启用第三方平台登录 <i-switch></i-switch>
      </div>
    </div>
   
  </div>


</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.hs-container{
  padding:10px;
}
.hs-group{
  padding:10px 20px;
  .hs-group-title{
    font-weight: bold;

    margin:5px 0;
    color:#333;
    font-size:16px;
    border-bottom:3px solid orange;
    padding:2px 5px;
    width:100px;
  }

  .hs-item{
    padding:5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 500px;
    border-radius: 20px;
  
  }

  .hs-item:hover{
    transition: all 0.5s;
    background:linear-gradient(to right,#fff,#aaa);
    
  }
}
</style>