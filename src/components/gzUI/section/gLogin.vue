<template>
  <div class="l-login-wrap">
    <gForm
      ref='form'
      style='width:100%'
      :form="loginFormDef"
      :data="model"
      editable
    />
    <Row
      style="margin-top:10px;"
      gutter="10"
      class="l-form-buttons"
    >
      <Col
        style="min-height:30px;"
        :span="12"
      ><Button
        long
        size='large'
      >忘记密码
      </Button>
      </Col>
      <Col
        style="min-height:30px;"
        :span="12"
      ><Button
        type='primary'
        size='large'
        long
        @click="Submit"
      >登录</Button></Col>
    </Row>
  </div>
</template>

<script>
import gForm from '../form/index'
export default {
  data() {
    return {
      loginFormDef: {
        layout: `<div><Row><Col :span="24">{{account}}</Col></Row><Row style="margin-top:10px"><Col :span="24">{{password}}</Col></Row></div>`,
        def: {
          account: {
            label: "用户名",
            control: 'input'
          },
          password: {
            label: "密码",
            control: 'input',
            option: {
              type: "password"
            }
          }
        },
        option: {
          hideAction: true
        }
      }
    }

  },
  components: { gForm },
  methods:{
    Submit(){
      let model = this.$refs.form.submit()
      if(!model.account){
        this.Error('请输入用户名')
      }else if(!model.password){
        this.Error('请输入密码')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.l-login-wrap {
  width: 400px;
  max-width: 90%;
  margin: 0 auto;
  background: #dfdfdf;
  position: relative;
  padding: 20px;
  filter: drop-shadow(1px 1px 5px #aaa);
  border-radius: 15px;
}
</style>