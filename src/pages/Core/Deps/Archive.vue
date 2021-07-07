<template>
  <Archive :filter="{f_dep_id:id}" />
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
    title:'部门',
     route:"/:id"
  },
}
</script>

<style>

</style>