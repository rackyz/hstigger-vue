<template>
  <div class="hs-container" style="position:relative;height:100%;overflow:hidden;">
    
    <Row :gutter="1"  style=";height:calc(100%);">
      <Col :span="4" style="height:100%;border-right:1px solid #ddd;">
      
      <div class="l-panel" style="height:100%;padding:20px;">
        <h3 style="color:#346;margin:0;font-weight:bold;">考核管理</h3>
        <div class="l-filter flex-wrap flex-between" style="padding:15px 0;">
          <Input search style="width:140px;" v-model="listSearchText" clearable />
          <Button type="primary" icon="md-add" style="width:33px;" @click="model={};showModalCreate=true"></Button>
        </div>
        <hs-list style="height:calc(100% - 125px);background:#eee;" :data="filteredList" selectable="single" :option="{tmpl:'HsxAppraisalPlan'}" @event="handleListEvent" />
      </div>
      </Col>
      <Col :span="20" style="height:100%;">
      <div class="l-panel" style="height:100%;overflow-y:auto;padding:15px ">
        <div class="flex-wrap ">
         <div class="number-panel " style="width:calc(100% - 270px);margin-right:10px;align-items:flex-start;padding:0 10px;border:none;color:#346;justify-content:flex-start;">
           <h3>{{selected.name || '未选择'}}</h3>
           <span>{{selected.desc || '请选择一个考核'}}</span>
           </div>
           <div class="number-panel " v-if="selected.count">
          已提交
          <div class="number">
            {{selected.submitted || 0}} / {{selected.count}}
          </div>
        </div>
        <div class="number-panel" style='margin-left:10px;' v-if="selected.count">
          已通过
          <div class="number">
            {{selected.passed || 0}} / {{selected.count}}
          </div>
        </div>
        
        </div>
        
        <hs-toolbar :data="tools" style="border:none;margin-top:10px;margin-bottom:10px;border-radius:5px;background:#eee;border:1px solid #ddd;color:#346;" @event="handleToolEvent"  />
        <div style="height:calc(100% - 150px);position:relative">
           <hs-table class="hs-table-plus" fulltable :columns="columns" style="height:100%;margin-top:5px;" /></hs-table>
        </div>
       
      </div>
      </Col>
     
      
    </Row>
    <hs-modal-form v-model="showModalCreate" :title="model.id?'修改考核':'新建考核'" :form="Form('appraisal_plan')" :data="model" @on-submit="handleSubmit" width="600" /> 
  </div>
</template>

<script>
export default {
  data(){
    return {
      listSearchText:"",
      showModalCreate:false,
      model:{},
      selected:{},
      items:[],
      columns:[{
        title:"序号",
        type:"index",
        width:80
      },{
        key:'name',
        title:"姓名",
        minWidth:200
      },{
         key:'name',
        title:"考核结果",
        minWidth:200
      },
      {
         key:'name',
        title:"考核备注",
        minWidth:200
      },{
         key:"name",
         title:"提交时间"
      },{
         key:"name",
         title:"操作",
         sortable:false
      }],
      tools: [
        
      {
        key: 'config',
        name: "配置",
        icon: "md-settings",
      },
      {
        key: "add",
        name: "新增",
        icon: "md-add",
      },
      {
        key: "delete",
        name: "移除",
        icon: "md-remove",
      },
      {
        key: "export",
        name: "导出",
        icon: "md-download",
      }]
    }
  },
  metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
  computed:{
    id(){
      return this.$route.params.id
    },
    filteredList(){
      if(this.listSearchText)
        return this.items.filter(v=>v.name.includes(this.listSearchText))
      else
        return this.items
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.api.enterprise.RELATED_TRAININGS({param:{id:this.id,related:'appraisals'}}).then(res=>{
        let items = res.data.data
        this.items = items
      })
    },
    getAppraisalData(item){

    },
    handleSubmit(e){
      if(e.id){
        this.api.enterprise.PATCHRELATED_TRAININGS(e,{param:{id:this.id,related:'appraisals',relatedId:e.id}}).then(res=>{
        this.Success("修改成功")
        this.getData()
        this.showModalCreate = false
      }).catch(e=>{
        this.Error("错误:"+e)
      })

      }else{
        this.api.enterprise.ADDRELATED_TRAININGS(e,{param:{id:this.id,related:'appraisals'}}).then(res=>{
        this.Success("创建完成")
        this.getData()
        this.showModalCreate = false
      }).catch(e=>{
        this.Error("错误:"+e)
      })
      }
      
    },
    handleDelete(e){
      this.Confirm("确定删除该考核（包括所有的考核信息，无法恢复）？",d=>{
          this.api.enterprise.DELRELATED_TRAININGS(e,{param:{id:this.id,related:'appraisals',relatedId:e.id}}).then(res=>{
          this.Success("删除完成")
          this.getData()
          }).catch(e=>{
            this.Error("错误"+e)
          })
      })
      
    },
    handleToolEvent(e){
     if(e == 'config'){
        
        this.model = this.selected
        this.showModalCreate =  true
      }else if(e == 'delete'){
        this.handleDelete(e)
      }else if(e == 'member'){
        
      }else if(e == 'export'){

      }
    },
     handleListEvent(e){
       if(e.type == 'select'){
         this.selected = this.items.find(v=>v.id == e.param)
         this.getAppraisalData(this.selected)
       }
    },
    handleTableEvent(e){
      
    }
  },
 
}
</script>

<style lang="less">
.l-caption{
  font-weight: bold;
}
.l-panel{
  margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;
}

.number-panel{
  width:120px;
  height:70px;
  border:1px solid #eee;
  display:flex;
  justify-content: center;
  flex-direction: column;
  padding:10px 0;
  align-items: center;
}
</style>