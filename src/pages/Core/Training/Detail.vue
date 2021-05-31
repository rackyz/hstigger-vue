<template>
  <div style="padding:20px;">
    <div style="margin:0 auto;width:1200px;font-size:20px;">
      <Row :gutter="20">
        <Col :span='19'>
        <div style="padding:0 20px;">

         <a style="color:#3af;" @click="RouteTo('/core/training')"><Icon type="md-arrow-back" /> 返回列表</a> <h1>{{item.name || '培训名称'}}</h1>
      <p style="font-size:14px;margin:20px 0;">{{item.desc || '培训描述'}}</p>
      <p style="font-size:14px;margin:20px 0;">培训地点 <br /> <span style="color:#3af">{{item.address || '未指定'}}</span></p>

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
        <template v-if="!item.plans || item.plans.length == 0">
          无课程计划
        </template>
      </div>
        </div>
        
        </Col>
        <Col :span='5'>
        <div style="width:100%;display:flex;align-items:center;flex-direction:column;font-size:18px;">
        <hs-avatar size="80" :userinfo="charger" style="margin-bottom:10px" />
        {{charger.name}}
        <div style="font-size:14px;">部门</div>
        
        </div>
        <div style="margin-top:10px;display:flex;align-items:center;flex-direction:column;width:100%;padding:10px;border-top:1px solid #dfdfdf;font-size:14px;">
          <div class="flex-wrap flex-between" style="width:100%;">
            <div>课程计划</div>
            <div>{{item.plans?item.plans.length:'-'}}</div>
          </div>
          <div class="flex-wrap flex-between" style="width:100%;">
            <div>开始时间</div>
            <div>{{FormatDate(item.started_at)}}</div>
          </div>

           <div class="flex-wrap flex-between" style="width:100%">
            <div>预计结束</div>
            <div>{{FormatDate(item.finished_at)}}</div>
          </div>
           <div class="flex-wrap flex-between" style="width:100%;">
            <div>已报名</div>
            <div>{{item.users ?item.users.length:0}}</div>
          </div>
           <div class="flex-wrap flex-between" style="width:100%;">
            <div>状态</div>
            <div :style="{color:getTypeByValue('TASK_STATE',item.state || 0).color || 'orange'}">{{getTypeByValue('TASK_STATE',item.state || 0).name}}</div>
          </div>

         
          <Button type="primary" v-if="!isMember" style="width:80%;height:50px;margin-top:20px;" :disabled="!item.enable_join" @click="Join">我要报名<p style='font-size:10px;'>{{item.enable_join?'火热进行中':'报名已关闭'}}</p></Button>
          <Button type="success" v-else style="width:80%;height:50px;margin-top:20px;" @click="RouteTo(`/core/classes/${id}/dashboard`)">进入课堂<p style='font-size:10px;color:#fff;'>已报名</p></Button>
        </div>
        </Col>
      </Row>
      
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  metaInfo:{
    title:"培训",
    route:"/:id"
  },
  data(){
    return {
      item:{
        users:[]
      }
    }
  },
  computed:{
    ...mapGetters('core',['getUser','getTypeByValue','uid']),
    charger(){
      return this.getUser(this.item.charger) || {}
    },
    id(){
      return this.$route.params.id
    },
    isMember(){
      return this.item.users.find(v=>v.id == this.uid)
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    FormatDate(e){
      return e?moment(e).format('L'):'-'
    },
    getData(){
      this.api.enterprise.GET_TRAININGS({param:{id:this.id}}).then(res=>{
        let item = res.data.data
        this.item = item
      })
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