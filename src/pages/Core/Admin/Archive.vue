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
      
             <hs-table :columns="columns" :data="projects" :onEvent='onTableEvent' />
        
    </div>
  <hs-modal-form
			ref="form"
			:title="editingItem && editingItem.id ? '修改' : '新增'"
			v-model="showModalCreate"
			:width="800"
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
      loading:false,
      showModalCreate:false,
      editingItem:{},
      currentDep:null,
      form:{
        layout: `<div><Row :gutter='10'>
                <Col :span='8'>{{code}}</Col>
                <Col :span='16'>{{name}}</Col>
                </Row>
                <Row :gutter='10' style='margin-top:10px'>
                <Col :span='7'>{{date}}</Col>
                <Col :span='10'>{{type}}</Col>
                <Col :span='7'>{{type2}}</Col>
                </Row>
                <Row :gutter='10' style='margin-top:10px'>
                <Col :span='24'>{{note}}</Col>
                </Row>
                <Row :gutter='10' style='margin-top:10px'>
                <Col :span='24' style='height:200px' >{{files}}</Col></Row></div>`,
        def: {
            code: {
                label: "档案编号",
                control: 'input',
                option: {
                    required: true
                }
            },
            name: {
                label: "档案名称",
                control: 'input',

                option: {
                    required: true
                }
            },
            date: {
                label: "档案日期",
                control: "select",
                option: {

                    type: 'date'
                }
            },
            type: {
                label: "档案分类",
                control: 'select',
                option: {
                    required: true,
                    getters: "kernel/types",
                    key: "archive_type"
                }
            },
            type2: {
                label: "档案类型",
                control: 'select',
                option: {
                    required: true,
                    getters: "kernel/types",
                    key: "archive_type2"
                }
            },
            note: {
                label: "备注",
                control: 'input',
                option: {
                    type: "textarea",
                    height: 100
                }
            },
            files: {
                label: "附件",
                control: "files",
                option: {
                    required: true,
                    list: true
                }
            }
        },
        option: {
            editable: true
        }
      },
      columns:[{
        type:"index",
        title:"序号",
        key:"id"
      },{
        type:"type",
        title:"项目类型",
        width:120,
        key:"type"
      },{
        type:"text",
        title:"项目名称",
        key:"name"
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
				
			]}
  },
  mounted(){
    
  },
  computed:{
    ...mapGetters("core", ["deps"]),
    ...mapGetters("admin", ["users"]),
    filteredUsers(){
        if(this.currentDep)
            return this.users.find(v=>v.deps.include(this.currentDep))
        else
            return this.users
    }
  },
  methods:{
    onToolEvent(e){
      if(e == 'add'){
        this.showModalCreate =  true
        this.editingItem = {}
      }
    },
    toolEnabled() {
      // ADD,EDIT,DEL, RESET-PWD,CHANGE-PWD, LOCK,UNLOCK, IMPORT,BATCH, REFRESH
			return [1,1,1]
		},
    onEvent(e){

    },
    onDelete(){

    }
  }
}
</script>

<style>

</style>