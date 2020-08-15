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
  <div class="l-menu  ">
    
    <div class='text-btn text-btn-dropdown' :class="{'text-btn-dropdown-active':open}" @click="open=!open">
       <Icon custom="gzicon gzi-apps" size="16" style='margin-right:5px' />
      菜单
    </div>
    <div class='seperator  d-none d-sm-block' />
     <a class='text-btn d-none d-sm-block' href='/dashboard' style='margin-right:15px;'>
      <Icon custom="gzicon gzi-desktop" size="16" style='margin-right:5px' /> 工作台
    </a>
    <template v-for='m in menus'>
      <a class='text-btn d-none d-sm-block' style='margin-right:10px;padding:0 5px;' :style="value?'border:1px dashed #dfdfdf':''" :key='m.route'  @click="value?remove(m):''">
        {{m.title}}
      </a>
    </template>
    <div class='text-btn  d-none d-sm-block'>
      <Icon type="md-add" size="16" @click="$emit('input',true)" />
    </div>

    <!-- Menu -->
    <div class="l-menu-mask"  v-show="open" @click.prevent='open=false'/>
    <div class="l-menu-wrap"  v-show="open">
        <div class='l-menu-search'>
          <Input :autofocus='true' class="l-menu-input" search placeholder="搜索平台的功能/项目/人员" />
        </div>
        <div class="l-list-wrap">
      
        <Row>
        <Col :span="6" style="min-width:150px;">
          <template v-for="group in app_groups">
          <div class="l-app-group" :key='group.name'>
              <div class="l-app-group-title">
                <Icon :custom="`gzicon gzi-${group.icon}`"></Icon>{{group.name}}
              </div>
              <div class="l-app-group-list">
                  <template v-for="appItem in group.subs">
                  <a class='text-btn' :key='appItem.key' :href='appItem.path'>{{appItem.name}}</a>
                  </template>
              </div>
            
          </div>
          </template>
        </Col>
        <Col :span="6" style="min-width:150px;">
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
        <Col :span="6" style="min-width:150px;">
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
        <Col :span="6" style="min-width:150px;">
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
  width:100%;
  max-width: 1200px;
  padding:0 40px;
  bottom:0;
  .l-menu-search{
    padding:30px 50px;padding-bottom:20px;
  }
 
}


.l-menu-mask{
  position: fixed;
  z-index:19;
  left:0;
  right:0;
  top:44px;
  bottom:0;
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

  .l-app-group{
    color:#aaa;
    .l-app-group-title{
      font-weight: bold;
      color:#888;
      font-size:13px;
      margin:10px 0;
      display: flex;
      align-items: center;
      text-shadow: 1px 1px 1px #333;
      i{
        font-size:18px;
        margin-right:10px;
      }
    }
    .l-app-group-list{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      font-size:13px;
      color:#ddd;
       .l-app-check{
         height:25px;
        font-size:12px;
        
      }

        
    }
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

  .l-app-group-title{
    margin:5px;
  }
  .l-app-group-list{
    padding-left:20px;
  }
}

</style>