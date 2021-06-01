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
      <Header style='color:#fff;background:#23334c;border-top:1px solid #222;height:100px;padding:10px;line-height:auto;display:flex;align-item:center;justify-content:space-between;'>
        <div class='left'>
      
        <div class="project-name">
          {{item.name}}
          
        </div>
        <div class="flex-wrap" style='margin-top:10px;'>
          <Button type='primary' size='small' style='height:25px;text-align:center;' icon="md-arrow-back" @click="RouteTo('/core')">返回</Button>
          <Button type='primary' size='small' style='width:50px;height:25px;text-align:center;margin-left:10px;' @click="showDrawer = !showDrawer">切换</Button>
          <Button type='warning' size='small' style='height:25px;text-align:center;margin-left:10px;' @click="RouteTo('/core/training')" icon="md-add">更多课程</Button>
        </div>
        
        </div>
        <div class='right'>
          <div class="project-code flex-wrap" style='text-align:right;justify-content:flex-end;height:15px;margin-bottom:3px;margin-right:5px;'><hs-avatar :userinfo="charger" style="margin:0 5px;"></hs-avatar> {{charger.name}} </div> 
          <div class="project-dynamic">
            {{item.started_at}} - {{item.finished_at}}
          </div>
        </div>
      </Header>
      <Layout  style='flex-direction:row;overflow:hidden;position:relative;'>
         <hs-menu style='min-width:150px;width:150px;padding:0;border-right:1px solid #dfdfdf;' :data="RouteMenu" @on-select='onClickMenu' :current="ActivePath" >
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
      selected:null,
      showDrawer:false,
      loading:false,
      item:{},
       menus:[
         {name:'学员端',
          icon:'user',
          is_group:true,
          subs:[
            {
              name:'我的课程',
              icon:"xiangmu1",
              key:'dashboard',
            },
            {
              name:'培训资料',
              icon:"xiangmu2",
              key:'archive'
            },{
              name:'讨论区',
              icon:"wechat",
              key:'discuss',
              disabled:true
            },{
              name:'考核',
              icon:"examinereport2",
              key:'appraisaltask'
            }
          ]
         },
         {name:'管理端',
          icon:'user',
          is_group:true,
          subs:[
             {
              name:'总览',
              icon:"xiangmu1",
              key:'dashboard',
            },
            {
              name:'通知管理',
              icon:"contract",
              key:'admin-notice',
               disabled:true
            },
            {
              name:'学员管理',
              icon:"role",
              key:'membermgr'
            },{
              name:'课程管理',
              icon:"xiangmu2",
              key:'classmgr'
            },{
              name:'考核管理',
              icon:"examinereport2",
              key:'appraisalmgr'
            },{
              name:'资料管理',
              icon:"folder",
              key:'archivefilemgr'
            },{
              name:'学员风采',
              icon:"images",
              key:'admin-photo',
               disabled:true
            },
             {
              name:'配置',
              icon:"overview",
              key:'config',
            },
          ]
         }
         ]
    }
  },
  computed:{
    ...mapGetters('core',['getUser','uid']),
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
    charger(){
      return this.getUser(this.item.charger)
    },
    ActiveMenu(){
      return this.MenuMap[this.ActivePath]
    },
    ActivePath(){
      return this.$route.path
    }, RouteMenu(){
      let menus = []
       if(this.item.charger != this.uid)
        menus = this.menus.slice(0,1)
      else
        menus = this.menus.slice(1,2)
      return menus.map(v=>{
        if(v.subs){
          v.subs.forEach(b=>{
            b.path = '/core/classes/'+this.id+'/'+b.key
          })
        }else{
          if(v.key){
            v.path = '/core/classes/'+this.id+'/'+v.key
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
      this.api.enterprise.GET_TRAININGS({param:{id:this.id}}).then(res=>{
        let item = res.data.data
        this.item = item
      })
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