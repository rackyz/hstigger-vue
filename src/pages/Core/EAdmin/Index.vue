<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:250px;width:250px;padding-bottom:60px;padding:0;'  :data="menus"  @on-select='onClickMenu' :current="ActivePath" >
     <div class='hs-menu-title' slot='title'>
       <h2>企业后台</h2>
       <span>{{current_ent.name}}</span>
       <Avatar shape='square' :src='current_ent.avatar' size='40' class='hs-menu-title-avatar' />
      </div>
     </hs-menu>
    <transition name='fadeIn'>
      <Content>
        	<div class="hs-caption" v-if="ActiveMenu"><Icon :custom="`gzicon gzi-${ActiveMenu.icon}`" /> {{ActiveMenu.name}}</div>
        <router-view></router-view>
      </Content>
      
    </transition>
     
  
     

  </Layout>
   
  
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
       menus:[{
        name:'总览',
        icon:'bar-chart',
        path:'/core/eadmin/dashboard'
      },{
        name:"账号与权限",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'员工管理',
        icon:"user",
        path:'/core/eadmin/user'
      },{
        name:'部门管理',
        icon:"organization",
        path:'/core/eadmin/dep'
      }
      ,{
        name:'角色权限',
        icon:"quanxianliebiao",
        path:'/core/eadmin/role'
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
        path:'/core/eadmin/archive',
        icon:'xiangmu2'
      },{
        name:'文件管理',
        path:'/core/eadmin/file',
        icon:'file'
      },{
        name:'计划任务',
        path:'/core/eadmin/task',
        icon:'renwujincheng'
      },{
          name:'数据记录',
        path:'/core/eadmin/record',
        icon:'jiludanzilishijilu'
      }]
      },{
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
      },{
        name:'系统配置',
        icon:'apps',
        is_group:true,
        subs:[{
          name:'企业信息',
          path:'/core/eadmin/config',
          icon:'controls-5'
        },{
          name:'平台对接',
          path:'/core/admin/tool',
          icon:'codelibrary-fill'
        },{
          name:'类型管理',
          path:'/core/eadmin/type',
          icon:'tag'
        },{
          name:'系统日志',
          path:'/core/eadmin/log',
          icon:'rizhi'
        },{
          name:'备份和恢复',
          path:'/core/eadmin/maintain',
          icon:'config'
        }]}]
    }
   
  },
  metaInfo:{
    title:'企业后台'
  },
  computed:{
    ...mapGetters('core',['current_ent']),
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