<style lang="less">
.ivu-checkbox-inner {
  background: #aaa;
  border-radius: 0;
  margin-right: 5px;
  border: none;
}

.ivu-checkbox-checked {
  .ivu-checkbox-inner:after {
    width: 6px;
    height: 9px;
  }
}
.l-app-bar {
  .ivu-select-dropdown {
    margin-top: 15px;
    background: #23334c;
    color: #fff;
    li,
    ul {
      background: #23334c;
      border-color: #23334c;
      color: #fff;
    }
    li:hover {
      filter: brightness(1.2);
      background: #23334c;
      color: #fff;
    }
    .ivu-dropdown-item-divided:before {
      background: #000;
      height: 1px;
      border: none;
      border-top: 1px solid #333;

      margin: 0 1px;
    }
  }
}
</style>
<template>
  <div class="l-app-bar">
    <div class="l-left">
      <Dropdown
        ref='dm'
        transfer
        :trigger="showEntMenu?'click':'custom'"
        placement="bottom-start"
        @on-visible-change='showEnterpriseMenu=$event'
        @on-click='onSelectEnterprise'
      >
        <BaseLogo
          class='d-none d-sm-block'
          style="margin-right:20px;"
          :class="{'text-btn-dropdown':showEntMenu && !showEnterpriseMenu,'text-btn-dropdown-active':showEntMenu && showEnterpriseMenu}"
        ></BaseLogo>

        <DropdownMenu slot="list">
          <DropdownItem
            ref='m1'
            name='self'
            v-show='current_enterprise != "self"'
          ><img
              style='width:30px;height:30px;margin-right:3px;'
              src="http://www.hstigger.com/img/logo-flat.0ce4c896.png"
            /> 个人模式</DropdownItem>
          <template v-for='e in my_enterprises'>
            <DropdownItem
              v-if='e'
              ref='m1'
              :key='e.id'
              :name='e.id'
              v-show='e.id != current_enterprise'
            ><img
                style='width:30px;height:30px;margin-right:3px;'
                :src="e.avatar"
              /> {{e.name}}</DropdownItem>
          </template>
        </DropdownMenu>
      </Dropdown>
      <!-- Menu Button -->
      <BaseAppMenu v-model="open_selector" />
    </div>
    <div class="l-right">
      <BaseLoading v-if="loading" />

    
     
      <Badge
        :count='session.task_count'
        type='error'
        style='margin-right:25px;'
        
      >
        <div
          class='text-btn'
          @click="showTaskList=!showTaskList;showMessageList=false"
        >
          <Icon
            custom='gzicon gzi-eventavailable'
            size="18"
             :color="showTaskList?'yellowgreen':''"
          />
          
        </div>
      </Badge>

 <!-- Message -->
      <Badge
        :count='session.unread_msg_count || 0'
        type='primary'
        style="margin-right:25px;"
      >
        <div
          class='text-btn'
          @click="showMessageList=!showMessageList;showTaskList=false"
        >
          <Icon
            custom="gzicon gzi-mail"
             :color="showMessageList?'yellowgreen':''"
            size="18"
          />

        </div>
      </Badge>


  <div
        class='text-btn'
        @click="RouteTo('/core/debug')"
        style='margin-right:15px;'
      >
        <Icon
          custom="gzicon gzi-bug"
          size="15"
          :color="showDebug?'yellowgreen':'#af6'"
        />
      </div>

     

      <!-- User -->
      <Dropdown
        ref='dm'
        transfer
        trigger="click"
        placement="bottom-start"
        @on-visible-change='showUserMenu=$event'
        @on-click='onClickUserMenu'
      >
        <div
          class="text-btn text-btn-dropdown"
          style='margin-right:5px;'
          :class="{'text-btn-dropdown-active':showUserMenu}"
        >
          <BaseAvatar
            :size="25"
            style='margin-right:8px;'
            :userinfo="session"
          ></BaseAvatar>
          <span class='d-none d-sm-block'>{{session.user}}</span>

        </div>
        <DropdownMenu slot="list">
          <DropdownItem
            ref='m1'
            name='self'
          >个人中心</DropdownItem>
          <DropdownItem
            ref='m1'
            name='logout'
          >退出</DropdownItem>

        </DropdownMenu>
      </Dropdown>

    </div>

    <div
      class='l-login-mask'
      v-if="!isLogin && !loading"
    >
       <div class="login" style='margin:10% 5%;'>
      <div class='flex-wrap login-wrap'>
        <div>
          <BaseLoginHeader />
            <p style='color:#aaa;text-align:center;'>您的登录状态已过期，请重新登录</p>
          <BaseLogin
            style="margin-top:20px;width:380px;"
          />
        </div>
      </div>
    </div>
    </div>
    <div
    v-if="loading"
      style='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(33,33,33,0.6)'
    >
      <div style='margin:500px auto!important;width:300px;height:200px;border-radius:50%;overflow:hidden;color:#fff;font-size:10px;'>
        <!-- <img
          src='https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/loading02.jpg'
          style='opacity:0.3;filter:drop-shadow(1px 1px 1px #aaa);width:600px;height:500px;position:relative;left:-200px;top:-150px;'
        /> -->
        <div style="color:#23334c;position:absolute;z-index:2;bottom:410px;text-align:center;width:300px;font-size:15px;font-weight:bold;font-family:consolas;font-size:10px;">
        数据加载中 <BaseLoading
        class='spinner' style="display:inline-block;position:relative;bottom:-3px;left:-10px;"
       />
