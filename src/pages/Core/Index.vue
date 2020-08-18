<template>
  <Layout>
    <BaseAppBar></BaseAppBar>
    <div style='margin-top:50px'>
      <router-view></router-view>
    </div>
    
  </Layout>
  
</template>

<script>
export default {
  metaInfo:{
    title:"首页"
  }
}
</script>

<style>

</style>