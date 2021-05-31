<template>
  <div class="hs-container" style="padding:10px 10px;position:relative;height:100%;overflow:hidden;">
    
    <Row :gutter="10"  style=";height:calc(100%);">
      <Col :span="4" style="height:100%;">
      
      <div class="l-panel" style="height:100%;padding:20px;">
        <h3 style="color:#346;margin:0;">考核管理</h3>
        <div class="l-filter flex-wrap flex-between" style="padding:15px 0;">
          <Input search style="width:140px;" />
          <Button type="primary" icon="md-add" style="width:34px;"></Button>
        </div>
        <hs-list style="height:calc(100% - 85px)" :data="items" selectable="single" :option="{tmpl:'HsxAppraisal'}" @event="handleEvent" />
      </div>
      </Col>
      <Col :span="20" style="height:100%;">
      <div class="l-panel" style="height:100%;overflow-y:auto;padding:20px ">
        <div class="flex-wrap ">
         <div class="number-panel " style="width:calc(100% - 270px);margin-right:10px;align-items:flex-start;padding:0 10px;">
           <h3>考核标题</h3>
           <span>考核介绍</span>
           </div>
           <div class="number-panel ">
          已提交
          <div class="number">
            145 / 235
          </div>
        </div>
        <div class="number-panel" style='margin-left:10px;'>
          已通过
          <div class="number">
            145 / 235
          </div>
        </div>
        
        </div>
        
        <hs-toolbar :data="tools" style="border:none;margin-top:10px;margin-bottom:10px;border-radius:5px;background:rgb(35, 51, 76);color:#ddd;" />
        <div style="height:calc(100% - 150px);position:relative">
           <hs-table class="hs-table-plus" fulltable :columns="columns" style="height:100%;margin-top:5px;" /></hs-table>
        </div>
       
      </div>
      </Col>
     
      
    </Row>

  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[{
        id:1,
        name:"PPT基础培训考核1",
        desc:"请上传第一次作业",
        deadline:"2020/6/31",
        charger:'NBGZ',
        created_at:moment(),
        created_by:'NBGZ'
      }],
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