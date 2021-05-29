<template>
  <div class="l-dep-item flex-wrap flex-between" @click="RouteTo(`/core/deps/${dep.id}`)">
    <div class="flex-wrap">
      <Icon type="md-easel" style="margin-right:5px" /> {{dep.name}}
    </div>
    <!-- <div class="flex-wrap" style='font-family:consolas;font-size:10px;'>
      ENTER >
    </div> -->
    
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
  width:calc(50% - 10px);
  height:30px;
  display: flex;
  align-items: center;
  background:#eee;
  padding:0 10px;
}

.l-dep-item:hover{
  filter:brightness(1.1);
  background:#3af;
  color:#fff;
  transition:all 0.3s;
}
</style>