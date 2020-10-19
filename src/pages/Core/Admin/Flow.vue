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
      form: {
        def: {
            type: {
                label: "类型",
                editable: true,
                control: "select",
                option: {
                    options: ['企业管理', '人事管理', '项目管理']
                }
            },
            name: {
                label: "名称",
                editable: true,
                control: "input",
                option: {}
            },
            desc: {
                label: "描述",
                editable: true,
                control: "input",
                option: {
                   type:"textarea",
                   height:200
                }
            }
        },
        layout: `<div>
        <Row :gutter='10'>
        <Col span='8'>{{type}}</Col><Col span='16'>{{name}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{desc}}</Col>
        </Row></div>`,

        option: {}
    },
      columns:[{
            key: 'id',
            title: '序号',
            type: 'index',
            width: 60
        }, {
            key: 'type',
            title: '类型',
            type: 'type',
            width: 150,
            option: {
                base: 20000
            }

        }, {
            key: 'name',
            title: '名称',
            type: 'text',
            option: {
                align: "center"
            }
        }, {
            key: 'instanceCount',
            title: '实例数',
            type: 'text',
            width: 150,
            option:{
                align: "center",
                defaultValue: "0"
            }
        },{
            key:"local",
            title:"本地",
            type:"bool",
            width:80
        },{
            key: 'updator',
            title: '上传者',
            type: 'user',
            width: 150
        }, {
            key: 'updateTime',
            title: '上传时间',
            type: 'time',
            width: 150
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