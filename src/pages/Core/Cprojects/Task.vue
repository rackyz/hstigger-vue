<template>
  <Task :filter="{project_id:id}" />
</template>

<script>
import Task from '../Task'
export default {
  components:{
    Task
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