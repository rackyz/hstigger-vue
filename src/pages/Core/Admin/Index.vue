<template>
  <Layout style='overflow:hidden;'>
      <Header style="background:#23334c;color:#fff;font-size:18px;line-height:45px;padding-left:10px;position:relative;text-shadow:0px 0px 2px #000;font-family:Arial Black;color:#dfdfdf;height:45px;"><span style='font-size:30px;color:gold;position:relative;margin-right:10px;'>NEIP<span style='font-size:14px;margin-left:5px;font-weight:bold;'>后台管理</span> </span>
        <div class='hs-light' style='position:absolute;right:10px;top:4px;height:40px;line-height:15px;display:flex;'>
          <template v-for="a in Array(16)">
            <div :key='a' style='margin-right:4px;'></div>
          </template>
          
          </div>
          <div class="hs-caption" style='position:absolute;bottom:0;left:200px;right:0;height:30px;font-size:14px;display:flex;align-items:center;padding:0 20px;border-top-left-radius:20px;color:#ddd;border-bottom:2px solid #fff;' v-if="ActiveMenu"><Icon custom='gzicon gzi-parameter' size='18' style='margin-right:8px;' /> 控制台<Icon type='ios-arrow-forward' size='12' style='margin:0 5px;margin-left:10px;' /><Icon :custom="`gzicon gzi-${ActiveMenu.icon}`" size='16' style='margin-right:7px;' /> {{ActiveMenu.name}}</div>
      </Header>
      <Layout style='flex-direction:row;'>
     <hs-menu style='min-width:200px;width:200px;padding-bottom:60px;padding:0;' :data="menus" @on-select='onClickMenu' :current="ActivePath">
     </hs-menu>
      <Content>
            <router-view></router-view>
      </Content>
      </Layout>
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
    ...mapGetters("admin",['accounts','enterprises','modules','rss','logs']),
    menus(){
      let accountsCount = this.accounts.length
      let enterprisesCount = this.enterprises.length
      let modulesCount = this.modules.length
      let rssCount = this.rss.length
      let typesCount = this.types.length
      let settingsCount = Object.keys(this.session.settings).length
      let logsCount = this.logs.length

      return [{
        name:'总览',
        icon:'bar-chart',
        path:'/core/admin/dashboard',
  
      },{
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
      }]
        },{
          name:"公用数据",
          is_group:true,
          subs:[
            {
          name:'订阅管理',
        icon:"config",
        path:'/core/admin/rss',
          count:rssCount,
        count_color:rssCount?"":"#aaa" 
      },
          {
        name:'项目模板',
        path:'/core/admin/project',
        icon:'xiangmu'
      },{
        name:'流程模板',
        path:'/core/admin/flow',
        icon:'shenjing'
      },{
        name:'文档模板',
        path:'/core/admin/flow',
        icon:'shenjing'
      }]
      },{
        name:'系统配置',
        icon:'apps',
        is_group:true,
        subs:[{
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