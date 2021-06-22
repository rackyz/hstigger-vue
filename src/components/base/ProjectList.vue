<template>
  <div style='wdith:100%;display:flex;align-items:center;flex-direction:column;'>
    <BaseEmpty v-if='my_projects.length == 0' />
    <hs-list v-if='my_projects.length > 0' :data="my_projects" :option="{tmpl:'BaseProject'}" selectable='false' style='border:none;background:#346;' />
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      cateIndex:0
    }
  },
  mounted(){
    
  },
  computed:{
    ...mapGetters('core',['my_projects'])
  }
}
</script>

<style>

</style>