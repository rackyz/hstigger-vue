<template>
  <div style="height:100%;overflow-y:auto;position:relative;padding-bottom:800px;">
    <Row :gutter="20" style="margin:20px auto;width:1200px;height:calc(100% - 100px);">
      <Col :span='8'>
      <div style="background:rgb(40, 55, 80);color:#fff;border:none;padding:10px;"> 
        {{item.name}}
      </div>
      <div style="margin-bottom:10px;background:rgb(40, 55, 80);color:#dfdfdf;border:none;padding:20px;padding-top:0;font-size:12px;"> 
        {{item.desc}}
      </div>
       <div class="l-caption" style="margin-top:10px;">
            课程安排
          </div>
      <div  style="border-left:1px solid #eee;border-top:1px solid #eee;border-right:1px solid #eee;width:100%;">
        <template v-for="(p,i) in item.plans">
          <div class="flex-wrap flex-between" :key="i" style="background:#fff;border-bottom:1px solid #eee;display:flex;align-items:center;padding:0 10px;">
            <div class="flex-wrap flex-between">
            <div style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:1px solid #dfdfdf;border-radius:3px;color:#aaa;font-weight:bold;">
              {{i+1}} 
            </div>
           <div style="padding:10px">
             <div style="font-size:14px;font-weight:bold;"> {{p.title}}</div>
             <div style="font-size:10px;color:#aaa;">{{p.started_at}}, {{p.duration}} min</div>
           </div>
           </div>
           <div>
             已结束
           </div>
        </div>
      </template>
      </div>
      
      <div class="l-caption" style="margin-top:10px;">
            讲义课件
          </div>
      <div title="培训资料"  style="background:#fff;padding:10px;border:1px solid #eee;margin-top:10px;"> 
        2020/12/2 讲义课件
      </div>
      </Col>
      <Col :span='16'>
      <Row :gutter="20">
          <Col :span='12'>
          <div class="l-caption">
            通知
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>
          </Col>
          <Col :span='12'>
           <div class="l-caption">
            动态
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>
          </Col>
      </Row>
      <Row :gutter="20">
          <Col :span='12'>
          <div class="l-caption">
            我的考核
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>
          </Col>
          <Col :span='12'>
           <div class="l-caption">
            培训风采
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>
          </Col>
      </Row>
      
      
      
       <div class="l-caption">
            讨论区
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>

      
      </Col>
      

    </Row>
   

  </div>
</template>

<script>
export default {
  data(){
    return {
       item:{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ",
        desc:"培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介培训简介",
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
    }
  },
metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
}
</script>
<style lang="less">
.l-caption{
  margin:5px 0;
  font-weight: bold;
}

.l-panel{
  margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;
}
</style>