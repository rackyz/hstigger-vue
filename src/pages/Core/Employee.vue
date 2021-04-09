<template>
  <Layout class="hs-container hs-container-full statistics">
     <hs-toolbar
        style="background: #fff;border:1px solid #dfdfdf;"
        :data="tools"
        @event="onToolEvent"
        :disabled="toolDisabled"
      />
       <div class="filter-box flex-between" style="background:#fff;padding:5px;border-bottom:1px solid #dfdfdf;">
      <div class="flex-wrap l-offset">
        <Input style="width:230px;" v-model="f_search_text" search clearable placeholder="输入姓名或岗位" />
        <Select style="width:100px;text-align:center" v-model="f_type_2" placeholder="年份" clearable>
             <template v-for="d in $store.getters['core/getTypes']('ARCHIVE_SAVETYPE')">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>

          </Select>
          <Select style="width:100px;text-align:center" v-model="f_type_2" placeholder="月份" clearable>
             <template v-for="d in $store.getters['core/getTypes']('ARCHIVE_SAVETYPE')">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>

          </Select>
        <Select style="width:150px;text-align:center" v-model="f_project_id" placeholder="时间节点" clearable>
          

        </Select>
         <Select style="width:150px;text-align:center" v-model="f_dep_id" placeholder="时间段" clearable>
           <template v-for="d in $store.getters['core/deps']">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>
         </Select>
       
            <Button @click="handleClearFilter()" type="info" v-show="isFiltering">清除筛选条件</Button>
      </div>
      <div class="flex-wrap">
        <!-- authed.ArchiveCategoryManage -->
        
      
      </div>
    </div>
    <Content style="display:flex;align-items:flex-start;justify-content:space-between;height:100%;">
      <div style="width:350px;height:100%;position:relative;background:#fff;border-right:1px solid #dfdfdf;">
       <div style='padding:5px;'>
         当前在职 {{employees.filter(v=>!v.outDate).length}} 人
       </div>
      <hs-list style="height:calc(100% - 100px);position:relative;border:none;"  :data="filteredEmployees" @event="onListEvent" :option="{tmpl:'BaseEmployeeDetail'}" />
      </div>
      <div style="width:calc(100% - 350px);position:relative;height:100%;">
        
     
    <div style="height:calc(100% - 100px);position:relative;">
       <div style='padding:5px;'>
         用工记录 {{filteredItems.length}} 条 
       </div>
      <hs-table ref="table" :total="1000" :columns="filtredColumns" bordered :data="filteredItems" @event="onTableEvent" selectable="single" :option="{summary:true}" />
    </div>
      </div>
    
    </Content>

    <hs-modal-form
			ref="form"
			:title="'调入人员'"
			v-model="modalCreate"
			:width="620"
			style="margin: 10px"
			footer-hide
			:form="Form('employee_in')"
			:data="model"
			editable
			@on-submit="handlePatch"
			@on-event="handleEvent"
		/>
  </Layout>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      current_item:null,
      items:[],
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
					key: "factor",
					name: "调整系数",
					icon: "md-cog",
        },
        {
					key: "out",
					name: "调出",
					icon: "ios-share-alt",
				}],
      showChange:false,
      current:null,
     
      items:[],
      modalCreate:false,
      model:{}, 
     columns:[{
         title:"序号",
        key:"id",
        type:"index"
      },{
        title:"姓名",
        type:"type",
        width:150,
        key:"employee_id",
        option:{
          align:"center",
          getters:"core/users"
        }
      },{
        title:"岗位",
        width:100,
        type:"type",
        key:"position_id",
        option:{
          align:"center",
          getters:"core/getRoles",
          getters_key:12
        }
      },{
        title:"系数",
        width:100,
        type:"number",
        key:"factor",
        option:{
          align:"center",
          formatter:e=>e.toFixed(1)
        }
      },{
        title:"累计人月",
        width:100,
        type:"number",
        key:"hr",
        
        option:{
          summable:true,
          align:"center",
          formatter:e=>e.toFixed(1)
        }
      },{
        title:"实习",
        width:80,
        type:"state",
        sortable:false,
        key:"trainee",
        option:{
          states:['否','是']
        }
      },{
        title:"调入时间",
        type:"time",
        key:"inDate",
        width:200,
        option:{
          type:"date"
        }
      },{
        title:"调出时间",
        type:"time",
        key:"outDate",
        width:200,
        option:{
          type:"date"
        }
      },{
        title:"备注",
        type:"text",
        key:"comment"
      },{
        title:"录入人",
        type:"type",
        width:150,
        key:"created_by",
        option:{
          align:"center",
          getters:"core/users"
        }
      }],
    }
  },
  props:{'filter':{
    type:Object,
    default:()=>{}
  }},
  mounted(){
    this.getData()
  },
   computed:{
     current_record(){

       return this.items.find(v=>v.id == this.current_item) || {}
     },
     employees(){
       let employee = {}
       this.items.forEach(v=>{
         if(employee[v.employee_id]){
           employee[v.employee_id].hr += v.hr = this.calcHr(v)
           if(moment(employee[v.employee_id].inDate).isBefore(moment(v.inDate))){
             employee[v.employee_id].inDate = v.inDate
             
             employee[v.employee_id].outDate = v.outDate
             employee[v.employee_id].factor = v.factor
             employee[v.employee_id].position_id = v.position_id 
           }
         }else{
            employee[v.employee_id] = {}
            employee[v.employee_id].employee_id = v.employee_id
            employee[v.employee_id].hr = v.hr = this.calcHr(v)
             employee[v.employee_id].factor = v.factor
            employee[v.employee_id].inDate = v.inDate
            employee[v.employee_id].outDate = v.outDate
            employee[v.employee_id].position_id = v.position_id 
         }
       })

       return Object.values(employee)
     },
     filteredEmployees(){
       return this.employees
     },
     
      isFiltering(){
        return false 
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
      filtredColumns(){
        let cols = [...this.columns]
        if(this.part_mode == "partA"){
          cols.splice(5,1)
        }else if(this.part_mode == "partB"){
          cols.splice(6,1)
        }
        return cols
      },
      toolDisabled(){
        return {


        }
      },
      filteredItems(){
        let items =  this.items.filter(v=>{
         
          return true
        })
        items.sort((a,b)=>{
          if(moment(a.created_at).isBefore(b.created_at))
            return 1
          else
            return -1
        })
        return items
      }
    },
  methods:{
    calcHr(data){
        let duration = moment.duration((data.outDate?moment(data.outDate):moment()) - moment(data.inDate)).as('month')
        return duration * data.factor
     },
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
      // if(this.filter.project_id !== null)
      //   this.model.project_id = this.filter.project_id
      this.modalCreate=true;
    },
    onToolEvent(e){
      console.log(e)
      if(e == 'add'){
        this.handlePreCreate()
      }else if(e == 'edit'){
        this.handleBeforeEdit(this.current.id)
      }else if(e == 'delete'){
        this.handleDelete(this.current)
      }else if(e == 'payment'){
        this.showPay = true
      }else if(e == 'changed'){
        this.showChange = true
      }
    },
    onTableEvent(e){
      this.current_item = e.data
    },
    onListEvent(e){
  console.log(e)
    },
    handleDelete(model){
      console.log(this.api.enterprise)
      this.Confirm(`确定删除<b style='color:red;margin:0 2px;'>${model.name}</b>的本条记录`,()=>{
        this.api.enterprise.DELETE_PROJECTS({param:{id:model.id},query:{q:'employee'}}).then(res=>{
          setTimeout(() => {
            this.Success('删除成功')
            this.items.splice(this.items.findIndex(v=>v.id == model.id),1)
          }, (1000));
          
        }).catch(e=>{
          this.Error('删除失败')
        })
      })
    },
    handlePatch(item){
      this.api.enterprise.PATCH_PROJECTS(item,{param:{id:this.filter.project_id},query:{q:'employee'}}).then(res=>{
        let updateInfo = res.data.data
        
        let new_item = Object.assign({},item,updateInfo)
        let index = this.items.findIndex(v=>v.id == item.id)
        if(index != -1){
          new_item = Object.assign({},this.items[index],new_item)
          this.items.splice(index,1,new_item)
        }else{
          this.items.splice(0,new_item)
        }
        this.$forceUpdate()
        this.modalCreate = false
        this.Success('修改成功')
        
      }).catch(e=>{
        this.Error('修改失败:'+e)  
      }).finally(e=>{
        this.loading = false
      })    
     
      // 创建资料
    },
    getData(){
       this.loading = true
       this.api.enterprise.GET_PROJECTS({param:{id:this.filter.project_id},query:{q:'employee'}}).then(res=>{
         this.items = res.data.data
       }).finally(e=>{
         this.loading = false
       })
      },
  }

}
</script>
<style lang="less">
.l-offset{
  >*{
    margin-right:5px;
  }
}
</style>