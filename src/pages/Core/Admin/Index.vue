<template>
  <Layout style='flex-direction:row;'>
    
     <hs-menu :data="menus" title="后台管理" @on-select='onClickMenu' :current="ActivePath" />
     
     
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
        name:'用户管理',
        icon:"user",
        path:'/core/admin/user'
      },{
        name:'部门管理',
        icon:"organization",
        path:'/core/admin/dep'
      },
      ,{
        name:'角色权限',
        icon:"quanxianliebiao",
        path:'/core/admin/role'
      },{
        name:'项目管理',
        icon:'apps',
        is_group:true,
        subs:[{
          name:'布局 Layout',
          path:'/layout',
          icon:'interface'
        }]
        },{
          name:"HSUI 组件",
          is_group:true,
          subs:[
          {
        name:'菜单',
        path:'/menu',
        icon:'xiangmu'
      }]
      }]
    }
   
  },
  metaInfo:{
    title:'后台容器'
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