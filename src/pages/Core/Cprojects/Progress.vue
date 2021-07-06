<template>
  <div style="height:100%;position:relative;margin:0;padding:0;border:none;">
 
     <hs-toolbar
        style="background: #fff;border:1px solid #dfdfdf;border-left:none;padding:5px 0;border-bottom:none;"
        :data="tools"
        @event="onToolEvent"
        :disabled="toolDisabled"
      />
      
      <div style="position:relative;height:calc(100% - 60px);width:100%;">
        <BaseGantt style="height:100%;" :tasks="tasks" />
      </div>
      
  </div>
</template>

<script>
export default {
metaInfo:{
    title:'进度管理',
     route:"/:id"
  },
  mounted(){
    this.getData()
  },
  computed:{
      id(){
      return this.$route.params.id
    },
    toolDisabled(){
        return {
        }
      },
  },
  
  data(){
    return {
      tasks:[],
      	tools: [
				{
					key: "add",
					name: "新增",
					icon: "md-add",
				},
				{
					key: "edit",
					name: "编辑",
					icon: "md-create",
				},
				{
					key: "delete",
					name: "删除",
					icon: "md-trash",
				},
				{
					key: "payment",
					name: "支付管理",
					icon: "md-cash",
        },
        {
					key: "changed",
					name: "变更管理",
					icon: "md-key",
				}],
    }
  },
  methods:{
    getData(){
       this.loading = true
       this.api.enterprise.LIST_TASKS({query:{project_id:this.id}}).then(res=>{
         let tasks = res.data.data

         this.tasks = tasks
       }).finally(e=>{
         this.loading = false
       })
       this.api.enterprise.LIST_TASK_TEMPLATES().then(res=>{
         let tmpls = res.data.data
         tmpls.forEach(v=>{
           if(!v.desc && v.sub_task_count){
             v.desc = `共${v.sub_task_count}个子任务`
           }
         })
         this.tmpls = tmpls
       })
    },
     onToolEvent(e){
      console.log(e)
      if(e == 'add'){
        this.handlePreCreate()
      }else if(e == 'edit'){
        this.handleBeforeEdit(this.current.id)
      }else if(e == 'delete'){
        this.handleDelete(this.current)
      }else if(e == 'payment'){
        this.showPay = true
      }else if(e == 'changed'){
        this.showChange = true
      }
    },
  }
}
</script>

<style>

</style>