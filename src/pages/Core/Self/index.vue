<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:200px;width:200px;padding:0;background:#23334c;color:#fff;filter:drop-shadow(1px 0px 15px #333);' :data="menus" @on-select='onClickMenu' :current="ActivePath" >
       <div class="l-avatar" slot="title">
         <hs-avatar :userinfo="session"  size="80" />
         {{session.name || session.user}}
         <Button type='info' size='small' style='margin-top:5px;'>更换头像</Button>
       </div>
       <div class='flex-wrap' style='justify-content:center;margin-top:10px;' slot='extra'>
          <Button  type='error' icon='md-log-out'  @click='logout'>切换账号</Button>
        </div>
      
     </hs-menu>
     
     
    <transition name='fadeIn'>
      <Content>
        <router-view></router-view>
      </Content>
      
    </transition>
     
  
     

  </Layout>
   
  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
       menus:[{
        name:'总览',
        icon:'bar-chart',
        path:'/core/self/dashboard'
      },{
        name:"数据信息",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'我的项目',
        icon:"xiangmu2",
        count:4,
        path:'/core/admin/user'
      },{
        name:'我的任务',
        count:4,
        icon:"eventnote",
        path:'/core/admin/dep'
      },{
        name:'我的流程',
        icon:"lianjieliu",
        count:34,
        path:'/core/admin/role'
      },{
        name:'我的资料',
        icon:"file",
        count:12,
        path:'/core/admin/role'
      }]},
      {
        name:"账号与安全",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'个人资料',
        icon:"edit",
        path:'/core/admin/user'
      },{
        name:'修改密码',
        icon:"quanxianliebiao",
        path:'/core/admin/user'
      }]}]}
    
   
  },
  metaInfo:{
    title:'后台管理'
  },
  computed:{
    ...mapGetters("core",['session']),
    ActivePath(){
      return this.$route.path
    }
  },
  methods:{
    onClickMenu(e){
      this.RouteTo(e)
    },
    logout(){
      this.$store.dispatch("core/logout").then(res=>{
        this.RouteTo('/')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.l-avatar{
  display: flex;
  
  flex-direction: column;
  align-items: center;
 width:calc(100% - 80px);
 margin:10px 40px;
  position: relative;
  left:-1px;
  color:#fff;
  font-size:20px;
}
</style>