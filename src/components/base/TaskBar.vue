<template>
  <div style='width:250px;min-height:170px;font-size:10px;background:#fff;display:block;border:1px solid #ddd;border-radius:10px;' @click="$emit('event','open')">
    
    <div :style="`background:${getStateColor(data.task_state)};color:#fff;padding:5px 10px;text-align:right;`">
        {{getState(data.task_state)}}
    </div>
     <div   style="border:1px solid #fff;font-size:16px;font-weight:bold;width:100%;padding:10px;" @click="handleEnterTask">
      {{data.name}} 
      <pre style="margin-top:5px;font-size:10px;color:#579;min-height:80px;white-space:pre-wrap;background:#eee;padding:5px;font-weight:normal;">{{data.desc}}</pre>

      <div style="text-align:right;font-size:10px;" v-if="data.state==2">
         {{hs.moment(data.submitted_at).format("LLL")}}  已提交
      </div>
      <div style="text-align:right;font-size:10px;" v-if="data.state==3">
         {{hs.moment(data.evaluated_at).format("LLL")}} {{evaluated_by.name}} 审核完成
      </div>
    </div>

      
    

    
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('core',['getTypeByValue','users','getUser']),
    evaluated_by(){
      return this.getUser(this.data.evaluated_by) || {}
    }
  },
  methods:{
    getStateColor(e=0){
      return ['','#346','orange','green','red'][e]
    },
    getState(e=0){
      return ['','待处理','等待审核','已通过','退回'][e]
    },
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