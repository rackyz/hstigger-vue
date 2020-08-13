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
  
</style>
<template>
  <div class="l-menu">
    
    <div class='text-btn text-btn-dropdown' :class="{'text-btn-dropdown-active':open}" @click="open=!open">
       <Icon custom="gzicon gzi-apps" size="16" style='margin-right:5px' />
      菜单
    </div>
    <div class='seperator' />
     <a class='text-btn' href='/dashboard' style='margin-right:15px;'>
      <Icon custom="gzicon gzi-desktop" size="16" style='margin-right:5px' /> 工作台
    </a>
    <template v-for='m in menus'>
      <a class='text-btn' style='margin-right:10px;padding:0 5px;' :style="value?'border:1px dashed #dfdfdf':''" :key='m.route'  @click="value?remove(m):''">
        {{m.title}}
      </a>
    </template>
    <div class='text-btn'>
      <Icon type="md-add" size="16" @click="$emit('input',true)" />
    </div>

    <!-- Menu -->
    <div class="l-menu-mask"  v-show="open" @click.prevent='open=false'/>
    <div class="l-menu-wrap"  v-show="open">
        <div style='padding:40px 30px'>
          <Input class="l-menu-input" search placeholder="搜索平台的功能/项目/人员" />
        </div>
        <div class="l-list-wrap">
      
        <Row style="margin:0 145px; max-width: 1000px;">
        <Col :span="6" style="min-width:200px;">
          <div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <a>进度管理</a>
                  <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a>
              </div>
            
          </div>
        </Col>
        <Col :span="6" style="min-width:200px;">
          <div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <a>进度管理</a>
                  <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a>
              </div>
            
          </div>
        </Col>
        <Col :span="6" style="min-width:200px;">
          <div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <a>进度管理</a>
                  <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a>
              </div>
            
          </div>
        </Col>
        <Col :span="6" style="min-width:200px;">
          <div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <a>进度管理</a>
                  <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a> <a>进度管理</a>
              </div>
            
          </div>
        </Col>
        </Row>
        </div>
       
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  
  data(){
    return{
      open:false,
      menus:[{
        title:'后台',
        route:'/admin'
      },{
        title:'开发者模式',
        route:'/dev'
      }]
    }
  },
  computed:{
    ...mapGetters('core',['app_groups'])
  },
  props:{
    value:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    remove(m){
      alert('remove '+m.title)
    }
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
  z-index:20;
  background:rgb(33, 39, 51);
  top:44px;
  left:70px;
  width: 1200px;
  padding:0 40px;
  bottom:0;

 
}

.l-menu-mask{
  position: fixed;
  z-index:19;
  left:0;
  right:0;
  top:44px;
  bottom:0;
}

</style>