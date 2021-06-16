<template>
    <div class="wrap" style="padding:10px;position:relative;height:100%;">
      <Alert v-if="items.filter(v=>v.task_state == 1).length">您还有 {{items.filter(v=>v.task_state == 1).length}} 个作业需要提交</Alert>
    
        <BaseEmpty v-if="items.length==0" msg="讲师还为发布任何任务哦" />
      
        <hs-list style="background:#eee;height:calc(100% - 50px);" v-else :data="items" :option="{tmpl:'BaseTaskBar'}" @event="handleListEvent"></hs-list>
       <ModalProcessTask v-model="modalProcessTask" :task="current_flow" @update="handleUpdateTask" />
    </div>
  
</template>

<script>
export default {
metaInfo:{
   title:"培训考核", 
    route:'/:id'
  },
  data(){
    return {
      items:[],
      modalProcessTask:false,
      current_flow:null
    }
  },
  computed:{
    id(){
      return this.$route.params.id
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.api.enterprise.RELATED_TRAININGS({param:{id:this.id,related:'mytasks'}}).then(res=>{
        let items = res.data.data
        items.sort((a,b)=>a.task_state > b.task_state?1:-1)
        this.items = items
      })
    },
    handleListEvent(e){
      console.log(e)
      if(e.event == 'open'){
        this.OpenTask(e.param.id)
      }
    },OpenTask(id){
      this.api.enterprise.GET_TASKS({param:{id}}).then(res=>{
        let model = res.data.data

         this.current_flow = model
     
         this.modalProcessTask = true
      }).catch(e=>{
        this.Error('错误:',e)
      })
    },handleUpdateTask(data){
      data.id = this.current_flow.id
      this.$store.dispatch('core/update_tasks',data)
    }
  }
}
</script>

<style>

</style>