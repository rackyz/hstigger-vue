<template>
	<div class="hs-conatiner">
		<div class="hs-caption"><Icon type="md-person" /> 用户管理</div>
    <!-- tool bar -->
		<hs-toolbar
			style="background: #fff;"
			:data="tools"
			@event="onToolEvent"
			:enabled="toolEnabled"
		/>
		<a
			href="https://cdn-1301671707.cos.ap-nanjing.myqcloud.com/download/hs_user_template.xlsx"
			class='tmpl-link'
		>
			<Icon type="md-download" /> 下载导入用表格模板</a
		>
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
			<ButtonGroup style="margin-left: 5px"
				><Button
					:type="hidingLocked ? 'primary' : ''"
					@click="hidingLocked = !hidingLocked"
					>隐藏已禁用</Button
				>
			</ButtonGroup>
			<Button
				:type="showUnsafe ? 'primary' : ''"
				@click="showUnsafe = !showUnsafe"
				style="margin-left: 5px"
				>密码未修改
			</Button>
		</div>
    <!-- table -->
		<div
			style="
				height: calc(100% - 215px);
				overflow: hidden;
				background: #ddd;
				position: relative;
			"
		>
			<hs-table
        ref='table'
				style="height:100%;width:100%;"
				:columns="columns"
				:data="filterdUsers"
				:paged="false"
				:selectable="multiple ? 'multiple' : 'single'"
				:selection="selected"
				full
				:onEvent="onTableEvent"
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
				:total="filterdUsers.length"
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
			:title="current && current.id ? '修改信息' : '新增用户'"
			v-model="showModal"
			:width="420"
			style="margin: 10px"
			:form="user_form"
			:data="current"
			editable
			@on-submit="patchUser"
			@on-event="handleEvent"
		/>
    <!-- modal for changing user password -->
		<hs-modal-form
			ref="formpwd"
			:title="`修改密码${selected_user ? (':'+selected_user.name) : ''}`"
			v-model="showModalPassword"
			:width="320"
     
			style="margin: 10px"
			:form="user_password_form"
			:data="current"
			editable
			@on-submit="patchUserPassword"
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
					@click="importAllUsers"
					v-if="importState == 2 && importData && importData.length"
					:disabled="importableUsers.length == 0"
					:loading="loadingImport"
					>导入账号({{ importableUsers.length }})</Button
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
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			loadingImport: false,
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
        	{
					type: "user",
					key: "id",
					width: 110,
					title: "姓名",
					linkEvent: true,
					option: { align: "center",getters:"admin/users" },
				},
				{ type: "text", key: "user", width: 150, title: "用户名" },
			
				{ type: "text", key: "phone", width: 150, title: "联系电话" },
			
			
				{
					type: "list",
					title: "角色权限",
					key: "roles",
					width: 200,
					option: { getters:'core/roles' },
				},
				{
					type: "list",
					title: "所属部门",
					key: "deps",
					width: 200,
						option: { getters:'core/deps' },
        },
        { key: "wechat", type: "time", title: "微信绑定",width:80 },
         { key: "dingding", type: "time", title: "钉钉绑定",width:80  },
          { key: "qq", type: "time", title: "QQ绑定",width:80  },
        { key: "lastlogin_at", type: "time",title: "最近登录",width:100 },
         { key: "created_at", type: "time",title: "注册时间",option:{
           type:'date'
         } },
        	{
					type: "state",
					title: "密码安全",
					key: "passweak",
					width: 100,
					option: { states: ["安全","默认密码"],colors:['darkgreen','darkred'] },
				},

				{
					type: "state",
					title: "账号状态",
					key: "state",
					width: 120,
					option: { states: ["正常",'锁定','异常'],colors:['darkgreen','darkred','orange'] },
				},
        
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
					key: "resetpwd",
					name: "重置密码",
					icon: "md-key",
				},
				{
					key: "resetpwdto",
					name: "修改密码",
					icon: "ios-key",
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
					key: "import",
					name: "导入",
					icon: "ios-folder-open",
				},
				{
					key: "multiple",
					name: "批量操作",
					icon: "ios-people",
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
    this.$refs.table.calcTableHeight()
	},
	computed: {
		...mapGetters("core", ["deps", "roles"]),
		...mapGetters("admin", ["users"]),
		toolEnabled() {
      // ADD,EDIT,DEL, RESET-PWD,CHANGE-PWD, LOCK,UNLOCK, IMPORT,BATCH, REFRESH
			if (this.multiple) {
				if (this.selected && this.selected.length > 0) {
					return [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1];
				} else {
					return [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1];
				}
			} else {
        if (this.selected ){
          if(this.selected.includes('sys')){
            return [1, 1, 0, 0, 0, 0, 0, 1, 1, 1];
          }

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
		user_password_form() {
			return {
				layout:
					"<div><Row><Col :span='24'>{{password}}</Col></Row><Row style='margin-top:10px'><Col :span='24'>{{passwordAgain}}</Col></Row></div>",
				def: {
					password: {
						label: "输入密码",
						control: "input",
						option: {
							type: "password",
							require: true,
						},
					},
					passwordAgain: {
						label: "密码确认",
						control: "input",
						option: {
							type: "password",
							require: true,
						},
					},
				},
			};
		},
		user_form() {
			return {
				def: {
					user: {
						label: "登录名",
						editable: true,
						control: "input",
						option: {
							required: true,
							rules: [
								{
									type: "name",
								},
								{
									msg: "该名称已存在,请更换",
								},
							],
						},
					},
					name: {
						label: "姓名",
						editable: true,
						control: "input",
						option: {
							required: true,
						},
					},
					roles: {
						label: "角色",
						control: "select",
						option: {
							getters: "core/roles",
							multiple: true,
						},
					},
					avatar: {
						label: "头像",
						editable: true,
						control: "image",
					},
					deps: {
						label: "部门",
						control: "select",
						option: {
							getters: "core/deps",
							multiple: true,
						},
					},
					phone: {
						label: "电话",
						control: "input",
					},
				},
				layout: `<div>
        <Row :gutter='10'>
        <Col span='10'>{{user}}</Col><Col span='10'>{{name}}</Col><Col span='4'>{{avatar}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'><Col span='12'>{{phone}}</Col>
        </Row><Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{deps}}</Col>
        </Row><Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{roles}}</Col>
        </Row></div>`,

				option: {},
			};
    },
    /**
     * @computed filteredUsers
     * @description find users after many filters
     */
		filterdUsers() {
			return (
				this.users.filter((v) => {
					if (
						this.searchText &&
						(!v.name || !v.name.includes(this.searchText.trim())) &&
						(!v.user || !v.user.includes(this.searchText.trim()))
					)
						return false;

					if (this.showUnsafe && !v.passweak) return false;

					if (this.hidingLocked && v.state != 0) return false;

					return true;
				}) || []
			);
    },
    /**
     * @computed importableUsers
     * @description find users which can be imported in user-data from file
     */
		importableUsers() {
			return this.importData.filter((v) => !this.TestImportState(v));
    },
    selected_user(){
      if(Array.isArray(this.selected)){
        return this.selected.map(id=>this.users.find(v=>v.id == id)).filter(v=>v)
      }else{
        return this.users.find(v=>v.id == this.selected)
      }
    }
	},
	methods: {
    /**
     * @method TestImportState
     * @description Test user-data to show state with mistakes
     */
		TestImportState(user) {
      if (this.users.find((v) => v.user == user.user)) 
        return "用户名重复";
			else if (this.users.find((v) => v.phone == user.phone))
				return "电话号码重复";
    },
    /** 
     * @method onSelectAll
     * @description binding 'select all' button for select all current users
     */
		onSelectAll() {
			this.selected = this.filterdUsers.map((v) => v.id);
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
        this.selected = e.data;
      else if( e.type == "open")
        console.log("open:",e)
    },
    /**
     * @method importAllUsers
     * @description when users has been load from file, you can post them to server api for creating accounts
     */
		importAllUsers() {
			var that = this;
			this.loadingImport = true;
			let users = this.importData.filter((v) => !this.TestImportState(v));
			this.$store
				.dispatch("admin/CreateUsers", users)
				.then((results) => {
					let succees = results.filter((v) => v == 0);
					let map = {};
					that.importStateStr = `导入完毕,成功导入${succees.length}个账户`;
					that.importStates = results;
					users.forEach((v, i) => {
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
  		GetStateColor(s) {
			if (s == 0) return "yellowgreen";
			else if (s == 1) return "darkred";
			else return "orange";
		},
		GetStateText(s) {
			if (s == 0) return "正常";
			else if (s == 1) return "禁用";
			else return "锁定";
    },
    /** 
     * @method getData
     * @description our old friend get data from remote server
     */
		getData() {
			this.loading = true;
			this.$store
				.dispatch("admin/ListUsers")
				.then((res) => {})
				.finally((e) => {
					this.loading = false;
				});
    },
    /** @method onToolEvent
     *  @description handle toolbar event
     */
		onToolEvent(e) {
      var that = this;
      let selected_id = this.selected
			let selected =
				(this.multiple
					? (selected_id
							.map((v) => this.users.find((item) => item.id == v))
							.filter((v) => v))
					: (this.users.find((v) => v.id == selected_id)))
      console.log("current-selected:",selected)
			if (e == "add") {
				this.current = null;
				this.showModal = true;
			} else if (e == "edit") {
				this.current = selected;
				this.showModal = true;
			} else if (e == "refresh") {
				this.getData();
			} else if (e == "lock") {
				this.$store.dispatch("admin/LockUser", selected_id);
			} else if (e == "unlock") {
				this.$store.dispatch("admin/UnlockUser", selected_id);
			} else if (e == "resetpwd") {
				if (this.multiple) {
					this.Confirm(
						`确定要重置<span style="color:red">${selected
							.map(v => v.name)
							.join(",")}等${selected.length}</span>用户的密码?`,
						() => this.$store.dispatch("admin/Resetpassword", selected_id)
					);
				} else {
					this.Confirm(
						`确定要重置用户<span style="color:red">${selected.name}</span>的密码?`,
						() =>
							this.$store.dispatch("admin/Resetpassword", [selected.id])
					);
				}
				this.$store.dispatch("admin/ResetPassword", { id: selected.id });
			} else if (e == "resetpwdto") {
				this.showModalPassword = true;
			} else if (e == "delete") {
				this.Confirm(
					this.multiple
						? `确定要删除<span style='color:red;margin:0 2px;font-weight:bold'>${selected
								.slice(0, 3)
								.map((v) => v.name)
								.join(", ")}</span>等${selected.length}个账号`
						: `确定要删除该用户<span style='color:red;margin:0 2px;font-weight:bold'>${selected.name}</span>?`,
					() => {
						if (this.multiple) {
							this.$store
								.dispatch(
									"admin/DeleteUsers",
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
								.dispatch("admin/DeleteUser", selected_id)
								.then((res) => {
									this.Success("删除成功");
								})
								.catch((e) => {
									this.Error(e);
								});
						}
					}
				);
			} else if (e == "import") {
				this.$refs.fileLoader.click();
			} else if (e == "multiple") {
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
						let users = tabJson[0].sheet.map((v) => ({
							name: v["姓名"],
							phone: v["电话"],
							password: v["密码"],
							user: v["电话"],
						}));
						that.importStateStr = `已从文件中提取${users.length}个账号`;
						that.importState = 2;
						that.importData = users;
					}
				})
				.finally((e) => {
					that.$refs.fileLoader.value = "";
				});
		},

		/** @method patchUserPassword
		 *  @description Remote method, for patching user password
		 */
		patchUserPassword(item) {
			var that = this;
			if (item.password != item.passwordAgain) {
				this.$refs.formpwd.setError("passwordAgain", "两次密码不一致,请检查");
				return;
			}

			if (this.selected) {
				item.id = this.selected
				this.$store
					.dispatch("admin/ResetPassword", item)
					.then((res) => {
						that.Success("修改成功");
						that.showModalPassword = false;
					})
					.catch((e) => {
						that.Error(e);
					});
			}
		},

		/** @method patchUser
		 *  @description Remote method, for patching user information
		 */
		patchUser(item) {
			console.log("patch:", item);
			var that = this;
			if (this.current && this.current.id) {
				item.id = this.current.id;
			}
			this.$store
				.dispatch("admin/PatchUser", item)
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