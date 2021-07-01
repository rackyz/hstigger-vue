<style lang="less" scoped>

.flex-group{
  margin:0 5px;
  
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
        <div class='l-group l-group-btn' :key="ph" style="width:70px;height:54px;text-align:center;margin:0 5px;padding:5px;border-radius:5px;color:#fff;margin-right:0;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;"  @click="handleCreateTask">
            <div style="font-size:10px;"><Icon type="md-add" size="20" /></div>
            <div style='font-size:10px;margin-top:2px;'>新增工作</div>
            </div>
            <div class='l-group l-group-btn' :key="ph" style="width:70px;height:54px;text-align:center;margin-left:0;padding:5px;border-radius:5px;color:#fff;border-top-left-radius:0;border-bottom-left-radius:0"  @click="modalCreateTeml=true">
            <div style="font-size:10px;"><Icon type="md-bookmarks" size="20" /></div>
            <div style='font-size:10px;margin-top:2px;'>工作集</div>
            </div>
            <div class="flex-wrap flex-group">
        <div class='l-group ' :key="ph" style="width:120px;height:54px;text-align:center;margin:0 5px;padding:5px;border-radius:5px;" :class="selected == -1?'l-group-selected':''" @click="selected = -1">
            <div style="font-size:10px;">全部 ({{finished.length}}/{{tasks.length}})</div>
            <div><Progress :percent="tasks.length!=0?Math.ceil(finished.length/tasks.length):0" /></div>
            </div>
        <template v-for="(ph,i) in types">
          <div class='l-group' v-if="ph.task_count" :key="ph" style="width:120px;height:54px;text-align:center;margin:0 2px;padding:5px;border-radius:5px;" :class="selected == ph.value?'l-group-selected':''" @click="selected = ph.value">
            <div style="font-size:10px;">{{ph.name}} ({{ph.finished_count}}/{{ph.task_count}})</div>
            <div><Progress :percent="ph.task_count!=0?parseInt(ph.finished_count/ph.task_count):0" /></div>
            </div>
          
        </template>
      </div>
      </div>
      <div class='table-wrap'>
        <hs-table ref='table' style="height:100%" full-table :columns="cols" :data="filteredTasks" />
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
			@on-submit="handlePatchArchive"
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


  </div>
</template>

<script>
export default {
  data(){
    return {
      phases:['前期准备','前期工作','设计工作','招投标','合同管理','现场管理','其他'],
      selected:-1,
      tasks:[],
      model:{},
      tmpls:[],
      modalCreate:false,
      loading:false,
      modalCreateTeml:false
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
    project(){
      return this.$store.getters['project/get'](this.id)
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
     filteredTmpls(){
        return this.tmpls.filter(v=>v.business_type == this.selectedTmplClass)
      },
      filterInitData(){
        return {
          project_id:this.id,

          parent_id:this.parent_id,
          dep_id:this.dep_id,
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
      return [{
        type:'index',
        title:"序号"

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
        type:"text",
        title:"名称",
        width:400,
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
          gettesr:"core/users"
        }
      },{
        
        width:120,
        render(h,p){
          return h('Button',{props:{size:'small'},on:{click:()=>{}}},'处理')
        }
      },{
        type:'time',
        title:"完成时间",
        width:120,
        key:"submitted_at"
      },{
        type:"file",
        width:100,
        title:"附件",
        key:"file"
      },{
        
        title:"操作",
        key:'id',
          type:'tool',
        buttons:["edit","delete"]
      }]
    }
  },
  methods:{
    getData(){
       this.loading = true
       this.api.enterprise.LIST_TASKS().then(res=>{
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
    } 
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
  background:rgb(172, 217, 250);
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
}

.l-group-selected:hover{
  background:rgb(0, 98, 174);
  color:#fff;
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