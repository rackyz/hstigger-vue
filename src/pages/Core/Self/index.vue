<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:250px;width:250px;' :data="menus" title="个人中心" @on-select='onClickMenu' :current="ActivePath" />
     
     
    <transition name='fadeIn'>
      <Content>
        <router-view></router-view>
      </Content>
      
    </transition>
     
  
     

  </Layout>
   
  
</template>

<script>
export default {
  data(){
    return {
       menus:[{
        name:'总览',
        icon:'bar-chart',
        path:'/core/admin/dashboard'
      },{
        name:"数据信息",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'我的项目',
        icon:"xiangmu2",
        path:'/core/admin/user'
      },{
        name:'我的任务',
        icon:"eventnote",
        path:'/core/admin/dep'
      },{
        name:'我的流程',
        icon:"lianjieliu",
        path:'/core/admin/role'
      },{
        name:'我的资料',
        icon:"file",
        path:'/core/admin/role'
      }]},
      {
        name:"账号与安全",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'个人资料',
        icon:"edit",
        path:'/core/admin/user'
      },{
        name:'修改密码',
        icon:"quanxianliebiao",
        path:'/core/admin/user'
      }]}]}
    
   
  },
  metaInfo:{
    title:'后台管理'
  },
  computed:{
    ActivePath(){
      return this.$route.path
    }
  },
  methods:{
    onClickMenu(e){
      this.RouteTo(e)
    }
  }
}
</script>

<style>

</style>