<template>
  <Layout class="hs-container hs-container-full statistics">
   
    <Content style="padding:5px 10px;">
    <div class="filter-box flex-between" style="margin:5px 0;">
      <div class="flex-wrap">
        <Input style="width:230px;" v-model="f_search_text" search clearable placeholder="输入编号或名称查询" />
         <Select style="width:150px;margin-left:5px;text-align:center" v-model="f_type_2" placeholder="- - 所属部门 - -" clearable>
             <template v-for="d in $store.getters['core/getTypes']('ARCHIVE_SAVETYPE')">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>

          </Select>
        <Select style="width:200px;margin-left:5px;text-align:center" v-model="f_project_id" placeholder="- - 项目类型 - -" clearable>
          

        </Select>
         <Select style="width:150px;margin-left:5px;text-align:center" v-model="f_dep_id" placeholder="- - 建筑类型 - -" clearable>
           <template v-for="d in $store.getters['core/deps']">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
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
    <div style="height:400px;position:relative;">
      <hs-table ref="table" :total="1000" :columns="columns" bordered :data="filteredItems" @event="onTableEvent" selectable="false" />
    </div>
    </Content>

    <hs-modal-form
			ref="form"
			:title="model.id?'修改任务':'新增任务'"
			v-model="modalCreate"
			:width="620"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('task')"
			:data="model"
      :initData="filterInitData"
			editable
			@on-submit="handlePatchArchive"
			@on-event="handleEvent"
		/>

    <Modal v-model="modalCreateTeml" title="选择任务模板" footer-hide width="800">
      <div style="position:relative;height:440px;">
        <div class="flex-wrap">
         <Input search placeholder="输入关键字搜索" style="margin:5px;width:200px" />
         <Button icon="md-settings" style='float:right;margin-right:10px;'>任务模板管理</Button>
        </div>
        <div style="display:flex;position:relative;height:400px;border-top:1px solid #ddd;">
        <hs-menu :data="tmplClasses" style='width:150px;border-right:1px solid #dfdfdf;height:100%;padding:0;' :current="selectedTmplClass" @on-select="selectedTmplClass=$event"></hs-menu>
        <div style="width:calc(100% - 150px)">
         
          <hs-list :data="filteredTmpls" :option="{tmpl:'BaseTaskTemplate'}" style='height:380px;overflow-y:auto;border:none;' />
        </div>
        </div>
      </div>
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
      selectedTmplClass:1,
      tmplClasses:[{
        id:1,
        name:"项目部",
        path:1,
      },{
        id:2,
        name:"总师办",
        path:2
      }],
      modalCreateTeml:false,
      f_project_id:null,
      f_dep_id:null,
      f_search_text:"",
      f_type_1:null,
      f_type_2:null,
      f_type_3:null,
      //
      items:[],
      modalCreate:false,
      tmpls:[{
        id:1,
        name:"前期工作 v1",
        desc:"项目默认前期工作列表",
        version:"1.0.0",
        
        group:1
      },{
        id:2,
        name:"合同工作 v1",
        desc:"项目默认合同工作列表",
        version:"1.0.0",
        
        group:1
      },{
        id:3,
        name:"考核任务 v1",
        desc:"项目默认合同工作列表",
        version:"1.0.0",
        
        group:2
      }],
      model:{}, 
      columns:[{
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
        title:"子任务",
        type:"text",
        key:"sub_count",
        sortable:false,
        width:130,
        render:(h,param)=>{
          let item = param.row
          if(item.sub_count){
            return h('Button',{props:{size:"small",type:"info"}},'进入')
          }else{
            return h("Button",{props:{size:"small",type:"primary"}},'创建')
          }

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
          key:"TASK_STATE"
        }
      },{
        title:"工作量",
        type:"text",
        width:80,
        key:"percent"
      },{
        title:"任务期限",
        type:"user",
        key:"plan_duration",
        width:100,
        option:{
          align:"center",
        }
      },{
        title:"任务成果",
        type:"user",
        key:"result",
        width:100,
        sortable:false,
        option:{
          align:"center"
        },
         render:(h,param)=>{
          let item = param.row
          if(item.sub_count){
            return h('Button',{props:{size:"small",type:"info"}},'下载')
          }else{
            return h("Button",{props:{size:"small",type:"success"}},'提交')
          }

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
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$refs.table.calcTableHeight()
    })
    this.getData()
  },
   computed:{
      ...mapGetters('file',['files','uploadingFiles','makeURL']),
      isFiltering(){
        return this.f_search_text || this.f_type_1 != null ||  this.f_type_2 != null ||  this.f_type_3 != null ||  this.f_project_id != null ||  this.f_dep_id != null 
      },
      filteredTmpls(){
        return this.tmpls.filter(v=>v.group == this.selectedTmplClass)
      },
      filterInitData(){
        return {
          project_id:this.f_project_id,
          dep_id:this.f_dep_id,
          type1:this.f_type_1,
          type2:this.f_type_2,
          type3:this.f_type_3
        }
      },
      filteredItems(){
        return this.items.filter(v=>{
          let search_text = this.f_search_text ? this.f_search_text.trim() : ""
          if(search_text && (!v.name || !v.name.includes(search_text)) && (!v.code || !v.code.includes(search_text)))
            return false
          if(this.f_project_id && v.project_id != this.f_project_id)
            return false
          
          if(this.f_dep_id && v.dep_id != this.f_dep_id)
            return false

          if(this.f_type_1 && v.type1 != this.f_type_1)
            return false
          
          if(this.f_type_2 && v.type2 != this.f_type_2)
            return false
          
          if(this.f_type_3 && v.type3 != this.f_type_3)
            return false

          return true
        })
      }
    },
  methods:{
    handleClearFilter(){
      this.f_search_text=""
      this.f_type_1 = null 
      this.f_type_2 = null 
      this.f_type_3 = null 
      this.f_project_id = null 
      this.f_dep_id = null 
    },
    handlePreCreate(){
      this.model={}
      if(this.f_project_id !== null)
        this.model.project_id = this,f_project_id
      if(this.f_dep_id)
        this.model.dep_id = this.f_dep_id
      if(this.f_type_1 !== null)
        this.model.type1 = this.f_type_1
       if(this.f_type_2 !== null)
        this.model.type2 = this.f_type_2
       if(this.f_type_3 !== null)
        this.model.type3 = this.f_type_3
      console.log(this.model)
      this.modalCreate=true;
    },
    handlePreview(e){

    },
    handleDownload(id){
      this.get_archive(id,data=>{
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
    },
    get_archive(id, cb){
      this.api.enterprise.GET_TASKS({param:{id}}).then(res=>{
        let model = res.data.data
        console.log(model)
        cb(model)
      }).catch(e=>{
        this.Error('打开资料失败:',e)
      })
    },
    handleOpen(id){
       this.get_archive(id,data=>{
        this.model = this.current
        this.modalArchivePreview = true 
      })
    },
    handleBeforeEdit(id){
      this.get_archive(id,data=>{
        this.model = data
        this.modalCreate = true 
      })
    },
    handleDelete(model){
      this.Confirm(`确定删除该项目<b style='color:red;margin:0 2px;'>${model.name}</b>的所有资料`,()=>{
        this.api.enterprise.DELETE_TASKS({param:{id:model.id}}).then(res=>{
          setTimeout(() => {
            this.Success('删除成功')
            this.items.splice(this.items.findIndex(v=>v.id == model.id),1)
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
        this.handleOpen(e.data.id)
      }
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
     },
  }

}
</script>

<style>
</style>