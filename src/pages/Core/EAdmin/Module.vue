<template>
  <div>
    <div class="flex-wrap l-filter-box" style='padding:10px;padding-bottom:0;'>
      <Input search v-model="search_text" style="width:300px;" />
    </div>
    <div class="flex-wrap l-filter-box" style='padding:10px;padding-bottom:0;'>
      <ButtonGroup>
      <template v-for="g in filteredGroups">
        <Button :type="selected_index==g.value?'primary':''" class="" :key='g.name' @click="selected_index = g.value">{{g.name}} {{g.modules.length}} {{g.value}}</Button>
      </template>
      </ButtonGroup>
    </div>
    
    <hs-list :data="filteredItems" :option="{tmpl:'BaseModule'}" style="width:calc(100% - 20px);height:calc(100% - 40px);overflow-y:auto;background:none;border:none;" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      search_text:"",
      selected_index:-1
    }
  },
  computed:{
    ...mapGetters('entadmin',['modules']),
    ...mapGetters('core',['getTypes']),
    moduleTypes(){
      return this.getTypes('ModuleType')
    },  
    filteredItems(){
      if(!Array.isArray(this.modules))
        return []
      return this.modules.filter(v=>{
        if(this.search_text && !v.name.includes(this.search_text))
          return false
        if(this.selected_index != -1){
          if(v.type != this.filteredGroups[this.selected_index].value)
            return false
        }
        return true
      })
      
    },
    filteredGroups(){
      let types = this.moduleTypes
      return [{value:-1,name:"全部",modules:this.modules}].concat(types.map(v=>{
        let group = {
          color:v.color,
          name:v.name,
          value:v.value,
          modules:this.modules.filter(m=>m.type == v.value)
        }
        return group
      }).filter(v=>v.modules.length != 0))
    }
  }
}
</script>

<style lang="less" scoped>
.l-filter-box{
  padding:10px;
}
</style>