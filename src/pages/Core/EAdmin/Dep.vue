<template>
	<div class="hs-conatiner" padding='0'>
    <!-- tool bar --> 
		<hs-toolbar
			style="background: #fff;"
			:data="tools"
      :disabled="toolDisabled"
			@event="onToolEvent"
		/>
    <div style="background:#fff;height:calc(100% - 110px);position:relative;">
      
        <div style='position:absolute;left:0;top:0;bottom:0;width:200px;border-right:1px solid #dfdfdf;padding:10px;'> 
          
        <hs-tree :data="FilteredDepsWithEmpty" style='overflow:hidden' @on-select="onSelectDep" :nodeRenderer="nodeRenderer" />
        </div>
        <div style='width:100%;height:100%;padding-left:200px;overflow-y:auto;padding-bottom:100px;'>
         
              <hs-list :data='filteredUsers' :option='{tmpl:"BaseUser"}' style='border:none;' />
        </div>
    </div>
  
    <hs-modal-form
			ref="form"
			:title="model && model.id ? '修改信息' : '新增部门'"
			v-model="modalPatch"
			:width="420"
			style="margin: 10px"
			footer-hide
			:form="Form('dep')"
			:data="model"
			editable
			@on-submit="patchDep"
			@on-event="handleEvent"
		/>
  
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      loading: false,
      modalPatch:false,
      model:{},
      currentDep: null,
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
    }
  },
  mounted(){
    this.$store.dispatch('entadmin/GetDeps')
  },
  computed:{
    ...mapGetters("entadmin",["deps","users"]),
    filteredUsers(){
        if(this.currentDep){
          if(this.currentDep.id)
              return this.users.find(v=>v.deps ? v.deps.include(this.currentDep.id) : false)
          else
              return this.users.find(v=>!v.deps || v.deps.length == 0)
        }
        else
            return this.users
    },
    FilteredDepsWithEmpty(){
      return [{name:"无部门",count:this.users.length}].concat(this.deps)
    },
    toolDisabled() {
      // ADD,EDIT,DEL, RESET-PWD,CHANGE-PWD, LOCK,UNLOCK, IMPORT,BATCH, REFRESH
      return {
        add:false,
        edit:this.currentDep == null || this.currentDep.id == null,
        delete:this.currentDep == null|| this.currentDep.id == null
      }
		},
  },
  methods:{
    nodeRenderer(h,node){
      let count = this.users.filter(v=>node.id ? (v.deps && v.deps.includes(node.id)) :(!v.deps || v.deps.length == 0)).length
      return h('span',node.name+(count?` (${count})`:""))
    },
    onSelectDep(e){
      this.currentDep = e
    },
    onToolEvent(e){
      if(e == 'add'){
        this.preCreateDep()
      }else if(e == 'edit'){
        this.model = this.currentDep
        this.modalPatch = true
      }else if(e == 'delete'){
        this.onPreDelete(this.currentDep)
      }
    },
    
    onEvent(e){

    },
    preCreateDep(){
      this.model = {}
      this.modalPatch = true
    },
    patchDep(e){
      this.$store.dispatch('entadmin/PatchDep',e).then(res=>{
        this.Success(e.id?"修改成功":'创建成功')
        this.modalPatch = false
      }).catch(e=>{
        this.Error('操作失败:'+e)
      })
    },
    onPreDelete(dep){
      this.Confirm(`确定删除部门<span style="color:red;margin:0 1px;">${dep.name}</span>及其所有子部门?`,()=>{
        this.$store.dispatch('entadmin/RemoveDep',dep.id).then(res=>{
          this.Success('删除成功')
        }).catch(e=>{
          this.Error("操作失败:"+e)
        })
      })
      
    }
  }
}
</script>

<style>

</style>