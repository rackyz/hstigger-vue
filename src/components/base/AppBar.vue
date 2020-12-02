<style lang="less">
.ivu-checkbox-inner{
           background:#aaa;
           border-radius: 0;
           margin-right:5px;
           border:none;
         }

         .ivu-checkbox-checked{
           .ivu-checkbox-inner:after{
             width:6px;
             height:9px;
           }
         }
.l-app-bar{
   .ivu-select-dropdown{
            margin-top:15px;
             background:#23334c;
              color:#fff;
            li,ul{
               background:#23334c;
               border-color:#23334c;
    color:#fff;
            }
            li:hover{
              filter:brightness(1.2);
               background:#23334c;
            color:#fff;
            }
            .ivu-dropdown-item-divided:before{
              background:#000;
              height:1px;
              border:none;
              border-top:1px solid #333;

              margin:0 1px;
            }
}
         
   
  }
</style>
<template>
  <div class="l-app-bar">
    <div class="l-left">
       <Dropdown ref='dm'  :trigger="my_enterprises.length == 0?'custom':'hover'" placement="bottom-start" @on-visible-change='showUserMenu=$event' @on-click='onSelectEnterprise' >
       <BaseLogo class='d-none d-sm-block' style="margin-right:20px;"></BaseLogo>
        <DropdownMenu slot="list">
           <DropdownItem ref='m1'  :name='null' v-show='current_enterprise != null'><img style='width:30px;height:30px;margin-right:3px;' src="http://www.hstigger.com/img/logo-flat.0ce4c896.png" /> 个人模式</DropdownItem>
          <template v-for='e in my_enterprises'>
            <DropdownItem v-if='e' ref='m1' :key='e.id' :name='e.id' v-show='e.id != current_enterprise'><img style='width:30px;height:30px;margin-right:3px;' :src="e.avatar" /> {{e.name}}</DropdownItem>
          </template>
        </DropdownMenu>
      </Dropdown>
      <!-- Menu Button -->
      <BaseAppMenu v-model="open_selector" />
    </div>
    <div class="l-right">
           <div class='spinner'  v-if='loading'>
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>

       <div class='text-btn' @click="RouteTo('/core/debug')" style='margin-right:15px;'>
          <Icon custom="gzicon gzi-bug" size="18" :color="showDebug?'yellowgreen':''" />
        </div>
      <Badge :count='session.flow_count' type='error' style='margin-right:20px;' v-if="false">
       <div class='text-btn' @click="RouteTo('/core/flow')" >
          <Icon custom='gzicon gzi-lianjieliu' size="18"  />
        </div>
         </Badge>
<Badge :count='session.task_count' type='warning' style='margin-right:20px;' v-if="false">
         <div class='text-btn' @click="RouteTo('/core/task')">
          <Icon custom='gzicon gzi-eventavailable' size="18"  />
        </div>
</Badge>
      
      <!-- Message -->
      <Badge :count='session.unread_msg_count' type='primary' style="margin-right:20px;">
        <div class='text-btn' @click="RouteTo('/core/message')">
          <Icon custom="gzicon gzi-mail" size="18" />
        </div>
      </Badge>
      
      <!-- User -->
      <Dropdown ref='dm' trigger='hover' placement="bottom-start" @on-visible-change='showUserMenu=$event' @on-click='onClickUserMenu'>
        <a href="javascript:void(0)" class="text-btn text-btn-dropdown" :class="{'text-btn-dropdown-active':showUserMenu}">
          <BaseAvatar :size="25" style='margin-right:8px;' :userinfo="session"></BaseAvatar>
          <span class='d-none d-sm-block'>{{session.user}}</span>
          
        </a>
         <DropdownMenu slot="list">
            <DropdownItem ref='m1' name='self'>个人中心</DropdownItem>
            <DropdownItem ref='m2' name='logout' divided>退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>

   
    </div>
   
      <div class='l-login-mask' v-if="!isLogin"  >
          <div class="login" v-if="!loading">
          <BaseLoginHeader />
          <p style='color:#aaa'>您的登录状态已过期，请重新登录</p>
          <BaseLogin style="margin-top:20px;" />
          
      </div>
      
    </div>
    <div v-if='loading'  style='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(33,33,33,0.6)'>
    <div style='margin:300px auto!important;width:200px;height:200px;border-radius:50%;overflow:hidden;color:#fff;'>
        <img src='https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/loading02.jpg' style='opacity:0.3;filter:drop-shadow(1px 1px 1px #aaa);width:600px;height:500px;position:relative;left:-200px;top:-150px;'  />
        
        </div>
        
        </div>
     
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Login from "@pages/Login.vue"
export default {
  data(){
    return {
      open_selector:false,
      showUserMenu:false,
      showDebug:false,
      isInit:false,
      loading:false,
      model:{}

    }
    
  },
  components:{
    Login
  },
  computed:{
    ...mapGetters('core',{
      session:'session',
      users:'users',
      deps:'deps',
      roles:'roles',
      isLogin:'isLogin',
      my_enterprises:'my_enterprises',
      current_enterprise:"current_enterprise"
    })
  },
  mounted(){
    if(!this.session.id){
      this.getSession()
    }

    
  },
  methods:{
    getSession(){
      
      this.loading = true
      this.$store.dispatch('core/whoami').then(()=>{

      }).finally(e=>{
        setTimeout(() => {
          this.loading = false
        }, 2000);
        
      })
    },
    onSelectEnterprise(e){
      this.loading = true
      this.$store.dispatch('core/SetCurrentEnterprise',e).then(res=>{
        this.getSession(e)
      }).finally(e=>{
        setTimeout(()=>{this.loading=false},
      1000)})
    },
    onClickUserMenu(e){
      if(e == 'logout'){
        this.$store.dispatch('core/logout')
        this.RouteTo('/login')
      }
      else
        this.RouteTo('/core/'+e)
    },
    Debug_ChangeUser(e){

    },
    Debug_ChangeDep(e){

    },
    Debug_ChangeRole(e){

    }
  }
}
</script>

<style lang="less" scoped>
.l-app-bar{
  height:44px;
   background: #23334c;
  background-blend-mode: multiply, multiply;
  position: fixed;
  left:0;
  right:0;
  top:0;
  z-index:1000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .l-left,.l-right{
    display: flex;
    align-items: center;
    color:#fff;
    font-size:12px;
    margin:0 6px;
  }

  .l-login-mask{
    z-index:1052;
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(33,33,33,0.8);
  }

 
}

 .debug-log{
    max-height:400px;
    overflow:auto;
    font-size:10px;
    font-family: 'Courier New', Courier, monospace;
    padding:10px;
    background:#fff;
    margin-top:10px;
    border:1px solid #aaa;
  }


  .spinner{
    height:15px;
    
    div{
      background:yellowgreen;
      margin-right:3px;
      width:2px;
    }
  }

 

</style>