<template>
  <div class="flex-wrap flex-between" style='width:100%;font-size:10px;'>
    <div class="flex-wrap" style='width:calc(100% - 80px)'>
     <div class="flex-wrap" style="justify-content:center;width:20px;height:20px;border:1px solid #dfdfdf;border-radius:50%;">
      {{data.index}}
    </div>
  
     <a href="#" class="flex-wrap" style="padding:0 10px;width:calc(100% - 250px);height:25px;border:1px solid #fff;margin-left:5px;" @click="handleEnterTask">
      {{data.name}} 
    </a>

     <div class="flex-wrap" style="width:55px;height:25px;margin-left:5px;">
     
      <Button v-if="!data.charger" size="small">负责人</Button>
      <template v-else>
         {{data.charger || "无"}} 
      </template>
    </div>
     <div class="flex-wrap" style="width:55px;height:25px;justify-contetn:center;margin-left:10px;">
       <Button v-if="!data.charger" size="small">工作量</Button>
      <template v-else>
          {{data.percent || " - "}} 
      </template>
     
    </div>
    
      <div style="width:60px;height:20px;border:1px solid #dfdfdf;margin-left:10px;" :style="`background:${getTypeByValue('TASK_STATE',data.state).color};color:#fff;display:flex;align-items:center;justify-content:center;border-radius:40px;`">
      {{getTypeByValue('TASK_STATE',data.state).name}}
    </div>
    </div>
     <div class="flex-wrap" style="height:25px;margin-left:10px;">
        <Button size="small" icon='md-settings'>配置</Button>
     
    </div>
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