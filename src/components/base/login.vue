
<style lang='less'>

.login-modal{
    .ivu-modal{
        margin-top:130px;
        padding:10px;
    }
    
}
</style>
<template>
    <div class="l-login">
      <hs-login :loading="loading" @submit="prepareSubmitForm" />
        <div class='flex-wrap flex-between' style='width:100%;font-size:16px;margin-top:5px;overflow:hidden;'>
        <div class="forget-btn" @click='isForgetting=true'>忘记账号或者密码?</div>
      <div class="forget-btn" @click='isRegistering=true' v-show='setting.ENABLE_REGISTER'>注册账号</div>
      </div>
      
    <div class='oauth-wrap' style='margin-top:20px;' v-if='setting.ENABLE_OAUTH_LOGIN'>
        OAUTH 2.0 第三方登录区域
    </div><div class='states-wrap' :style='`background:${server_down?"darkred":"yellowgreen"}`'>
          
        </div>

          <hs-modal-form class-name='login-modal' title="密码找回" width='500'  v-model='isForgetting' :form="forgetForm" :data="forgetFormData" :env='{cooldown,can_send:forgetFormData.account}' @submit='onSubmitForget' @cancel='isForgetting=false' @event='onForgetFormEvent' editable></hs-modal-form>
          
         

        <PuzzleVerification
            v-model='isVerificationShow'
            style='top:-250px;z-index:1000;'
            deviation="20"
            :puzzleImgList="puzzleImgList"
            blockType="puzzle"
            width="400"
            height="250"
            :onSuccess="handleVerificationSuccess"
          />

            <hs-modal-form class-name='login-modal' title="注册账号" width='600'  v-model='isRegistering' :form="registerForm" :data="registerFormData" :env='{cooldown,can_send:registerFormData.phone}' @submit='onSubmitRegister' @cancel='isRegistering=false' @event='onRegisterFormEvent' editable></hs-modal-form>
     
    </div>
</template>

<script>
import PuzzleVerification from 'vue-puzzle-verification'
import { mapActions } from 'vuex'

