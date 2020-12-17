
<template>
   <div class="page page-debug">
      <div class="login">
          <BaseLoginHeader />
          <BaseLogin style="margin-top:20px;" :routeTo="'/core'" />  
       
      </div>
      <div class='footer'>
       
        <div>Copyright © 2019-2021 宁波高专建设监理有限公司 | </div>
        <div><a href="https://beian.miit.gov.cn/" style='color:#ddd;'>浙ICP备18011212号-3</a></div>
      </div>
   </div>
</template>
<script>
export default {
   metaInfo: { title: '用户登录' }
}
</script>
