<template>
  <div class="full-container">
    {{data.desc}}

  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  }
}
</script>

<style lang="less">

</style>