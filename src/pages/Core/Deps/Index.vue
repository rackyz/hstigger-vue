<template>
  <Layout style='overflow:hidden;position:relative;'>
      <Header style='color:#fff;background:#23334c;border-top:1px solid #222;height:75px;padding:10px;line-height:auto;display:flex;align-item:center;justify-content:space-between;'>
        <div class='left'>
      
        <div class="project-name">{{dep.name}}
          <Button type='primary' size='small' style='width:50px;height:20px;text-align:center;margin-left:20px;' @click="showDrawer = !showDrawer">切换</Button>
        </div>
        <div class='progress-bar'>
          <div class='progress-inner'></div>
        </div>
        </div>
        <div class='right'>
          <div class="project-code flex-wrap" style='text-align:right;justify-content:flex-end;height:15px;margin-top:5px;margin-bottom:3px;margin-right:5px;'>部门主管 <hs-avatar :userinfo="charger" style="margin:0 5px;"></hs-avatar> {{charger.name}} </div> 
          <div class="project-dynamic">
           
          </div>
        </div>
      </Header>
      <Layout  style='flex-direction:row;overflow:hidden;position:relative;'>
         <hs-menu style='min-width:150px;width:150px;padding:0;' :data="RouteMenu" @on-select='onClickMenu' :current="ActivePath" >
        </hs-menu>
   
     
      <transition name='fadeIn'>
        
        <Content >
          <router-view></router-view>
           <Drawer :closable="false" v-model="showDrawer" placement="left" inner :transfer="false" styles='padding:0'>
             <template v-for='d in my_deps'>
               <BaseDepListItem :data="d" :key='d' v-if="id != d" />
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
      showDrawer:false,
      menus:[{
        name:'部门总览',
        is_group:true,
        subs:[{
          name:'部门总览',
          icon:'xiangmu1',
          key:'dashboard'
        },
        // {
        //   name:'数据分析',
        //   icon:'bar-chart',
        //   key:'dashboard'
        // }
        ]

      },{
        name:'通用模块',
        is_group:true,
        subs:[
          {
          name:'任务管理',
          icon:'xiangmu',
          key:'task'
        },
        {name:'人员管理',
        icon:'user',
        key:'employee'}
        ,{
          name:'档案管理',
          icon:'xiangmu2',
          key:'archive',
        }]
      },{
        name:'系统配置',
        is_group:true,
      subs:[
        {
          name:'部门配置',
          icon:'config',
          key:'config'
        }]
      }]
    }
   
  },
  metaInfo:{
    title:'部门',
     route:"/:id"
  },
  watch:{
    id:{
      handler(v){
        this.showDrawer = false
        this.getData(v)
      },
      immediate:true
    }
  },
  computed:{
    ...mapGetters('core',['deps','my_deps','users','getUser','getTypes','getDep']),
    ...mapGetters('dep',['dep']),
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
    my_dep_items(){
      return this.my_deps.filter(v=>this.deps.find(d=>d.id == v))
    },
    charger(){
      return this.getUser(this.dep.charger) || {}
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
    dep(){
      return this.$store.getters['core/deps'].find(v=>v.id == this.id)
    },
    RouteMenu(){
      return this.menus.map(v=>{
        if(v.subs){
          v.subs.forEach(b=>{
            b.path = '/core/deps/'+this.id+'/'+b.key
          })
        }
        return v
        
      })
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
     this.$store.dispatch('dep/getData',this.id)
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