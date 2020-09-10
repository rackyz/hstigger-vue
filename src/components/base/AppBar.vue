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
</style>
<template>
  <div class="l-app-bar">
    <div class="l-left">
       <BaseLogo class='d-none d-sm-block' style="margin-right:20px;"></BaseLogo>
      <!-- Menu Button -->
      <BaseAppMenu v-model="open_selector" />
    </div>
    <div class="l-right">
       <div class='text-btn' @click="showDebug = !showDebug" style='margin-right:15px;'>
          <Icon custom="gzicon gzi-bug" size="18" :color="showDebug?'yellowgreen':''" />
        </div>
      <!-- Message -->
      <Badge :count='session.unread_msg_count' type='primary' style="margin-right:20px;">
        <div class='text-btn' @click="RouteTo('/core/message')">
          <Icon custom="gzicon gzi-mail" size="18" />
        </div>
      </Badge>
      
      <!-- User -->
      <Dropdown ref='dm' trigger='hover' placement="bottom-start" @on-visible-change='showUserMenu=$event' @on-click='onClickUserMenu'>
        <a href="javascript:void(0)" class="text-btn text-btn-dropdown" :class="{'text-btn-dropdown-active':showUserMenu}">
          <BaseAvatar :size="30" style='margin-right:5px;'></BaseAvatar>
          <span class='d-none d-sm-block'>{{session.name}}</span>
        </a>
         <DropdownMenu slot="list">
            <DropdownItem ref='m1' name='self'>个人中心</DropdownItem>
            <DropdownItem ref='m2' name='logout' divided>退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <!-- DEBUG MODAL -->
      <Modal title="调试"  footer-hide draggable v-model="showDebug" v-show='session.id'>
          <div style="padding:10px;padding-left:120px;">
          用户: <Select style='display:inline-block;width:200px;' transfer :value="session.id"  @on-change="Debug_ChangeUser"> <Option :key="d.id" :name="d.id" v-for="d in users" :value="d.id">
                {{d.name}}
          </Option>
          </Select><br />
              部门: <Select ref='debug_deps' style='display:inline-block;width:300px;margin-top:5px;' multiple transfer :value="session.deps"  @on-select="Debug_ChangeDep"> <Option :key="d.id" :name="d.id" v-for="d in deps" :value="d.id">
                      {{d.name}}
              </Option>
          </Select><br />
              角色: <Select  ref='debug_roles' style='display:inline-block;width:300px;margin-top:5px;' multiple transfer :value="session.roles"  @on-select="Debug_ChangeRole"> <Option :key="d.id" :name="d.id" v-for="d in roles" :value="d.id">
                      {{d.name}}
          </Option>
          </Select>
          <hs-avatar :userinfo="session" :size="80" style="position:absolute;left:20px;top:45px;" />
          <br />
          <div class="log">
            {{session.unread_msg_count}}
              </div>
                  </div>
      </Modal>
   
      <div class='l-login-mask' v-show="!isLogin"  >
          <div class="login">
          <BaseLoginHeader />
          <p style='color:#aaa'>您的登录状态已过期，请重新登录</p>
          <BaseLogin style="margin-top:20px;" />  
          <BaseOAuthLogin style='margin-top:20px;' />
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
      isLogin:'isLogin'
    })
  },
  mounted(){
    if(!this.session.id){
      this.$store.dispatch('core/whoami').then(()=>{
        
      }).catch(e=>{
        // this.RouteTo('/login')
      })
    }

    
  },
  methods:{
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

</style>