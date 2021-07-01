<style lang="less" scoped>

.flex-group{
  margin:0 5px;
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
        <div class='l-group l-group-btn' :key="ph" style="width:70px;height:56px;text-align:center;margin:0 5px;padding:5px;border-radius:5px;color:#fff;margin-right:0;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;"  @click="handleCreateTask">
            <div style="font-size:10px;"><Icon type="md-add" size="20" /></div>
            <div style='font-size:10px;margin-top:2px;'>新增工作</div>
            </div>
            <div class='l-group l-group-btn' :key="ph" style="width:70px;height:56px;text-align:center;margin-left:0;padding:5px;border-radius:5px;color:#fff;border-top-left-radius:0;border-bottom-left-radius:0"  @click="handleCreateTask">
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
  </div>
</template>

<script>
export default {
  data(){
    return {
      phases:['前期准备','前期工作','设计工作','招投标','合同管理','现场管理','其他'],
      selected:-1,
      tasks:[],
      tmpls:[],
      loading:false
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
        type:"file",
        title:"操作",
        key:"file"
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
  background:rgb(0, 98, 174);
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