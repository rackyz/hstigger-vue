<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:200px;' :data="menus" title="后台管理" @on-select='onClickMenu' :current="ActivePath" />
     
     
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
        name:"账号与权限",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'用户管理',
        icon:"user",
        path:'/core/admin/user'
      },{
        name:'部门管理',
        icon:"organization",
        path:'/core/admin/dep'
      }
      ,{
        name:'角色权限',
        icon:"quanxianliebiao",
        path:'/core/admin/role'
      }]
        },{
          name:"数据管理",
          is_group:true,
          subs:[
          {
        name:'项目',
        path:'/menu',
        icon:'xiangmu'
      },{
        name:'任务流程',
        path:'/menu',
        icon:'xiangmu'
      },{
        name:'审批',
        path:'/menu',
        icon:'xiangmu'
      },{
        name:'档案资料',
        path:'/menu',
        icon:'xiangmu'
      },{
        name:'临时文件',
        path:'/menu',
        icon:'xiangmu'
      },{
        name:'工作',
        path:'/menu',
        icon:'xiangmu'
      }]
      },{
        name:'系统维护',
        icon:'apps',
        is_group:true,
        subs:[{
          name:'系统日志',
          path:'/layout',
          icon:'interface'
        },{
          name:'备份和恢复',
          path:'/layout',
          icon:'interface'
        }]
        },]
    }
   
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