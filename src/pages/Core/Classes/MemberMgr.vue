<template>
  <div class="hs-container" style="padding:10px 10px;position:relative;height:100%;overflow:hidden;">
   <div class="l-panel" style="height:100%;overflow-y:auto;padding:20px;padding-top:10px; ">
        <h3 style="color:#346;">学员管理</h3>
        
        <hs-toolbar :data="tools" style="border:none;margin-top:10px;margin-bottom:10px;border-radius:5px;background:rgb(35, 51, 76);color:#ddd;" />
        <div style="height:calc(100% - 150px);position:relative">
           <hs-table class="hs-table-plus" fulltable :columns="columns" style="height:100%;margin-top:5px;" /></hs-table>
        </div>
       
      </div>

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
					key: "add",
					name: "新增",
					icon: "md-add",
				},
				{
					key: "delete",
					name: "移除",
					icon: "md-remove",
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