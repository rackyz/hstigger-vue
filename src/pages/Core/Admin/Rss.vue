<template>
	<div class="hs-conatiner hs-conatiner-scrollable" >
	
    <!-- tool bar 暂不支持自定义 rss -->
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
			:title="current && current.id ? '修改信息' : '新增模块'"
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
  
		<Modal v-model='modalPreview' transfer footer-hide :title="`RSS源:${previewItem?previewItem.name:''}`">
			<pre style='padding:10px;'>{{previewData}}</pre>
		</Modal>
		
	</div>
</template>

<script>
import { mapGetters } from "vuex";
const DEFAULT_ENT_AVATAR = "https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/icon/company.png"
export default {
	data() {
		return {
			selected: null,
			loading: false,
			importData: [],
				modalPreview:false,
			previewItem:null,
			previewData:null,
			searchText: null,
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
					key: "auth",
					name: "授权",
					icon: "md-key",
				},
			
			
				{
					key: "refresh",
					name: "刷新",
					icon: "md-refresh",
				},
			],
			showModal: false,
			
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
		...mapGetters('admin',{items:'rss'}),
			columns(){
				var that = this
				return [
        { type: "index", title: "序号" },
        	 { type: "type", key: "source_type", width:100,title: "源类型",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"RSS_SOURCE_TYPE",
							labelKey:"value"},},
				{ type: "text", key: "name",minWidth: 200,  minWidth: 250, title: "应用名称"},
					 { type: "type", key: "subject_type", width:100,title: "类别",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"RSS_SUBJECT_TYPE",
							labelKey:"value"},}, { type: "type", key: "content_type", width:100,title: "内容类型",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"RSS_CONTENT_TYPE",
							labelKey:"value"},},
        
							 { type: "type", key: "state", width:100,title: "状态",option:{align:"center"},	option: { getters:'core/getTypes',getters_key:"ModuleState",
							labelKey:"value"},},
          	{
					type: "type",
					title: "启用级别",
					key: "state",
					width: 120,
					option: { getters:'core/getTypes',getters_key:"AccountType",
							labelKey:"value"},
				},
			

			
        
         
        { type: "state", key: "private", width: 150, title: "定制版",option:{states:['否','是'],colors:['green','orange']} },
	{ key: "created_by", width: 150, title: "创建人",
			    render:(h,param)=>{
						let users = this.$store.getters["core/users"]
						let user = users.find(v=>v.id == param.row.owner_id)
						if(!user)
							return h("span","-")
						else{
							return h("div",{class:"flex-wrap",style:{marginLeft:"20px;"}},[h("hs-avatar",{props:{userinfo:user,size:30}}),h("span",{style:{marginLeft:"10px",fontSize:"16px"}},user.user)])
						}
						
					}},
			{ key: "created_at", type: "time",title: "添加时间",width:100,option:{
           type:'date'
         } },
			{ key: "admin", type: "time",sortable:false,title: "测试",width:100,render(h,param){
				return h('a',{on:{click(e
				
				){ e.stopPropagation();	that.onTableEvent({type:'preview',data:param.row.id})}}},'测试')
				}}
        
			]},
		toolDisabled() {
        return {}
		},
		form() {
			return {
				def: {
					name: {
						label: "模块全称",
            control: "input",
						option: {
							required: true,
						},
					},
					type:{
						label:"源类型",
						control:"select",
						option:{
							getters:"core/getTypes",
							key:"RSS_SOURCE_TYPE",
							labelKey:"name",
							defaultValue:1
						}
					},
					state:{
						label:"模块状态",
						control:"select",
						option:{
							getters:"core/getTypes",
							key:"ModuleState",
							labelKey:"name",
							defaultValue:0
						}
					},
					level:{
						label:"开放级别",
						control:"select",
						option:{
							getters:"core/getTypes",
							key:"AccountType",
							labelKey:"name",
							defaultValue:0
						}
					},
					private:{
						label:"定制版",
						control:"select",
						option:{
							options:['否','是'],
							defaultValue:0
						}
					},
					desc: {
						label: "描述",
						control: "input",
						option: {
							height:200,
							maxlen:128,
							type:'textarea',
							maxlen:128
						},
					},
					version:{
						label:"版本",
						control:"input",
						option:{
								required: true,
							defaultValue:"0.0.0"
						}
					},
					owner_id:{
						label:"管理账号",
						control:"select",
						option:{
							getters:"core/users",
							labelKey:"user",
							idKey:"id"
						}
					},
					admin:{
						label:"控制台入口",
						control:"input"
					},
					url:{
						label:"应用入口",
						control:"input"
					}
				},
				layout: `<div><Row :gutter="10">
					<Col :span='8'>{{version}}</Col>
					<Col :span='16'>{{name}}</Col>
					</Row>
					<Row :gutter="10" style='margin-top:10px;'>
						<Col :span='8'>{{type}}</Col>
						<Col :span='8'>{{state}}</Col>
						<Col :span='8'>{{private}}</Col>
					</Row>
					<Row style='margin-top:10px;' :gutter='10'>
					<Col :span='24'>{{url}}</Col></Row>
					<Row style='margin-top:10px;' :gutter='10'>
					<Col :span='24'>{{admin}}</Col></Row>
					<Row style='margin-top:10px;'><Col :span='24'>{{desc}}</Col></Row></div>`,

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
				this.items.filter((v) => {
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
        return this.selected.map(id=>this.items.find(v=>v.id == id)).filter(v=>v)
      }else{
        return this.items.find(v=>v.id == this.selected)
      }
    }
	},
	methods: {
  
		onSelectAll() {
			this.selected = this.filterdAccounts.map((v) => v.id);
    },
   
		onTableEvent(e) {
			console.log(e)
      if(!e)
        return

      if (e.type == "select") 
				this.selected = e.data;
				else if(e.type =='preview'){
						this.modalPreview = true
				
						this.previewItem = this.items.find(v=>v.id == e.data)
								console.log(this.previewItem)
							this.previewData = "读取中..."
					this.ADMIN.GET_RSS_DATA({param:{id:e.data}}).then(res=>{
						this.previewData = res.data.data
					}).catch(e=>{
						this.previewData = e
			
					})
			}
    },
		getData() {
			this.loading = true;
			this.$store.dispatch('admin/GetRss').finally(()=>{
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
				this.lock(this.selected)
			}else if(e == 'unlock'){
				this.unlock(this.selected)
			}
		},

		del(id){
			let item = this.items.find(v=>v.id == id)
			if(!item)	
				return
			this.Confirm(`将移除应用<span style="color:red;font-weight:bold">${item.name}</span>，是否继续?`,()=>{
				this.$store.dispatch("admin/DeleteRss",[id]).then((res=>{
						this.Success("删除成功")
				})).catch(e=>{
          this.Error(e)
        })
			})
			
		},
	
		patch(item) {
			console.log("patch:", item);
			var that = this;
			if (this.current && this.current.id) {
				item.id = this.current.id;
			}
			this.$store
				.dispatch("admin/PatchRss", item)
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