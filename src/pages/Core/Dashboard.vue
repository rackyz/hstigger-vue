<template>
<Layout style='width:100%;overflow:hidden;position:relative;height:calc(100% - 10px);overflow-y:auto;'>


  <Row :key='i' :gutter="10" style='margin:10px;'>
    <Col :span='5'>
        <Card class="panel"  style='width:100%;height:100px;border:none;background:#23334c;color:#fff;border-radius:0;filter:drop-shadow(1px 1px 1px 2px #333);'>
          <BaseWeather />
        </Card>
      <Card class="panel"  style='width:100%;border:none;border-radius:0' padding="5">
        <BaseUserFlowPanel />
        
         
    </Card>
     <Card class="panel" style="width:100%;border:none;margin-top:10px;position:relative;border-bottom-left-radius:0;border-bottom-right-radius:0;" padding='0'>
         <div class='card-title'><Icon custom='gzicon gzi-pm2' size='19' /> 我的项目 <span style='float:right;'><a href='#' style='font-size:12px;line-height:25px;'>MORE</a><a href='#'><Icon custom='gzicon gzi-config' size='15' style='margin-left:5px;'></Icon></a></span></div>
        <BaseProjectList />
        
    </Card>
    <BaseFilePanel />
    
  
    </Col>
    
    <Col :span='13'>
       <template v-if='my_rss && my_rss.length != 0'>
          <Row :gutter="10">
          <template v-for="r in my_rss">
            <Col :span='12' :key='r.id'>
            <Card padding='5' :key='r.id' style='height:300px;margin-bottom:10px;border-radius:0;border:none;'>
            <div class="flex-wrap flex-between" style='padding:3px 8px;background:#23334c;color:#fff;' v-if="r.media_type != 1">
              {{r.name}}  
              <a style='float:right' :href="r.link" target='_blank'>MORE</a>
            </div>
            <component :is="MapRssComponent(r.media_type)" :id="r.id" />
              
            </Card>
          </Col>

          </template>
        </Row>
       </template>
       <template v-else>
         <div class='full-container flex-wrap' style='height:300px;width:100%;'>
           点击添加<a href='#' @click='modalRSS=true'>信息源</a>
         </div>
       </template>
   
   
  
    

    </Col></Col>
    <Col :span='6'>
     <Card class="panel" style="width:100%;border:none;" padding='0'>
     <div class='card-title'><Icon custom='gzicon gzi-lianjieliu' size='19' /> 待处理 <span style='float:right'>MORE</span></div>
     <template v-for="(fi,i) in flowInstances">
       <div class='fi-item' :key='fi.id'>
         <Icon :custom='`gzicon gzi-${fi.icon}`' size='25' />
         <div class='fi-info'>
           <div class='fi-flowinfo'>
             [{{fi.name}}]{{fi.nodeName}}
           </div>
           <div class='fi-desc'>  
             {{fi.desc}}
           </div>
         </div>
         <div class='fi-date'>
           <div class='fi-deadline'>{{getTimeString(fi.date,fi.deadline)}}</div>
           <div class='fi-executor'>{{fi.executor}}</div>
         </div>
       </div>
     </template>
     
    </Card>
    
    <Card class="panel" style="width:100%;border:none;margin-top:10px;" padding='0'>
      <div class='card-title'><Icon custom='gzicon gzi-eventavailable' size='19' /> 今日计划 <span style='float:right;'><a href='#' style='font-size:12px;line-height:25px;'>MORE</a><a href='#'><Icon custom='gzicon gzi-config' size='15' style='margin-left:5px;'></Icon></a></span></div>
     <template v-for="(fi,i) in tasks">
       <div class='ti-item' :key='fi.id'>
         <div class='ti-icon'>{{fi.iconText}}</div>
         <div class='ti-info'>
           <div class='ti-flowinfo'>
             {{fi.root}}
           </div>
           <div class='ti-desc'>  
             {{fi.desc}}
           </div>
         </div>
         <div class='ti-date'>
           <div class='ti-deadline'>{{getTimeString(fi.date,fi.deadline)}}</div>
           <div class='ti-executor'>{{fi.state}}</div>
         </div>
       </div>
     </template>
    </Card>
    </Col>
  </Row>
   
   
    <!-- <div class="panel" style="  width:calc(8.3333% * 7 - 2px);height:calc(110px * 6 - 20px);left:calc(8.3333% * 2 );top:2px;background:rgba(200,200,200,0.7);filter:drop-shadow(1px 1px 2px #333) brightness(1.1);padding:20px;">
      日历
    </div>
    <div class="panel" style="  width:calc(8.3333% * 3 - 8px);height:calc(110px * 6 - 20px);left:calc(8.3333% * 9 + 4px);top:2px;background:#333;color:#fff;padding:20px;">
      待办任务
    </div> -->

    <Modal title="添加RSS信息源" footer-hide v-model='modalRSS' width='400'>
      <div style='padding:20px'>
        勾选您所需要的信息源
        <template v-for="r in rss">
          <div :key='r.id' style='display:flex;justify-content:space-between;align-items:center;padding:2px 10px;'>{{r.name}} <i-switch :value='user_rss ? user_rss.includes(r.id):false' @on-change='handleToggleRss(r.id,$event)' /></div>
        </template>
      </div>
    </Modal>
    </Layout>
