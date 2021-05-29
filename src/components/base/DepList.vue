<template>
  <div style='wdith:100%;display:flex;align-items:center;flex-direction:column;'>
    <BaseEmpty v-if='my_deps.length == 0' />
    <hs-list v-if='my_deps.length > 0' :data="my_deps" :option="{tmpl:'BaseDep'}" selectable='false' style='border:none;' />
    
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
    ...mapGetters('core',['my_deps'])
  }
}
</script>

<style>

</style>