<template>
  <Archive :filter="{f_project_id:id}" />
</template>

<script>
import Archive from '../../App/Netdisk/Index.vue'
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
    title:'资料管理',
     route:"/:id"
  },
}
</script>

<style>

</style>