<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:250px;width:250px;padding-bottom:60px;' :data="menus" title="后台管理" @on-select='onClickMenu' :current="ActivePath" />
     
     
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
        name:'企业系统总览',
        icon:'bar-chart',
        path:'/core/admin/dashboard'
      },{
        name:'平台信息总览',
        icon:'area-chart',
        path:'/core/admin/root_dashboard'
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
        name:'企业基础数据维护',
        icon:'apps',
        is_group:true,
        subs:[{
          name:'企业配置',
          path:'/core/admin/config',
          icon:'controls-5'
        },{
          name:'平台对接',
          path:'/core/admin/tool',
          icon:'codelibrary-fill'
        },{
          name:'类型管理',
          path:'/core/admin/type',
          icon:'tag'
        },{
          name:'系统日志',
          path:'/core/admin/log',
          icon:'rizhi'
        },{
          name:'备份和恢复',
          path:'/core/admin/maintain',
          icon:'config'
        }]
        },{
        name:'平台基础数据维护',
        icon:'apps',
        is_group:true,
        subs:[{
          name:'管理员账户',
          path:'/core/admin/ruser',
          icon:'user'
        },{
          name:'企业账户',
          path:'/core/admin/euser',
          icon:'user'
        },{
          name:'功能配置',
          path:'/core/admin/type',
          icon:'tag'
        },{
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