<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:250px;width:250px;' :data="menus" title="后台管理" @on-select='onClickMenu' :current="ActivePath" />
     
     
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
        path:'/core/admin/project',
        icon:'xiangmu'
      },{
        name:'工作流(配置)',
        path:'/core/admin/flow',
        icon:'xiangmu'
      },{
        name:'工作流(实例)',
        path:'/core/admin/flowdata',
        icon:'xiangmu'
      },{
        name:'档案资料',
        path:'/core/admin/archive',
        icon:'xiangmu'
      },{
        name:'临时文件',
        path:'/core/admin/file',
        icon:'xiangmu'
      },{
        name:'计划任务',
        path:'/core/admin/task',
        icon:'xiangmu'
      },{
          name:'计划任务',
        path:'/core/admin/task',
        icon:'xiangmu'
      }]
      },{
        name:'系统维护',
        icon:'apps',
        is_group:true,
        subs:[{
          name:'系统日志',
          path:'/core/admin/log',
          icon:'interface'
        },{
          name:'备份和恢复',
          path:'/core/admin/maintain',
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