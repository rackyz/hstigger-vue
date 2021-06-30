<style lang="less">
 .l-menu-input {
   input{
    background:none;
    border:1px solid rgb(87, 87, 129);
    border-radius: 0;
    caret-color:#dfdfdf;
    color:#dfdfdf;
    padding:0 10px;
    font-size:13px;
  }
  input:hover,input:active,input:focus{
    box-shadow: none;
    border-color:#aaa;
  }
 }

 .text-button-active{
   color:rgb(255, 198, 28) !important;
 }
  
</style>
<template>
  <div class="l-menu ">
      <div class="l-acc-menu-mask-top"  v-show="showAppSelector"  />
   
     <!-- Dashboard Button -->
    <a class='text-btn' @click="RouteTo(dashboard_path)" style='margin:0 15px;margin-left:5px;'>
      <Icon custom="gzicon gzi-desktop" size="16" style='margin-right:6px' /> 工作台
    </a>
    <!-- Base Menu Button -->
    <div class='text-btn text-btn-dropdown'  style='margin-right:0px;' :class="{'text-btn-dropdown-active':open}" @click="open=!open">
       <Icon custom="gzicon gzi-apps" size="16" style='margin-right:5px' />
      菜单
    </div>
   
    <!-- Seperator -->
    <div class='seperator  d-none d-sm-block' />
    
    <!-- Accelerators -->
    <template v-for='m in acc_apps'>
      <a class='text-btn d-none d-sm-block' :class="{'text-button-deleting':showAppSelector,'text-button-active':ActivePath==m.path}" style='margin-right:10px;padding:0 5px;z-index:1000;position:relative;' :style="value?'border:1px dashed #dfdfdf':''" :key='m.key'  @click="showAppSelector?removeAcc(m.key):RouteTo(m.path)">
        {{m.name}}
      </a>
    </template>
    <!-- Accerlator Config Button -->
    <div class='text-btn  d-none d-sm-block'>
      <Icon type="md-add" size="16" @click="onShowAccConfig" />
    </div>


    <!-- Transfer Menu -->
    <div class="l-menu-mask-top"  v-show="open" @click='open=false' v-transfer/>
    <div class="l-menu-mask"  v-show="open" @click.prevent='open=false' v-transfer/>
     <transition name='move-up'>
    <div class="l-menu-wrap"  v-show="open" v-transfer>
        <BaseLogo class='d-block d-sm-none' style="margin-top:10px;"></BaseLogo>

        <div class="l-list-wrap">
           <Input :autofocus='true' style='margin:20px 0' class="l-menu-input" clearable v-model="filterMenu" search placeholder="输入模块关键字搜索" />
           <hs-columnlist :data="app_groups" tmpl="BaseTmplMenuGroup" :filter="filterMenu" @on-event="open=false" />
        </div>
    </div>
     </transition>

    <!-- Transfer Menu - Accelerator Configuration -->
    <transition name='fade' mode='out-in' appear>
    <div class="l-app-selector" v-show="showAppSelector">
      <div class="l-list-wrap">
      <Row style="margin:0 145px; max-width: 1000px;">
        <div style="padding:20px 0px;color:#aaa;font-size:13px;">首页链接添加 ({{acc_config_list.length}}/10)</div>
        <hs-columnlist :data="app_groups" :checked="checked" editable tmpl="BaseTmplMenuGroup" @on-event='onCheckChange' />
      </Row>
      </div>
      <Row style="display:flex;justify-content:center;border-top:1px solid #333;height:80px;align-items:center;">
        <Button type='primary' style="margin-right:30px;border-radius:0;width:80px;" @click="onChangeAccelerators">保存</Button>
        <Button ghost style="border-radius:0;width:80px;" @click="showAppSelector=false">取消</Button>
      </Row>
    </div>
    </transition> 
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  
  data(){
    return{
      open:false,
      showAppSelector:false,
      filterMenu:"",
      checked:{},
      menus:[{
        title:'后台',
        route:'/admin'
      },{
        title:'开发者模式',
        route:'/dev'
      }],
      model:{}
    }
  },
  computed:{
    ...mapGetters('core',['session','apps','app_groups','acc_list','dashboard_path']),
    acc_apps(){
      if(this.showAppSelector)
        return this.acc_config_list.map(v=>this.apps[v]).filter(v=>v)
      else
        return this.acc_list.map(v=>this.apps[v]).filter(v=>v)
    },
    acc_config_list(){
      return Object.keys(this.checked)
    },
    ActivePath(){
      return this.$route.path
    }
  },
  props:{
    value:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    removeAcc(key){
      this.$delete(this.checked,key)
    },
    onShowAccConfig(){
      console.log('this.acclist',this.acc_list)
      this.checked = {}
      this.acc_list.forEach(v=>{
        this.$set(this.checked,v,true)
      })
      this.showAppSelector = true
    },
    onCheckChange(e){
      console.log('check_changed',e)
      if(e.type == 'select'){
        this.$set(this.checked,e.key,true)
      }else{
        this.$delete(this.checked,e.key)
      }
    },
    onChangeAccelerators(){
      this.$store.dispatch('core/saveAcc',this.acc_config_list).then(res=>{
        this.showAppSelector=false
      }).catch(e=>{
        this.Error('快捷应用保存失败:'+e)
      })
      
    },
  }
}
</script>
<style lang="less" scoped>
.l-menu{
  display: flex;
  align-items: center;
}
.l-menu-wrap{
  position: fixed;
   z-index:999;
  background:rgb(33, 39, 51);
  top:44px;
  left:70px;
  width:100%;
  max-width: 1200px;
  padding:0 40px;
  bottom:0;
  .l-menu-search{
    padding:30px 50px;padding-bottom:20px;
  }
 
}

