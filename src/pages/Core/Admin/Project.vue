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
    
             <hs-table :columns="columns" :data="projects" :onEvent='onEvent' />
       
    </div>
  

  <hs-modal-form
			ref="form"
			:title="editingItem && editingItem.id ? '修改' : '新增'"
			v-model="showModalCreate"
			:width="500"
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
        type:"type",
        title:"项目类型",
        width:120,
        key:"project_type",
        option:{
          
          getters:'core/types'
        }
      },{
        type:"text",
        title:"项目名称",
        key:"name"
      },{
        type:"type",
        title:"项目状态",
        key:"state_type",
        option:{
          
          options:['准备中','进行中','已结束']
        }
      },{
        type:"user",
        title:"创建人",
        width:100,
        key:"created_by"
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
      form:{
        title: '项目基本情况',
        layout: "<div style='position:relative;'><Row :gutter='10'><Col :span='18'><Row :gutter='10'><Col :span='12'>{{code}}</Col><Col :span='12'>{{project_type}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='24'>{{name}}</Col></Row></Col><Col :span='6'>{{avatar}}</Col></Row></div>",
        def: {
            code: {
                label: "项目编号",
                control: 'input',
                option: {
                    required: true
                }
            },
            name: {
                label: "项目名称",
                control: 'input',

                option: {
                    required: true
                }
            },
            project_type: {
                label: "建筑类型",
                control: 'select',
                option: {
                    getters: 'core/getTypes',
                    key:"project_type",
                    required:true
                }
            },
            avatar:{
              label:"封面图片",
              control:"image"
            }
        },
        option: {
            editable: true
        }
    }}
    
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