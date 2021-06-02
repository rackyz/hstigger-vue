<template>
  <div class="hs-container" style="padding:50px 80px;background:#fff;position:relative;height:100%;overflow:hidden;">
   <div class="l-panel" style="height:100%;overflow-y:auto;padding:20px;padding-top:10px; ">
        <h3 style="color:#346;font-weight:bold;margin-bottom:10px;">课程管理</h3>
        
        <hs-toolbar :data="tools" style="border:none;margin-top:10px;margin-bottom:10px;border-radius:5px;background:#eee;border:1px solid #ddd;color:#346;" @event="handleToolEvent" />
        <div style="height:calc(100% - 120px);position:relative">
          <hs-list style="background:#eee;height:100%;" :data="items" :option="{tmpl:'HsxClassPlan'}" @event="handleListEvent" selectable />
        </div>
       
      </div>
      
      
     <hs-modal-form v-model="showModalCreate" title="创建课程计划" :form="Form('classplan')" :data="model" @on-submit="handleSubmit" width="600" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      showModalCreate:false,
      model:{},
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
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.api.enterprise.RELATED_TRAININGS({param:{id:this.id,related:'plans'}}).then(res=>{
        let items = res.data.data
        items.sort((a,b)=>{!a.started_at || (b.started_at && moment(a.started_at)).isBefore(b.started_at)?1:-1})
        items.forEach((v,i)=>v.index = i+1)
        this.items = items
      })
    },
    handleSubmit(e){
      console.log(e)
      this.api.enterprise.ADDRELATED_TRAININGS(e,{param:{id:this.id,related:'plans'}}).then(res=>{
        let item = res.data.data
        item = Object.assign({},e,item)
        this.items.push(item)
        this.Success("添加成功")
        this.showModalCreate = false
        this.model = {}
      }).catch(e=>{
        this.Error('错误:'+e)
      })
    },
    handleToolEvent(e){
      if(e == 'add'){
        this.showModalCreate = true
      }
    },
    handleListEvent(e){
      console.log(e)
    },
    handleDelete(e){
      this.Confirm('确认删除该课程计划',e=>{

      })
    }
  }
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