<template>
	<div class="hs-conatiner hs-conatiner-scrollable" >
	
    <!-- tool bar -->
		<hs-toolbar
			style="background: #fff"
			:data="tools"
      :disabled="toolDisabled"
			@event="onToolEvent"
		/>
	
    <!-- filters -->
		<div class="filter-wrap" style="padding: 5px" @click="selected = null">
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
		
		</div>
    <!-- table -->
		<div
			style="
				height: calc(100% - 160px);
				overflow: hidden;
				background: #ddd;
				position: relative;
			"
		>
			<hs-table
        ref='table'
				style="height:100%;width:100%;"
				:columns="columns"
				:data="filterdData"
				:paged="false"
				selectable="single"
				:selection="selected"
				full
				@event="onTableEvent"
			>
			</hs-table>
    
		</div>
		
    <!-- paging -->
		<div
			style="
				height: 50px;
				background: #fff;
				display: flex;
				justify-content: center;
				border-top: 1px solid #dfdfdf;
				align-items: center;
			"
		>
			<Page
				:total="filterdData.length"
				size="small"
				:page-size="100"
				:page-size-opts="[20, 50, 100]"
				show-elevator
				show-sizer
				show-total
			/>
		</div>

	
    <!-- modal for create/edit user data -->
		<hs-modal-form
			ref="form"
			:title="current && current.id ? '修改信息' : '新增企业'"
			v-model="showModal"
			:width="420"
			style="margin: 10px"
			footer-hide
			:form="form"
			:data="current"
			editable
			@on-submit="patch"
			@on-event="handleEvent"
		/>
  
		
	</div>
</template>

