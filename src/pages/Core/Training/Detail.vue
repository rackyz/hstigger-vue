<template>
  <div style="padding:20px;">
    <div style="margin:0 auto;width:1200px;font-size:20px;">
      <Row :gutter="20">
        <Col :span='19'>
        <div style="padding:0 20px;">

         <a style="color:#3af;" @click="RouteTo('/core/training')"><Icon type="md-arrow-back" /> 返回列表</a> <h1>{{item.name}}</h1>
      <p style="font-size:14px;margin:20px 0;">{{item.content}}</p>

      <div style="margin-top:20px;">
        <template v-for="(p,i) in item.plans">
          <div :key="p.id" style="background:#fff;margin:5px 0;padding:20px;padding-left:80px;position:relative;"
          
          :class="p.finished?'plan-finished':''"
          >
            <div style="position:absolute;left:20px;top:20px;background:#3af;color:#fff;width:40px;height:40px;justify-content:center;display:flex;align-items:center;">{{i+1}}</div>

            <div style="position:absolute;right:20px;top:20px;background:orange;color:#fff;width:80px;height:40px;justify-content:center;display:flex;align-items:center;font-size:16px;">{{p.finished?'已结束':'进行中'}}</div>
          <h2 style="font-size:18px;">{{p.title}}</h2>
          <p style="font-size:14px;color:#3af;">2课时</p>
          </div>
        </template>
        
      </div>
        </div>
        
        </Col>
        <Col :span='5'>
        <div style="width:100%;display:flex;align-items:center;flex-direction:column;font-size:18px;">
        <hs-avatar size="80" :userinfo="teacher" style="margin-bottom:10px" />
        {{teacher.name}}
        <div style="font-size:14px;">部门</div>
        
        </div>
        <div style="margin-top:10px;display:flex;align-items:center;flex-direction:column;width:100%;padding:10px;border-top:1px solid #dfdfdf;font-size:14px;">
          <div class="flex-wrap flex-between" style="width:100%;">
            <div>阶段 PHASES</div>
            <div>5次</div>
          </div>
          <div class="flex-wrap flex-between" style="width:100%;">
            <div>时长 DURATION</div>
            <div>20学时</div>
          </div>
          <div class="flex-wrap flex-between" style="width:100%;">
            <div>成果 CERTIFICATION</div>
            <div>测试</div>
          </div>

           <div class="flex-wrap flex-between" style="width:100%;margin-top:10px;">
            <div>开始时间</div>
            <div>2021/5/27 15:00:00</div>
          </div>
           <div class="flex-wrap flex-between" style="width:100%;">
            <div>当前阶段</div>
            <div>5</div>
          </div>
           <div class="flex-wrap flex-between" style="width:100%;">
            <div>已报名</div>
            <div>133人</div>
          </div>

          <div class="flex-wrap flex-between" style="width:100%;margin-top:10px;">
            <div>下一阶段</div>
            <div>2021/5/27 15:00:00</div>
          </div>
           <div class="flex-wrap flex-between" style="width:100%;">
            <div>培训地点</div>
            <div>14楼大会议室</div>
          </div>
          <Button type="primary" v-if="!joined" style="width:80%;height:50px;margin-top:20px;" :disabled="false" @click="Join">我要报名<p style='font-size:10px;'>报名已结束</p></Button>
          <Button type="success" v-else style="width:80%;height:50px;margin-top:20px;" @click="RouteTo(`/core/classes/${id}/dashboard`)">进入课堂<p style='font-size:10px;color:#fff;'>已报名</p></Button>
        </div>
        </Col>
      </Row>
      
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  metaInfo:{
    title:"培训",
    route:"/:id"
  },
  data(){
    return {
      joined:false,
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
      }
    }
  },
  computed:{
    ...mapGetters('core',['getUser']),
    teacher(){
      return this.getUser(this.item.teacher)
    }
  },
  mounted(){

  },
  methods:{
    getData(){

    },
    Join(){
      // ... join
      this.joined = true
      this.Success("报名成功")
    }
  }
}
</script>

<style lang="less" scoped>
.plan-finished{
  filter:grayscale(1);
}
</style>