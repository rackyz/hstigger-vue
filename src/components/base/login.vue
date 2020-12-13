
<style lang='less'>

.login-modal{
    .ivu-modal{
        margin-top:150px;
        padding:10px;
    }
    
    .l-form .gz-disabled-item:hover{
  background:none !important;
}
}


</style>
<template>
    <div class="l-login" :style='setting.MAINTAIN?"filter:grayscale(1);":""'>
        <!-- LAYOUT BEGIN -->
        <hs-login :loading="loading" @submit="prepareSubmitForm" :disabled="setting.MAINTAIN" />
        <div class='flex-wrap flex-between' style='width:100%;font-size:16px;margin-top:5px;overflow:hidden;'>
            <div class="forget-btn" @click='isForgetting=true;'>忘记账号或者密码?</div>
            <div class="forget-btn" @click='isRegistering=true' v-show='setting.ENABLE_REGISTER'>注册账号</div>
        </div>
      
        <BaseOAuthLogin v-if='setting.ENABLE_OAUTH_LOGIN' />
        <div class='states-wrap' :style='`background:${server_down?"darkred":"yellowgreen"}`'>
            
        </div>
        <span style='color:yellowgreen;position:relative;top:-122px;z-index:2000;' v-show="setting.MAINTAIN">{{setting.MESSAGE || "系统维护中..."}}</span>
        <!-- LAYOUT END -->

        <!-- FORGET MODAL FORM -->
        <hs-modal-form v-if="!setting.MAINTAIN" class-name='login-modal' title="密码找回" width='500'  v-model='isForgetting' :form="ForgetForm" :initData="forgetFormData" :env='forgetFormEnv' @on-submit='OnSubmitForget' @cancel='isForgetting=false' @event='onForgetFormEvent' editable></hs-modal-form>
          
        <!-- RESET MODAL FORM -->
        <hs-modal-form v-if="!setting.MAINTAIN" ref='change_pwd_form' class-name='login-modal' title="输入新密码" width='500'  v-model='isChangePwd' :form="ResetForm" :data="changePwdFormData"  @on-submit='onSubmitChangingPwd' @cancel='isChangePwd=false'  editable></hs-modal-form>

        <!-- REGISTER MODAL FORM -->
        <hs-modal-form v-if="!setting.MAINTAIN" class-name='login-modal' title="新用户注册" width='420'  v-model='isRegistering' :form="RegForm" :data="registerFormData"  @on-submit='OnSubmitRegister' @cancel='isRegistering=false'  editable></hs-modal-form>

        <!-- SAFEMODE PuzzleVerification MODAL -->
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
    </div>
</template>

<script>
import PuzzleVerification from 'vue-puzzle-verification'
import { mapActions } from 'vuex'
import RegForm from '@/forms/login_register'
import ForgetForm from '@/forms/login_forget'
import ResetForm from '@/forms/login_reset'
export default {
    data: function () {
        return {
            loading: false,
            currentAccount:"",
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
            forgetFormEnv:{},
            server_down:true,
            isChangePwd:false,
            changePwdFormData:{},
            

            regFormEnv:{},
            puzzleImgList:['https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/spring.png','https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/summer.png','https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/autum.png','https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/winter.png'],
            
            ForgetForm,
            ResetForm,
            RegForm
            
        }
    },
    props:{
        routeTo:{
            type:String
        }
    },
    components:{PuzzleVerification},
    mounted(){
        this.GetServerState()
    },
    methods: {
        onSubmitChangingPwd(model){
            if(model.password != model.password_confirm){
                this.$refs.change_pwd_form.setError('password_confirm','两次密码不一致，请修改')
                return
            }
            this.CORE.CHANGE_PWD({account: this.currentAccount,password:this.hs.MD5(model.password)}).then(res=>{
                this.Success('密码修改成功')
                this.isChangePwd = false
            }).catch(e=>{
                this.Error(e)
            })
        },
        GetServerState(){
            var that = this
            this.CORE.GET_LOGIN_SETTING().then(res=>{
                this.setting = res.data.data || {}
                this.server_down = false
                if(this.InternalChecker)
                    clearInterval(this.InternalChecker)
                this.$forceUpdate()
            }).catch(e=>{
                this.Error('服务器连接失败,请检查网络')
                if(!this.InternalChecker)
                    this.InternalChecker = setInterval(()=>{
                        that.GetServerState()
                    },30000)
            })
        },
        handleVerificationSuccess(e){
            console.log('verify:',e)
            if(this.isVerificationShow){
                this.isVerificationShow = false
                this.submitForm(this.loginData)
            }
               
        },
        onForgetFormEvent(e){
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
            } else if(e.type == 'sendPhoneVCode'){
                
                 this.CORE.SEND_PHONE_CODE({phone:e.data}).then(res=>{
                    this.$set(that.regFormEnv,'cooldown',15)
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
        prepareSubmitForm(model){
            if(this.isVerifyMode){
                this.loginData = model
                this.isVerificationShow = true
            }else{
                this.submitForm(model)
            }
            
        },
        OnSubmitForget(model){
            var that = this
            this.CORE.VERIFY_FORGET_VCODE(model).then(res=>{
                this.isForgetting = false
                this.isChanging = true
                setTimeout(() => {
                   that.isChangePwd = true 
                }, 500);
            }).catch(e=>{
                this.Error(e)
            })
        },
        OnSubmitRegister(model){
            console.log('outer:',model)
            this.CORE.REGISTER(model).then(res=>{
                this.Success('注册成功')
                this.isRegistering = false
            }).catch(e=>{
                this.Error(e)
            })
        },
        submitForm(model) {
            this.forgetFormData = {account:model.user}
            if(!model.user){
                this.Error("请输入用户名")
                return
            }
            
            
            if(!model.password){
                this.Error("请输入密码")
                return
            }

                console.log("LOGIN")
            this.loading = true
            this.$store.dispatch('core/login',model).then(session=>{
                this.Success('登陆成功')
                console.log("login",session)
                if(!session.lastlogin_at)
                    this.routeTo = '/core/welcome'
                if(this.routeTo){
                    this.RouteTo(this.routeTo)
                }else{
                    window.location.reload()
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
