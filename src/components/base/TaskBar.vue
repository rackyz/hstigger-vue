<template>
  <div style='width:250px;min-height:180px;font-size:10px;background:#fff;display:block;padding:10px 15px;' @click="$emit('event','open')">
    
  
     <div   style="border:1px solid #fff;font-size:16px;font-weight:bold;width:100%;" @click="handleEnterTask">
      {{data.name}} 
    </div>

      <div :style="`color:${getTypeByValue('TASK_STATE',data.task_state).color};`">
      {{getTypeByValue('TASK_STATE',data.task_state).name}}
    </div>

    <pre style="padding:5px;font-size:10px;color:#aaa;">
      {{data.desc}}
    </pre>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('core',['getTypeByValue','users'])
  },
  methods:{
    getUser(e){
      return this.users.find(v=>v.id == e)
    },
    handleEnterTask(e){
      this.$emit('event',{type:"in",data:this.data})
    }
  }
 
}
</script>

<style>

</style>