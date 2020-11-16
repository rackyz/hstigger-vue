<template>
	<div class="hs-conatiner" padding='0'>
    <!-- tool bar -->
		<hs-toolbar
			style="background: #fff;"
			:data="tools"
			@event="onToolEvent"
		/>
    <div class="filter-wrap" style="padding: 5px;background:#fff;" @click="selected = null">
			<ButtonGroup style="margin-right: 5px" v-show="multiple"
				><Button @click="onSelectAll">全选</Button
				><Button @click="selected = []">清空</Button></ButtonGroup
			>
			<Button
				style="margin-right: 5px"
				type="error"
				v-show="multiple"
				@click="multiple = false"
				>结束批量操作</Button
			>
			<Input v-model="searchText" search style="width: 200px" clearable />
			<ButtonGroup style="margin-left: 5px"
				><Button
					:type="hidingLocked ? 'primary' : ''"
					@click="hidingLocked = !hidingLocked"
					>项目类型</Button
				>
			</ButtonGroup>
			<Button
				:type="showUnsafe ? 'primary' : ''"
				@click="showUnsafe = !showUnsafe"
				style="margin-left: 5px"
				>密码未修改
			</Button>
		</div>
    <div style="background:#ddd;height:calc(100% - 130px);position:relative;">
    
             <hs-table :columns="columns" :data="projects" :onEvent="onTableEvent" />
       
    </div>
  

  <hs-modal-form
			ref="form"
			:title="editingItem && editingItem.id ? '修改' : '新增'"
			v-model="showModalCreate"
			:width="450"
			style="margin: 10px"
			:form="form"
			:data="editingItem"
			editable
			@on-submit="onPatch"
			@on-event="onEvent"
		/>
  
</div>
</template>

<script>
import { mapGetters } from "vuex";
import FormDef_ProjectCreate from '@/forms/project'
export default {
  data(){
    return {
      showModalCreate:false,
      editingItem:{},
      loading:false,
      currentDep:null,
      columns:[{
        type:"index",
        title:"序号",
        key:"id"
      },{
        type:"text",
        title:"项目编号",
        key:"code",
        width:100,
        option:{
          align:'center'
        }
      },{
        type:"type",
        title:"项目类型",
        width:120,
        key:"project_type",
        option:{
          
          getters:'core/types'
        }
      },{
        type:"type",
        title:"服务类型",
        width:120,
        key:"service_type",
        option:{
          
          getters:'core/types'
        }
      },{
        type:"text",
        title:"项目名称",
        linkEvent:true,
        key:"name"
      },{
        type:"state",
        title:"项目状态",
        key:"state_type",
        width:120,
        option:{
          
          states:['准备中','进行中','已结束']
        }
      },{
        type:"user",
        title:"创建人",
        width:100,
        key:"created_by",
        width:150,
        option:{
          getters:'core/users'
        }
      },{
        type:'time',
        title:'创建时间',
        key:'created_at',
        width:120
      }],

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
				
      ],
      form:FormDef_ProjectCreate
      
      }
    
  },
  mounted(){
    this.$store.dispatch('project/getList')
  },
  computed:{
    ...mapGetters("project",{
      "projects":"list"}),
    filteredUsers(){
        if(this.currentDep)
            return this.users.find(v=>v.deps.include(this.currentDep))
        else
            return this.users
    }
  },
  methods:{
    /**
     * @method onTableEvent
     * @description handle table event stuff
     *              - select
     *              - open
     */
		onTableEvent(e) {
      if(!e)
        return

      if (e.type == "select") 
        this.selected = e.data;
      else if( e.type == "open" && e.data)
        this.RouteTo('/core/projects/'+e.data.id,true)
    },
    onToolEvent(e){
      console.log(e)
      if(e == 'add'){
        this.showModalCreate = true
        this.editingItem = {}
      }
    },
    toolEnabled() {
      // ADD,EDIT,DEL, RESET-PWD,CHANGE-PWD, LOCK,UNLOCK, IMPORT,BATCH, REFRESH
			return [1,1,1]
		},
    onEvent(e){

    },
    onFormEvent(e){

    },
    onPatch(item){
      this.$store.dispatch('project/patch',item).then(res=>{
        this.Success('项目创建成功')
        this.showModalCreate = false
      }).catch(e=>{
        this.Error('项目创建失败 ',e)
      })
    }, 
    onDelete(){

    }
  }
}
</script>

<style>

</style>