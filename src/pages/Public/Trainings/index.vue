<template>
  <div class="l-wrapper" style="background:linear-gradient(to bottom right,#aaa,#358)">
    
    <div class="l-page" style="max-width:400px;background:#346;color:#fff;">
       <img :src="item.avatar || 'https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/assets/misc/px.jpg'" style="width:100%;height:210px;border:1px solid #aaa;" />
       <div style="font-size:20px;font-weight:bold;padding:10px;">{{item.name}}</div>
        <div style="width:100%;display:flex;align-items:center;flex-direction:row;justify-content:space-between;font-size:18px;padding:0 10px;">
        <hs-avatar size="40" :userinfo="item.charger_user"  />
        <div style="margin-left:20px;text-align:right">
        {{item.charger_user.name}}<br>
        <span style='color:#38f'>{{item.charger_user.phone}}</span>
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
          <template v-if="!success">
            <hs-form ref='form' :form="Form('public_join_training')" :env='forgetFormEnv' @on-event='onForgetFormEvent' editable :data="model" @submit="Join"  style="margin-top:20px;width:100%;" />
            <Button type='primary' style="width:100%;height:50px;margin-top:10px;" @click="onPreSubmit">我要报名</Button>
          </template>
          <template v-else>
            <div style="color:#fa8;font-weight:bold;font-size:30px;text-align:center;padding:30px;border:5px solid #fa8;border-radius:10px;margin-top:40px;">
              恭喜报名成功
            </div>
          </template>
          
    </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      item:{},
      success:false,
      forgetFormEnv:{},
    }
  },
  watch:{
    id:{
      handler(v){
        this.getData()
      }
    }
  },
  mounted(){
    this.getData()
  },
  computed:{
     ...mapGetters('core',['getUser','getTypeByValue','uid','session']),
    charger(){
      return this.getUser(this.item.charger) || {}
    },
    id(){
      return this.$route.params.id
    },
    entid(){
      return this.$route.params.entid
    },
    joinform(){
      return {
        def:{
          phone:{
            control:'input',
            label:"电话"
            
          }
        },
        layout:`<div>{{phone}}</div>`
      }
    }
  },
  metaInfo:{
    title:"培训报名",
    route:"/:id"
  },
  methods:{
    onPreSubmit(){
      let data = this.$refs.form.submit()
      this.Join(data)
    },
    onForgetFormEvent(e){
      console.log(e)
            if(e.type == "sendVerifyCode"){
                var that = this
                this.currentAccount = e.data
                this.CORE.SEND_VERIFY_CODE({account:e.data}).then(res=>{
                    this.$set(that.forgetFormEnv,'cooldown',60)
                    if(!that.IntervalCoolDown)
                        that.IntervalCoolDown = setInterval(()=>{
                           this.$set(that.forgetFormEnv,'cooldown',that.forgetFormEnv.cooldown-1)
                            if(that.forgetFormEnv.cooldown <= 0){
                                this.$set(that.forgetFormEnv,'cooldown',null)
                                clearInterval(that.IntervalCoolDown)
                            }
                             
                        },1000)
                }).catch(e=>{
                    this.Error(e)
                })
            }
    },
    FormatDate(e){
      return e?moment(e).format('L'):'-'
    },
    getData(){
      let id = this.$route.params.id
      this.api.public.GET_TRAININGS({param:{id},query:{ent:this.entid}}).then(res=>{
        let item = res.data.data
        item.type = {} //this.$store.getters['core/getTypes']('MESSAGE_TYPE')[item.msg_type].name
        this.item = res.data.data
      })
    },
    Join(e){
      if(!e.vcode)
      {
        this.Error("请先进行手机验证")
        return
      }
      this.api.public.PATCH_TRAININGS(e,{param:{id:this.id},query:{q:'joinpub',ent:this.entid}}).then(res=>{
        this.success = true
      }).catch(e=>{
        this.Error(e)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.l-wrapper{
  width:100%;
 
  height:100%;
  position: relative;
  overflow: hidden;
}
.l-page{
  margin:0 auto;
  padding:10px;
  width:90%;
  min-height:800px;
  padding-bottom:100px;
   overflow: hidden;
}
</style>