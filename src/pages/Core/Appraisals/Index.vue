<style lang="less">
.l-msg-item-active{
  background:rgb(34, 140, 245);
  color:#fff;

  .ivu-list-item-meta-title{
    color:#fff;
  }

  .ivu-list-item-meta-description{
    color:#dfdfdf;
    font-size:13px;
    line-height:16px;
  }
}

.no-padding-collapse{
  .ivu-collapse-content{
    padding:0;
  }

  .ivu-collapse-content-box{
    padding:0;
  }
}
</style>
<template>
    <Layout style='overflow:hidden;position:relative;'>
      <Header style='color:#fff;background:#23334c;border-top:1px solid #222;height:75px;padding:10px;line-height:auto;display:flex;align-item:center;justify-content:space-between;'>
        <div class='left'>
      
        <div class="project-name">{{item.name}}
          <Button type='primary' size='small' style='width:50px;height:25px;text-align:center;margin-left:40px;' @click="showDrawer = !showDrawer">切换</Button>
          <Button type='warning' size='small' style='height:25px;text-align:center;margin-left:10px;' @click="RouteTo('/core/training')" icon="md-add">更多课程</Button>
        </div>
        <div class='progress-bar'>
          <div class='progress-inner'></div>
        </div>
        </div>
        <div class='right'>
          <div class="project-code flex-wrap" style='text-align:right;justify-content:flex-end;height:15px;margin-top:-5px;margin-bottom:3px;margin-right:5px;'>讲师 <hs-avatar :userinfo="teacher" style="margin:0 5px;"></hs-avatar> {{teacher.name}} </div> 
          <div class="project-dynamic">
            <div class='project-state'>任务<br /><span class='count'>315<span class='unit'>条</span></span></div>
            <div class='project-state'>已服务<br /><span class='count'>52<span class='unit'>天</span></span></div>
            <div class='project-state'>动态<br /><span class='count'>425<span class='unit'>条</span></span></div>
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
             <!-- <template v-for='d in my_classes'>
               <BaseDepListItem :data="d" :key='d' v-if="id != d" />
             </template> -->
             
          </Drawer>
        </Content>
        
      </transition>

    
    
      </Layout>

      
    
  </Layout>
   
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   metaInfo:{
    title:'培训',
    route:'/:id'
  },
  data(){
    return {
      items:[],
      selected:null,
      showDrawer:false,
      loading:false,
      item:{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ",
        content:"培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介",
        plans:[{
          started_at:"2020/5/12 23:00:00",
          duration:60,
          title:"PPT安装与插件介绍",
          finished:true

        },{
          started_at:"2020/5/12 23:00:00",
          duration:60,
          title:"PPT设计理念",

        },{
          started_at:"2020/5/12 23:00:00",
          duration:60,
          title:"模板化技术",

        },{
          started_at:"2020/5/12 23:00:00",
          duration:60,
          title:"PPT美化案例介绍",

        },{
          started_at:"2020/5/15 23:00:00",
          duration:60,
          title:"分类总结",

        },
        
        ]
      },
       menus:[{
          name:'总览',
          icon:"mail",
           key:'dashboard',
        },
        {
          name:'资料',
          icon:"share",
           key:'archive'
        },{
           name:'讨论',
          icon:"share",
           key:'discuss'
        },{
           name:'作业',
          icon:"share",
           key:'task'
        }]
    }
  },
  computed:{
    ...mapGetters('core',['getUser']),
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
    id(){
      return this.$route.params.id
    },
    teacher(){
      return this.getUser(this.item.teacher)
    },
    ActiveMenu(){
      return this.MenuMap[this.ActivePath]
    },
    ActivePath(){
      return this.$route.path
    }, RouteMenu(){
      return this.menus.map(v=>{
        if(v.subs){
          v.subs.forEach(b=>{
            b.path = '/core/appraisals/'+this.id+'/'+b.key
          })
        }else{
          if(v.key){
            v.path = '/core/appraisals/'+this.id+'/'+v.key
          }
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
      // this.loading = true
      // this.api.enterprise.LIST_MESSAGES().then(res=>{
      //   this.items = res.data.data
      // }).finally(e=>{
      //   this.loading = false
      // })
    },
    
    onClickMenu(e){
      this.RouteTo(e)
    }
  }
}
</script>
<style lang="less" scoped>

.l-msg-item{
  background:#fff;
}

.l-msg-item:hover{
  background:rgb(245, 245, 205);
  transition: all 0.3s;
  cursor: pointer;
  filter:none !important;
}

.l-msg-item-readed{
  filter:grayscale(1);
  background:linear-gradient(to right bottom,#fff,#ddd);
}

.l-msg-item-active{
  background:rgb(34, 140, 245);
}


.l-msg-item-active:hover{
  background:rgb(34, 140, 245);
  color:#fff;
  cursor:arrow;
}

.l-title{
  height:40px;
  padding:0 10px;
  display: flex;
  background:#23334c;
  color:#fff;
  align-items: center;
  border-top:1px solid #000;
  i{
    margin-right:5px;
  }
}


.l-footer{
  height:30px;
   background:#23334c;
   color:#fff;
   text-align:center;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size:12px;
}


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