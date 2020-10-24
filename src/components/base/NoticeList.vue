<template>
  <div style='wdith:100%;display:flex;align-items:center;flex-direction:column;'>
   
    <hs-list :data="items" :option="{tmpl:'BaseNotice',offset:1}" selectable='false' style='border:none;padding:5px;' />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      items:[]
    }
  },
  mounted(){
    this.CORE.GET_NOTICES().then(res=>{
      this.items = res.data.data
    })
  }
}
</script>

<style>

</style>