<template>
<Layout style='width:100%;overflow:hidden;position:relative;height:calc(100% - 10px);overflow-y:auto;'>


  <Row :key='i' :gutter="10" style='margin:10px;'>
    <Col :span='5'>
        <Card class="panel"  style='width:100%;height:100px;border:none;background:#23334c;color:#fff;border-radius:0;filter:drop-shadow(1px 1px 1px 2px #333);'>
        <div style='padding:10px;padding-top:0;'>
          早上好, <a>{{session.name}}</a>
          <h3>2020年9月1日</h3>
       </div>
      
    </Card>
    <Card class="panel"  style='width:100%;border:none;border-radius:0' padding="5">
      <div class='l-list'>
        
        <div class='action-button'>
          <Icon custom='gzicon gzi-jianbao' color='#45556E' size='32' />
          发布通知
        </div>

        <div class='action-button'>
          <Icon custom='gzicon gzi-xiangmu' color='#45556E' size='32' />
          布置任务
        </div>

        <div class='action-button'>
          <Icon custom='gzicon gzi-Building-' color='#45556E' size='32' />
          创建项目
        </div>

        <div class='action-button'>
          <Icon custom='gzicon gzi-xiangmu2' color='#45556E' size='32' />
          上传档案
        </div>

        <div class='action-button' style='border:2px dashed #45566E;border-radius:5px;width:42px;height:42px;margin:8px 14px;'>
          <Icon type='md-add' color='#45556E' size='30' />
        </div>
      </div>
        
         
    </Card>
     <Card class="panel" style="width:100%;border:none;margin-top:10px;position:relative;border-bottom-left-radius:0;border-bottom-right-radius:0;" padding='0'>
        
        <BaseProjectList />
        
    </Card>
    <Card class="panel" padding='0' style='margin-top:10px;'>
       <div class='card-title'><Icon type='md-folder-open' size='19' /> 临时文件 <span style='float:right'>MORE</span></div>
        <Upload
        multiple
        style="margin:5px;"
        type="drag"
        :show-upload-list='false'
        :before-upload="onUploadFile">
        <div style="padding: 20px 0;">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽文件到此处上传个人临时文件</p>
        </div>
    </Upload>
    </Card>
  
    </Col>
    <Col :span='13'>
    
    <Row :gutter="10">
       <Col :span='12'>
      <Card padding='5'>
       
         <Carousel autoplay v-model="value2" loop style='width:100%;'  autoplay-speed='10000' height='130'>
        <CarouselItem >
            <div style='background:url("http://zjw.ningbo.gov.cn/picture/0/1c6ce00c15b7414892c01e0f6ec60f9d.jpg") 100% 100%;height:283px;display:flex;align-items:flex-end;justify-content:center;color:#fff;text-shadow:1px 1px 1px #333;padding:20px;'>这种通知要注意把要求和措施部分交待清楚，可以分条也可用小标题的形式，这样才能便于下级执行。会议性的。</div>
        </CarouselItem>
        <CarouselItem >
             <div style='background:url("http://zjw.ningbo.gov.cn/picture/0/6b477cefef604d3a9a88ed0b93140ece.jpg") 100% 100%;height:283px;display:flex;align-items:flex-end;justify-content:center;color:#fff;text-shadow:1px 1px 1px #333;padding:20px;'>这种通知要注意把要求和措施部分交待清楚，可以分条也可用小标题的形式，这样才能便于下级执行。会议性的。</div>
        </CarouselItem>
       <CarouselItem >
             <div style='background:url("http://zjw.ningbo.gov.cn/picture/0/ccd73078009e4d5db385e6bdca661251.jpg") 100% 100%;height:283px;display:flex;align-items:flex-end;justify-content:center;color:#fff;text-shadow:1px 1px 1px #333;padding:20px;'>这种通知要注意把要求和措施部分交待清楚，可以分条也可用小标题的形式，这样才能便于下级执行。会议性的。</div>
        </CarouselItem>
        <CarouselItem >
             <div style='background:url("http://zjw.ningbo.gov.cn/picture/0/6855b12e17d24a1fa11bff75c6a7db99.jpg") 100% 100%;height:283px;display:flex;align-items:flex-end;justify-content:center;color:#fff;text-shadow:1px 1px 1px #333;padding:20px;'>这种通知要注意把要求和措施部分交待清楚，可以分条也可用小标题的形式，这样才能便于下级执行。会议性的。</div>
        </CarouselItem>
    </Carousel>
      </Card>
      </Col>
      <Col :span='12'>
      <Card padding='0'>
        <div class='card-title'><Icon type='md-paper' size='19' /> 行业动态 <span style='float:right'>MORE</span></div>
        <BaseNewsList style='height:260px' />
      </Card>
      </Col>
      
    </Row>
    <Row :gutter='10' style='margin-top:10px'>
      <Col :span='12'>
      <Card padding='0'>
        <div class='card-title'><Icon type='md-paper' size='19' /> 通知公告 <span style='float:right'>MORE</span></div>
         <BaseNoticeList  style='height:260px' />
      </Card>
      </Col>
      <Col :span='12'>
      <Card padding='0'>
        <div class='card-title'><Icon type='md-paper' size='19' /> 通知公告 <span style='float:right'>MORE</span></div>
         <BaseNoticeList  style='height:260px' />
      </Card>
      </Col>
    </Row>
    

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
    </Layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
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
    ...mapGetters('core',['session'])
  },
  metaInfo:{
    title:'工作台'
  },
  methods:{
    getTimeString(date,deadline){
      let now = moment()
      if(deadline){
        return '截止:'+moment(deadline).fromNow()
      }else if(date)
        return moment(date).fromNow()
      else
        return '-'
    }
  }
}
</script>

<style lang="less" scoped>
.demo-carousel{
  text-align: center;
  font-size:16px;
  margin:5px 0;
  text-overflow: ellipsis;
}

.action-button{
  display:flex;
  flex-direction: column;
  width:60px;
  height:60px;
  font-size:12px;
  align-items: center;
  justify-content: center;
}

.action-button:hover{
  filter:brightness(1.5);
  cursor: pointer;
}

.action-button:active{
  position: relative;
  bottom:-1px;
  right:-1px;
}

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