</template>

<script>
import moment from 'moment'
import {mapGetters,mapMutations} from 'vuex'
export default {
  data(){
    return {
      modalRSS:false,
      isConfiguring:false,
      //examples
      flowInstances:[{
        id:1,
        name:'年终总结',
        nodeName:'员工提交',
        executor:'马骍 (我)',
         date:'2020/12/31 12:00:00',
        icon:'gongzuobaogao',
        desc:'请完成您的年终总结'

      },{
        id:2,
        name:'项目计划审核',
        nodeName:'主管部门审核',
        executor:'超级管理员',
        icon:'gongzuobaogao',
        date:'2020/11/2 12:00:00',
        desc:'钟公庙中学'
        
      },{
        id:3,
        name:'项目计划审核',
        nodeName:'主管部门审核',
        executor:'超级管理员',
        deadline:'2020/11/4 12:00:00',
        icon:'gongzuobaogao',
        desc:'新星商业1#地块'
        
      },],
      tasks:[{
        id:12,
        type:'year',
        iconText:'年',
        root:'项目签约计划',
        desc:'[奉化中学] 桩基阶段',
        deadline:'2020/11/5'
      },{
        id:13,
        type:'month',
        iconText:'月',
        root:'项目收款计划',
        desc:'[奉化中学] 桩基完成后15日内收款 32.3万(10%)',
        deadline:'2020/11/5'
      },{
        id:16,
        type:'day',
        iconText:'日',
        root:'个人计划',
        desc:'联系客户解决水管排水的问题',
        deadline:'2020/11/5'
      }]
    }
  },
  computed:{
    ...mapGetters('core',['session','my_rss','user_rss','rss']),
   
    
  },
  metaInfo:{
    title:'工作台'
  },
  methods:{
    ...mapMutations('core',['toggleRss']),
    getTimeString(date,deadline){
      let now = moment()
      if(deadline){
        return '截止:'+moment(deadline).fromNow()
      }else if(date)
        return moment(date).fromNow()
      else
        return '-'
    },
    MapRssComponent(media_type){
      const MEDIA_TYPES = ['','BasePictureNews','BaseNewsList','BaseNoticeList','BaseArticles','BaseProjects']
      return MEDIA_TYPES[media_type]
    },
    handleToggleRss(rss_key){
      this.toggleRss(rss_key)
    },
     
  }
}
</script>

<style lang="less" scoped>
.l-count-card{
  font-size:15px;
  background:rgb(197, 89, 1);
  color:#ddd;
  line-height:20px;

  i{
    position: absolute;
    font-size:80px;
    left:0px;
    top:10px;
    color:rgba(255,255,255,0.3);
  }
}


.l-count{
  font-size:30px;
  text-align: right;
  width:100%;
  color:#fff;
  text-shadow: 1px 1px 1px #333;
}

.card-title{
  margin:0;
  padding:5px 10px;
  border-bottom:1px solid #eee;
  width:inherit !important;
  text-align: left;
}


.fi-item{
  display: flex;
  justify-content: space-between;
  position: relative;
  padding:5px;
  padding-left:45px;
  margin-bottom:2px;
  border-bottom:1px solid #dfdfdf;
  height:45px;
 
  i{
    position: absolute;
    left:0px;
    top:0px;
    bottom:0;
    color:#fff;
    text-shadow: 1px 1px 1px #333;
    font-size:30px;
    width:40px;
    line-height:47px;
    border-right:2px solid #fff;
    background:rgb(1, 134, 230);
  }

  .fi-flowinfo{
    font-size:12px;
    font-family: '宋体';
    color:#aaa;
  }

  .fi-date{
    text-align: right;
    .fi-deadline{
      font-size:10px;
      color:red;
    }
  }

  .fi-desc{
    font-size:14px;
     font-family: '宋体';
  }

  .fi-executor{
    font-size:12px;
    color:#3af;
  }
}

.fi-item:hover{
  filter:brightness(1.2);
  transition:all 0.5s;
  cursor: pointer;
}

.ti-item{
  display: flex;
  justify-content: space-between;
  position: relative;
  padding:5px;
  padding-left:45px;
  margin-bottom:2px;
  border-bottom:1px solid #dfdfdf;
  height:45px;
 
  .ti-icon{
    position: absolute;
    left:0px;
    top:0px;
    bottom:0;
    color:#fff;
    text-shadow: 1px 1px 1px #333;
    font-size:18px;
    text-align: center;
    width:40px;
    line-height:47px;
    border-right:2px solid #fff;
    background:rgb(1, 134, 230);
  }

  .ti-flowinfo{
    font-size:12px;
    font-family: '宋体';
    color:#aaa;
  }

  .ti-date{
    text-align: right;
    .ti-deadline{
      font-size:10px;
      color:red;
    }
  }

  .ti-desc{
    font-size:14px;
     font-family: '宋体';
     overflow: hidden;
     text-overflow: ellipsis;
     height:20px;
  }

  .ti-executor{
    font-size:12px;
    color:#3af;
  }
}

.ti-item:hover{
  filter:brightness(1.2);
  transition:all 0.5s;
  cursor: pointer;
}
</style>