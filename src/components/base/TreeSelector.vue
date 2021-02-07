<template>
  <hs-tree :data="data" @on-select='onSelect' />
</template>

<script>
export default {
  props:['data'],
  methods:{
    onSelect(e){
      this.$emit('select',e)
    }
  }
}
</script>

<style>

</style>