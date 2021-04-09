<template>
	<div class="hs-conatiner" padding='0'>
    <!-- tool bar --> 
    <Spin fix v-if='loading'>
			 <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
		</Spin>
		<hs-toolbar
			style="background: #fff;"
			:data="tools"
      :disabled="toolDisabled"
			@event="onToolEvent"
		/>
    <div style="background:#fff;height:calc(100% - 110px);position:relative;">
     
        <div style='position:absolute;left:0;top:0;bottom:0;width:240px;border-right:1px solid #dfdfdf;padding:10px;'> 
           
        <hs-tree :data="FilteredDepsWithEmpty" style='overflow:hidden;width:220px;' @on-select="onSelectDep" :nodeRenderer="nodeRenderer" />
        </div>
        <div style='width:100%;height:100%;padding-left:240px;overflow-y:auto;padding-bottom:100px;'>
          <Input search style="width:300px;margin:10px;margin-bottom:0;" v-model="filter_text" placeholder="查询姓名" clearable />
              <hs-list :data='filteredUsers' selectable="multiple" :option='{tmpl:"BaseUser"}' style='border:none;' />
        </div>
    </div>
  
    <hs-modal-form
			ref="form"
			:title="model && model.id ? '修改信息' : (model.parent_id?'新增子部门':'新增部门')"
			v-model="modalPatch"
			:width="420"
			style="margin: 10px"
			footer-hide
			:form="Form('dep')"
      :initData="initdata"
			:data="model"
			editable
			@on-submit="patchDep"
			@on-event="handleEvent"
		/>
  
    
     <Modal v-model="showUserConfig" :title="`分配角色 - ${currentDep?currentDep.name:''}`" width="470" footer-hide>
          <Transfer
          style="margin:20px;"
        :data="tranferDataUsers"
        :target-keys="depUsers"
        :titles="['用户列表','已分配']"
        filterable
        :filter-method="filterMethod"
        @on-change="handleChange2"></Transfer>
        <div class="flex-wrap" style="justify-content:flex-end;padding:20px;padding-top:5px;">
             <Button @click="SaveUser">保存</Button>
        </div>
       
     </Modal>


</div>


</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      showUserConfig:false,
      loading: false,
      modalPatch:false,
      depUsers:[],
      filter_text:'',
      model:{},
      currentDep: null,
      tools: [
				{
					key: "add",
					name: "新增",
					icon: "md-add",
        },
        {
					key: "addsub",
					name: "新增子部门",
					icon: "md-add",
        },
        {
					key: "moduser",
					name: "调整人员",
					icon: "md-person",
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
    }
  },
  mounted(){
    this.$store.dispatch('entadmin/GetDeps')
  },
  computed:{
    ...mapGetters("entadmin",["deps","users"]),
    filteredUsers(){
        let filtered = this.users
        if(this.currentDep && this.currentDep.id != 1){
              filtered = filtered.filter(v=>Array.isArray(v.deps) ? v.deps.includes(this.currentDep.id) : false)
        }

        if(this.filter_text){
          filtered = filtered.filter(v=>v.name.includes(this.filter_text))
        }
        return filtered
    },
    FilteredDepsWithEmpty(){
      return [{id:1,name:"全部",count:this.users.length}].concat(this.deps.map(v=>{
        return {
          id:v.id,
          name:v.name,
          parent_id:v.parent_id
        }
      }))
    },
    toolDisabled() {
      // ADD,EDIT,DEL, RESET-PWD,CHANGE-PWD, LOCK,UNLOCK, IMPORT,BATCH, REFRESH
      return {
        add:false,
        edit:this.currentDep == null || this.currentDep.id == null,
        delete:this.currentDep == null|| this.currentDep.id == null,
        addsub:this.currentDep == null|| this.currentDep.id == null,
        moduser:this.currentDep == null|| this.currentDep.id == null
      }
    },
    tranferDataUsers(){
        return this.users.map(v=>{
                return {
                    key:v.id,
                    label:v.name
                }
            })
    },
  },
  methods:{
      handleChange2 (users) {
                this.depUsers = users;
      },
      filterMethod (data, query) {
          return data.label.indexOf(query) > -1;
      },
    nodeRenderer(h,node){
      let count = this.users.filter(v=>node.id ? (v.deps && v.deps.includes(node.id)) :(!v.deps || v.deps.length == 0)).length
      return h('span',node.name+(count?` (${count})`:""))
    },
    onSelectDep(e){
      console.log('on-select:',e)
      this.currentDep = e
    },
    onToolEvent(e){
      if(e == 'add'){
        this.preCreateDep()
      }else if(e == 'addsub'){
        this.preCreateDep(this.currentDep.id)
      }else if(e == 'edit'){
        this.model = this.currentDep
        this.modalPatch = true
      }else if(e == 'delete'){
        this.onPreDelete(this.currentDep)
      }else if(e== 'moduser'){
        this.depUsers = this.users.filter(v=>Array.isArray(v.deps)?v.deps.includes(this.currentDep.id):false).map(v=>v.id)
        this.showUserConfig = true
      }
    },
    
    onEvent(e){

    },
    preCreateDep(parent_id){
      this.model = {parent_id}
      this.modalPatch = true
    },
    patchDep(e){
      if(this.model && this.model.parent_id)
        e.parent_id = this.model.parent_id
       this.loading = true
      this.$store.dispatch('entadmin/PatchDep',e).then(res=>{
        this.Success(e.id?"修改成功":'创建成功')
        this.modalPatch = false
      }).catch(e=>{
        this.Error('操作失败:'+e)
      }).finally(e=>{
         this.loading = false
      })
    },
    onPreDelete(dep){
      this.Confirm(`确定删除部门<span style="color:red;margin:0 1px;">${dep.name}</span>及其所有子部门?`,()=>{
        this.loading = true
        this.$store.dispatch('entadmin/RemoveDep',dep.id).then(res=>{
          this.Success('删除成功')
        }).catch(e=>{
          this.Error("操作失败:"+e)
        }).finally(e=>{
          this.loading = false
        })
      })
      
    }
  }
}
</script>

<style>

</style>