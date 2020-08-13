
<template>
    <div class="l-login">
      
      <gLogin :loading="loading" @submit="submitForm" @forget="forget"/>
      
      <Modal v-model="isVerificationShow" footer-hide width="430">
        <PuzzleVerification
            :puzzleImgList="puzzleImgList"
            blockType="puzzle"
            :onSuccess="handleSuccess"
            width="400"
            height="230"

          />
      </Modal>
     
    </div>
</template>

<script>
import gLogin from '@components/gzUI/section/gLogin'
import PuzzleVerification from 'vue-puzzle-verification'
import { mapActions } from 'vuex'

export default {
    data: function () {
        return {
            loading: false,
            error:false,
            isVerificationShow:false,
            puzzleImgList:['https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/code.jpg']
        }
    },
    components:{gLogin,PuzzleVerification},
    mounted(){
        let skey = localStorage.getItem("kt-token")
        let path = localStorage.getItem("last-route-path")
        var that = this
        if(skey){
            this._whoami(skey).then(()=>{
                if(!path || path == '/')
                    path = "/dashboard"
                that.$router.push(path)
            })
        }
        
    },
    methods: {
        ...mapActions('user', {
            login: 'login',
            _whoami:"whoami",
            logout: 'logout',
            forgetPassword:"forgetPassword"
        }),
        handleSuccess(){
        },
        submitForm(formData) {
            this.loading = true
            this.error = false
            var that = this
            
            this.login(formData).then(() => {
                this.$Notice.success({
                    title: '登录成功'
                })
                setTimeout(() => { 
                    this.loading = false; 
                    that.$router.push("/dashboard")
                }, 1000)
            }).catch(e => {
                this.error = true;
                this.$Modal.error({
                    title: '登录失败',
                    content: e
                })
                setTimeout(() => { this.loading = false }, 1000)
            })    
        },
        forget(formData){
            this.loading = true
            let phone = formData.phone
            this.forgetPassword(phone).then(()=>{
                 this.$Modal.success({
                    title:"操作成功",
                    content: '您的密码已发送至:'+phone+",请收到之后，及时进行修改"
                })
            }).catch(e=>{
                 this.error = true;
                this.$Modal.error({
                    title: '发送失败',
                    content: e
                })
            }).finally(()=>{
                 setTimeout(() => { this.loading = false }, 1000)
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

}




</style>
