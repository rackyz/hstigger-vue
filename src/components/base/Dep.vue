<template>
  <div class="l-dep-item flex-wrap flex-between" @click="RouteTo(`/core/deps/${dep.id}/dashboard`)">
    <div class="flex-wrap">
      
      <Icon custom="gzicon gzi-group1" style="margin-right:8px" size="30" />
      <div style='line-height:17px;'>
        {{dep.name}}
        <br />
         <span style='font-size:10px;color:yellow;'>{{dep.count || 1}}人</span>
      </div>
     
    </div>
    <div class="flex-wrap" style='font-family:consolas;font-size:10px;'>
      ENTER >
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('core',['deps']),
    dep(){
      return this.deps.find(v=>v.id == this.data) || {}
    }
  }
}
</script>
<style lang="less" scoped>
.l-dep-item{
  width:100%;
  height:50px;
  display: flex;
  align-items: center;
  background:linear-gradient(to bottom left,rgb(85, 95, 124),rgb(3, 60, 112));
  border-radius:5px;
  color:#fff;
  padding:0 10px;
}

.l-dep-item:hover{
  filter:brightness(1.1);
  color:#fff;
  transition:all 0.3s;
}
</style>