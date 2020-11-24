<template>
	<div class="hs-conatiner hs-conatiner-scrollable" >
	
    <!-- tool bar -->
		<hs-toolbar
			style="background: #fff"
			:data="tools"
      :disabled="{}"
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
				:data="filterdAccounts"
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
				:total="filterdAccounts.length"
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
			footer-hide
			:form="user_form"
			:data="current"
			editable
			@on-submit="patch"
			@on-event="handleEvent"
		/>
  
		
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			accounts:[],

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
        	
				{ type: "text", key: "user", minWidth: 250, title: "企业名称",
				render(h,param){
					let avatar = h('hs-avatar',{props:{size:30,name:param.row.user,avatar:param.row.avatar,frame:param.row.frame}})
					let name = h('a',{attrs:{href:"/core/users/"+param.row.id},style:{marginLeft:"10px",fontSize:"14px"}},param.row.name)
					return h('div',{class:'flex-wrap',style:{marginLeft:"8px",marginTop:"10px",marginBottom:"10px"}},[avatar,name])
        }},
        	{ type: "text", key: "shortname", width: 150, title: "企业简称" , sortable:false,option:{
            align:'center',
           
          }},
          	{
					type: "state",
					title: "企业状态",
					key: "locked",
					width: 120,
					option: { states: ["正常",'锁定'],colors:['darkgreen','darkred'] },
				},
				{ type: "text", key: "user", width: 250, title: "管理账号",
				render(h,param){
					let avatar = h('hs-avatar',{props:{size:30,name:param.row.user,avatar:param.row.avatar || "https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/icon/guest.png",frame:param.row.frame}})
					let name = h('a',{attrs:{href:"#"},style:{marginLeft:"10px",fontSize:"14px"}},param.row.user)
					return h('div',{class:'flex-wrap',style:{marginLeft:"8px",marginTop:"10px",marginBottom:"10px"}},[avatar,name])
				}},

				{ type: "text", key: "phone", width: 150, title: "员工人数" },
         { type: "text", key: "phone", width: 150, title: "数据库" },
         { type: "text", key: "phone", width: 150, title: "文件存储" },
         
        { type: "text", key: "phone", width: 150, title: "开通模块" },

			{ key: "created_at", type: "time",title: "创建时间",width:100,option:{
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
		...mapGetters('core',['getType']),
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

          let state = this.accounts.find(v=>v.id == this.selected).state
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
					type:{
						label:"账户类型",
						control:"select",
						option:{
							getters:"core/AccountType"
						}
					},
					frame:{
						label:"边框",
						editable:true,
						control:'image'
					},
					avatar: {
						label: "头像",
						editable: true,
						control: "image",
					},
					phone: {
						label: "电话",
						control: "input",
					},
					email:{
						label: "邮箱",
						control: "input",
					}
				},
				layout: `<div style='padding-left:90px;position:relative;'>
				<div style='position:absolute;left:0px;top:0px;width:80px;height:80px;'>{{avatar}}<div style='height:10px;'></div>{{frame}}</div>
        <Row :gutter='10'>
        <Col span='12'>{{type}}</Col><Col span='12'>{{user}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{phone}}</Col>
        </Row><Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{email}}</Col>
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
		filterdAccounts() {
			return (
				this.accounts.filter((v) => {
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
   
    selected_user(){
      if(Array.isArray(this.selected)){
        return this.selected.map(id=>this.accounts.find(v=>v.id == id)).filter(v=>v)
      }else{
        return this.accounts.find(v=>v.id == this.selected)
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
			this.CORE.GET_ENTERPRISES().then(res=>{
					this.accounts = res.data.data
			}).finally(()=>{
					this.loading = false;
			})
    },
    /** @method onToolEvent
     *  @description handle toolbar event
     */
		onToolEvent(e) {
     
		},


		/** @method patchUser
		 *  @description Remote method, for patching user information
		 */
		patch(item) {
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