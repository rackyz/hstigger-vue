<template>
	<div class="hs-conatiner" padding='0'>
    <!-- tool bar -->
		<hs-toolbar
			style="background: #fff;"
			:data="tools"
      :enabled="toolEnabled"
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
      
             <hs-table full	style="height:100%;width:100%;" :columns="columns" :data="items" :onEvent='onTableEvent' />
        
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
			@on-submit="Patch"
			@on-event="onEvent"
		/>
  
</div>
</template>

<script>
import { mapGetters } from "vuex";
import formDef from '@/forms/flow'
export default {
  data(){
    return {
      loading:false,
      editingItem:{},
      selected:null,
      showModalCreate:false,
      items:[],
      columns:[{
            key: 'id',
            title: '序号',
            type: 'index',
            width: 60
        }, {
            key: 'flow_type',
            title: '类型',
            type: 'state',
            width: 150,
            option: {
                base: 20000,
                states: ['企业管理', '人事管理', '项目管理']
            }

        }, {
            key: 'name',
            title: '名称',
            type: 'text',
            linkEvent:true,
            width:200
        },{
           key: 'desc',
            title: '描述',
            type: 'text',
        },{
          key: 'state',
            title: '状态',
            type: 'state',
            width: 150,
            option: {
                base: 20000,
                states: ['编辑中', '未启用', '已启用'],
                statesColor:['#aaa','darkred','darkgreen']
            }
        } ,{
            key: 'instanceCount',
            title: '实例数',
            type: 'text',
            width: 150,
            option:{
                align: "center",
                defaultValue: "0"
            }
        },{
            key: 'created_by',
            title: '上传者',
            type: 'user',
            width: 150,
            option:{
              getters:"core/users"
            }
        }, {
            key: 'created_at',
            title: '上传时间',
            type: 'time',
            width: 150
        }],
    form:formDef,
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
          key:"design",
          name:"设计",
          icon:"ios-brush"
        },
				{
					key: "delete",
					name: "删除",
					icon: "md-trash",
				},
				
			]}
  },
  mounted(){
    this.getData()
  },
  computed:{
    ...mapGetters("core", ["deps","users"]),
    filteredUsers(){
        if(this.currentDep)
            return this.users.find(v=>v.deps.include(this.currentDep))
        else
            return this.users
    },
    toolEnabled() {
      // ADD,EDIT,DEL, RESET-PWD,CHANGE-PWD, LOCK,UNLOCK, IMPORT,BATCH, REFRESH
      let isSelected = this.selected
			return [1,isSelected,isSelected,isSelected]
    },
    selectedItem(){
      return this.items.find(v=>v.id == this.selected)
    }
  },
  methods:{
     onToolEvent(e){
      if(e == 'add'){
        this.showModalCreate = true
        this.editingItem = {}
      }else if(e == 'edit'){
        if(this.selected){
          this.editingItem = this.selectedItem
          this.showModalCreate = true
        }
      }else if(e == 'design'){
         this.RouteTo('flow-design/'+this.selected)
      }else if(e == 'delete'){
        let id = this.selected
        if(this.selected.count > 0){
          this.Confirm('确定要删除该流程?',()=>{
            this.Del(id)
          })
        }else{
           this.Del(id)
        }
      }
    },
    Del(id){
      this.CORE.DEL_FLOW({param:{id}}).then(res=>{
        let index = this.items.findIndex(t=>t.id == id)
        this.items.splice(index,1)
        this.$forceUpdate()
        this.Success('删除成功')
      })
    },
    Patch(item){
      if(!item.id)
        this.CORE.CREATE_FLOW(item).then(res=>{
          let updateInfo = res.data.data
          item = Object.assign(item,updateInfo)
          this.items.splice(0,0,item)
           this.$forceUpdate()
          this.Success('创建成功')
          this.showModalCreate = false
        })
      else{
         this.CORE.UPDATE_FLOW(item,{param:{id:item.id}}).then(res=>{
          let updateInfo = res.data.data
          item = Object.assign(item,updateInfo)
          let index = this.items.find(v=>v.id == item.id)
          this.items.splice(index,1,item)
           this.$forceUpdate()
          this.Success('修改成功')
          this.showModalCreate = false
        })
      }
    },
    getData(){
      this.CORE.GET_FLOWS().then(res=>{
        let items = res.data.data
        console.log(items)
        this.items = items
      })
    },
    onTableEvent(e){
      console.log(e)
      if(e.type == 'select'){
        this.selected = e.data
      }else if(e.type == 'open'){
        this.RouteTo('/core/flows/'+e.data.id)
      }
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