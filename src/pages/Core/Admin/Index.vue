<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:250px;width:250px;' :data="menus" title="后台管理" @on-select='onClickMenu' :current="ActivePath" />
     
     
    <transition name='fadeIn'>
      <Content>
        	<div class="hs-caption" v-if="ActiveMenu"><Icon :custom="`gzicon gzi-${ActiveMenu.icon}`" /> {{ActiveMenu.name}}</div>
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
        name:'项目管理',
        path:'/core/admin/project',
        icon:'xiangmu'
      },{
        name:'工作流(配置)',
        path:'/core/admin/flow',
        icon:'shenjing'
      },{
        name:'工作流(实例)',
        path:'/core/admin/flowinstance',
        icon:'lianjieliu'
      },{
        name:'档案资料',
        path:'/core/admin/archive',
        icon:'xiangmu2'
      },{
        name:'文件管理',
        path:'/core/admin/file',
        icon:'file'
      },{
        name:'计划任务',
        path:'/core/admin/task',
        icon:'renwujincheng'
      },{
          name:'数据记录',
        path:'/core/admin/record',
        icon:'jiludanzilishijilu'
      }]
      },{
          name:"应用管理",
          is_group:true,
          subs:[
          {
        name:'项目管理',
        path:'/core/admin/project',
        icon:'xiangmu'
      },{
        name:'工作流(配置)',
        path:'/core/admin/flow',
        icon:'shenjing'
      }]
      },{
        name:'系统维护',
        icon:'apps',
        is_group:true,
        subs:[{
          name:'系统日志',
          path:'/core/admin/log',
          icon:'rizhi'
        },{
          name:'备份和恢复',
          path:'/core/admin/maintain',
          icon:'config'
        }]
        },]
    }
   
  },
  metaInfo:{
    title:'后台管理'
  },
  computed:{
    MenuMap(){
      let map = {}
      this.menus.forEach(v=>{
        map[v.path] = v
        if(Array.isArray(v.subs)){
          v.subs.forEach(s=>{
            map[s.path] = s
          })
        }
      })
      return map
    },
    ActiveMenu(){
      return this.MenuMap[this.ActivePath]
    },
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