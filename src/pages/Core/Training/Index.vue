<template>
  <Layout>
    <Header style='background:#fff;border-bottom:1px solid #dfdfdf;height:100px;width:100%;position:relative;display:flex;align-items:center;'>
      <div style="display:flex;flex-direction:column;justify-content:flex-start;">
        <div style="font-size:10px;color:#aaa;line-height:10px;">宁波高专</div>
        <div style="font-size:24px;line-height:40px;">培训中心</div>
      </div>
      

      <a style="position:absolute;right:20px;bottom:0px;color:#3af;">
        讲师入口 >>
      </a>
    </Header>
    <Content>
      <router-view></router-view>
    </Content>
    
  </Layout>
</template>

<script>
export default {

}
</script>

<style>

</style>