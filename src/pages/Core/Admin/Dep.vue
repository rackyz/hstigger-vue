<template>
	<div class="hs-conatiner">
		<div class="hs-caption"><Icon custom="gzicon gzi-dep" /> 部门管理</div>
    <!-- tool bar -->
		<hs-toolbar
			style="background: #fff;"
			:data="dep_tools"
			@event="onToolEvent"
			:enabled="toolEnabled"
		/>
        <div style="background:#fff;height:calc(100% - 68px);position:relative;">
            <div style='position:absolute;left:0;top:0;bottom:0;width:200px;border-right:1px solid #dfdfdf;padding:10px;'>
            <hs-tree :data="hs.makeTree(deps)" style='overflow:hidden' />
            </div>
            <div style='width:100%;height:100%;padding-left:200px;'>
                 <hs-list :data='filteredUsers' :option='{tmpl:"BaseUser"}' style='border:none;' />
            </div>
        </div>
  
  
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      loading:false,
      currentDep:null,
      dep_tools:[
      {
          key:'add',
          name:'新增',
          icon:'md-add'
      },{
          key:'delete',
          name:'删除',
          icon:"md-trash"
      }],
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

    },
    toolEnabled() {
      // ADD,EDIT,DEL, RESET-PWD,CHANGE-PWD, LOCK,UNLOCK, IMPORT,BATCH, REFRESH
			if (this.multiple) {
				if (this.selected && this.selected.length > 0) {
					return [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1];
				} else {
					return [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1];
				}
			} else {
        if (this.selected){
          let state = this.users.find(v=>v.id == this.selected).state
					return [
						1,
						1,
						1,
						1,
						1,
						state == 0,
						state == 1,
						1,
						1,
						1,
          ];
        }
				else return [1, 0, 0, 0, 0, 0, 0, 1, 1, 1];
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