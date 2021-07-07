<template>
  <div style="padding:20px;">
    <div style="margin:0 auto;width:1200px;font-size:20px;">
      <Row :gutter="20" >
        <Col :span='17'>
        <div style="padding:0 20px;">

         <a style="color:#3af;" @click="RouteTo('/core/training/dashboard')"><Icon type="md-arrow-back" /> 返回列表</a> <h1>{{item.name || '培训名称'}}</h1>
         
         <div style="position:relative;">
          
         <p style="font-size:14px;margin:20px 0;margin-bottom:0;font-weight:bold;" v-if="item.desc">培训内容 </p>
      <pre style="font-size:14px;">{{item.desc || '培训内容'}}</pre>
      <p style="font-size:14px;margin:20px 0;font-weight:bold;" v-if="item.address">培训地点 <br /> <span style="color:#3af">{{item.address || '未指定'}}</span></p>

      <div style="margin-top:20px;">
        <template v-for="(p,i) in item.plans">
          <div :key="p.id" style="background:#fff;margin:5px 0;padding:20px;padding-left:80px;position:relative;"
          
          :class="p.finished?'plan-finished':''"
          >
            <div style="position:absolute;left:20px;top:20px;background:#3af;color:#fff;width:40px;height:40px;justify-content:center;display:flex;align-items:center;">{{i+1}}</div>

            <div style="position:absolute;right:20px;top:20px;background:orange;color:#fff;width:80px;height:40px;justify-content:center;display:flex;align-items:center;font-size:16px;">{{p.finished?'已结束':'进行中'}}</div>
          <h2 style="font-size:18px;">{{p.name}}</h2>
          <p style="font-size:14px;color:#3af;">{{FormatDate(p.started_at)}} , {{p.duration || '时间待定'}}</p>
          </div>
        </template>
      </div>
        </div>
        </div>
        </Col>
        <Col :span='7'>
         <img :src="item.avatar || 'https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/assets/misc/px.jpg'" style="width:100%;height:210px;border:1px solid #aaa;margin-bottom:20px;" />
        <div style="width:100%;display:flex;align-items:center;flex-direction:row;justify-content:space-between;font-size:18px;padding:0 10px;">
        <hs-avatar size="40" :userinfo="charger"  />
        <div style="margin-left:20px;">
        {{charger.name}}
        </div>
        </div>
        <div style="margin-top:20px;display:flex;align-items:center;flex-direction:column;width:100%;padding:10px;border-top:1px solid #dfdfdf;font-size:14px;">
          <div class="flex-wrap flex-between" style="width:100%;align-items:flex-start;">
            <div>培训地点</div>
            <div style="text-align:right;color:#3af;max-width:200px;">{{item.address}}</div>
          </div>
          <div class="flex-wrap flex-between" style="width:100%;">
            <div>课程计划</div>
            <div style="text-align:right;color:#3af;">{{item.plans?item.plans.length:'-'}}</div>
          </div>
          <div class="flex-wrap flex-between" style="width:100%;">
            <div>开始时间</div>
            <div style="text-align:right;color:#3af;">{{FormatDate(item.started_at)}}</div>
          </div>

           <div class="flex-wrap flex-between" style="width:100%">
            <div>预计结束</div>
            <div style="text-align:right;color:#3af;">{{FormatDate(item.finished_at)}}</div>
          </div>
           <div class="flex-wrap flex-between" style="width:100%;">
            <div>已报名</div>
            <div style="text-align:right;color:#3af;">{{item.users ?item.users.length:0}}</div>
          </div>
           <div class="flex-wrap flex-between" style="width:100%;">
            <div>状态</div>
            <div style="text-align:right;color:#3af;" :style="{color:getTypeByValue('TASK_STATE',item.state || 0).color || 'orange'}">{{getTypeByValue('TASK_STATE',item.state || 0).name}}</div>
          </div>
        
          <div id="qrCode" ref="qrCodeDiv"></div>
            <a :href="`/public/${current_enterprise}/trainings/${id}`">外部报名入口</a>
            <div class="flex-wrap flex-around" style="margin-top:20px;width:100%;">
                 <Button type="warning" v-if="isCharger" style="width:120px;height:50px;" @click="RouteTo(`/core/classes/${id}/dashboard`)">管理后台<p style='font-size:10px;color:#fff;'>已报 {{item.count || 0}}</p></Button>
          <Button type="primary" v-if="!isMember" style="width:120px;height:50px;" :disabled="!item.enable_join" @click="Join">我要报名<p style='font-size:10px;'>{{item.enable_join?`已报 ${item.count || 0}`:'报名已关闭'}}</p></Button>
          
          <Button type="success" v-else style="width:120px;height:50px;" @click="RouteTo(`/core/classes/${id}/dashboard`)">进入课堂<p style='font-size:10px;color:#fff;'>已报名</p></Button>
          
            </div>
        <a style="color:red;margin-top:10px;" @click="unjoin" v-if="isMember">取消报名</a>
          
        </div>
        </Col>
      </Row>
      

    </div>
    
    <hs-modal-form v-model="modalJoin" :form="Form('train_extra_info')" :data="session" @on-submit="handleJoinSubmit" width="400" title="报名信息补充" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import QRCode from 'qrcodejs2';
export default {
  metaInfo:{
    title:"培训",
    route:"/:id"
  },
  data(){
    return {
      item:{
        users:[]
      },
      modalJoin:false
    }
  },
  computed:{
    ...mapGetters('core',['getUser','getTypeByValue','uid','session','current_enterprise']),
    charger(){
      return this.getUser(this.item.charger) || {}
    },
    id(){
      return this.$route.params.id
    },
    isMember(){
      return this.item.users.find(v=>v.user_id == this.uid)
    },
    isCharger(){
      return this.item.charger == this.uid || this.$store.getters['core/session'].my_deps.includes(69071263)
    }
  },
  mounted(){
    this.getData()
    new QRCode(this.$refs.qrCodeDiv, {
          text: `https://www.inbgz.com/public/${this.current_enterprise}/trainings/${this.id}`,
          width: 200,
          height: 200,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
        })
  },
  methods:{
    FormatDate(e){
      return e?moment(e).format('L'):'-'
    },
    getData(){
      this.api.enterprise.GET_TRAININGS({param:{id:this.id}}).then(res=>{
        let item = res.data.data
        if(item.plans && item.plans.length > 0){
           item.started_at = item.plans[0].started_at
          item.finished_at = item.plans[item.plans.length-1].started_at
        }
       
        this.item = item
      })
    },
    Join(){
      this.modalJoin = true 
    },
    handleJoinSubmit(e){
      this.api.enterprise.PATCH_TRAININGS(e,{query:{q:'join'},param:{id:this.id}}).then(res=>{
       
        this.Success(this.isMember?"取消成功":"报名成功")
        this.modalJoin = false
        this.getData()
      })
    },
    unjoin(){
        this.api.enterprise.PATCH_TRAININGS(null,{query:{q:'unjoin'},param:{id:this.id}}).then(res=>{
        
        this.Success(this.isMember?"取消成功":"报名成功")
        this.getData()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.plan-finished{
  filter:grayscale(1);
}
</style>