<template>
<transition name="fade">
  <template v-if="initing">
      <div>{{error || "系统初始化中..."}}</div>
  </template>
  <template v-else>
    <router-view />
  </template>
   </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import api from './plugins/api'
  export default {
    name: 'App',
    data(){
      return {
        initing:false,
        error:""
      }
    },
    metaInfo: {
      title: '首页',
     titleTemplate: '%s | 企业信息平台',
     htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    computed:{
      ...mapGetters('core',['dashboard_path','session'])
    },
    watch:{
      $route:{
        handler(e){
          var that = TouchList
          this.$store.dispatch('core/auth',e.fullPath).then(authed=>{
            if(authed == false){
               this.$router.replace(this.dashboard_path)
            }
          })
            
        }
      }
    },
    created(){
      if(api && api.inited)
        return
      this.initing = true
      this.$store.dispatch('ctx/Init',Vue).then(res=>{
        this.initing = false
        
      }).catch(e=>{
        this.error = e
      })
    }
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


