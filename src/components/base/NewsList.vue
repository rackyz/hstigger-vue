<template>
  <div style='wdith:100%;display:flex;align-items:center;flex-direction:column;'>
   
    <hs-list :data="news" :option="{tmpl:'BaseNew',offset:1}" selectable='false' style='border:none;padding:5px;' />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      news:[]
    }
  },
  mounted(){
    this.CORE.GET_NEWS().then(res=>{
      this.news = res.data.data
    })
  }
}
</script>

<style>

</style>