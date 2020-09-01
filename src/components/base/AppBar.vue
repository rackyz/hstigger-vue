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
      <!-- Message -->
      <Badge :count='5' type='primary' style="margin-right:20px;">
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


   
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      open_selector:false,
      showUserMenu:false,
      model:{}
    }
    
  },
  computed:{
    ...mapGetters('core',{
      session:'session'
    })
  },
  mounted(){
    if(!this.session.id){
      this.$store.dispatch('core/whoami').then(()=>{
        this.Success('登录成功')
      }).catch(e=>{
        // this.RouteTo('/login')
      })
    }

    // 暂时处理dropdown一个bug，子菜单父对象无法正常绑定
    this.$refs.m1.$parent = this.$refs.dm
    this.$refs.m2.$parent = this.$refs.dm
    
  },
  methods:{
    onClickUserMenu(e){
      if(e == 'logout'){
        this.$store.dispatch('core/logout')
        this.RouteTo('/login')
      }
      else
        this.RouteTo('/core/'+e)
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
}

</style>