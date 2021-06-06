<template>
  <div style='wdith:100%;display:flex;align-items:center;flex-direction:column;position:relative;height:100%;' >
    <template v-if="items.length">
      123
    <hs-list :data="items" :option="{tmpl:'BaseNotice',offset:1}" selectable='false' style='border:none;padding:5px;' />
    </template>
    <template v-else>
      <BaseEmpty  />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      error:"",
      items:[]
    }
  },
  props:['id'],
  computed:{
    ...mapGetters('core',['rss']),
    theRss(){
      return this.rss.find(v=>v.id == this.id)  || {}
    }
  },
  watch:{
    id:{
      handler(v,old){
        if(v!=old){
          this.getData()
        }
      },  
      immediate:true
    }
  },
  mounted(){
    this.getData()
  },methods:{
    getData(){
      this.error = ""
      this.loading = true
      this.CORE.GET_RSS_DATA({param:{id:this.id}}).then(res=>{
        this.items = res.data.data
      }).catch(e=>{
        this.error = e
      }).finally(e=>{
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>