<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:200px;width:200px;padding-bottom:60px;padding:0;' :data="menus" @on-select='onClickMenu' :current="ActivePath">
     </hs-menu>
      <transition name='fadeIn'>
      <Content>
        	<div class="hs-caption" v-if="ActiveMenu"><Icon :custom="`gzicon gzi-${ActiveMenu.icon}`" /> {{ActiveMenu.name}}
          </div>
          <router-view></router-view>
     </Content>
      </transition>
      
  </Layout>
   
  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  metaInfo:{
    title:'后台管理'
  },
  computed:{
    ...mapGetters("core",['session','types']),
    ...mapGetters("admin",['accounts','enterprises','modules','rss','logs','flows']),
    menus(){
      let accountsCount = this.accounts.length
      let enterprisesCount = this.enterprises.length
      let modulesCount = this.modules.length
      let rssCount = this.rss.length
      let typesCount = this.types.length
      let settingsCount = Object.keys(this.session.settings).length
      let logsCount = this.logs.length
      let flowsCount = this.flows.length

      return [{
        name:"账号管理",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'账户管理',
        icon:"user",
        path:'/core/admin/account',
        count:accountsCount,
        count_color:accountsCount > 0?"":"#aaa"
      },{
        name:'企业管理',
        icon:"organization",
        path:'/core/admin/enterprise',
        count:enterprisesCount,
        count_color:enterprisesCount > 0?"":"#aaa"
      },{
        name:'应用管理',
        icon:"apps",
        path:'/core/admin/module',
        count:modulesCount,
        count_color:modulesCount?"":"#aaa" 
      },{
          name:'订阅管理',
        icon:"config",
        path:'/core/admin/rss',
          count:rssCount,
        count_color:rssCount?"":"#aaa" 
      },]
        },{
          name:"共享资源",
          is_group:true,
          subs:[
          
            {
        name:'流程模板',
        path:'/core/admin/flow',
        icon:'shenjing',
          count:flowsCount,
        count_color:flowsCount?"":"#aaa" 
      },
          {
        name:'项目模板',
        path:'/core/admin/prjtemp',
        icon:'xiangmu'
      }, {
        name:'文档模板',
        path:'/core/admin/doctemp',
        icon:'shenjing'
      }]},{
          name:"公共平台数据 (不可见)",
          is_group:true,
          subs:[
       {
        name:'项目实例',
        path:'/core/admin/project',
        icon:'xiangmu'
      },{
        name:'流程实例',
        path:'/core/admin/project',
        icon:'xiangmu'
      },{
        name:'文件实例',
        path:'/core/admin/project',
        icon:'xiangmu'
      },]
      },{
        name:'系统配置',
        icon:'apps',
        is_group:true,
        subs:[{
        name:'通知公告',
        path:'/core/admin/notice',
        icon:'shenjing'
      },{
          name:'系统类型',
          path:'/core/admin/type',
          icon:'tag',
           count:typesCount,
          count_color:typesCount > 0?"":"#aaa"
        },{
          name:'系统配置',
          path:'/core/admin/setting',
          icon:'switch',
          count:settingsCount,
          count_color:settingsCount>0?"":"#aaa"
        },{
          name:'系统日志',
          path:'/core/admin/log',
          icon:'rizhi',
          count:logsCount,
          count_color:logsCount>0?"":"#aaa"
        },{
          name:'备份和恢复',
          path:'/core/admin/maintain',
          icon:'config'
        }]
        },]
    },
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
  mounted(){
    this.$store.dispatch('admin/ListUsers')
    this.$store.dispatch('admin/GetEnterprises')
    this.$store.dispatch('admin/GetModules')
    this.$store.dispatch('admin/GetRss')
    this.$store.dispatch('admin/GetLogs')
    this.$store.dispatch('admin/GetFlows')
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