.l-acc-menu-mask-top{
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  right:0;
  z-index:100;
  background:rgb(2, 45, 48);
  opacity: 0.5;
}

.text-button-deleting{
  border:1px dashed #fff;
  padding:2px 8px !important;
}

.l-menu-mask-top{
   position: fixed;
  z-index:9901;
  left:0;
  right:0;
  top:0;
  height:44px;
}
.l-menu-mask{
  position: fixed;
  z-index:901;
  left:0;
  right:0;
  top:44px;
  bottom:0;
  pointer-events: auto;
}

.l-list-wrap{
   
    position: relative;
    height:calc(100% - 80px);
    overflow:hidden;overflow-y:auto;
    margin:5px;
    padding:0 30px;


  }

  .l-list-wrap::-webkit-scrollbar {
  /*滚动条整体样式*/
    width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
    padding:2px;
    left:2px;
    right:2px;
    margin:2px;
  }

  
  .l-list-wrap::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background   : linear-gradient(to bottom,#333,rgb(46, 46, 46));
    width:4px;
  }
  .l-list-wrap::-webkit-scrollbar-track:hover{
    background:#aaa;
  }
  .l-list-wrap::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background:none;
    border-radius: 10px;
  }


@media screen and (max-width:768px){
  .l-menu-wrap{
    left:0;
    right:0;
    top:44px;
    bottom:0;
    padding:0 5px;
    .l-menu-search{
      width: 90%;
    padding:10px 0;
    position: relative;
    .l-menu-input{
      width: 100%;
    }

    
  }
  .l-list-wrap{
      padding:0 15px;
    }
  }

  
}


.l-app-selector{
  position: fixed;
  z-index:999;
  top:44px;
  left:0;
  right:0;
  bottom:0;
  background:#111;
  .l-list-wrap{
   
    position: relative;
    height:calc(100% - 80px);
    overflow:hidden;overflow-y:auto;
    margin:5px;


  }

  .l-list-wrap::-webkit-scrollbar {
  /*滚动条整体样式*/
    width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
    padding:2px;
    left:2px;
    right:2px;
    margin:2px;
  }

  
  .l-list-wrap::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background   : linear-gradient(to bottom,#333,rgb(46, 46, 46));
    width:4px;
  }
  .l-list-wrap::-webkit-scrollbar-track:hover{
    background:#aaa;
  }
  .l-list-wrap::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background:none;
    border-radius: 10px;
  }

 
}

</style>