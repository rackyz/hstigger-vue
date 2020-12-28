<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    
     <hs-menu style='min-width:200px;width:200px;padding:0;background:#13233c;color:#fff;filter:drop-shadow(1px 0px 15px #333);' :data="menus" @on-select='onClickMenu' :current="ActivePath" >
       <div class="l-avatar" slot="title">
         <hs-avatar :userinfo="session"  size="80" />
         {{session.name || session.user}}
         <Button type='info' size='small' style='margin-top:5px;' @click="modalChangeAvatar=true">更换头像</Button>
       </div>
       <div class='flex-wrap' style='justify-content:center;margin-top:10px;' slot='extra'>
          <Button  type='error' icon='md-log-out'  @click='logout'>切换账号</Button>
        </div>
      
     </hs-menu>
     
     
    <transition name='fadeIn'>
      <Content>
      
        <router-view></router-view>
      </Content>
      
    </transition>
     
    <hs-modal-form ref='form_forget' v-model="modalChangePwd" title="修改密码" :form='formForget' :width='400' :data='dataChangePwd' @on-submit="handleChangePassword" />
    

     <hs-modal-form ref='form_info' v-model="modalChangeInfo" title="修改账号信息" :form='formInfo' :width='300' :data='dataChangeInfo' @on-submit="handleChangeInfo" />

       <hs-modal-form ref='form_avatar' v-model="modalChangeAvatar" title="更换头像" :form='formAvatar' :width='300' :data='dataChangeAvatar' @on-submit="handleChangeAvatar" />

  </Layout>
   
  
  
</template>

<script>
import { mapGetters } from 'vuex'
import formForget from "@/forms/self_change_pwd"
import formInfo  from '@/forms/self_change_info'
import formAvatar  from '@/forms/self_change_avatar'
export default {
  data(){
    return {
      modalChangePwd:false,
      dataChangePwd:{},
      modalChangeInfo:false,
      dataChangeInfo:{},
      modalChangeAvatar:false,
      dataChangeAvatar:{},
       menus:[{
        name:'总览',
        icon:'bar-chart',
        path:'/core/self/dashboard'
      },{
        name:"数据信息",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'我的项目',
        icon:"xiangmu2",
        count:4,
        path:'/core/admin/user'
      },{
        name:'我的任务',
        count:4,
        icon:"eventnote",
        path:'/core/admin/dep'
      },{
        name:'我的流程',
        icon:"lianjieliu",
        count:34,
        path:'/core/admin/role'
      },{
        name:'我的资料',
        icon:"file",
        count:12,
        path:'/core/admin/role'
      }]},
      {
        name:"账号与安全",
        icon:'apps',
        is_group:true,
        subs:[{
        name:'账号信息',
        icon:"edit",
        path:'change-info'
      },{
        name:'修改密码',
        icon:"quanxianliebiao",
        path:'change-pwd'
      }]}]}
    
   
  },
  metaInfo:{
    title:'个人中心'
  },
  mounted(){
    this.initUserInfo()
  },
  computed:{
    ...mapGetters("core",['session']),
    ActivePath(){
      return this.$route.path
    },
    formForget(){
      return formForget
    },
    formInfo(){
      return formInfo
    },
    formAvatar(){
      return formAvatar
    }
  },
  methods:{
    initUserInfo(){
      this.dataChangeInfo = {
        user:this.session.user,
        phone:this.session.phone,
        email:this.session.email
      }

      this.dataChangeAvatar = {
        avatar:this.session.avatar
      }
    },
    onClickMenu(e){
      if(e && e.indexOf('/') != 0){
        console.log('menu:',e)
        if(e == 'change-pwd'){
           this.modalChangePwd = true
        }else if(e == 'change-info'){
          this.modalChangeInfo = true
        }
      }else{
        this.RouteTo(e)
      }
    },
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
      this.CORE.SELF_CHANGE_PWD(model).then(res=>{
        this.Success('修改成功')
        this.modalChangePwd = false
      }).catch(e=>{
        this.Error(e)
      }).finally(()=>{
        this.loading = false
      })
      console.log("changepass",e)
    },
    logout(){
      this.$store.dispatch("core/logout").then(res=>{
        this.RouteTo('/')
      })
    },
    handleChangeInfo(e){
      this.loading = true
      const reg_phone = /^1[345789]\d{9}$/
      const reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(e.phone && reg_phone.test(e.phone) == false){
        this.$refs.form_info.setError('phone','请输入正确的电话号码')
        return
      }
      if(e.email && reg_email.test(e.email) == false){
        this.$refs.form_info.setError('email','EMAIL格式错误')
        return
      }
      this.CORE.SELF_CHANGE_INFO(e).then(res=>{
        this.Success('修改成功')
        this.modalChangeInfo = false
        this.$store.commit('core/saveUserinfo',e)
        this.dataChangeInfo = e
      }).catch(e=>{
        this.Error(e)
      }).finally(e=>{
        this.loading = false
      })
    },
    handleChangeAvatar(e){
      this.loading = true
      if(!e.avatar)
        return
       this.CORE.SELF_CHANGE_INFO(e).then(res=>{
        this.Success('修改成功')
        this.$store.commit('core/saveUserinfo',e)
        this.dataChangeInfo = e
        this.modalChangeAvatar =false
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
.l-avatar{
  display: flex;
  
  flex-direction: column;
  align-items: center;
 width:calc(100% - 80px);
 margin:10px 40px;
  position: relative;
  left:-1px;
  color:#fff;
  font-size:20px;
}
</style>