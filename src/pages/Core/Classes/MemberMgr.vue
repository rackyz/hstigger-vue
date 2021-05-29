<template>
  <Employee :filter="{project_id:id}" />
</template>

<script>
import Employee from '../Employee'
export default {
  components:{
    Employee
  },
  computed:{
     id(){
    return this.$route.params.id
    },
  },
  metaInfo:{
    title:'学员管理',
     route:"/:id"
  },
}
</script>

<style>

</style>