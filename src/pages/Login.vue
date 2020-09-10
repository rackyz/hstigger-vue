
<template>
   <div class="page">
      <div class="login">
          <BaseLoginHeader />
          <BaseLogin style="margin-top:20px;" :routeTo="'/core'" />  
          <BaseOAuthLogin style='margin-top:20px;' />
      </div>
   </div>
</template>
<script>
export default {
   metaInfo: { title: '用户登录' }
}
</script>
