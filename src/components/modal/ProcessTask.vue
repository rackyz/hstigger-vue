<template>
  <Modal v-model='value' title="任务内容" @on-cancel="handleExit" footer-hide width="900" styles="padding:20px;" :fullscreen="fullscreen">
    <div class='modal-close' slot="close" style='display:flex;color:#aaa;align-items:center;height:30px;'>
       <Icon :type="fullscreen?'md-contract':'md-expand'" size="18" style='color:#ddd;z-index:200p' @click.stop="fullscreen=!fullscreen;" />
      <Icon type="md-close" size="18" style='color:#ddd;z-index:200p' @click="this.close()" />
    </div>
   
    <div  style="padding:10px;background:#eee;">
      <div class="flex-wrap flex-between">
        <div style="height:60px;width:60px;border-radius:5px;display:flex;align-items:center;justify-content:center;color:#3af;flex-direction:column;cursor:pointer;margin-right:5px;" class="hover" @click="handleBackward" v-if="backwards.length > 0">
        <h2 style='font-size:15px;font-weight:bold;'><Icon type="md-arrow-back" /></h2>
        <p style='font-size:10px;color:#aaa;'>返回</p>
      </div>

      <div style="height:60px;min-width:590px;padding:5px 10px;border-radius:5px;background:#fff;border:1px solid #aaa;">
        <div><span :style="`font-size:10px;color:${getTypeByValue('TASK_TYPE',focused.base_type).color};`">{{getTypeByValue('TASK_TYPE',focused.base_type).name}}</span>  <span :style="`font-size:10px;color:${getTypeByValue('ARCHIVE_WORKTYPE',focused.business_type).color};`">{{getTypeByValue('ARCHIVE_WORKTYPE',focused.business_type).name}}</span></div>
        <h2 style='font-size:18px;'>{{focused.name || '无标题'}}</h2>
      </div>

        
       

       <div class="flex-wrap">
        <div style="height:60px;width:100px;border-radius:5px;margin-left:10px;display:flex;align-items:center;border:1px solid #aaa;justify-content:center;color:#3af;flex-direction:column;margin-right:5px;background:#fff;border:1px solid #aaa;">
        <h2 style='font-size:15px;font-weight:bold;'>胡佳翰</h2>
        <p style='font-size:10px;color:#aaa;'>负责人</p>
      </div>
        <div style="height:60px;width:100px;border-radius:5px;display:flex;align-items:center;background:#fff;justify-content:center;color:darkred;flex-direction:column;border:1px solid #aaa;">
        <h2 style='font-size:15px;font-weight:bold;' :style="`color:${getTypeByValue('TASK_STATE',focused.state).color};`">{{getTypeByValue('TASK_STATE',focused.state).name}}</h2>
        <p :style="`font-size:10px;color:${timeStateColor};`">{{timeStateMsg}}</p>
      </div>
      </div>
      </div>
     
     
      
       <Tabs type="card" style="margin-top:10px;" :animated="false" v-model="tabIndex">
        <TabPane name="content" label="任务内容" icon="md-list">
            
            <div style="padding:20px;background:#fff;">
              <Row>
                <Col :span='12'> 所属部门 <BaseLink style="padding:5px 20px;" :item="dep" to="/core/deps" /> 
              所属项目 <BaseLink style="padding:5px 20px;"  :item="project" to="/core/projects" /> 
               <div>开始时间 <div style='padding:5px 20px;color:#000;'>{{task.start_at?moment(task.start_at).format("YYYY-MM-DD HH:mm:ss"):'无'}}</div></div>
               <div> 计划完成 <div style='padding:5px 20px;color:#000;'>{{task.start_at?moment(task.start_at).format("YYYY-MM-DD HH:mm:ss"):'无'}}</div></div>
                <div>实际完成 <div style='padding:5px 20px;color:#000;'>{{task.finished_at?moment(task.finished_at).format("YYYY-MM-DD HH:mm:ss"):'无'}}</div></div>
              </Col>
                <Col :span='12'> 任务描述 
              <pre style="padding:5px 20px;font-family:PingFang-SC;font-size:12px;width:100%;height:auto;overflow:hidden;white-space:pre-wrap;">{{task.desc || '无描述'}}</pre>
              任务附件 
              <BaseFiles  :files="task.files || ''" />
              </Col>
              </Row>
              <Row>
                <Col>
                 操作记录
                 <div>
                 3小时前 胡佳翰创建了任务
                 </div>
                </Col>
              </Row>
            </div>
          
        </TabPane>
         <TabPane name="split" label="任务分解" icon="md-code" v-if="focused.splited">
           
             <div style="height:calc(100% - 170px);position:relative;;background:#fff;">
              <div style='padding:10px;width:100%;'>
                <div class='flex-wrap flex-between' style='width:100%;'>
                <Input size="small" v-model="filterText" search style='width:200px' clearable />
                <ButtonGroup>
                  <Button :type="filterState==undefined?'primary':''" size="small" @click="filterState=undefined">全部 {{focused.children.length}}</Button>
                   <Button :type="filterState==0?'primary':''" size="small" @click="filterState=0">准备中 {{focused.children.filter(v=>v.state==0).length}}</Button>
                  <Button :type="filterState==1?'primary':''" size="small" @click="filterState=1">进行中 {{focused.children.filter(v=>v.state==1).length}}</Button>
                  <Button :type="filterState==2?'primary':''" size="small" @click="filterState=2">已完成 {{focused.children.filter(v=>v.state==2).length}}</Button>
                  <Button :type="filterState==3?'primary':''" size="small" @click="filterState=3">已关闭 {{focused.children.filter(v=>v.state==3).length}}</Button>
               </ButtonGroup></div>
               
              </div>

      <!-- <hs-toolbar
        style="background: #fff;border:none;padding:5px 0;"
        :data="tools"
        @event="onToolEvent"
        :disabled="toolDisabled"
      /> -->
     
        <!-- <hs-list  :data="focused.children" selectable="multiple" draggable @event="onListEvent" :option='{tmpl:"hsx-task"}' style='border:none;height:400px;overflow-y:auto;' /> -->
       <div style='padding:0 10px;padding-bottom:10px;'>
     <BaseGantt v-if="tabIndex=='split'" :tasks="filterTasks" :enable_percent="focused.enabled_percent" :ref='gt' :style="fullscreen?'600px':'400px'" />
   </div>
      </div>
        </TabPane>
        <TabPane name="process" v-if="focused.state != 0" label="任务处理" icon="md-checkbox-outline" style="padding:20px;background:#fff;">
          <template>
            <hs-form :form="Form('task_simple')" :data="focused.state==1?{}:focused"  :editable='focused.state == 1' @on-submit="handleProcess" :env="{upload}" />
          </template>
         
        </TabPane>
        
     
    </Tabs>
     

    
   </div>
   
    
    <div style="padding:10px;display:flex;align-items:center;" class="flex-between">
        <div class="flex-wrap">
        <Button icon='md-arrow-back' size="small" class="flex-wrap" style="border:1px solid #aaa;margin-right:5px;" v-if="stacks.length > 0" @click="focused = stacks[stacks.length-1];">
          返回 {{stacks[stacks.length-1].name}}
        </Button>
        <Button class="flex-wrap" size="small"  icon="md-play" style="border:1px solid #aaa;color:green;margin-right:5px;" v-if="!focused.state || focused.state == 0" @click="handleChangeState(1)">
          开始
        </Button>
        <!-- <Button class="flex-wrap" icon="md-pause" style="border:1px solid #aaa;padding:0 10px;" v-if="focused.state == 1" @click="handleChangeState(4)">
           暂停
        </Button> -->
        <Button class="flex-wrap" size="small"  icon="md-play" style="border:1px solid #aaa;padding:0 10px;" v-if="focused.state == 4" @click="handleChangeState(1)">
          继续
        </Button>
         <Button class="flex-wrap" size="small"  icon="md-undo" style="border:1px solid #aaa;padding:0 10px;margin-right:5px;color:red;" v-if="canUndo" @click="handleCancel()">
          撤回
        </Button>
        
         <Button class="flex-wrap" size="small"  icon='md-code' style="border:1px solid #aaa;"  v-if="!focused.splited" @click="focused.splited=1;tabIndex='split';">
          分解
        </Button>
        <Button class="flex-wrap" size="small"  icon='md-code' style="border:1px solid #aaa;margin-left:5px;" v-if="focused.splited" @click="focused.splited=null;tabIndex='content';">
          取消分解
        </Button>
</div><div class="flex-wrap">
         <Button class="flex-wrap" size="small"  icon='md-close' style="border:1px solid #aaa;margin-left:5px;color:red;" @click="handleChangeState(3)">
          退回/中止
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
    if(this.task.children && this.task.children.length > 0)
      this.focused.splited = true
    }
     this.autoChangeTab(this.task)
   
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
          this.$set(this,'focused',updateInfo)
          this.$emit('update',updateInfo)
          this.Success('处理成功')
      }).catch(e=>{
        this.Error("处理失败:",)
      })

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