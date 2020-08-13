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
      <BaseLogo style="width:140px;"></BaseLogo>
      <!-- Menu Button -->
      <BaseAppMenu v-model="open_selector" />
    </div>
    <div class="l-right">
      <!-- Message -->
      <Badge count='5' type='primary' style="margin-right:20px;">
        <div class='text-btn'>
          <Icon custom="gzicon gzi-mail" size="18" />
        </div>
      </Badge>
      
      <div class="text-btn text-btn-dropdown text-btn-dropdown-active">
        <BaseAvatar :size="30" style='margin-right:5px;'></BaseAvatar>
        {{session.name}}
      </div>
     
      <!-- User -->
    </div>


    <!-- Transfer Models -->
    <div class="l-app-selector" v-show="open_selector">
      <div class="l-list-wrap">
      
      <Row style="margin:0 145px; max-width: 1000px;">
        <div style="padding:40px 0px;color:#aaa;font-size:13px;">首页链接添加 (2/10)</div>
        <Col :span="6" style="min-width:200px;">
          <div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
              </div>
            
          </div>
          <div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
              </div>
            
          </div>
          <div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
              </div>
            
          </div>
          <div class="l-app-group"  style="min-width:200px;">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
              </div>
            
          </div>
        </Col>
        <Col :span="6"  style="min-width:200px;" ><div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
              </div>
            
          </div>
          <div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
              </div>
            
          </div></Col>
        <Col :span="6"  style="min-width:200px;" ><div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
              </div>
            
          </div></Col>
        <Col :span="6" ><div class="l-app-group">
              <div class="l-app-group-title">
                <Icon custom="gzicon gzi-pm2"></Icon>项目管理
              </div>
              <div class="l-app-group-list">
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
                  <Checkbox class='l-app-check' v-model="model.v1">进度管理</Checkbox>
              </div>
            
          </div></Col>
      </Row>
      </div>
      <Row style="display:flex;justify-content:center;border-top:1px solid #333;height:80px;align-items:center;">
        <Button type='primary' style="margin-right:30px;border-radius:0;width:80px;" @click="open_selector=false">保存</Button>
        <Button ghost style="border-radius:0;width:80px;" @click="open_selector=false">取消</Button>
      </Row>
    </div>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      open_selector:false,
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

.l-app-selector{
  position: fixed;
  z-index:10;
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

  .l-app-group{
    color:#aaa;
    .l-app-group-title{
      font-weight: bold;
      color:#aaa;
      font-size:13px;
      margin:10px 0;
      i{
        font-size:18px;
        margin-right:5px;
      }
    }
    .l-app-group-list{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      font-size:12px;
      color:#ddd;
      padding-left:10px;
       .l-app-check{
         height:25px;
        font-size:12px;
        
      }

        
    }
  }

 
}
</style>