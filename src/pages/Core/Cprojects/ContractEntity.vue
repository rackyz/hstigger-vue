<template>
  <div>
    合同
  </div>
</template>

<script>
export default {
  computed:{
     id(){
    return this.$route.params.id
    },
  },
  metaInfo:{
    title:'项目管理',
     route:"/:id"
  },
}
</script>

<style>

</style>