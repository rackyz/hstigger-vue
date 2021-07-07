<style lang="less" scoped>

.flex-group{
  margin:0 5px;
  flex-wrap:nowrap;
  
  border-radius:5px;
  >div{
    border-radius:0 !important;
    margin:0!important;
    border-right:0;
  }
  >div:first-child{
    border-top-left-radius: 5px!important;
    border-bottom-left-radius: 5px!important;
  }
  >div:last-child{
    border-top-right-radius: 5px!important;
    border-bottom-right-radius: 5px!important;
    border-right:1px solid #333;
  }
}
</style>
<template>
  <div style="background:linear-gradient(to bottom right,#124,#333);height:100%;color:#fff;padding-top:5px;">
     <div class="flex-wrap" style="padding:5px;color:#333;">
       <div class="flex-wrap flex-group">
        <div class='l-group l-group-btn' :key="ph" style="width:70px;height:54px;text-align:center;margin:0 5px;padding:5px;border-radius:5px;color:#fff;margin-right:0;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;"  @click="handleCreateTask">
            <div style="font-size:10px;"><Icon type="md-add" size="20" /></div>
            <div style='font-size:10px;margin-top:2px;'>新增工作</div>
            </div>
            <div class='l-group l-group-btn' :key="ph" style="width:70px;height:54px;text-align:center;margin-left:0;padding:5px;border-radius:5px;color:#fff;border-top-left-radius:0;border-bottom-left-radius:0"  @click="modalCreateTeml=true">
            <div style="font-size:10px;"><Icon type="md-bookmarks" size="20" /></div>
            <div style='font-size:10px;margin-top:2px;'>工作集</div>
            </div>
             <div class='l-group l-group-btn' :key="ph" style="width:70px;height:54px;text-align:center;margin-left:0;padding:5px;border-radius:5px;color:#fff;border-top-left-radius:0;border-bottom-left-radius:0;background:#a22"  @click="handleDeleteSelected" v-if="selectedTasks.length > 1">
            <div style="font-size:10px;"><Icon type="md-trash" size="20" /></div>
            <div style='font-size:10px;margin-top:2px;'>删除</div>
            </div>
            
            </div>
          
            <div class='l-group l-group-btn' :key="ph" style="width:70px;height:54px;text-align:center;margin-left:0;padding:5px;border-radius:5px;color:#fff;background:#272"  @click="handleChangeCharger" v-if="selectedTasks.length > 1">
            <div style="font-size:10px;"><Icon type="md-person" size="20" /></div>
            <div style='font-size:10px;margin-top:2px;'>指派</div>
            </div>

            <div class="flex-wrap flex-group">
        <div class='l-group ' :key="ph" style="width:120px;height:54px;text-align:center;margin:0 5px;padding:5px;border-radius:5px;" :class="selected == -1?'l-group-selected':''" @click="selected = -1">
            <div style="font-size:10px;">全部 ({{finished.length}}/{{tasks.length}})</div>
            <div><Progress :percent="tasks.length!=0?Math.ceil(finished.length/tasks.length):0" /></div>
            </div>
        <template v-for="(ph,i) in types">
          <div class='l-group' v-if="ph.task_count" :key="ph" style="width:120px;height:54px;text-align:center;margin:0 2px;padding:5px;border-radius:5px;" :class="selected == ph.value?'l-group-selected':''" @click="selected = ph.value">
            <div style="font-size:10px;">{{ph.name}} ({{ph.finished_count}}/{{ph.task_count}})</div>
            <div><Progress :percent="ph.task_count!=0?parseInt(ph.finished_count*100/ph.task_count):0" /></div>
            </div>
          
        </template>
       
      </div>
      </div>
      <div class='table-wrap'>
        <hs-table ref='table' style="height:100%" full-table :columns="cols" :data="filteredTasks" @event="onTableEvent" selectable="multiple" />
      </div>


       <!-- TASK EDITOR -->
    <hs-modal-form
			ref="form"
			:title="model.id?'修改任务':'新增任务'"
			v-model="modalCreate"
			:width="620"
			style="margin: 10px"
			footer-hide
			:form="Form('task',init_form)"
			:data="model"
      :initData="filterInitData"
			editable
			@on-submit="handleSubmitTask"
			@on-event="handleEvent"
		/>

   <!-- TEMPLATE SELECTOR -->
    <Modal v-model="modalCreateTeml" title="选择任务模板" footer-hide width="800">
      <div style="position:relative;height:440px;">
        <div class="flex-wrap">
         <Input search placeholder="输入关键字搜索" style="margin:5px;width:200px" />
         <!-- <Button icon="md-settings" style='float:right;margin-right:10px;'>任务模板管理</Button> -->
        </div>
        <div style="display:flex;position:relative;height:400px;border-top:1px solid #ddd;">
        <hs-menu :data="tmplClasses" style='width:150px;border-right:1px solid #dfdfdf;height:100%;padding:0;' :current="selectedTmplClass" @on-select="selectedTmplClass=$event"></hs-menu>
        <div style="width:calc(100% - 150px)">
         
          <hs-list :data="filteredTmpls" :option="{tmpl:'BaseTaskTemplate'}" style='height:380px;overflow-y:auto;border:none;' @event="handleTmplEvent" />
        </div>
        </div>
      </div>
    </Modal>


    <!-- TEMPLATE TASKS SELECTOR -->
    <Modal v-model="modalInitTmpl" :title="'初始化模板 - '+tmpl.name" footer-hide width="800">
      <div style="padding:10px;">{{tmpl.desc}}</div>
      <template v-if="loadingTemplate">
        读取中
      </template>
      <template v-else>
      <CheckboxGroup v-model="selectedTemplates" style='max-height:400px;overflow-y:auto;border:1px solid #dfdfdf;'>
          <template v-for="(sub,i) in sub_templates">
            <Checkbox :label="sub.id" :key="i" style="padding:0 10px;width:90%;display:flex;align-items:center;" :disabled="existedTemplates.includes(sub.id)">
              <div style="width:20px;text-align:right;margin-right:5px;">{{i+1}}</div> <span style="color:#38f;margin-right:5px;">任务</span> {{sub.name}}
              <span style="color:green;margin-left:5px">{{existedTemplates.includes(sub.id)?'已添加':''}}</span>
            </Checkbox>
      </template>
      </CheckboxGroup>
      </template>
      <div class='flex-wrap' style="padding:10px;justify-content:space-between;">
        <div class='flex-wrap'><Button style='margin-right:10px;' @click="selectedTemplates=sub_templates.map(v=>v.id)">全选</Button><Button @click='selectedTemplates=existedTemplates.map(v=>v)'>取消</Button></div>
        <div class='flex-wrap'><Button type='primary' style='margin-right:10px;' @click="handleCreateWithTmpl">提交</Button><Button @click='handleCancelTmpl'>取消</Button></div></div>
    </Modal>

     <ModalProcessNTask v-model="modalProcess" :task="model" @change="handleProcessTask" />

  
        <hs-modal-form v-model="modalCharger" title="选定负责人" :form="formSelector" @on-submit="handleChangeChargar" editable  width="300" />
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      phases:['前期准备','前期工作','设计工作','招投标','合同管理','现场管理','其他'],
      selected:-1,
      selectedTasks:[],
      tasks:[],
      model:{},
      tmpls:[],
      modalCreate:false,
      modalCharger:false,
      loading:false,
      modalCreateTeml:false,
       selectedTmplClass:0,
        sub_templates:[],
        selectedTemplates:[],
      existedTemplates:[],
        modalCreateTeml:false,
      modalInitTmpl:false,
      tmpl:{},
      modalProcess:false,
    }
  },
  mounted(){
    this.getData()
    this.$nextTick(e=>{
      this.$refs.table.calcTableHeight()
     this.$forceUpdate()
    })
    
  },
  computed:{
     id(){
      return this.$route.params.id
    },
    formSelector(){
      return {
        def:{
          charger:{
            label:"负责人",
            control:'select',
            option:{
              getters:'core/employees',
              required:true,
              idKey:'id',
              labelKey:'name'
            }
          }
        },
        layout:'<div><div style="color:red;font-size:12px;padding:5px 0;">请注意，更换负责人会使已完成的任务状态切换至进行中，需要重新提交</div><div>{{charger}}</div></div>',
        option:{
          hideCancel:true,
          hideReset:true
        }
      }
    },
    project(){
      return this.$store.getters['project/get'](this.project_id)
    },
    filteredTasks(){
      if(this.selected == -1)
        return this.tasks
      else
        return this.tasks.filter(v=>v.business_type == this.selected)
    },
    finished(){
      return this.tasks.filter(v=>v.state == 2)
    },
    tmplClasses(){
        var that = this
        return this.$store.getters['core/getTypes']('ARCHIVE_WORKTYPE').map(v=>{
          return {
            id:v.value,
            name:v.name,
            path:v.value,
            count:that.tmpls.filter(t=>t.business_type == v.value).length
          }
        })
      },
     filteredTmpls(){
        return this.tmpls.filter(v=>v.business_type == this.selectedTmplClass)
      },
      filterInitData(){
        return {
          project_id:this.project_id,

          parent_id:this.parent_id,
          dep_id:this.id,
          base_type:0,
          business_type:this.selected == -1?0:this.selected,
        }
      },
    types(){
      let types = this.$store.getters['core/getTypes']('ARCHIVE_WORKTYPE')
      let t = types.map(v=>{
        let s = {...v}
        s.tasks = this.tasks.filter(t=>t.business_type == v.value) || []
        s.finished = s.tasks.filter(t=>t.state == 2) || []
        s.task_count = s.tasks.length || 0
        s.finished_count = s.finished.length || 0
        return s
      })
      return t
    },
    form_task(){
        let form = this.Form('task')
        
        form.def.parent_id.option.options = this.root_tasks.map(v=>({value:v.id,label:v.name}))
       
        return form
      },
    cols(){
        var that = this
      return [{
        type:'index',
        title:"序号",
        width:40
      },{
          title:"业务类型", // 流程 任务 审批
          key:"business_type",
          type:"type",
          width:80,
          option:{
            getters:"core/getTypes",
            getters_key:"ARCHIVE_WORKTYPE"
          }
        },{
        title:"模板",
        type:"text",
        key:"unique_tmpl_key",
        sortable:false,
        width:40,
        render:(h,param)=>{
          let tmplkey = param.row.unique_tmpl_key
          if(tmplkey)
            return h('Icon',{props:{type:'md-lock',size:15}})
          else
            return h('span','-')
        }
        
      },{
        type:"text",
        title:"名称",
        width:400,
         linkEvent:"open",
        key:"name"
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
        type:'user',
        title:"负责人",
        width:100,
        key:"charger",
        option:{
          align:"center",
          getters:"core/users"
        }
      },{
        title:"结果",
        sortable:false,
        width:100,
        render(h,p){
        
          let btnProcess = h('Button',{props:{size:'small',type:"primary",icon:"md-create"},on:{click:()=>{
            that.model = p.row
            that.modalProcess = true
            }}},'处理')
          let btnView = h('Button',{props:{size:'small',type:'success',icon:"md-eye"},on:{click:()=>{ that.model = p.row
            that.modalProcess = true
          }}},'查阅')
          return p.row.state < 2 ? btnProcess : btnView
        }
      },{
        type:'time',
        title:"开始时间",
        width:120,
        key:"start_at",
        option:{
          type:'date'
        }
      },{
        type:'time',
        title:"完成时间",
        width:120,
        key:"finished_at",
        option:{
          type:'date'
        }
      },{title:"资料归档",
      option:{
        align:'left'
      },
      render:(h,param)=>{
        let icon = h('Icon',{props:{type:'md-cube',size:'14'},style:{marginRight:'5px'}})
        return h('a',{style:{float:'left',color:"#3af"}},[icon,'资料归档 | '+param.row.name])
      },
      sortable:false},{
        type:"time",
        width:80,
        title:"创建于",
        key:"created_at"
      },{
        
        title:"操作",
        width:100,
        sortable:false,
          type:'tool',
        buttons:["delete"],
        option:{}
      }
      ]
    }
  },
  methods:{
    handleChangeCharger(){
        this.modalCharger=true
      
    },
    getData(){
       this.loading = true
       this.api.enterprise.LIST_TASKS({query:{dep_id:this.id,parent_id:-1}}).then(res=>{
         this.tasks = res.data.data
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
    handleCreateTask(e){
      this.modalCreate = true
    },
    handleProcessTask(item){
        
      let index = this.tasks.findIndex(v=>v.id == item.id)
      if(index != -1){
        this.tasks.splice(index,1,item)
      }
      this.modalProcess = false
    },
    handleSubmitTask(item){
       if(item.id){
        let id = item.id
        delete item.id
        this.api.enterprise.PATCH_TASKS(item,{param:{id}}).then(res=>{
          let updateInfo = res.data.data
         
          let new_item = Object.assign({},item,updateInfo)
          let index = this.tasks.findIndex(v=>v.id == id)
          if(index != -1){
            new_item = Object.assign({},this.tasks[index],new_item)
           this.tasks.splice(index,1,new_item)
          }
          this.modalCreate = false
          this.Success('修改成功')
         
        }).catch(e=>{
          this.Error('修改失败:'+e)  
        }).finally(e=>{
          this.loading = false
        })    
      }else{
        if(this.parent_id)
          item.parent_id = this.parent_id
        this.api.enterprise.POST_TASKS(item).then(res=>{
          let updateInfo = res.data.data
          let new_item = Object.assign({},item,updateInfo)
          this.tasks.splice(0,0,new_item)
           this.modalCreate = false
          this.Success('创建成功')
        }).catch(e=>{
          this.Error('创建失败:'+e)  
        }).finally(e=>{
          this.loading = false
        })
      }
     
    },handleTmplEvent(e){
      if(e.event == 'create'){
        this.modalCreateTeml = false
        this.api.enterprise.LIST_TASK_TEMPLATES({query:{parent_id:e.param.id}}).then(res=>{
          let items = res.data.data
          this.sub_templates = items
             this.modalInitTmpl = true
             this.existedTemplates = this.tasks.filter(v=>this.sub_templates.find(t=>t.id == v.unique_tmpl_key)).map(v=>v.unique_tmpl_key)
             this.selectedTmplates = [...this.existedTemplates]
            this.tmpl = e.param
        }).catch(e=>{
          this.Error('模板读取失败:',e)
        })
       
      }
    },handleCreateWithTmpl(){
      let updatedList = _.difference(this.selectedTemplates,this.existedTemplates)
      this.api.enterprise.POST_TASKS({list:updatedList,...this.filterInitData},{query:{tmpl:this.tmpl.id}}).then(res=>{
        this.Success("添加完成")
        this.getData()
        this.modalInitTmpl = false
      }).catch(e=>{
        this.Error("创建失败:"+e)
      })
    },handleCancelTmpl(){
      this.modalInitTmpl = false
      this.tmpl = {}
    },handleDelete(model){
      this.Confirm(`确定删除该任务<b style='color:red;margin:0 2px;'>${model.name}</b>的所有资料。${model.unique_tmpl_key?'<span style="color:#38f;">此任务是模板任务,可从对应模板内重新添加</span>':''}<br /><span style='color:red;font-size:10px'>(删除的任务数据不可恢复，已归档的资料不受影响，请谨慎操作)</span>`,()=>{
        this.api.enterprise.DELETE_TASKS({param:{id:model.id}}).then(res=>{
          let id_list = res.data.data
          setTimeout(() => {
            this.Success('删除成功')
           
              let index = this.tasks.findIndex(v=>v.id == model.id)
              if(index != -1)
                this.tasks.splice(index,1)
              
           
            
          }, (1000));
          
        }).catch(e=>{
          this.Error('删除失败')
        })
      })
    },
    handleDeleteSelected(){
      let items = this.selectedTasks
       this.Confirm(`确定删除选定的<span style='color:red;margin:0 2px;'>${items.length}</span>个任务的所有资料。<br /><span style='color:red;font-size:10px'>(删除的任务数据不可恢复，已归档的资料不受影响，请谨慎操作)</span>`,()=>{
        this.api.enterprise.DELETE_MORE_TASKS(items.map(v=>v.id)).then(res=>{
          let id_list = items.map(v=>v.id)
          setTimeout(() => {
            this.Success('删除成功')
            id_list.forEach(id=>{
              let index = this.tasks.findIndex(v=>v.id == id)
              if(index != -1)
                this.tasks.splice(index,1)
            })
           
              
           
            
          }, (1000));
          
        }).catch(e=>{
          this.Error('删除失败'+e)
        })
      })
    },
    handleChangeChargar(e){
      // 修改选中的工作的负责人为e
      let data = {
        idlist:this.selectedTasks.map(v=>v.id),
        charger:e.charger
      }


     
          
         
      this.api.enterprise.POSTACTION_TASKS(data,{param:{action:'charger'}}).then(res=>{
         
           this.selectedTasks.forEach(t=>{
         let index = this.tasks.findIndex(v=>v.id == t.id)
         if(index != -1)
          this.tasks.splice(index,1,Object.assign({},this.tasks[index],e,{state:1}))
       })
        this.Success("修改成功")
         this.modalCharger = false
      })
   
    },
     onTableEvent(e){
      if(!e.data)
        return
      if(e.type == 'select'){
        this.selectedTasks = e.data
      }
      if(e.type == 'edit'){
       this.handleBeforeEdit(e.data.id)
      }else if(e.type == 'delete'){
        this.handleDelete(e.data)
      }else if(e.type == 'open'){
        this.model =e.data
        this.modalCreate = true
        
       
      }else if(e.type == 'project'){
        if(e.data.project_id)
          this.RouteTo('/core/projects/'+e.data.project_id)
      }else if(e.type == 'dep'){
        if(e.data.dep_id)
          this.RouteTo('/core/deps/'+e.data.dep_id)
      }
    },
  },
  metaInfo:{
    title:'项目管理',
     route:"/:id"
  },
}
</script>

<style lang="less">

.l-group{
  cursor: pointer;background:rgb(212, 211, 211);
  border:1px solid #123;
}
.l-group:hover{
  transition: all 0.3s;
  background:#eee;
  color:#333;
}
.l-group-selected{
  background:linear-gradient(to bottom,rgb(0, 98, 174),rgb(0,96,154));
  color:#fff;
  .ivu-progress-text-inner{
    color:yellow;
  }
}

.l-group:active{
  position: relative;
  right:-1px;
  bottom:-1px;
}
.l-group-btn{
 background:#346;
  border:1px solid #111;
}
.l-group-btn:hover{
   background:rgb(0, 98, 174);
   filter:brightness(1.1);
}

.l-group-selected:hover{
  background:rgb(0, 98, 174) !important;
  color:#fff  !important;
  transition: none !important;
}

.table-wrap{
  margin:10px;
  margin-top:5px;
  height:calc(100% - 80px);
  border:1px solid #111;
  overflow: hidden;
  position: relative;
  background:#eee;
  border-radius: 5px;
  color:#333;
}

</style>