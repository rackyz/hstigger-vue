<template>
  <Modal v-model='value' title="任务内容" @on-cancel="handleExit" footer-hide width="400" styles="padding:20px;" :fullscreen="fullscreen">
    <!-- <div class='modal-close' slot="close" style='display:flex;color:#aaa;align-items:center;height:30px;'>
       <Icon :type="fullscreen?'md-contract':'md-expand'" size="18" style='color:#ddd;z-index:200p' @click.stop="fullscreen=!fullscreen;" />
      <Icon type="md-close" size="18" style='color:#ddd;z-index:200p' @click="this.close()" />
    </div> -->
   
    <div  style="padding:10px;background:#567;">
     
      <div style="height:60px;min-width:590px;padding:5px 10px;color:#fff;filter:brightness(10);" :style="backwards.length == 0?'min-width:655px':''">
        <div><span :style="`font-size:10px;color:yellow`">考核任务</span></div>
        <h2 style='font-size:18px;'>{{focused.name || '无标题'}}</h2>
      </div>

        
      </div>
      </div>
      </div>
     
      <div style="min-height:100px;background:#456;padding:20px;color:#ddd;">
        <div style="font-weight:bold;margin-bottom:5px;color:fff;">任务详情</div>
        <div style="padding:10px;">{{focused.desc || '本节课我们学习PPT基础操作，运用课程内容所述，制作一个PPT文件并上传'}}</div>

        <div style="font-weight:bold;margin-top:15px;margin-bottom:5px;color:lightred;" v-if="focused.deadline">时间期限</div>
        <div style="padding:10px;color:yellow;" v-if="focused.deadline"><Icon type="md-clock" size="16" style="margin-right:5px;"></Icon> 截止 {{moment(focused.deadline).format("L") || '2021/6/15日前, 还剩 15 天'}}</div>
          
        <div style="font-weight:bold;margin-top:15px;margin-bottom:5px;color:lightred;color:fff;" v-if="focused.files">附件</div>
        <div style="padding:10px;"  v-if="focused.files">
          <a style="color:#3af"><Icon type="md-document" size="16" style="margin-right:5px;"></Icon> PPT参考样例</a>
        </div>
         <div style="font-weight:bold;margin-top:15px;margin-bottom:5px;color:lightred;color:fff;">任务目标</div>
         <div  style="padding:10px;">
           <Steps :current="focused.state - 1" direction="vertical" size="small" class="transparent-steps">
            <Step title="上传文件"> 
            <div slot='content' style="margin-top:5px;" >
              <HsxFileUpload :value="focused.file" @change="handleChangeFile" :editable="focused.state == 1 || focused.state == 3">上传作业 ( {{focused.file?1:0}} / 1 )</HsxFileUpload>
            </div>

            </Step>
            <Step title="审核评分" content="由审核人批改作业提交成绩"></Step>
            <Step title="任务完成"></Step>
          </Steps>
       
        </div>
      </div>
    
   </div>
    
    <div style="padding:10px;display:flex;align-items:center;background:#567;" class="flex-between">
        <div class="flex-wrap flex-center">
       
         <Button class="flex-wrap" size="small"  icon="md-undo" style="border:1px solid #aaa;padding:0 10px;margin-right:5px;color:red;" v-if="focused.state==2" @click="CancelTask()">
          撤回
        </Button>
        
        
        <Button class="flex-wrap" size="small" type="success" icon='md-checkmark' style="border:none;margin-left:5px;" @click="SubmitTask" v-if="focused.state==1" :disabled="!focused.file">
          提交
        </Button>
        <span style='color:#ddd;margin-left:10px;font-size:10px;' v-if="state>2"><Icon type="ios-warning" color="gold" size="16"></Icon> 您没有相关操作权限</span>
</div><div class="flex-wrap">
   <Button size="small"  icon='md-code' style="border:none;background:none;color:#fff;"  v-if="!focused.splited" @click="focused.splited=1;tabIndex='split';">
          
        </Button>
         <Button  size="small"  icon='md-alert' style="border:none;margin-left:5px;color:red;background:none;color:#fff;" @click="handleChangeState(3)">
          
        </Button>
      </div>
      </div>
    <Modal title="任务处理" v-model="modalFormProcess" footer-hide>

    </Modal>
     <hs-modal-form
			ref="form"
			:title="model.id?'修改任务':'新增任务'"
			v-model="modalCreate"
			:width="620"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('task',init_form)"
			:data="model"
      :initData="filterInitData"
			editable
			@on-submit="handlePatchArchive"
			@on-event="handleEvent"
		/>

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
      handler(v){
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
          if(this.filterText && !v.name.includes(this.filterText))
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
         console.log(files)
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
          this.$set(this,'focused',Object.assign(this.focused,updateInfo))
          this.Success('处理成功')
      }).catch(e=>{
        this.Error("处理失败:",)
      })

    },
    CancelTask(){
       let id = this.focused.id
      if(!id)
        return
      this.api.enterprise.PATCH_TASKS({},{param:{id},query:{q:'cancel'}}.then(res=>{
        let updateInfo = res.data.data
      this.$set(this,'focused',Object.assign(this.focused,updateInfo))
          this.Success('撤回成功')
      }))
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