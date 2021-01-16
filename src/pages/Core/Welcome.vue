<template>
  <div class='hs-container welcome'>Welcome
    <div class='desc'>欢迎使用企业信息平台

    </div>
    <div class="flex-wrap l-button-wrap"><Button class='start' style="background:#3af;color:#fff;border:none;" @click="RouteTo('/core/dashboard')">开始</Button></div>
   
     <hs-modal-form  ref='form_forget' class-name='login-modal' title="输入新密码" width='500'  v-model='modalChangePwd' :form="require('@/forms/self_change_pwd').default" :data="changePwdFormData"  @on-submit='handleChangePassword' @cancel='modalChangePwd=false'  editable></hs-modal-form> 
  </div>
</template>

<script>
export default {
  data(){
    return {
      modalChangePwd:false,
      changePwdFormData:{}
    }
  },
  metaInfo:{
    title:'欢迎'
  },
  methods:{
    validatePassword(e){
      let {password_old,password,password_confirm} = e
      if(!password_old || !password || !password_confirm){
        this.Error("请填写密码后再提交")
        return false
      }
      if(password != password_confirm){
        this.$refs.form_forget.setError('password_confirm','两次密码不一致')
        return false
      }

      return {old:this.hs.MD5(password_old),pass:this.hs.MD5(password)}
      
    },
    handleChangePassword(e){
      let model = this.validatePassword(e)
      if(!model)
        return

      this.loading = true
      console.log(this)
      this.CORE.SELF_CHANGE_PWD(model).then(res=>{
        this.Success('修改成功')
        this.modalChangePwd = false
      }).catch(e=>{
        this.Error(e)
      }).finally(()=>{
        this.loading = false
      })
    },
  }
}
</script>
<style lang="less" scoped>
.welcome{
  height:100%; 

  background: #373B44;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4286f4, #373B44);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4286f4, #373B44); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background-image:url(https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/cloud/pexels-pixabay-316093.jpg);
  background-size:100% 140%;

  color:#fff;
  text-shadow:2px 2px 5px #000;
  font-size: 80px;
  text-align: center;
  padding-top:200px;
  font-weight: bold;

  .desc{
    margin-bottom:20px;
    font-size:50px;
    font-weight: normal;
    p{
      font-size:25px;
      margin:10px;
    }
  }

  .l-button-wrap{
    >*{
      margin:5px 10px;
    }
    margin:0 auto;
    width:100%;
    justify-content: center;
  }

  .start{
    width:200px;
    height:65px;
    font-size:25px;
    color:#000;
    background:#dfdfdf;
    transition: all 0.5s;
  }

  .start:hover{
    filter:brightness(1.2);
   
    transition: all 0.5s;
    border:2px solid rgb(252, 211, 5);
  }

  .start:active{
    position: relative;
    right:-2px;
    bottom:-2px;
  }
}
</style>