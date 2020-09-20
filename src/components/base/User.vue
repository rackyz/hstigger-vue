<template>
  <div class='user-item' @click='$emit("event",{type:"click",param:userinfo})'>
    <hs-avatar :userinfo='data' :size='20' />
    {{userinfo.name}}
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:{}
    }
  }
}
</script>
<style lang="less" scoped>
.user-item{
  padding:10x;

  display:flex;
  align-items: center;
  justify-content: center;
}
</style>