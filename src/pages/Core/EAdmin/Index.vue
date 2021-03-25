<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:220px;width:220px;padding-bottom:60px;padding:0;border-right:1px solid #333;'  :data="menus"  @on-select='onClickMenu' :current="ActivePath" >
    
     </hs-menu>
      <Content>
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
      </Content>
      
     
  
     

  </Layout>
   
  
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
       
    }
   
  },
  metaInfo:{
    title:'企业后台',
    auth:(session)=>{
      return session.type == 2
    }
  },
  created(){
    this.$store.commit('entadmin/init',this.api)
  },
  mounted(){
    this.$store.dispatch('entadmin/GetUsers')
    this.$store.dispatch('entadmin/GetDeps')
     this.$store.dispatch('entadmin/GetRoles')
     this.$store.dispatch('entadmin/GetModules')
     this.$store.dispatch('entadmin/GetProjects')
     this.$store.dispatch('entadmin/GetRss')
  },
  computed:{
    ...mapGetters('core',['current_ent']),
    ...mapGetters('entadmin',['users','deps','roles','modules']),
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
    menus(){
      return [{
        name:"账号与权限",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'员工管理',
        icon:"user",
        path:'/core/eadmin/user',
        count:this.users.length
      },{
        name:'部门管理',
        icon:"organization",
        path:'/core/eadmin/dep',
        count:this.deps.length
      }
      ,{
        name:'角色管理',
        icon:"quanxianliebiao",
        path:'/core/eadmin/role',
        count:this.roles.length
      },{
        name:'模块管理',
        path:'/core/eadmin/module',
        icon:'apps',
        count:this.modules.length
      },
      ]
        },
      //   {
      //     name:"数据管理",
      //     is_group:true,
      //     subs:[
      //     {
      //   name:'项目管理',
      //   path:'/core/eadmin/project',
      //   icon:'xiangmu'
      // },{
      //   name:'档案资料',
      //   path:'/core/eadmin/archive',
      //   icon:'xiangmu2'
      // },{
      //   name:'文件管理',
      //   path:'/core/eadmin/file',
      //   icon:'file'
      // },{
      //   name:'计划任务',
      //   path:'/core/eadmin/task',
      //   icon:'renwujincheng'
      // },{
      //     name:'数据记录',
      //   path:'/core/eadmin/record',
      //   icon:'jiludanzilishijilu'
      // }]
      // }
      ,{
          name:"应用管理",
          is_group:true,
          subs:[
          {
        name:'订阅管理',
        path:'/core/eadmin/project',
        icon:'xiangmu'
      },{
        name:'流程模板',
        path:'/core/eadmin/flow',
        icon:'shenjing'
      }]
      }
      ,{
        name:'系统配置',
        icon:'apps',
        is_group:true,
        subs:[
          //{
      //     name:'企业信息',
      //     path:'/core/eadmin/config',
      //     icon:'controls-5'
      //   },
      //   // {
      //   //   name:'平台对接',
      //   //   path:'/core/admin/tool',
      //   //   icon:'codelibrary-fill'
      //   // },
        {
          name:'类型管理',
          path:'/core/eadmin/type',
          icon:'tag'
        },
        
        // {
        //   name:'系统日志',
        //   path:'/core/eadmin/log',
        //   icon:'rizhi'
        // },{
        //   name:'备份和恢复',
        //   path:'/core/eadmin/maintain',
        //   icon:'config'
        // }
        ]}
        ]},
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

<style lang="less">
.hs-menu-title{
  background:#192438;
  
  color:rgb(226, 225, 219);
  padding:10px;
  padding-left:60px;
  .hs-menu-title-avatar{
    position: absolute;
    left:10px;
    top:10px;
    border:1px solid rgb(54, 161, 238);
  }
  h2{
    font-size:16px;
    font-weight:bold;
    text-shadow:1px 1px 1px rgb(0, 0, 0);
  }
  span{
    font-size:12px;
  }
}
</style>