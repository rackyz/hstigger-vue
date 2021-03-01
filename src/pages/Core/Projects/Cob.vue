<template>
  <Cob :filter="{project_id:id}" />
</template>

<script>
import Cob from '../Cob'
export default {
  components:{
    Cob
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