<template>
  <div>
    <div class="flex-wrap l-filter-box" style='padding:10px;padding-bottom:0;'>
      <Input search v-model="search_text" style="width:300px;" />
    </div>
    
    <hs-list ref="list" :data="filteredItems" :option="{tmpl:'BaseRss'}" style="width:calc(100% - 20px);height:calc(100% - 40px);overflow-y:auto;background:none;border:none;" @event='handleListEvent' :selectable="false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      search_text:"",
      selected_index:-1,
      
    }
  },
  computed:{
    ...mapGetters('entadmin',['rss']),
    ...mapGetters('core',['getTypes']),
    filteredItems(){
      if(!Array.isArray(this.rss))
        return []
      return this.rss.filter(v=>{
        if(this.search_text && !v.name.includes(this.search_text))
          return false
        return true
      })
      
    },
  },
  methods:{
    handleListEvent(e){
      if(e && e.event && e.event.type == 'disabled'){
        this.$store.dispatch("entadmin/ToggleRssEnabled",e.param.id).then(e=>{
          this.$refs.list.$forceUpdate()
        })
        
      }
    }
  }
}
</script>

<style lang="less" scoped>
.l-filter-box{
  padding:10px;
}
</style>