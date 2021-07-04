<template>
   <Modal v-model='value' title="任务内容" @on-cancel="handleExit" footer-hide width="600" :fullscreen="fullscreen">
     <div style="padding:10px;">
         <div>
        {{task.title}}
      </div>
      <div>
        任务说明
      </div>
      <div>
        任务操作区
      </div>
     </div>
    

  </Modal>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  props:{
    value:{
      type:Boolean,
      default:false
    },
    task:{
      type:Object,
    default:()=>{}
    }
  },
  watch:{
    task:{
      handler(v = {}){
        v.state = v.task_state
        this.focused = v
        if(v.state == 0){
          this.tabIndex = 'content'
        }else{
          this.tabIndex = 'process'
        }
      },
      deep:true,
      immediate:true
    }
  },
  mounted(){
    if(this.task && this.task.id){
       this.focused = this.task
    // if(this.task.children && this.task.children.length > 0)
    //   this.focused.splited = true
    }
   
  },
  data(){
    return {
      backwards:[],
      filterText:"",
      filterState:undefined,
      fullscreen:false,
      enabled_percent:false,
      modalCreate:false,
      model:{},
      focused:{},
      splited:false,
      tabIndex:"content",
        stacks:[],
      	tools: [{
					key: "add",
					name: "新增",
					icon: "md-add",
				},{
					key: "resetpwd",
					name: "模板管理",
					icon: "md-key",
				},
			
				{
					key: "percent",
					name: "启用工作量",
					icon: "ios-key",
        },
				{
					key: "dis_percent",
					name: "禁用工作量",
					icon: "ios-key",
        }]
    }
  },
  computed:{
    ...mapGetters('core',['session','getTypeByValue']),
     ...mapGetters('file',['files','uploadingFiles','makeURL']),
    dep(){
      return this.$store.getters["core/deps"].find(v=>v.id == this.task.dep_id) || {}
    },
    toolDisabled(){
      return {
        percent:this.focused.enabled_percent,
        dis_percent:!this.focused.enabled_percent
      }
    },
    filterTasks(){
      if(this.focused && this.focused.children){
        return this.focused.children.filter(v=>{
          if(this.filterText && v && !v.name.includes(this.filterText))
            return false
          if(this.filterState != undefined && v.state != this.filterState)
            return false
          return true
        })
      }

      return []
    },
    filterInitData(){
      return {}
    },
    project(){
      return this.$store.getters["core/projects"].find(v=>v.id == this.task.project_id) || {}
    },
      columns(){
        return [{
          title:"序号",
          key:"id",
          type:"index",
        },{
          title:"任务名称",
          minWidth:200,
          type:"text",
          key:"name",
          tree:true,
          linkEvent:"open"
        },{
        title:"模板",
        type:"text",
        key:"unique_tmpl_key",
        sortable:false,
        width:40,
        render:(h,param)=>{
          let tmpl = param.row.unique_tmpl_key
          if(tmpl)
            return h('span','启用')
          else
            return h('span','-')
        }
        
      },{
        title:"负责人",
        type:"user",
        key:"charger",
        width:100,
        option:{
          align:"center",
          getters:"core/users"
        }
      },{
        title:"任务状态",
        type:"type",
        key:"state",
        width:100,
        option:{
          align:"center",
          getters:"core/getTypes",
          getters_key:"TASK_STATE"
        }
      },{
        title:"工作量",
        type:"text",
        width:80,
        key:"percent",
        render:(h,param)=>{
          return h('span',param.row.percent || '100%')
        }
      },{
        title:"计划工期",
        type:"time",
        key:"plan_duration",
        width:100,
        option:{
          align:"center",
        },
        render:(h,param)=>{
          let time = param.row.plan_duration
          if(time)
            return h('span',time+'天')
          else
            return h('span','无计划')
        }
      }]},
    timeStateMsg(){
      if(!this.task.plan_duration){
        return "无期限"
      }else{
        if(!this.task.start_at){
          return "计划"+this.task.plan_duration+"天"
        }else{
          if(!this.task.finished_at){
            let delta = Math.ceil(moment.duration(moment() - moment(this.task.start_at)).as('day'))
            if(delta > this.task.plan_duration){
              return "还剩"+delta+"天"
            }else if(delta == this.task.plan_duration){ 
              return "今天到期"
            }else{
              return "超时"+delta+"天"
            }
          }else{
            let delta = Math.ceil(moment.duration(moment(this.task.finished_at) - moment(this.task.start_at)).as('day'))
            if(delta > this.task.plan_duration){
              return "提前"+delta+"天"
            }else if(delta == this.task.plan_duration){ 
              return "按期完成"
            }else{
              return "超期"+delta+"天"
            }
          }
          

        }
      }
    },
    timeStateColor(){
      if(!this.task.plan_duration){
        return "#aaa"
      }else{
        if(!this.task.start_at){
          return "orange"
        }else{
          if(!this.task.finished_at){
            let delta = Math.ceil(moment.duration(moment() - moment(this.task.start_at)).as('day'))
            if(delta > this.task.plan_duration){
              return "darkgreen"
            }else if(delta == this.task.plan_duration){ 
              return "orange"
            }else{
              return "darkred"
            }
          }else{
            let delta = Math.ceil(moment.duration(moment(this.task.finished_at) - moment(this.task.start_at)).as('day'))
            if(delta > this.task.plan_duration){
               return "darkgreen"
            }else if(delta == this.task.plan_duration){ 
               return "green"
            }else{
               return "darkred"
            }
          }
          

        }
      }
    }
  },
  methods:{
    async upload(files,onFilesProgress){
     return new Promise((resolve,reject)=>{
       this.$store.dispatch("file/upload",{files,onProgress:onFilesProgress}).then(files=>{
         resolve(files.map(v=>v.url))
       }).catch(reject)
     })
    },
    handleExit(e){
      this.$emit('input',false)
    },
    onToolEvent(e) {
      if(e == 'add'){
        this.modalCreate = true
      }else if(e == 'percent'){
        this.enabled_percent = true
        this.$set(this.focused,'enabled_percent',true)
      }else if(e == 'dis_percent'){
        this.enabled_percent = false
        this.$set(this.focused,'enabled_percent',false)
      }
    },
    autoChangeTab(task){
      if(task.state == 0){
        this.tabIndex = 'content'
      }else if(task.splited){
        this.tabIndex = 'split'
      }else{
        this.tabIndex = 'process'
      }
    },
    handlePreProcess(){
      this.modalFormProcess = true
    },
    onListEvent(e){
      if(e.event && e.event.type == 'in'){
        let task = e.event.data
        if(task.id)
           this.api.enterprise.GET_TASKS({param:{id:task.id}}).then(res=>{
            let model = res.data.data
            if(Array.isArray(model.children) && model.children.length > 0){
              model.splited = true
              model.children.forEach((v,i)=>{
                v.index = i+1
              })
            }
            this.backwards.push(this.focused)
            this.focused = model
            this.autoChangeTab(model)
          }).catch(e=>{
            this.Error('任务读取错误:',e)
          })
      }
    },
    handleBackward(e){
      this.focused = this.backwards[this.backwards.length - 1]
      
      this.backwards.splice(this.backwards.length - 1,1)
      this.autoChangeTab(this.focused)
    },
    handleChangeState(state){
      
      let data = {state}
      let id = this.focused.id
      this.api.enterprise.PATCH_TASKS(data,{param:{id}}).then(res=>{
      
        this.$set(this.focused,'state',state)
           this.autoChangeTab(this.focused)
        this.$forceUpdate()
        this.$emit('update',data)
      })
    },
    handleProcess(data){
      let id = this.focused.id
      if(!id)
        return
      this.api.enterprise.PROCESS_TASK(data,{param:{id}}).then(res=>{
          let updateInfo = res.data.data
          this.$set(this,'focused',Object.assign({},this.focused,updateInfo))
          this.$emit('change-state',updateInfo.state)
      }).catch(e=>{
        this.Error("处理失败:",)
      })

    },
    CancelTask(){
       let id = this.focused.id
      if(!id)
        return
      this.api.enterprise.PATCH_TASKS({},{param:{id},query:{q:'cancel'}}).then(res=>{
          let updateInfo = res.data.data || {}
          this.$set(this,'focused',Object.assign({},this.focused,updateInfo,{state:1}))
          this.Success('撤回成功')
      })
    },
    SubmitTask(){
      let id = this.focused.id
      if(!this.focused.file)
        this.Error("请先完成任务目标再提交任务")
      let data = {
        file:this.focused.file
      }
      this.api.enterprise.PROCESS_TASK(data,{param:{id}}).then(res=>{
        let updateInfo = res.data.data
          this.$set(this,'focused',updateInfo)
         this.$set(this,'focused',Object.assign(this.focused,updateInfo))
          this.Success('处理成功')
      }).catch(e=>{
        this.Error("处理失败:",)
      })
    },
      handleChangeFile(url){
        console.log(url)
        this.$set(this.focused,'file',url)
      },
       getFileExt(url) {
			if (url) {
				let ext = url.substring(url.lastIndexOf(".") + 1);
				return ext;
			}
		},
    Cancel(){

    }
  }
}
</script>

<style lang="less" scoped>

.state-block{
  width:15px;
  height:15px;
  border-radius: 3px;
  border:1px solid #dfdfdf;

}

.modal-close{
  .ivu-icon{
    padding:2px;
    color:#fff;
  }

  .ivu-icon:hover{
    color:#3af;
  }
}
</style>