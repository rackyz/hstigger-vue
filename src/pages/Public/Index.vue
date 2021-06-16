<template>
  <div class="l-wrapper">
    <div class="l-status">
        English
    </div>
    
  
    <div class="l-content">
      
    <router-view></router-view>
    </div>
    <div class="l-footer footer">
        <div>Copyright © 2019-2022
        <Icon custom='gzicon gzi-nbgz' /> {{companyName}}
      </div>
      <div><a
          href="https://beian.miit.gov.cn/"
          style='color:#aaa;'
        >浙ICP备18011212号-3</a></div>
    </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.l-wrapper{
   background:linear-gradient(to bottom right,#fff,#eee);
   width:100%;
   height:100%;
   position: relative;
   color:#333;
   overflow: hidden;
   overflow-y:auto;

  .l-inner{
    margin:0 auto;
    width:1200px;
  }

  .l-status{
    background:#345;
    color:#fff;
    height:25px;
    padding:0 10px;
    display: flex;
    align-items: center;
  }

   .l-header{
     height:120px;
     padding:20px;
     h1{
       font-size:30px;
       font-weight: bold;
       color:#333;
     }
   }

   .l-footer{
     background:linear-gradient(to bottom right,#345,#357);
     height:200px;
     position: relative;
     margin:0 !important;
     margin-top:20px !important;
     color:#fff;
     
   }
}
</style>