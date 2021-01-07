<template>
  <Layout style='height:100%;'>
    <BaseAppBar style='width:100%;'></BaseAppBar>
    <transition name='fade'>
      <div class='screen-saver' v-show="idle">
        <div class="flex-wrap" style='width:520px;position:relative;bottom:-30px;' > 高专企业云</div>
        <BaseNow /></div>
    </transition>
    <div style='margin-top:44px;height:100%;width:100%;position:relative;' v-if='session.token'>
       <BaseLoadingBar v-show='loading' />
      <router-view></router-view>
    </div>
    
  </Layout>
  
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      idle:true
    }
  },
  metaInfo:{
    title:"首页"
  },
  computed:{
    ...mapGetters('core',['session','loading'])
  },
  mounted(){
    let timer = null
    this.$store.dispatch('core/whoami')
    document.onmousemove = ()=>{
      this.idle = false
      if(timer){
        clearTimeout(timer)
      }
      timer = setTimeout(()=>{
        this.idle = true
      },10000)
    }
  }
}
</script>
<style lang="less">
.screen-saver{
  position: fixed;
  left:0;
  top:0;
  bottom:0;
  right:0;
  z-index:1000;

  backdrop-filter: blur(15px) brightness(0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size:25px;
  color:#aaa;
  .date-info{
    
    .date-info__left{
      i{
         font-size:90px !important;
        color:#aaa !important;
        margin-right:5px;
      }
      font-size:100px !important;
      color:#aaa;
    }
    .date-info__right{
      font-size:30px !important;
      color:#aaa;
    }
  }
  
}
</style>