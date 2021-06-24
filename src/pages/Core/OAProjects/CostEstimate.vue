<template>
  <CostEstimate :filter="{project_id:id}" />
</template>

<script>
import CostEstimate from '../CostEstimate'
export default {
  components:{
    CostEstimate
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