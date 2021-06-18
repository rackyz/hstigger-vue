<template>
  <div class="hs-full-conatiner" style="background:#fff;height:100%;overflow-y:auto;padding-top:70px;position:relative;">
    <div class="l-header">
      系统配置<Button size="small" icon="md-create" style="float:right" @click="editable=true;" type="primary" v-if="!editable">修改</Button><Button size="small" icon="md-arrow-back" style="float:right" @click="editable=false;" v-if="editable" type="error">取消</Button>
    </div>
    <Row :gutter="20">
      <Col :span='12'>
      <div class="l-config-wrap" style="width:800px;padding-bottom:50px;">
       <p class="l-config-caption"><Icon type="md-list" /> 培训信息 </p>
      <hs-form  :form="form" :data="item" @on-submit="handleSubmit" :editable="editable" />
       <p class="l-config-caption"><Icon type="md-options" /> 报名控制</p>
      <div class="l-config-panel">
      
       <p class="l-config-item" style=""><span class="l-label">报名范围
         <br/><span class="l-desc">本培训对非本范围内的成员不可见</span></span>  <span class="l-value">全体员工</span></p>

      <p class="l-config-item"><span  class="l-label">报名时间<br /><span class="l-desc">选定报名的时间，非本时段不可报名</span></span></span>  <span class="l-value">培训结束前</span> </p>
       <p  class="l-config-item" v-if="false"><span class="l-label">设定报名截止日期</span>  <date-picker /></p>
        </div>

         <p class="l-config-caption"><Icon type="logo-twitter" /> 讨论区</p>
          <div class="l-config-panel">
      
          <p class="l-config-item"><span class="l-label">允许非成员参与讨论</span>  <i-switch />
        </p>
        </div>
    </div>
      </Col>
      <Col :span='12'>
      <div class="l-config-wrap" style="width:800px;padding-bottom:50px;">
       <p class="l-config-caption"><Icon type="md-list" /> 学员风采 </p>
        <hs-form :form="formImages" :data="item" @on-submit="handleSubmit" :editable="editable" />
      </div>
      </Col>
    </Row>
    

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      editable:false,
      model:{

      }
    }
  },
  computed:{
    ...mapGetters("training",['item']),
    form(){
      let form = Object.assign({},this.Form("class"))
      form.layout = form.layout.replace("{{charger}}","")
      return form
    },
    formImages(){
      return {
        def:{
          images:{
            control:"images",
            option:{
                uploader:"file/upload",
            }
          }
        },
        layout:`<div>{{images}}</div>`
        ,
        option:{
          hideCancel:true,
          hideReset:true
        }
      }
    }
  },
  methods:{
    handleSubmit(e){
      console.log(e)
      this.$store.dispatch('training/patch',{id:this.item.id,data:e}).then(res=>{
        this.Success("更新成功")
        this.editable = false

      }).catch(e=>{
        this.Error("操作失败:"+e)
      })
    }
  },
  props:['config','value']
}
</script>

<style lang="less" scoped>
.l-header{
  padding:20px;
  font-size:20px;
  background:#fff;
  border-bottom:1px solid #dfdfdf;
  position:absolute;left:0;
  top:0;
  right:0;
  height:70px;
  color:#333;
}

.l-config-wrap{
  padding:10px 40px;
  .l-config-caption{
    padding:10px 0;font-size:16px;font-weight:bold;
  }
  .l-config-panel{
    margin:0;padding:10px 15px;background:#fff;border:1px solid #eee;font-size:14px;
    .l-config-item{
      display:flex;
      align-items:center;
      justify-content:space-between;color:#3af;
      min-height:30px;
      margin:10px 0;
      .l-label{
        color:#333;
      }

      .l-value{
        border:1px solid #ddd;
        padding:5px 8px;
        border-radius: 5px;
      }

      .l-desc{
        font-size:10px;
        color:#aaa;
      }
    }

  }

}
</style>