<template>
  <Layout style='overflow:hidden;position:relative;'>
      <Header style='color:#fff;background:#23487c;border-top:1px solid #222;height:85px;padding:10px;line-height:auto;display:flex;align-item:center;justify-content:space-between;'>
        <div class='left'>
        <div class="project-code">编号 <span>{{project.code}}</span> 类型 <span>{{project.type || '-'}}</span></div> 
        <div class="project-name" style="margin-top:5px;font-size:18px;">{{project.name}}
          <Button type='primary' size='small' style='width:50px;height:20px;text-align:center;' @click="showProjects = !showProjects">切换</Button>
        </div>
        <div class='progress-bar'>
          <div class='progress-inner'></div>
        </div>
        </div>
        <div class='right'>
          <div class="project-code flex-wrap" style='text-align:right;justify-content:flex-end;height:15px;margin-top:-5px;margin-bottom:3px;margin-right:5px;'>状态 <span style='color:yellowgreen;'>{{getTypes('TASK_STATE').find(v=>v.value==project.state).name}}</span> 负责人 <hs-avatar :userinfo="users.find(v=>v.id == project.charger)" style="margin:0 5px;"></hs-avatar> {{users.find(v=>v.id == project.charger)?users.find(v=>v.id == project.charger).name:""}} </div> 
          <div class="project-dynamic" style="margin-top:10px;">
            <div class='project-state'>任务<br /><span class='count'>315<span class='unit'>条</span></span></div>
            <div class='project-state'>已服务<br /><span class='count'>52<span class='unit'>天</span></span></div>
            <div class='project-state'>动态<br /><span class='count'>425<span class='unit'>条</span></span></div>
          </div>
        </div>
      </Header>
      <Layout  style='flex-direction:row;overflow:hidden;position:relative;'>
         <hs-menu style='min-width:150px;width:150px;padding:5px 0;border-right:1px solid #dfdfdf;' :data="RouteMenu" @on-select='onClickMenu' :current="ActivePath" >
        </hs-menu>
        
        <div class='l-menu'>

        </div>
   
     
      <transition name='fadeIn'>
        <Content >
          <router-view></router-view>
           <Drawer :closable="false" v-model="showProjects" placement="left" inner :transfer="false" styles='padding:0'>
             <template v-for='p in projects'>
               <BaseProject :data="p"  :key='p.id' v-if="id != p.id" />
             </template>
             
          </Drawer>
        </Content>
        
      </transition>

    
    
      </Layout>

      
    
  </Layout>
   
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      showProjects:false,
     
       menus:[{
        name:'项目总览',
        is_group:true,
        subs:[{
          name:"项目展示",
          icon:'xiangmu',
          key:'public'
         },{
          name:'项目总览',
          icon:'pm2',
          key:'dashboard'
        },
        
        // {
        //   name:'数据分析',
        //   icon:'bar-chart',
        //   key:'dashboard'
        // }
        ]

      },{
        name:'项目信息',
        is_group:true,
        subs:[{
          name:'项目合同',
          icon:'bar-chart',
          key:'contractentity'
        },{
          name:'签约计划',
          icon:'bar-chart',
          key:'contractplan'
        }]},{
        name:'通用模块',
        is_group:true,
        subs:[ {
           name:'通知公告',
           icon:'bar-chart',
           key:'notice'
         },{
          name:'任务管理',
          icon:'xiangmu',
          key:'task'
        },{name:'人员管理',
        icon:'user',
        key:'employee'}
        ,{
          name:'档案管理',
          icon:'xiangmu2',
          key:'archive',
        }]
      },{
        name:'业务模块',
        is_group:true,subs:[{
          name:'合同管理',
          icon:'iconset0118',
          key:'contract'
        },
        {
          name:'招标管理',
          icon:'bid',
          key:'cob'
        },
        {
          name:'造价管理',
          icon:'workflowdesign',
          key:'costestimate'
        },
        {
          name:'审计管理',
          icon:'workflowdesign',
          key:'audit'
        }]},{
        name:'系统配置',
        is_group:true,subs:[
           {
          name:'模块启用',
          icon:'config',
          key:'config'
        },
          {
          name:'项目角色',
          icon:'role',
          key:'role'
        },
        {
          name:'基础配置',
          icon:'config',
          key:'config'
        }]
      }]
    }
   
  },
  metaInfo:{
    title:'项目管理',
     route:"/:id"
  },
  watch:{
    id:{
      handler(v){
        this.showProjects = false
        this.getData()
      },
      immediate:true
    }
  },
  computed:{
    ...mapGetters('core',['users','getTypes','my_projects']),
    ...mapGetters('project',['get']),
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
    },
    id(){
      return this.$route.params.id
    },
    project(){
      return this.get(this.id)
    },
    projects(){
      return this.my_projects
    },
    RouteMenu(){
      return this.menus.map(v=>{
        if(v.subs){
          v.subs.forEach(b=>{
            b.path = '/core/cm/'+this.id+'/'+b.key
          })
        }else{
          if(v.path)
            v.path = '/core/cm/'+this.id+'/'+v.key
        }
        return v
        
      })
    }
  },
  methods:{
    getData(){
      
      this.$store.dispatch('project/get',this.id)
    },
    RouteMenu(){
      
    },
    onClickMenu(e){
      this.RouteTo(e)
    }
  }
}
</script>

<style lang="less" scoped>

.project-code{
  color:#aaa;font-size:12px;
  line-height:13px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  span{
    color:#fda;
    padding:0 5px;
    margin-right:5px;
  }
}

.project-name{
  font-size:25px;
  line-height:35px;
}

.progress-bar{
  width:180px;
  margin-top:2px;
  height:2px;
  background:#000;
  position: relative;
  .progress-inner{
    background:yellowgreen;
    width:30%;
    position: absolute;
    left:0;
    top:0;
    bottom:0;
  }
}

.project-dynamic{
  display: flex;
  align-items: center;
  .project-state{
    margin-left:10px;
    font-size:10px;
    border:1px solid #888;
    border-radius: 5px;
    height:40px;
    margin-top:4px;
    padding:0 10px;
    overflow: hidden;
    line-height:18px;
    text-align: center;

    .count{
      font-weight: bold;
      font-size:16px;
      line-height:16px;
      color:#fda;
    }

    .unit{
      font-size:12px;
      margin-left:2px;
    }
  }
}


</style>