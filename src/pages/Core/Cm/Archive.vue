<template>
  <Archive :filter="{f_project_id:id}" />
</template>

<script>
import Archive from '../ArchiveManagement'
export default {
  components:{
    Archive
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