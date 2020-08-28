<template>
  <div class="l-login-wrap">
    <gForm
      ref='form'
      style='width:100%'
      :form="loginFormDef"
      :data="model"
      editable
      @submit='Submit'
    />
    <div>
     <Row
      style="margin-top:20px;"
    >
      <Col
        style="min-height:30px;"
        :gutter="12"
        :span="24"
      ><Button
        type='primary'
        class='login-btn'
        size='large'
        icon="ios-log-in"
        :loading="loading"
        ghost
         style="width:100%"
        @click="Submit"
      >登录</Button>
      </Col>
       </Row>
       <Row
      style="margin-top:10px;"
    >
      <Col
        :span="24"
      ><div class="forget-btn" :z-index='1'>忘记账号或者密码?</div>
      </Col>
    </Row></div>
   
  </div>
</template>

<script>
import gForm from '../form/index'
export default {
  data() {
    return {
      model:{},
      loginFormDef: {
        layout: `<div><Row><Col :span="24">{{user}}</Col></Row><Row style="margin-top:10px"><Col :span="24">{{password}}</Col></Row></div>`,
        def: {
          user: {
            label: "用户名",
            control: 'input'
          },
          password: {
            label: "密码",
            control: 'input',
            option: {
              type: "password",
              enter:true
            }
          }
        },
        option: {
          hideAction: true
        }
      }
    }

  },
  props:{
    loading:{
      type:Boolean
    }
  },
  components: { gForm },
  methods:{
    Submit(){
      let model = this.$refs.form.submit()
      if(!model.user){
        this.Error('请输入用户名')
      }else if(!model.password){
        this.Error('请输入密码')
      }

      this.$emit('submit',model)
    },
  }
}
</script>
<style lang="less" scoped>
.l-login-wrap {
  width:100%;
  margin: 0 auto;
  position: relative;

}

</style>