<template>
<div>
  <div class="flex-wrap" style='padding:10px;justify-content:space-between;background:linear-gradient(to bottom right,#468,#234);border-top-left-radius:5px;border-top-right-radius:5px;'>
      <div class="flex-wrap">
          <hs-avatar :userinfo="session" size="30" style='margin-bottom:2px' />  
          <div class='name' style="background:#24334c;color:#fff">早上好, <a  @click.stop="RouteTo('/core/self')">{{session.name || session.user}}</a>! </div>
        </div> 
        <Dropdown trigger="click" @on-click="handleSaveStatus">
      <div class='status-mark hs-dropdown' :style="`border-radius:50px;color:#fff;height:30px;line-height:23px;padding-left:20px;background:${statusColors[session.status || 0]};`" transfer>{{status[session.status || 0]}} <Icon custom='gzicon gzi-down' style='color:#FFFFFFaa;'></Icon></div>
        <DropdownList slot='list'>
          <template v-for="(s,si) in status">
          <DropdownItem class='status-item' :key='si' :name='si'><span style='display:inline-block;width:15px;height:15px;border-radius: 50%;' :style='`background:${statusColors[si]};filter:saturate(70%);margin-right:10px;`'></span>{{s}}</DropdownItem>
          </template>
        </DropdownList>
      </Dropdown>
          
  </div>
<div class='status' style="background:linear-gradient(to bottom,#14233c,#123);color:#fff;padding-top:10px;min-height:80px;white-space:pre-wrap;">
           
            {{session.saysth || '书写您的签名/工作状态'}} <span class='icon-button' style="font-size:10px;color:#3ef;" @click="modalEditDesc=true;desc=session.saysth"><Icon type="md-create"  /> 编辑</span>
            
          </div>

    <Modal title="修改工作动态" v-model="modalEditDesc" footer-hide class='hs-tigger' >
        <Input type="textarea" :rows="6" v-model="desc" />
        <Button type='success' style='margin:5px;float:right;' @click="handleSaveWorking(desc)" :loading="loading">保存修改</Button>
    </Modal>
  </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
  data(){
    return {
      modalEditDesc:false,
      loading:false,
      desc:""
    }
  },
  computed:{
    ...mapGetters('core',['session']),
    desc:{
      get(){
        return this.session.saysth
      },
      set(v){
        // update v
        return v
      }
    },
    statusColors(){
      return ['yellowgreen','#3af','orange','darkred']
    },
    status(){
      return ['空闲','普通','忙','繁忙']
    },
    statusDesc(){
      return ['超级忙,还是别打扰我了','比较忙,几乎没有空闲时间','正常接受业务安排','比较闲，目前手头没什么活']
    },
    today(){
      return moment().format('YYYY年MM月DD日')
    },
  },
  methods:{
    handleSaveWorking(s){
      console.log("save:",s)
      let e = {saysth:s}
       this.loading = true
       this.api.enterprise.PATCH_EMPLOYEES(e).then(res=>{
         this.modalEditDesc = false
       
        
        this.$store.commit('core/saveUserinfo',e)
      }).catch(e=>{
        this.Error(e)
      }).finally(e=>{
        this.loading = false
      })
    },
    handleSaveStatus(s){
      let e = {status:s}
       this.api.enterprise.PATCH_EMPLOYEES(e).then(res=>{
         
       
        this.$store.commit('core/saveUserinfo',e)
      }).catch(e=>{
        this.Error(e)
      }).finally(e=>{
      })
    }
  }
}
</script>
<style lang="less">
.name{
  font-size:14px;
  margin-bottom:2px;
  background:#fafafa;
  padding-right:15px;
  border-top-right-radius:12px ;
  border-bottom-right-radius:12px ;
  height:30px;
  line-height:30px;
  padding-left:5px;

}
.status{
  font-size:14px;
  padding:10px;
  padding-top:0;
  color:#000;
}
.status-item{
  display: flex;
  align-items: center;
  
}

.status-mark{
  cursor: pointer;
  font-size:14px;
  
  border:1px solid #222;
  padding:2px 15px;
  filter:saturate(80%);
}

.status-mark:hover{
  filter:brightness(1.1) saturate(90%);
}

.icon-button{
  cursor: pointer;
}
</style>