<template>
  <div class="employee-detail" :class="{'employee-detail-out':isOut}" style="margin:0px !important;">
    <div class="flex-wrap">
      <hs-avatar :userinfo="getUser(data.employee_id)" size="35" />
      <div class="ed-info">
        <div class="ed-name">
          {{getUser(data.employee_id).name}}
        </div>
        <div class="ed-position">
          {{getRole(data.position_id).name}}
        </div>
      </div>
    </div>

    <div class="flex-wrap">
      <div class="ed-info">
        <div class="ed-name" style='text-align:right;color:orange;'>
          {{data.factor.toFixed(1)}} <span style='font-size:10px;color:#333;'>/ {{data.hr.toFixed(1)}} 人月</span>
        </div>
        <div class="ed-position" style='text-align:right;'>
          {{data.outDate?'调出 '+moment(data.outDate).format('YYYY/MM/DD'):'调入 '+moment(data.inDate).format('YYYY/MM/DD')}}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data']
  ,computed:{
    ...mapGetters('core',['roles','users']),
    hr(){
      let data = this.data
      let duration = moment.duration((data.outDate?moment(data.outDate):moment()) - moment(data.inDate)).as('month')
      return duration * data.factor
    },
    isOut(){
      return this.data.outDate
    }
  },
  methods:{
    getRole(id){
      return this.roles.find(v=>v.id == id) || {}
    },
    getUser(id){
      return this.users.find(v=>v.id == id) || {}
    }
  }
}
</script>
<style lang="less" scoped>
.employee-detail{
  height:60px;
  width:100%;
  background:#fff;
  padding:0 10px;
  display: flex;
  justify-content: space-between;
  margin:0px !important;
  
  .ed-info{
    margin-left:10px;
  }
  .ed-name{
    font-size:16px;
    color:#333;
  }
  .ed-position{
    font-size:12px;
    color:#aaa;
  }
}

.employee-detail:hover{
  filter:brightness(1.1);
}

.employee-detail:active{
  position: relative;
  right:-1px;
  bottom:-1px;
}

.employee-detail-out{
  background:#dfdfdf;
  filter:grayscale(1.0);
}
.employee-detail-out:hover{
  filter:grayscale(1.0) brightness(1.1);
}
</style>