<template>
  <Layout class="hs-container hs-container-full statistics">
    <Content style="padding:5px">
      <hs-toolbar
        style="background: #fff;border:1px solid #dfdfdf;"
        :data="tools"
        @event="onToolEvent"
        :disabled="toolDisabled"
      />
      <div class="filter-box flex-between" style="margin:5px 0;">
        <div class="flex-wrap">
          <Button
            style="margin-right: 5px"
            :type="multiple?'error':''"
            @click="multiple=!multiple"
            >
            {{multiple?"取消多选":"多选"}}
          </Button>
          <ButtonGroup style="margin-right: 5px" v-if="multiple"
            ><Button @click="onSelectAll">全选</Button
            ><Button @click="selected = []">清空</Button>
          </ButtonGroup>
          <Input style="width:230px;" v-model="search_text" search clearable placeholder="输入编号或名称查询" />
          <Select style="width:150px;margin-left:5px;text-align:center" v-model="base_type" placeholder="- - 任务类型 - -" clearable>
            <template v-for="d in $store.getters['core/getTypes']('TASK_TYPE')">
              <Option :value="d.value" :key="d.id">{{d.name}}</Option>
            </template>
          </Select>
          <Select style="width:200px;margin-left:5px;text-align:center" v-model="business_type" placeholder="- - 任务状态 - -" clearable>
             <template v-for="d in $store.getters['core/getTypes']('TASK_STATE')">
              <Option :value="d.value" :key="d.id">{{d.name}}</Option>
            </template>
          </Select>
          <Select style="width:150px;margin-left:5px;text-align:center" v-model="state" placeholder="- - 业务类型 - -" clearable>
            <template v-for="d in $store.getters['core/getTypes']('ARCHIVE_WORKTYPE')">
              <Option :value="d.value" :key="d.id">{{d.name}}</Option>
            </template>
          </Select>
        
              <Button @click="handleClearFilter()" type="info" v-show="isFiltering">清除筛选条件</Button>
        </div>
        <div class="flex-wrap">
          <!-- authed.ArchiveCategoryManage -->
            <Button @click="handlePreCreate()" type="primary" icon="md-add">新建任务</Button>
            <Button @click="modalCreateTeml = true" type="primary" icon="md-add" style="margin-left:5px;">由模板创建</Button>
        <Button @click="modalCreate=true" icon="md-build" style="margin-left:5px;" v-show="false">分类管理</Button>
        </div>
      </div>
      <div class="filter-box">

      </div>
    
      <div class="focused-box" v-if="focused_task && focused_task.id">
        <div class="text-btn" style="margin-right:5px;display:flex;align-items:center;justify-content:center;"><Icon class="text-btn icon-btn" style="margin:0;" type="md-home" /></div>
        
      \ <div class="task-name">{{focused_task.name}}</div> <div class="text-btn" @click="focused_task = items.find(v=>v.id == focused_task.parent_id)" style="width:auto;padding-right:5px;font-size:10px;"><Icon class="text-btn icon-btn" type="md-arrow-up" style="margin-right:2px;" />返回上一级</div>
      </div>

      <div style="height:calc(100% - 170px);position:relative;">
        <hs-table ref="table" :total="1000" :columns="columns" bordered :data="filteredItems" @event="onTableEvent" :selectable="multiple ? 'multiple' : 'single'"  :option="{summary:true}" />
      </div>
    </Content>

    <!-- TASK EDITOR -->
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

    <!-- TASK PROCESS -->
    <ModalProcessTask v-model="modalProcess" :task="current" />

    <!-- TEMPLATE SELECTOR -->
    <Modal v-model="modalCreateTeml" title="选择任务模板" footer-hide width="800">
      <div style="position:relative;height:440px;">
        <div class="flex-wrap">
         <Input search placeholder="输入关键字搜索" style="margin:5px;width:200px" />
         <Button icon="md-settings" style='float:right;margin-right:10px;'>任务模板管理</Button>
        </div>
        <div style="display:flex;position:relative;height:400px;border-top:1px solid #ddd;">
        <hs-menu :data="tmplClasses" style='width:150px;border-right:1px solid #dfdfdf;height:100%;padding:0;' :current="selectedTmplClass" @on-select="selectedTmplClass=$event"></hs-menu>
        <div style="width:calc(100% - 150px)">
         
          <hs-list :data="filteredTmpls" :option="{tmpl:'BaseTaskTemplate'}" style='height:380px;overflow-y:auto;border:none;' @event="handleTmplEvent" />
        </div>
        </div>
      </div>
    </Modal>

    <!-- TASK PROCESS -->
    <!-- <hs-modal-form
      ref="form"
      :title="`任务${current?' - '+current.name:''}`"
      v-model="modalProcess"
      :width="420"
      :env="{upload}"
      style="margin: 10px"
      footer-hide
      :form="GetForm(current)"
      :data="modelResult"
      editable
      @on-submit="handleProcess"
		/> -->

    <!-- TASk ARRANGEMENT-->
    <hs-modal-form
			ref="form"
			:title="`任务安排${current?' - '+(current.name || current.id):''}`"
			v-model="modalArrange"
			:width="820"
      :env="{upload,...current}"
			style="margin: 10px"
			footer-hide
			:form="GetArrangeForm(current)"
			:data="modelResult"
			editable
			@on-submit="handleArrange"
		/>

    <!-- TEMPLATE TASKS SELECTOR -->
    <Modal v-model="modalInitTmpl" :title="'初始化模板 - '+tmpl.name" footer-hide width="800">
      <div style="padding:10px;">{{tmpl.desc}}</div>
      <template v-if="loadingTemplate">
        读取中
      </template>
      <template v-else>
      <CheckboxGroup v-model="selectedTemplates" style='max-height:400px;overflow-y:auto;border:1px solid #dfdfdf;'>
          <template v-for="(sub,i) in sub_templates">
            <Checkbox :label="sub.id" :key="i" style="padding:0 10px;width:90%;display:flex;align-items:center;" :disbaled="existedTemplates.includes(sub.id)">
              <div style="width:20px;text-align:right;margin-right:5px;">{{i+1}}</div> 任务 {{sub.name}}
            </Checkbox>
      </template>
      </CheckboxGroup>
      </template>
      <div class='flex-wrap' style="padding:10px;justify-content:space-between;">
        <div class='flex-wrap'><Button style='margin-right:10px;' @click="selectedTemplates=sub_templates.map(v=>v.id)">全选</Button><Button @click='selectedTemplates=existedTemplates.map(v=>v)'>取消</Button></div>
        <div class='flex-wrap'><Button type='primary' style='margin-right:10px;' @click="handleCreateWithTmpl">提交</Button><Button @click='handleCancelTmpl'>取消</Button></div></div>
    </Modal>
  </Layout>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  props:{
    filter:{
      type:Object,
      default:{}
    }
  },
  data(){
    return {
      selectedTmplClass:0,
      parent_id:false,
      multiple:false,
      modalArrange:false,
      modelResult:{},
      focused_task:{},
      sub_templates:[],
      selectedTemplates:[],
      existedTemplates:[],
      modalCreateTeml:false,
      modalInitTmpl:false,
      tmpl:{},
      modalProcess:false,
      project_id:null,
      dep_id:null,
      search_text:"",
      base_type:null,
      business_type:null,
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
					key: "resetpwd",
					name: "重置密码",
					icon: "md-key",
				},
				{
					key: "resetpwdto",
					name: "修改密码",
					icon: "ios-key",
				},
				{
					key: "lock",
					name: "锁定",
					icon: "md-lock",
				},
				{
					key: "unlock",
					name: "启用",
					icon: "md-unlock",
				},
				{
					key: "import",
					name: "导入",
					icon: "ios-folder-open",
				},
				{
					key: "import-tmpl",
					name: "下载模板",
					icon: "md-download",
				},
				{
					key: "refresh",
					name: "刷新",
					icon: "md-refresh",
				},
			],
      items:[],
      modalCreate:false,
      tmpls:[],
      model:{}, 
    }
  },
  mounted(){
    this.project_id = this.filter.project_id
    this.getData()
  },
   computed:{
     ...mapGetters('core',['session']),
      ...mapGetters('file',['files','uploadingFiles','makeURL']),
      columns(){
        return [{
          title:"序号",
          key:"id",
          type:"index",
        },{
          title:"类型", // 流程 任务 审批
          type:"type",
          key:"base_type",
          width:60,
          option:{
            getters:"core/getTypes",
            getters_key:"TASK_TYPE"
          }
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
          title:"任务名称",
          width:300,
          type:"text",
          key:"name",
          tree:true,
          linkEvent:"open"
        },{
          title:"所属部门",
          type:"type",
          width:150,
          key:"dep_id",
          option:{
            align:"center",
            getters:"core/deps"
          }
        },{
          title:"所属项目",
          width:200,
          type:"type",
          key:"project_id",
          option:{
            align:"center",
            getters:"core/projects"
          }
        },{
          title:"拆分",
          type:"text",
          key:"sub_task_count",
          sortable:false,
          width:40,
          option:{
            align:"center"
          },
         render:(h,param)=>{
          let sub = param.row.sub_task_count
          if(sub)
            return h('span',sub)
          else
            return h('span','-')
        }
        
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
      },{
        title:"创建时间",
        type:"time",
        key:"created_at",
        width:100,
        option:{
          align:"center"
        }
      },{
        title:"创建人",
        type:"user",
        key:"created_by",
        width:100,
        option:{
          align:"center",
          getters:"core/users"
        }
      },{
        title:"操作",
        type:'tool',
        buttons:["edit","delete"],
        option:{
          
        }
      }]
      },
      form_task(){
        let form = this.Form('task')
        
        form.def.parent_id.option.options = this.root_tasks.map(v=>({value:v.id,label:v.name}))
       
        return form
      },
      root_tasks(){
        return this.items.filter(v=>v)
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
      isFiltering(){
        return this.search_text || this.base_type != null || this.project_id != null ||  this.dep_id != null 
      },
      filteredTmpls(){
        return this.tmpls.filter(v=>v.business_type == this.selectedTmplClass)
      },
      filterInitData(){
        return {
          project_id:this.project_id,

          parent_id:this.parent_id,
          dep_id:this.dep_id,
          base_type:this.base_type,
          business_type:this.business_type,
        }
      },
      filteredItems(){
        let items = this.items.filter(v=>{
          let search_text = this.search_text ? this.search_text.trim() : ""
          if(search_text && (!v.name || !v.name.includes(search_text)) && (!v.code || !v.code.includes(search_text)))
            return false
          if(this.project_id && v.project_id != this.project_id)
            return false
          
          if(this.dep_id != null && v.dep_id != this.dep_id)
            return false

          if(this.base_type != null && v.base_type != this.base_type)
            return false
          
          if(this.business_type != null && v.business_type != this.business_type)
            return false
          
          if(this.state != null && v.state != this.state)
            return false

          if(this.focused_task && this.focused_task.id && v.parent_id != this.focused_task.id)
            return false
          else if(!this.focused_task || !this.focused_task.id){
            let exist = this.items.find(t=>t.id == v.parent_id)
            if(exist)
              return false
          }

          return true
        })
        items.forEach(v=>{
          v.subs = this.items.filter(w=>w.parent_id == v.id)||[]
        })

        return items
      }
    },
  methods:{
    init_form(form){
      form.def.charger.option.defaultValue = this.session.user_id
      return form
    },
    handleArrange(model){
      this.api.enterprise.ARRANGE_TASK({param:{id:item.id}},model).then(res=>{
        let updateInfo = res.data.data
        Object.assign(this.current,updateInfo)
        this.Success('分配成功')
      }).catch(e=>{
        this.Error('分配失败:'+e)
      })
    },toolDisabled() {
        return {}
    },onToolEvent(e) {

    },ShowResult(item){
      this.modalResult = true
    },ProcessTask(item){
       this.Request("enterprise").GET_TASKS({param:{id:item.id}}).then(res=>{
        let model = res.data.data
         this.current = model
     
         this.modalProcess = true
      }).catch(e=>{
        this.Error('错误:',e)
      })
     
      
    },handleClearFilter(){
      this.search_text=""
      this.base_type = null 
      this.business_type = null 
      this.project_id = null 
      this.dep_id = null 
    },handlePreCreate(){
      this.model={}
      this.modalCreate=true;
    },handlePreview(e){
      
    },handleDownload(id){
      this.getTask(id,data=>{
        console.log(data)
        let files = data.files.split(';').map(v=>v.split(','))
        if(files.length > 5)
          this.Confirm('文件数量较多，确定继续?',()=>{
            files.forEach(([name,url,ext])=>{
               this.DownloadWithName(url,name+'.'+ext)
            })
          })
        else{
             files.forEach(([name,url,ext])=>{
                this.DownloadWithName(url,name+'.'+ext)
            })
        }
      })
    },getTask(id, cb){
      this.Request("enterprise").GET_TASKS({param:{id}}).then(res=>{
        let model = res.data.data
        console.log(model)
        cb(model)
      }).catch(e=>{
        this.Error('错误:',e)
      })
    },handleOpen(id){
       this.getTask(id,data=>{
        this.model = this.current
        this.modalArchivePreview = true 
      })
    },handleBeforeEdit(id){
      this.getTask(id,data=>{
        this.model = data
        this.modalCreate = true 
      })
    },handleTmplEvent(e){
      if(e.event == 'create'){
        this.modalCreateTeml = false
        this.api.enterprise.LIST_TASK_TEMPLATES({query:{parent_id:e.param.id}}).then(res=>{
          let items = res.data.data
          this.sub_templates = items
             this.modalInitTmpl = true
             this.existedTemplates = this.items.filter(v=>this.sub_templates.find(t=>t.id == v.unique_tmpl_key))
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
      this.Confirm(`确定删除该项目<b style='color:red;margin:0 2px;'>${model.name}</b>的所有资料`,()=>{
        this.api.enterprise.DELETE_TASKS({param:{id:model.id}}).then(res=>{
          let id_list = res.data.data
          setTimeout(() => {
            this.Success('删除成功')
            id_list.forEach(v=>{
              this.items.splice(this.items.findIndex(v=>v.id == v),1)
            })
            
          }, (1000));
          
        }).catch(e=>{
          this.Error('删除失败')
        })
      })
    },
    async upload(files,onFilesProgress){
     return new Promise((resolve,reject)=>{
       this.$store.dispatch("file/upload",{files,onProgress:onFilesProgress}).then(files=>{
         console.log(files)
         resolve(files.map(v=>v.url))
       }).catch(reject)
     })
    },
    onTableEvent(e){
      if(!e.data)
        return
      if(e.type == 'edit'){
       this.handleBeforeEdit(e.data.id)
      }else if(e.type == 'delete'){
        this.handleDelete(e.data)
      }else if(e.type == 'open'){
        this.ProcessTask(e.data)
        
       
      }
    },
    GetForm(task){
      if(!task)
        return {}
      if(task.base_type == 0){
        return this.Form('task_purchase')
      }else if(task.base_type == 1){
        return this.Form('task_purchase')
      }else{
        return this.Form('task_simple')
      }

    },
    GetArrangeForm(task){
      if(!task)
        return {}
      if(task.base_type == 0){
        return this.Form('task_arrange')
      }else if(task.base_type == 1){
        return this.Form('task_arrange')
      }else{
        return this.Form('task_arrange')
      }
    },
    getSubTasks(task_id){
      return this.tmpls.filter(v=>v.parent_id == task_id)
    },
    handlePatchArchive(item){
      if(item.id){
        let id = item.id
        delete item.id
        this.api.enterprise.PATCH_TASKS(item,{param:{id}}).then(res=>{
          let updateInfo = res.data.data
         
          let new_item = Object.assign({},item,updateInfo)
          let index = this.items.findIndex(v=>v.id == id)
          if(index != -1){
            new_item = Object.assign({},this.items[index],new_item)
           this.items.splice(index,1,new_item)
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
          this.items.splice(0,0,new_item)
           this.modalCreate = false
          this.Success('创建成功')
        }).catch(e=>{
          this.Error('创建失败:'+e)  
        }).finally(e=>{
          this.loading = false
        })
      }
     
      // 创建资料
    },
    getData(){
       this.loading = true
       this.api.enterprise.LIST_TASKS().then(res=>{
         this.items = res.data.data
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
         console.log("TMPLATES:",this.tmpls)
       })
     },
  }

}
</script>
<style lang="less" scoped>
.focused-box{
  display: flex;
  align-items:center;
  margin-bottom:5px;

  .text-btn{
    background:#333;width:20px;height:20px;display:flex;align-items:center;justify-content:center;border-radius:4px;
    
    color:#fff;
  }

  .task-name{
    font-weight: bold;
    margin:0 5px;
  }
}
</style>