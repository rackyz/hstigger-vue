<style lang="less">
.ivu-table-row-highlight{
	border:none !important;
	filter:1px solid #2ba7ff;
}
</style>
<template>
	<div class="hs-conatiner hs-conatiner-scrollable" style='background:#aaa;'>
    <!-- tool bar -->
		<hs-toolbar
			style="background: #fff"
			:data="tools"
			@event="onToolEvent"
			:disabled="toolDisabled"
		/>
    <!-- filters -->
	
		<div class="filter-wrap" style="padding: 5px">
			<Button
				style="margin-right: 5px"
				:type="multiple?'error':''"
				@click="multiple=!multiple"
				>{{multiple?"取消多选":"多选"}}</Button
			>
			<ButtonGroup style="margin-right: 5px" v-if="multiple"
				><Button @click="onSelectAll">全选</Button
				><Button @click="selected = []">清空</Button></ButtonGroup
			>
			
			<Input v-model="searchText" search style="width: 200px" clearable />
			<Select clearable v-model='dep' style='width:120px;margin-left:5px;' placeholder="- 部门 -">
				<template v-for="t in deps">
					<Option :value='t.value' :key='t.value' :label="t.name">
						<span :style='`color:${t.color}`'>{{t.name}}</span>
					</Option>
				</template>
			</Select>
			<Select clearable v-model='role' style='width:120px;margin-left:5px;' placeholder="- 职务 -">
				<template v-for="t in roles">
					<Option :value='t.value' :key='t.value' :label="t.name">
						<span :style='`color:${t.color}`'>{{t.name}}</span>
					</Option>
				</template>
			</Select>
			<Select clearable v-model='gender' style='width:120px;margin-left:5px;' placeholder="- 性别 -">
				<template v-for="(t,i) in ['男','女']">
					<Option :value='i' :key='i' :label="t">
						<span :style='``'>{{t}}</span>
					</Option>
				</template>
			</Select>
			<Select clearable v-model='changed' style='width:120px;margin-left:5px;' placeholder="- 密码安全 -">
					<Option :value='0' style='color:red' >
						未修改
					</Option>
						<Option :value='1' style='color:green'>
						正常
					</Option>
			</Select>
			
		</div>
    <!-- table -->
	 <Tabs size="small" type="card" :animated="false" :value="tabIndex" style='height:calc(100% - 110px);width:100%;margin:5px 0;' class="fix-height-tabs">
    <TabPane label="员工列表" name="list">
			<div
				style="
					height: calc(100% - 80px);
					width:100%;
					overflow: hidden;
					background: #ddd;
					position: relative;
				"
			>
				<hs-table
					ref='itable'
					:columns="columns"
					:data="filteredAccounts"
					:loading="loading"
					:paged="false"
					:page="page"
					:pageSize="pageSize"
					:selectable="multiple ? 'multiple' : 'single'"
					:selection="selected"
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
				:total="filteredAccounts.length"
				size="small"
				:current="page"
				:page-size="pageSize"
				:page-size-opts="[20, 50, 100]"
				show-elevator
				show-sizer
				show-total
				@on-change="page=$event"
				@on-page-size-change="pageSize=$event"
			/>
		</div>
    </TabPane>
		<!-- <TabPane label="申请记录" name="request">
		</TabPane>
			<TabPane label="邀请记录" name="invited">
		</TabPane> -->
	 </Tabs>
    <!-- modal for create/edit user data -->
		<hs-modal-form
			ref="form"
			:title="current && current.id ? '修改信息' : '新增员工'"
			v-model="showModal"
			:width="820"
			style="margin: 10px"
			footer-hide
			:form="Form('employee')"
			:data="current"
			editable
			@on-submit="patchUser"
			@on-event="handleEvent"
		/>
  

		<!-- modal for importing -->
		<Modal
			v-model="modalImporting"
			width="600"
			transfer
			:z-index="10"
			:footer-hide="importState != 3"
		>
			<p slot="header" style="color: #f60; text-align: center">
				<Icon type="ios-information-circle"></Icon>
				<span>导入数据</span>
			</p>
			<div style="text-align: center; font-size: 0.85rem">
				<p
					style="
						color: #333;
						margin-bottom: 0.25rem;
						font-size: 14px;
						text-align: left;
						padding: 5px 30px;
						padding-top: 15px;
					"
				>
					{{ importStateStr }}
				</p>
				<div
					style="
						text-align: left;
						padding: 10px;
						font-size: 12px;
						max-height: 300px;
						overflow-y: auto;
						background: #fff;
						padding: 10px;
						margin: 10px 30px;
					"
				>
					<p v-for="(u, i) in importData" :key="u.name">
						[{{ i + 1 }}] {{ u.user }} / {{ u.name }}
						<template v-if="u.state == undefined">
							<span
								style="float: right"
								:style="`color:${TestImportState(u) ? 'red' : 'green'}`"
								>{{ TestImportState(u) ? TestImportState(u) : "可导入" }}</span
							>
						</template>
						<template v-else>
							<span
								style="float: right"
								:style="`color:${u.state ? 'red' : 'blue'}`"
								>{{ u.state ? "创建失败" : "创建成功" }}</span
							>
						</template>
					</p>
				</div>
				<Button
					style="height: 40px; margin: 10px; width: 90%"
					@click="importAllAccounts"
					v-if="importState == 2 && importData && importData.length"
					:disabled="!importableAccounts || importableAccounts.length == 0"
					:loading="loadingImport"
					>导入账号({{importableAccounts? importableAccounts.length:0 }})</Button
				>
			</div>

      <!-- file loader hiding stuff -->
			<input
				ref="fileLoader"
				v-show="false"
				type="file"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,*.csv"
				@change="parse"
			/>
		</Modal>

		<Modal v-model="showModalDep" :title="`部门调整 ${current?' — '+current.name:''}`" footer-hide width="300">
			<BaseTreeSelector :data="$store.getters['entadmin/deps']" v-model="current_deps" />
			<div class="flex-wrap flex-between" style="padding:10px 20%"> 
				<Button type='primary' @click="handleSubmitDeps">保存</Button>
				<Button @click="showModalDep=false">取消</Button>
			</div>
		</Modal>

			<Modal v-model="showModalRole" :title="`角色调整 ${current?' — '+current.name:''}`" footer-hide width="300">
			<BaseTreeSelector :data="$store.getters['entadmin/roles']" v-model="current_roles" />
			<div class="flex-wrap flex-between" style="padding:10px 20%"> 
				<Button type='primary' @click="handleSubmitRoles">保存</Button>
				<Button @click="showModalRole=false">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			page:1,
			pageSize:100,
			tabIndex:'list',
			current_deps:[],
			current_roles:[],
			type:undefined,
			changed:undefined,
			loadingImport: false,
			showModalDep:false,
			showModalRole:false,
			selected: null,
			loading: false,
			hidingLocked: false,
			importData: [],
			searchText: null,
			showUnsafe: false,
			multiple: false,
			showModal: false,
			showModalPassword: false,
			modalImporting: false,
			importStateStr: "",
			importState: 0,
			importStates: [],
			columns: [
        { type: "index", title: "序号" },
        	
			
					{ type: "text", key: "user", width: 100, title: "用户",
				render(h,param){
					let avatar = h('hs-avatar',{props:{size:25,name:param.row.user,avatar:param.row.avatar || "https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/icon/guest.png",frame:param.row.frame}})
					let name = h('a',{attrs:{href:"/core/users/"+param.row.id,target:'blank'},style:{marginLeft:"10px",fontSize:"14px"}},param.row.name ?`${param.row.name}`:param.row.user)
					return h('div',{class:'flex-wrap',style:{marginLeft:"8px",marginTop:"10px",marginBottom:"10px"}},[avatar,name])
				}},
					{
					title:"性别",
					type:"type",
					key:"gender",
					option:{
						getters:"core/getTypes",
						getters_key:"Gender",
							labelKey:"value"
					}

				},
				{
					title:"部门",
					key:'deps',
					type:"text",
					render:(h,param)=>{
						let deps = param.row.deps || []
						let depsDom =  deps.map((d)=>{
							let dep = this.deps.find(v=>v.id == d)
							if(dep){
								return h('a',{href:'deps/'+dep.id,style:{
									marginRight:'2px'
								}},dep.name)
							}
							
						})

						return h('span',depsDom)
					}
				},
				{
					title:"职务",
					key:"roles",
					type:"text",
					render:(h,param)=>{
						let roles = param.row.roles || []
						let doms =  roles.map((d)=>{
							let role = this.roles.find(v=>v.id == d)
							if(role){
								return h('a',{href:'roles/'+role.id,style:{
									marginRight:'2px'
								}},role.name)
							}
							
						})

						return h('span',doms)
					}
				},
				{
					key:'employee_date',
					title:"入职时间",
					type:'time',
					option:{
						type:"date"
					}
				},
				{ type: "text", key: "phone", width: 150, title: "联系电话",option:{align:"center"} },
				 { key: "lastlogin_at", type: "time",title: "最近登录",width:100 },
         { key: "created_at", type: "time",title: "注册时间",width:100,option:{
           type:'date'
         } },
        	{
					type: "state",
					title: "密码安全",
					key: "changed",
					width: 100,
					option: { states: ["未修改","正常"],colors:['darkred','darkgreen'] },
				},

				{
					type: "state",
					title: "账号锁定",
					key: "locked",
					width: 120,
					option: { states: ["正常",'锁定'],colors:['green','#aaa'] },
				},
			
				 { key: "email", type: "text", title: "邮箱",width:250},
				{ key: "oauth", title: "第三方绑定",width:150,sortable:false,
					render:(h,param)=>{
					const  oauthItems =[{
							icon:'nbgz',
							title:"高专平台"
					},{
							icon:'qq',
							title:"QQ登录"
					},{
							icon:'wechat',
							title:"微信登录",
							size:19
					},{
							icon:'dingding-o',
							title:"钉钉登录"
					},{
							icon:'shouji',
							title:'手机扫码',
							size:16
					}]
					const keys=['zzl_id','qq','wechat_id','ding_id','phone']
					let icons = oauthItems.map((v,i)=>h('Icon',{props:{
						custom:`gzicon gzi-${v.icon}`,
						size:v.size,
						color:param.row[keys[i]]?"#409EFF":"#dfdfdf"
					},style:{marginRight:"6px"}}))

					return h('div',{style:{
						display:'flex',
						alignItems:'center',
						justifyContent:"center"
					}},icons)
				}},
         { type: "text", title: " "},
			],
			dep:null,
			role:null,
			gender:null,
			current: {},
			tools: [
				{
					key: "add",
					name: "新增",
					icon: "md-add",
				},
				// {
				// 	key: "addexist",
				// 	name: "邀请加入",
				// 	icon: "md-add",
				// },
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
					key: "resetpwd",
					name: "重置密码",
					icon: "md-key",
				},
				{
					key: "lock",
					name: "锁定",
					icon: "md-lock",
				},
				{
					key: "dep",
					name: "部门调整",
					custom: "organization",
				},
				{
					key: "role",
					name: "角色调整",
					custom: "quanxianliebiao",
				},
				{
					key: "unlock",
					name: "启用",
					icon: "md-unlock",
				},
				{
					key: "import",
					name: "导入",
					icon: "ios-folder-open",
				},
				{
					key: "import-tmpl",
					name: "下载模板",
					icon: "md-download",
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
		this.getData()
	},
	computed: {
		...mapGetters('core',['getTypes']),
		...mapGetters('entadmin',['users','deps','roles']),
		AccountTypes(){
			return this.getTypes('AccountType')
		},
		toolDisabled() {
			const baseConfig = {
				add:false,				// add
				edit:true,			// edit
				delete:true,			// del
				resetpwd:true,			// reset
				resetpwdto:true,			// changepwd
				lock:true,			// lock
				unlock:true,			// unlock
				import:true,			// import
				"import-tmpl":true,			// download
				dep:true,
				role:true
			}
			if (this.multiple) {
				if (this.selected && this.selected.length > 0) {
					baseConfig.delete = 0
					baseConfig.resetpwd = 0
					baseConfig.lock = 0
					baseConfig.unlock = 0
					baseConfig.role = baseConfig.dep = 0
				} 
			} else {
        if (this.selected ){
					 if(this.selected.includes('sys')){
						baseConfig.edit = 0
          }
					let selectedItem = this.users.find(v=>v.id == this.selected)
					let locked = selectedItem ? selectedItem.locked : 0
						baseConfig.edit = 0
					baseConfig.delete = 0
					baseConfig.resetpwd = 0
					baseConfig.resetpwdto = 0
					baseConfig.lock =  (locked == 1)
					baseConfig.unlock = (locked == 0)
						baseConfig.role = baseConfig.dep = 0
				}else {

				}

			}

			return baseConfig
		},
	
    /**
     * @computed filteredUsers
     * @description find users after many filters
     */
		filteredAccounts() {
			return (
				this.users ?
				(this.users.filter((v) => {
					if (
						this.searchText &&
						(!v.name || !v.name.includes(this.searchText.trim())) &&
						(!v.user || !v.user.includes(this.searchText.trim()))
					)
					return false;
					if (this.changed != undefined && v.changed != this.changed) return false;

					if (this.dep != undefined && !v.deps.includes(this.dep)) return false;

					if(this.role != undefined && !v.roles.includes(this.role)) return false

					if(this.gender != undefined && !v.gender != this.gender) return false

					return true;
				}) || []) : []
			);
    },
    /**
     * @computed importableUsers
     * @description find users which can be imported in user-data from file
     */
		importableAccounts() {
			return this.importData.filter((v) => !this.TestImportState(v));
    },
    selected_user(){
			if(!Array.isArray(this.users))
					return []
      if(Array.isArray(this.selected)){
        return this.selected.map(id=>this.users.find(v=>v.id == id)).filter(v=>v)
      }else{
				return this.users.find(v=>v.id == this.selected)
      }
    }
	},
	methods: {
		handleDepChanged(deps){
			this.showModalDep = true
		},
		handleSubmitDeps(){
			// patch user deps
			this.$store.dispatch('entadmin/PatchUserDeps',{id:this.current.id,deps:this.current_deps}).then(res=>{
				this.Success("部门修改成功")
				this.current_deps = []
				this.showModalDep = false
			}).catch(e=>{
				this.Error("修改失败:",e)
			})
			//this.showModalDep = false
			//this.current_deps = []
		},
		handleSubmitRoles(){
			// patch user deps
			this.$store.dispatch('entadmin/PatchUserRoles',{id:this.current.id,roles:this.current_roles}).then(res=>{
				this.Success("职务修改成功")
				this.current_roles = []
				this.showModalRole = false
			}).catch(e=>{
				this.Error("修改失败:",e)
			})
			//this.showModalDep = false
			//this.current_deps = []
		},
    /** 
     * @method onSelectAll
     * @description binding 'select all' button for select all current users
     */
		onSelectAll() {
			this.selected = this.filteredAccounts.map((v) => v.id);
    },
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
        this.selected = e.data
    },
    /**
     * @method importAllUsers
     * @description when users has been load from file, you can post them to server api for creating accounts
     */
		importAllUsers() {
			var that = this;
			this.loadingImport = true;
			let accounts = this.importData.filter((v) => !this.TestImportState(v));
			this.$store
				.dispatch("entadmin/CreateEmployee", accounts)
				.then((results) => {
					let succees = results.filter((v) => v == 0);
					let map = {};
					that.importStateStr = `导入完毕,成功导入${succees.length}个账户`;
					that.importStates = results;
					accounts.forEach((v, i) => {
						v.state = results[i].id ? 0 : 1;
					});
					that.importState = 3;
				})
				.catch((e) => {
					this.Error(e);
					this.modalImporting = false;
					this.getData();
				})
				.finally((e) => {
					this.loadingImport = false;
				});
		},
  	
    /** 
     * @method getData
     * @description our old friend get data from remote server
     */
		getData() {
			if(this.users.length > 0)
				return
			this.loading = true;
		
			this.$store.dispatch('entadmin/GetUsers').then(()=>{}).finally(e=>{
				this.loading = false
			})
    },
    /** @method onToolEvent
     *  @description handle toolbar event
     */
		onToolEvent(e) {
      var that = this;
			let selected_id = this.selected
			let selected = null
			if(selected_id){
			selected =
				(this.multiple
					? (selected_id
							.map((v) => this.users.find((item) => item.id == v))
							.filter((v) => v))
					: (this.users.find((v) => v.id == selected_id)))
			}
			if (e == "add") {
				this.current = {}
				this.showModal = true;
			} else if (e == "edit") {
				this.$store.dispatch('entadmin/GetUser',selected.id).then(user=>{
					this.current = user;
					user.id = selected.id
					this.showModal = true;
				})
			
			}else if(e == "dep"){
				this.current = selected;
				this.current_deps = selected.deps
				this.showModalDep = true
			}else if(e=="role"){
					this.current = selected;
					this.current_roles = selected.roles
				this.showModalRole = true
			}else if (e == "refresh") {
				this.getData();
			} else if (e == "lock") {
				this.$store.dispatch("entadmin/LockAccounts", selected_id).then(()=>{
					this.$refs.itable.$forceUpdate()
					this.Success("操作成功")
				}).catch(e=>{
					this.Error(e)
				});
			} else if (e == "unlock") {
				this.$store.dispatch("entadmin/UnlockAccounts", selected_id).then(()=>{
					this.Success("操作成功")
				}).catch(e=>{
					this.Error(e)
				});
			} else if (e == "resetpwd") {
				if (this.multiple) {
					this.Confirm(
						`确定要重置<span style="color:red">${selected
							.map(v => v.user)
							.join(",")}</span>等<span style="color:red">${selected.length}</span>名用户的密码?`,
						() => this.$store.dispatch("entadmin/ResetPassword", selected_id).then(res=>{
							this.Success("操作完成")
						}).catch(e=>{
							this.Error(e)
						})
					);
				} else {
					this.Confirm(
						`确定要重置用户<span style="color:red">${selected.user}</span>的密码?`,
						() =>
							this.$store.dispatch("entadmin/ResetPassword", [selected.id]).then(res=>{
							this.Success("操作完成")
						}).catch(e=>{
							this.Error(e)
						})
					);
				}
				this.$store.dispatch("entadmin/ResetPassword", { id: selected.id });
			} else if (e == "resetpwdto") {
				this.showModalPassword = true;
			} else if (e == "delete") {
				this.Confirm(
					this.multiple
						? `确定要删除<span style='color:red;margin:0 2px;font-weight:bold'>${selected
								.slice(0, 3)
								.map((v) => v.user)
								.join(", ")}</span>等${selected.length}个账号`
						: `确定要删除该用户<span style='color:red;margin:0 2px;font-weight:bold'>${selected.user}</span>?`,
					() => {
						if (this.multiple) {
							this.$store
								.dispatch(
									"entadmin/DeleteUsers",
									selected_id
								)
								.then((res) => {
									this.Success("删除成功");
								})
								.catch((e) => {
									this.Error(e);
								});
						} else {
							this.$store
								.dispatch("entadmin/DeleteUser", selected_id)
								.then((res) => {
									this.Success("删除成功");
								})
								.catch((e) => {
									this.Error(e);
								});
						}
					}
				);
			//} 
			// else if (e == "import") {
			// 	this.$refs.fileLoader.click();
			// } else if (e == "import-tmpl"){
			// 	this.Download("https://cdn-1301671707.cos.ap-nanjing.myqcloud.com/download/hs_user_template.xlsx")
			}else if (e == "multiple") {
				this.multiple = true;
				this.selected = [];
			} else if (e == "unmultiple") {
				this.multiple = false;
				this.selected = null;
			}
		},

		/** parse (file-object from input[type=file])
		 *  Parse imported XLSX file to userdata
		 */
		parse(file) {
			file = this.$refs.fileLoader.files[0];
			var that = this;
			// Open File Parsing Modal
			this.modalImporting = true;
			this.importStateStr = "正在分析文件... 请耐心等待";

			// Analysize file with file2Xce(HSUI UTIL METHOD)
			// Format the given data to valid form
			this.hs
				.file2Xce(file)
				.then((tabJson) => {
					if (tabJson && tabJson.length > 0) {
						that.importStateStr = "正在上传数据...";
						let accounts = tabJson[0].sheet.map((v) => ({
							name: v["姓名"],
							phone: v["电话"],
							password: v["密码"],
							user: v["电话"],
						}));
						that.importStateStr = `已从文件中提取${accounts.length}个账号`;
						that.importState = 2;
						that.importData = accounts;
					}
				})
				.finally((e) => {
					that.$refs.fileLoader.value = "";
				});
		},


		/** @method patchUser
		 *  @description Remote method, for patching user information
		 */
		patchUser(item) {
			var that = this;
			if (this.current && this.current.id) {
				item.id = this.current.id;
			}
			this.$store
				.dispatch("entadmin/PatchUser", item)
				.then((res) => {
					that.Success(item.id ? "修改成功" : "新增用户成功");
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
<style lang="less">
.fix-height-tabs{
	position: relative;
	width:100%;
	.ivu-tabs-content{
		position: relative;
		height:100%;
		width:100%;
		.ivu-tabs-tabpane{
		position: relative;
		width:100%;
		height:100%;
		overflow: hidden;
		}
	}
}
</style>
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