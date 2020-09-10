
<template>
    <div class="l-login">
      <hs-login :loading="loading" @submit="submitForm" />
      
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
    props:{
        routeTo:{
            type:String
        }
    },
    components:{PuzzleVerification},
    methods: {
        handleSuccess(){

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
                this.Error(e)
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

}




</style>
