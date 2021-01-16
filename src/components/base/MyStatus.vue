<template>
<div>
  <div class="flex-wrap" style='padding:10px;justify-content:space-between;'>
      <div class="flex-wrap">
          <hs-avatar :userinfo="session" size="30" style='margin-bottom:2px' />  
          <div class='name'>早上好, <a  @click.stop="RouteTo('/core/self')">{{session.name || session.user}}</a>! </div>
        </div> 
        <Dropdown trigger="click" @on-click="handleSaveStatus">
      <div class='status-mark hs-dropdown' :style="`border-radius:5px;color:#fff;background:${statusColors[session.status || 0]};`">{{status[session.status || 0]}} <Icon custom='gzicon gzi-down' style='color:#FFFFFFaa;'></Icon></div>
        <DropdownList slot='list'>
          <template v-for="(s,si) in status">
          <DropdownItem class='status-item' :key='si' :name='si'><span style='display:inline-block;width:15px;height:15px;border-radius: 50%;' :style='`background:${statusColors[si]};filter:saturate(70%);margin-right:10px;`'></span>{{s}}</DropdownItem>
          </template>
        </DropdownList>
      </Dropdown>
          
  </div>
<div class='status'>
           
            {{session.statusDesc || '目前主要在做高专企业信息平台的任务模块以及合约管理系统的迁移工作'}} <span class='icon-button'><Icon type="md-create" @click="modalEditDesc=true" /></span>
            
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
      loading:false
    }
  },
  computed:{
    ...mapGetters('core',['session']),
    desc:{
      get(){
        return this.session.statusDesc
      },
      set(v){
        // update v
        return v
      }
    },
    statusColors(){
      return ['red','orange','blue','green']
    },
    status(){
      return ['繁忙','忙','普通','空闲']
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
      let e = {working:s}
       this.loading = true
       this.CORE.SELF_CHANGE_INFO(e).then(res=>{
         this.modalEditDesc = false
        this.Success('修改成功')
        
        this.$store.commit('core/saveUserinfo',e)
      }).catch(e=>{
        this.Error(e)
      }).finally(e=>{
        this.loading = false
      })
    },
    handleSaveStatus(s){
      let e = {status:s}
       this.CORE.SELF_CHANGE_INFO(e).then(res=>{
          this.modalEditDesc = false
        this.Success('修改成功')
       
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
  
  border:1px solid #ddd;
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