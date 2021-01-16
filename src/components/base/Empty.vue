<template>
  <div class='l-empty-holder'>
    <span v-if="!useSlot">{{msg || '空空如也, totally empty' }}</span>
    <spin fix v-if="loading"></spin>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:['msg','loading'],
  computed:{
    useSlot(){
      return this.$slots.default
    }
  }
}
</script>

<style lang="less">
.l-empty-holder{
  width:100%;
  height:100%;
  min-height:100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color:#aaa;
  font-size: 14px;
}
</style>