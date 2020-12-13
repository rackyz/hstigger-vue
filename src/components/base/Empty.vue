<template>
  <div class='l-empty-holder'>
    <span v-if="!useSlot">{{msg || '空空如也, totally empty' }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:['msg'],
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
  height:100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color:#aaa;
  border-bottom:2px solid #ddd;
  font-size: 14px;
  box-shadow: inset 0px -1px 15px #dfdfdf;
}
</style>