<template>
  <Layout>
    <Header style='background:#fff;border-bottom:1px solid #234;height:100px;width:100%;position:relative;display:flex;align-items:center;text-shadow:1px 1px 1px #333;background:url("https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/upload/pexels-photo-3789871.jpeg")'>
      <div style="display:flex;flex-direction:column;justify-content:flex-start;">
        <div style="font-size:10px;color:#3ef;line-height:10px;">宁波高专</div>
        <div style="font-size:24px;line-height:40px;color:#fff;font-weight:bold;" @click="RouteTo('/core/training/admin')">培训中心</div>
              </div>
      

      <a style="position:absolute;right:20px;bottom:0px;color:#3af;" @click="RouteTo('/core/training/admin')" v-if="isAdmin && !isAdminPage">
        后台管理 >>
      </a>
      <a style="position:absolute;right:20px;bottom:0px;color:#fff;" @click="RouteTo('/core/training/dashboard')" v-if="isAdmin && isAdminPage">
        返回 培训列表 >>
      </a>
      
    
    </Header>
    <div style="background:url('https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/upload/pexels-photo-3789871.jpeg');background-position:-30px;color:#fff;height:40px;padding:0 20px;display:flex;align-items:center;">
      
    </div>
    <Content>
      <router-view></router-view>
    </Content>
    
  </Layout>
</template>

<script>
export default {
  computed:{
    isAdmin(){
      return this.$store.getters['core/session'].my_deps.includes(69071263)
    },
    path(){
      return this.$route.path
    },
    isAdminPage(){
      return this.path == '/core/training/admin'
    }
  }
}
</script>

<style>

</style>