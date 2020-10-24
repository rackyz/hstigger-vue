<template>
  <div style='wdith:100%;display:flex;align-items:center;flex-direction:column;'>
   
    <hs-list :data="projects" :option="{tmpl:'BaseProject'}" selectable='false' style='border:none;' />
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
    this.$store.dispatch('project/getList')
  },
  computed:{
    ...mapGetters('project',{
      'projects':'list'})
  }
}
</script>

<style>

</style>