<template>
  <Layout style='height:100%;'>
    <BaseAppBar style='width:100%;'></BaseAppBar>
    <div style='margin-top:44px;height:100%;width:100%;position:relative;'>
      <router-view></router-view>
    </div>
    
  </Layout>
  
</template>

<script>
export default {
  metaInfo:{
    title:"首页"
  },
  mounted(){
    this.$store.dispatch('core/whoami')
  }
}
</script>

<style>

</style>