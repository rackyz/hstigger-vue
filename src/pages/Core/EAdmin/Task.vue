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
      editingItem:{},
      showModalCreate:false,
      currentDep:null,
      columns:[{
        type:"index",
        title:"序号",
        key:"id"
      },{
        type:"type",
        title:"任务类型",
        width:120,
        key:"type"
      },{
        type:"text",
        title:"任务名称",
        key:"name"
      },{
        type:"user",
        title:"负责人",
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
				
      ],form:{
      layout: `<div>
        <Row :gutter='10'>
        <Col span='24'>{{title}}</Col>
        </Row><Row :gutter='10'  style='margin-top:10px;'>
        <Col span='8'>{{stype}}</Col><Col span='8'>{{type_id}}</Col><Col span='8'>{{charger}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'>
        <Col span='12'>{{project}}</Col> <Col span='12'>{{dep}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'>
        <Col span='12'>{{startTime}}</Col><Col span='12'>{{deadline}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'>
        <Col>{{content}}</Col>
        </Row> <Row :gutter='10' style='margin-top:10px;'>
        <Col>{{files}}</Col>
        </Row></div>`,

    def: {
        title: {
            label: "标题",
            editable: true,
            control: "input",

            option: {
                required: true
            }
        },
        stype: {
            label: "工作类型",
            editable: true,
            control: "select",
            option: {
                getters: 'kernel/worktypes',
                required: true
            }
        },
        type_id: {
            label: "工作分类",
            editable: true,
            control: "select",
            option: {
                getters: 'kernel/types',

                key: 'task_type',
                required: true
            }
        },
        project: {
            label: "项目",
            editable: true,
            control: "select",
            option: {
                getters: 'project/list',
                multiple: true
            }
        },
        dep: {
            label: "部门",
            editable: true,
            control: "select",
            option: {
                getters: 'kernel/groups',
                multiple: true
            }
        },
        projectMul: {
            label: "克隆",
            editable: true,
            control: "bool"
        },
        charger: {
            label: "负责人",
            editable: true,
            control: "select",
            option: {
                getters: 'kernel/userAsOptions',
                required: true
            }
        },
        startTime: {
            label: '开始日期',
            control: 'select',
            option:{
              type:"date"
            }
        },
        deadline: {
            label: '结束日期',
             control: 'select',
            option:{
              type:"date"
            }
        },
        content: {
            label: "内容描述",
            editable: true,
            control: "input",
            option: {
                type: 'md',
                height: 300
            }
        },
        files: {
            label: "附件",
            control: "files",
            option: {
                type: 'list'
            }
        }


    }
      }
      
      }
      
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
    onDelete(){

    }
  }
}
</script>

<style>

</style>