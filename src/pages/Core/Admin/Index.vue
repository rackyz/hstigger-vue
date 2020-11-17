<template>
  <Layout style='overflow:hidden;'>
      <Header style="background:#23334c;color:#fff;border-left:5px solid #23334c;font-size:25px;padding-left:10px;position:relative;text-shadow:-2px -2px 2px #000;"> 平台管理 
            <div style='position:absolute;right:10px;top:8px;font-size:10px;color:#aaa;height:20px;line-height:20px;font-family:arial;text-shadow:-1px -1px 1px #333;'>
              Ningbo Gaozhuan Enterprise Information Platform ADMIN / 后台管理
            </div>
          	<div class="hs-caption" style='position:absolute;bottom:0;left:150px;right:0;height:30px;font-size:14px;display:flex;align-items:center;padding:0 20px;border-top-left-radius:20px;color:#ddd;' v-if="ActiveMenu"><Icon :custom="`gzicon gzi-${ActiveMenu.icon}`" size='16' style='margin-right:7px;' /> {{ActiveMenu.name}}</div>

          

      </Header>
      <Layout style='flex-direction:row;'>
     <hs-menu style='min-width:200px;width:200px;padding-bottom:60px;' :data="menus" @on-select='onClickMenu' :current="ActivePath">
      
     </hs-menu>
      <Content>
          <transition name='fade'>
            <router-view></router-view>
          </transition>
      </Content>
      </Layout>
  </Layout>
   
  
</template>

<script>
export default {
  data(){
    return {
       menus:[{
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
        count:12
      },{
        name:'企业管理',
        icon:"organization",
        path:'/core/admin/enterprise',
        count:2
      },{
        name:'应用管理',
        icon:"apps",
        path:'/core/admin/app',
        count:2
      }]
        },{
          name:"公用数据",
          is_group:true,
          subs:[
            {
          name:'订阅管理',
        icon:"config",
        path:'/core/admin/subscription'
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
          icon:'tag'
        },{
          name:'系统配置',
          path:'/core/admin/setting',
          icon:'switch'
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