export default {
    data: function () {
        return {
            loading: false,
            setting:false,
            error:false,
            enableRegister:true,
            enableOAuth:false,
            loginData:{},
            isVerifyMode:false,
            isVerificationShow:false,
            forgetFormData:{},
            registerFormData:{},
            isForgetting:false,
            isRegistering:false,
            server_down:true,
            can_send:false,
            puzzleImgList:['https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/spring.png','https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/summer.png','https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/autum.png','https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/winter.png'],
            forgetForm:{
                layout:`<div style='padding-left:150px;position:relative;'><img src='https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/pass.jpg' style='width:135px;height:140px;position:absolute;left:0px;top:0px;filter:drop-shadow(1px 1px 1px #333);border:3px solid #fff;' /><div style='margin-bottom:5px;font-size:14px;'>请输入您的<span style='color:red'>账号</span>或<span style='color:red'>手机号</span></div>
                <Row :gutter='12' >
                    <Col :span='24'>{{account}}</Col></Row>
                    <div style='padding:5px 0'>发送至您手机短信的<span style='color:red'>验证码</span></div>
                    <Row :gutter='12'>
                    <Col :span='16'>{{verify_code}}</Col>
                    <Col :span='8'><Button long type='warn' style='height:40px;border:none;font-size:16px;border-radius:5px;' :disabled='!env.can_send || env.cooldown' @click='onEvent({type:"sendVerifyCode"})'>发送<span v-if='env.cooldown'>({{env.cooldown}}s)</span></Button></Col>
                </Row></div>`,
                def:{
                    account:{
                        control:'input',
                        option:{
                            required:true,
                        }
                    },
                    verify_code:{
                        control:'input',
                        option:{
                             required:true,
                            maxlen:6
                        }
                    }
                },
                option:{
                    submitText:'下一步',
                    hideReset:true
                }
            },
            registerForm:{
                layout:`<div style='position:relative;padding-left:300px;'><div style='position:absolute;left:0px;bottom:0px;top:0px;width:290px;padding:40px 30px;background:linear-gradient(to bottom, rgba(5, 59, 68, 0.15) 0%, #094155 100%), radial-gradient(at top center, rgba(194, 214, 234, 0.4) 0%, rgba(90, 148, 207, 0.4) 120%) #394865;color:#fff;'><span style='color:#fff;background:#ffffff33;padding:5px 10px;'>个人账号权限(体验)</span><br /> <br /> <Icon type='md-checkmark' style='color:lightgreen' /> 可创办5个项目<br /><Icon type='md-checkmark' style='color:lightgreen' /> 可创办1企业(10人)<br /><Icon type='md-checkmark' style='color:lightgreen' /> 企业数据分析工具<br /><Icon type='md-checkmark' style='color:lightgreen' /> 可作为员工/客户加入企业，同企业正常业务交互<br /><Icon type='md-checkmark' style='color:lightgreen' /> 个人网盘1GB<br /></div><div style='margin-bottom:5px;font-size:14px;'>请输入您的<span style='color:red'>手机号</span></div>
                <Row :gutter='12' >
                    <Col :span='24'>{{account}}</Col></Row>
                    <div style='padding:5px 0'>发送至您手机短信的<span style='color:red'>验证码</span></div>
                    <Row :gutter='12'>
                    <Col :span='12'>{{verify_code}}</Col>
                    <Col :span='12'><Button long type='warn' style='height:40px;border:none;font-size:16px;border-radius:5px;' :disabled='!env.can_send || env.cooldown' @click='onEvent({type:"sendVerifyCode"})'>发送<span v-if='env.cooldown'>({{env.cooldown}}s)</span></Button></Col>
                </Row>  <div style='padding:5px 0'>输入密码</div><Row :gutter='12' >
                    <Col :span='24'>{{password}}</Col></Row> <div style='padding:5px 0'>请在输入一次</div><Row :gutter='12' >
                    <Col :span='24'>{{password_confirm}}</Col></Row></div>`,
                def:{
                    account:{
                        control:'input',
                        option:{
                            required:true,
                        }
                    },
                    verify_code:{
                        control:'input',
                        option:{
                             required:true,
                            maxlen:6
                        }
                    },
                    password:{
                        control:'input',
                        option:{
                            require:true,
                            type:'password'
                        }
                    },
                    password_confirm:{
                        control:'input',
                        option:{
                            require:true,
                            type:'password'
                        }
                    }
                },
                option:{
                    submitText:'注册',
                    hideReset:true
                }
            }
        }
    },
    props:{
        routeTo:{
            type:String
        }
    },
    components:{PuzzleVerification},
    mounted(){
        this.CORE.GET_LOGIN_SETTING().then(res=>{
            this.setting = res.data.data || {}
            this.server_down = false
        }).catch(e=>{
            this.Error('服务器连接失败,请检查网络')
        })
    },
    methods: {
        handleVerificationSuccess(e){
            console.log('verify:',e)
            if(this.isVerificationShow){
                this.isVerificationShow = false
                this.submitForm(this.loginData)
            }
               
        },
        onForgetFormEvent(e){
            console.log('forget:',e)
        },
        prepareSubmitForm(model){
            if(this.isVerifyMode){
                this.loginData = model
                this.isVerificationShow = true
            }else{
                this.submitForm(model)
            }
            
        },
        submitForm(model) {
            if(!model.user){
                this.Error("请输入用户名")
                return
            }
            if(!model.password){
                this.Error("请输入密码")
                return
            }

             this.loading = true
            this.$store.dispatch('core/login',model).then(session=>{
                this.Success('登陆成功')
                if(this.routeTo){
                    
                    this.RouteTo(this.routeTo)
                }else{
                    location.reload()
                }
            }).catch(e=>{
                if(e == "tokenoutofdate"){
                    this.Error('密码错误')
                    this.isVerifyMode = true
                    return
                }else{
                    this.Error(e)
                }
            }).finally(e=>{
                this.loading = false
            })
        }
    }
}
</script>
<style lang="less" scoped>
.l-login{
  text-align: center;
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
    .gz-form-content{
        input{
        background:none !important;
    }
    }

    .forget-btn{
        margin:0 5px;
        text-align: center;
    }

}
.oauth-wrap{
  background:rgba(255,255,255,0.1);
  line-height:50px;
  width:100%;
  height:50px;
  color:#aaa;
  text-align: center;
}

.states-wrap{
    text-align: center;
    width:8px;
    margin:20px auto;
    display: flex;
    justify-content: space-around;
    height:8px;
    border-radius:10px;
    filter:drop-shadow(-1px -1px 1px #000);
}






</style>