</span>
       
        </div>
      </div>

    </div>

    <div class="drawer-wrapper" v-show="showMessageList || showTaskList">
      <Drawer v-model="showMessageList" title="消息列表"  inner :transfer="false" :closable="false" width="350">
        <div slot="header" class="flex-wrap flex-between" style="font-size:14px;">
          <div class="flex-wrap"> 消息列表 ({{session.unread_msg_count}})</div>
          <a style="color:#3af" @click="RouteTo('/core/notices');showMessageList=false">MORE</a>
        </div>
        <div style="left:0;right:0;top:0;bottom:0;position:absolute;">
          <hs-list style="padding:0;height:100%;" :data="session.messages" :option="{tmpl:'HsxMessageListItem'}" />
        </div>
      </Drawer>

      <Drawer v-model="showTaskList" title="任务列表" :width="300"  inner :transfer="false" :closable="false">
        <div slot="header" class="flex-wrap flex-between" style="font-size:14px;">
          <div class="flex-wrap"> <Icon
            custom='gzicon gzi-eventavailable'
              style='margin-right:5px;'
              size="20"
            /> 待处理</div>
          <a style="color:#3af" @click="RouteTo('/core/tasks');showTaskList=false">MORE</a>
        </div>
        <div class="list">

        </div>
      </Drawer>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from "@pages/Login.vue"
export default {
  data() {
    return {
      showTaskList:false,
      showMessageList:false,
      showEnterpriseMenu: false,
      open_selector: false,
      showUserMenu: false,
      showDebug: false,
      isInit: false,
      loading: false,
      model: {},
      messages:[     
      ]
    }

  },
  components: {
    Login
  },
  computed: {
    ...mapGetters('core', {
      session: 'session',
      users: 'users',
      deps: 'deps',
      roles: 'roles',
      isLogin: 'isLogin',
      my_enterprises: 'my_enterprises',
      current_enterprise: "current_enterprise"
    }),
    showEntMenu(){
      return (this.my_enterprises.length >= 1  && this.session.type < 2)
    }
  },
  mounted() {
    if (!this.session.id) {
      this.getSession()
      
    }

  },
  watch:{
    $route:{
      handler(e){
        this.showTaskList = false
        this.showMessageList = false
      }
    }
  },
  methods: {
    getSession(e) {

      this.loading = true
      this.$store.dispatch('core/whoami', e).then(() => {

      }).finally(e => {
        setTimeout(() => {
          this.loading = false
        }, 500);

      })
    },
    getMessageData(){
       let queryParam = {
          query:{q:'mine'}
      }
       this.loading = true
      this.api.enterprise.LIST_MESSAGES(queryParam).then(res=>{
        let messages = res.data.data
        this.messages = messages
        alert(messages.length)
      }).catch(e=>{
        this.Error("数据加载错误:"+e)
      }).finally(e=>{
        this.loading = false
      })
    },
    onSelectEnterprise(e) {
      this.loading = true
      this.$store.dispatch('core/SetCurrentEnterprise', e).then(res => {
        this.getSession(e)
        this.$bus.$emit('switch-ent')
      }).finally(e => {
        setTimeout(() => { this.loading = false },
          500)
      })
    },
    onClickUserMenu(e) {
      if (e == 'logout') {
        this.$store.dispatch('core/logout')
        this.RouteTo('/login')
      }
      else if (e == 'self')
        this.RouteTo('/core/self')
    }
  }
}
</script>

<style lang="less" scoped>
.l-app-bar {
  height: 44px;
  background: #23334c;
  background-blend-mode: multiply, multiply;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .l-left,
  .l-right {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 12px;
    margin: 0 6px;
  }

  .l-login-mask {
    z-index: 1052;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(33, 33, 33, 0.8);
  }
}

.debug-log {
  max-height: 400px;
  overflow: auto;
  font-size: 10px;
  font-family: "Courier New", Courier, monospace;
  padding: 10px;
  background: #fff;
  margin-top: 10px;
  border: 1px solid #aaa;
}


.drawer-wrapper{
  position: fixed;
  right:0;
  top:44px;
  bottom:0;
  width:100%;
  overflow: visible;
  z-index: inherit;
}
</style>