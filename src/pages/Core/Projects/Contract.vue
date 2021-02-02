<template>
  <Contract :filter="{f_project_id:id}" />
</template>

<script>
import Contract from '../Contract'
export default {
  components:{
    Contract
  },
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