<script>
import { mapGetters } from "vuex";
const DEFAULT_ENT_AVATAR = "https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/spring.png"
export default {
	data() {
		return {
			selected: null,
			loading: false,
			importData: [],
			searchText: null,
			showModal: false,
			columns: [
        { type: "index", title: "序号" },
        	
				{ type: "text", key: "user",width: 250,  minWidth: 250, title: "应用名称",
				render(h,param){
					let avatar = h('Icon',{props:{size:40,name:param.row.user,avatar:param.row.avatar || DEFAULT_ENT_AVATAR,frame:3}})
					let name = h('a',{attrs:{href:"/core/users/"+param.row.id},style:{marginLeft:"10px",fontSize:"14px"}},param.row.name)
					return h('div',{class:'flex-wrap',style:{marginLeft:"8px",marginTop:"10px",marginBottom:"10px"}},[avatar,name])
        }},
         { type: "text", key: "database", title: "简介",option:{align:"center"} },
          	{
					type: "type",
					title: "状态",
					key: "state",
					width: 120,
					option: { getters:'core/getTypes',getters_key:"EntStateType",
							labelKey:"value"},
				},
				{ key: "owner_id", width: 150, title: "管理账号",
			    render:(h,param)=>{
						let users = this.$store.getters["core/users"]
						let user = users.find(v=>v.id == param.row.owner_id)
						if(!user)
							return h("-")
						else{
							return h("div",{class:"flex-wrap",style:{marginLeft:"20px;"}},[h("hs-avatar",{props:{userinfo:user,size:30}}),h("span",{style:{marginLeft:"10px",fontSize:"16px"}},user.user)])
						}
						
					}},

				{ type: "text", key: "memberCount", width: 150, title: "收藏数",option:{align:"center"} },
        
         { type: "text", key: "storageCount", width: 250, title: "路径地址",option:{align:"center"} },
         
        { type: "text", key: "moduleCount", width: 150, title: "权限",option:{align:"center"} },

			{ key: "created_at", type: "time",title: "添加时间",width:100,option:{
           type:'date'
         } },
			
       
        
			],

			current: {},
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
					key: "lock",
					name: "禁用",
					icon: "md-lock",
				},
				{
					key: "unlock",
					name: "启用",
					icon: "md-unlock",
				},
			
				{
					key: "refresh",
					name: "刷新",
					icon: "md-refresh",
				},
			],
		};
	},
	mounted() {
    this.getData();
    this.$nextTick(()=>{
      this.$refs.table.calcTableHeight()
    })
    
	},
	computed: {
    ...mapGetters('core',['getType','users']),
    ...mapGetters('admin',['enterprises']),
		toolDisabled() {
        return {}
		},
		form() {
			return {
				def: {
          avatar:{
						control:'avatar',
						uploader:'core/upload'
          },
					name: {
						label: "企业全称",
            control: "input",
						option: {
							required: true,
						},
					},
					shortname: {
						label: "短名称",
						control: "input",
						option: {
							required: true,
						},
					},
					owner_id:{
						label:"管理账号",
						control:"select",
						option:{
							getters:"core/users",
							labelKey:"user",
							idKey:"id"
						}
					}
				},
				layout: `<div style='padding-left:90px;position:relative;'>
				<div style='position:absolute;left:0px;top:0px;width:80px;height:80px;'>{{avatar}}</div>
        <Row :gutter='10'>
        <Col span='24'>{{name}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{shortname}}</Col>
        </Row><Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{owner_id}}</Col>
        </Row></div>`,

				option: {
					hideReset:true
				},
			};
    },
    /**
     * @computed filteredUsers
     * @description find users after many filters
     */
		filterdData() {
			return (
				this.enterprises.filter((v) => {
					if (
						this.searchText &&
						(!v.name || !v.name.includes(this.searchText.trim())) &&
						(!v.user || !v.user.includes(this.searchText.trim()))
					)
						return false;


					return true;
				}) || []
			);
    },
   
    selectedItem(){
      if(Array.isArray(this.selected)){
        return this.selected.map(id=>this.enterprises.find(v=>v.id == id)).filter(v=>v)
      }else{
        return this.enterprises.find(v=>v.id == this.selected)
      }
    }
	},
	methods: {
  
		onSelectAll() {
			this.selected = this.filterdAccounts.map((v) => v.id);
    },
   
		onTableEvent(e) {
      if(!e)
        return

      if (e.type == "select") 
        this.selected = e.data;
      else if( e.type == "open" && e.data)
        this.RouteTo('/core/users/'+e.data.id,true)
    },
    handleEvent(){

    },
		getData() {
			this.loading = true;
			this.$store.dispatch('admin/GetEnterprises').finally(()=>{
					this.loading = false;
			})
    },
    /** @method onToolEvent
     *  @description handle toolbar event
     */
		onToolEvent(e) {
      if(e == 'add'){
				this.current = {}
        this.showModal = true
      }else if( e == 'edit'){
				this.current = this.selectedItem
				this.showModal = true
			}else  if(e == 'delete'){
				this.del(this.selected)
			}else if(e == 'refresh'){
				this.getData()
			}else if(e == 'lock'){
				this.lock()
			}else if(e == 'unlock'){
				this.unlock()
			}
		},

		del(id){
			let ent = this.enterprises.find(v=>v.id == id)
			if(!ent)	
				return
			this.Confirm(`将要删除企业<img src='${ent.avatar || DEFAULT_ENT_AVATAR}' style="margin-left:5px;margin-right:2px;width:25px;height:25px;border-radius:5px;border:2px solid #666;" /><span style="color:red;font-weight:bold">${ent.name}</span><br />删除该企业会导致<span style="color:red;font-weight:bold">企业所有数据被删除</span>，是否继续?`,()=>{
				this.$store.dispatch("admin/DeleteEnterprise",id).then((res=>{
						this.Success("删除成功")
				})).catch(this.Error)
			})
			
		},
		lock(id){
			this.$store.dispatch("admin/LockEnterprise",id).then(res=>{
				this.Success("锁定成功")
			}).catch(this.Error)
		},
		unlock(id){
			this.$store.dispatch("admin/UnlockEnterprise",id).then(res=>{
				this.Success("解锁成功")
			}).catch(this.Error)
		},
		patch(item) {
			console.log("patch:", item);
			var that = this;
			if (this.current && this.current.id) {
				item.id = this.current.id;
			}
			this.$store
				.dispatch("admin/PatchEnterprise", item)
				.then((res) => {
					that.Success(item.id ? "修改成功" : "新增成功");
					that.showModal = false;
					that.current = {};
				})
				.catch((e) => {
					if (typeof e == "string" && e.includes("{")) {
						e = JSON.parse(e);
						if (e.key) {
							that.$refs.form.setError(e.key, e.error);
							return;
						}
					}
					that.Error(e);
				});
		},
	},
};
</script>

<style lang="less" scoped>


.tmpl-link{
  position: absolute;
  right: 35px;
  top: 90px;
  font-size: 14px;
  color: #1fa8f7;
}
.description {
	display: flex;

	align-items: center;
}
.state-mark {
	width: 9px;
	height: 9px;
	margin-right: 5px;
}

.filter-wrap {
	background: #fff;
}

.list-item {
	padding: 15px !important;
}

.list-item:hover {
	background: linear-gradient(to right, #fff, #ffe);
}
</style>