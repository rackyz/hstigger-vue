<template>
  <Layout >
    <Header style='background:#fff;border-bottom:1px solid #333;height:100px;width:100%;position:relative;display:flex;align-items:center;text-shadow:1px 1px 1px #333;background:url("https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/upload/pexels-photo-3789871.jpeg")'>
      <div style="display:flex;flex-direction:column;justify-content:flex-start;">
        <div style="font-size:10px;color:#3ef;line-height:10px;">宁波高专</div>
        <div style="font-size:24px;line-height:40px;color:#fff;font-weight:bold;" @click="RouteTo('/core/training/admin')">培训中心</div>
              </div>
      

      <Button style="position:absolute;right:20px;bottom:20px;color:#333;background:#ffffff77;" @click="RouteTo('/core/training/admin')" v-if="isAdmin && !isAdminPage" icon="md-settings">
        后台管理
      </Button>
    
    </Header>
    <div style="background:url('https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/upload/pexels-photo-3789871.jpeg');background-position:-30px;color:#fff;height:40px;padding:0 40px;display:flex;align-items:center;overflow:hidden;">
      <a style=";padding:10px 25px;" @click="RouteTo('/core/training/admin')" :style="path=='/core/training/admin'?'color:#3ef;font-weight:bold;text-shadow:1px 1px 1px #000;background:#00000077;border-radius:2px;':''">项目列表</a>
      <a style="padding:10px 25px;" @click="RouteTo('/core/training/statistic')" :style="path=='/core/training/statistic'?'color:#3ef;font-weight:bold;text-shadow:1px 1px 1px #000;background:#00000077;border-radius:2px;':''">统计数据</a>
    </div>
    <Content style="overflow-y:auto;padding-bottom:50px;position:relative;">
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
      return this.path == '/core/training/admin' || this.path == '/core/training/statistic'
    }
  }
}
</script>

<style>

</style>