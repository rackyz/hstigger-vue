<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<script>
  export default {
    name: 'App',
    metaInfo: {
      title: '首页',
    //  titleTemplate: '%s | 企业信息平台',
       titleTemplate: '%s | 宁波高专建设项目管理系统',
     htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  }
</script>

<style lang="less">
  @import "../public/css/transitions.less";
  @import "../public/css/styles.less";
  
 
  .extra-padding{
    padding-bottom: 96px !important;
    padding-top: 96px !important;
  }

  @media screen and (max-width: 959px){
    .extra-padding{
      padding-top: 48px !important;
      padding-bottom: 48px !important;
    }
  }
</style>


