<template>
  <div>审计管理</div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      mock_items:[{
        date:"202003"
      },{
        date:"202004"
      }]
    }
    
  },
  computed:{
    ...mapGetters('project',['project'])
  },
   metaInfo:{
    title:'项目管理',
     route:"/:id"
  },
}
</script>

<style>

</style>