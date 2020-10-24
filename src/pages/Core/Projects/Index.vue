<template>
  <Layout style='overflow:hidden;position:relative;'>
      <Header style='color:#fff;background:#23334c;border-top:1px solid #222;height:75px;padding:10px;line-height:auto;display:flex;align-item:center;justify-content:space-between;'>
        <div class='left'>
        <div class="project-code">代码 <span>{{id}}</span> 编号 <span>{{project.code}}</span> 类型 <span>房建监理</span></div> 
        <div class="project-name">{{project.name}}
          <Button type='primary' size='small' style='width:50px;height:20px;text-align:center;' @click="showProjects = !showProjects">切换</Button>
        </div>
        <div class='progress-bar'>
          <div class='progress-inner'></div>
        </div>
        </div>
        <div class='right'>
          <div class="project-code" style='text-align:right;'>状态 <span style='color:yellowgreen;'>进行中</span> 负责人 <span style='margin-right:0;'>张三</span> </div> 
          <div class="project-dynamic">
            <div class='project-state'>任务<br /><span class='count'>315<span class='unit'>条</span></span></div>
            <div class='project-state'>已服务<br /><span class='count'>52<span class='unit'>天</span></span></div>
            <div class='project-state'>动态<br /><span class='count'>425<span class='unit'>条</span></span></div>
          </div>
        </div>
      </Header>
      <Layout  style='flex-direction:row;overflow:hidden;'>
         <hs-menu style='min-width:150px;width:150px;' :data="RouteMenu" @on-select='onClickMenu' :current="ActivePath" >
        </hs-menu>
        
        <div class='l-menu'>

        </div>
   
     
      <transition name='fadeIn'>
        <Content >
          <router-view></router-view>
        </Content>
        
      </transition>

      <hs-menu style='min-width:150px;width:250px;' :data="menus2" @on-select='onClickMenu' :current="ActivePath" >
       
      </hs-menu>
      </Layout>

      
    
  </Layout>
   
</template>

<script>
export default {
  data(){
    return {
      showProjects:false,
       menus:[{
        name:'项目总览',
        is_group:true,
        subs:[{
          name:'项目总览',
          icon:'bar-chart',
          key:'profile'
        },{
          name:'项目管理',
          icon:'xiangmu1',
          key:'dashboard'
        }]
      },{
        name:'综合管理',
        is_group:true,
        subs:[{
          name:'项目进度',
          icon:'xiangmu',
          key:'tasks'
        },{name:'项目人员',
        icon:'user',
        key:'employees'}
        ,{
          name:'项目资料',
          icon:'xiangmu2',
          key:'management'
        },{
          name:'项目文件',
          icon:'file',
          key:'management'
        }]
      },{
        name:'系统配置',
        is_group:true,subs:[{
          name:'项目角色',
          icon:'role',
          key:'role'
        },{
          name:'项目配置',
          icon:'config',
          key:'config'
        }]
      }],
      menus2:[{
        name:'我的',
        is_group:true,
        subs:[{
          name:'我的任务',
          icon:'bar-chart',
          key:'profile',
          count:15
        },{
          name:'我的收藏',
          icon:'xiangmu1',
          key:'dashboard'
        }]
      },{
        name:'计划/任务',
        is_group:true,
        subs:[{
          name:'发布通知',
          icon:'xiangmu',
          key:'tasks'
        },{name:'项目人员',
        icon:'user',
        key:'employees'}
        ,{
          name:'项目资料',
          icon:'xiangmu2',
          key:'management'
        },{
          name:'项目文件',
          icon:'file',
          key:'management'
        }]
      },{
        name:'数据/记录',
        is_group:true,
        subs:[{
          name:'发布通知',
          icon:'xiangmu',
          key:'tasks'
        },{name:'项目人员',
        icon:'user',
        key:'employees'}
        ,{
          name:'项目资料',
          icon:'xiangmu2',
          key:'management'
        },{
          name:'项目文件',
          icon:'file',
          key:'management'
        }]
      }]
    }
   
  },
  metaInfo:{
    title:'项目管理',
     route:"/:id"
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
    },
    id(){
    return this.$route.params.id
    },
    project(){
      return this.$store.getters['project/get'](this.id)
    },
    RouteMenu(){
      return this.menus.map(v=>{
        if(v.subs){
          v.subs.forEach(b=>{
            b.path = '/core/projects/'+this.id+'/'+b.key
            console.log(b)
          })
        }
        return v
        
      })
    }
  },
  mounted(){
    this.getData()
    this.RouteMenu()
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