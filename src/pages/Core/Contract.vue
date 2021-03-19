<template>
  <Layout class="hs-container hs-container-full statistics">
   
    <Content style="padding:5px;">
       <hs-toolbar
        style="background: #fff;border:1px solid #dfdfdf;"
        :data="tools"
        @event="onToolEvent"
        :disabled="toolDisabled"
      />
    <div class="filter-box flex-between" style="margin:5px 0;margin-top:5px;">
      <div class="flex-wrap">
        <Input style="width:230px;" v-model="f_search_text" search clearable placeholder="输入编号或名称查询" />
         <!-- <Select style="width:150px;margin-left:5px;text-align:center" v-model="f_type_1" placeholder="- - 合约类型 - -" clearable>
            <template v-for="d in $store.getters['core/getTypes']('ARCHIVE_WORKTYPE')">
             <Option :value="d.value" :key="d.value">{{d.name}}</Option>
           </template>
         </Select> -->
        <Select style="width:200px;margin-left:5px;text-align:center" v-model="project_id" placeholder="- - 所属项目 - -" clearable v-show="!filter.project_id">
           <template v-for="d in $store.getters['core/projects']">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>

        </Select>
         <Select style="width:150px;margin-left:5px;text-align:center" v-model="f_dep_id" placeholder="- - 所属部门 - -" clearable v-show="!filter.f_dep_id">
           <template v-for="d in $store.getters['core/deps']">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>
         </Select>
       
            <Button @click="handleClearFilter()" type="info" v-show="isFiltering">清除筛选条件</Button>
      </div>
      <div class="flex-wrap">
        <!-- authed.ArchiveCategoryManage -->
        
      <Button @click="modalCreate=true" icon="md-build" style="margin-left:5px;" v-show="false">分类管理</Button>
      </div>
    </div>
    <div class="filter-box">
    </div>
     <Tabs type="card" @on-click="handleTabChanged" v-if="!filteredByProject">
        <TabPane label="付款合同" name="partA"></TabPane>
        <TabPane label="收款合同" name="partB"></TabPane>
        <TabPane label="第三方合同" name="third"></TabPane>
    </Tabs>
    <div style="height:calc(100% - 100px);position:relative;">
      <hs-table ref="table" full :total="1000" :columns="filtredColumns" bordered :data="filteredItems" @event="onTableEvent" selectable="single" :option="{summary:true}" />
    </div>
     <Modal v-model="showPay" styles="position:absolute;"  :title="`支付管理${current?' — '+current.name+'':''}`" footer-hide width="1200px" :transfer="false">
      <Payment :filter="{contract_id:this.current?this.current.id:null}"  @update="handleUpdateContract" />
    </Modal>
    </Content>

    <hs-modal-form
			ref="form"
			:title="model.id?'修改合约':'新增合约'"
			v-model="modalCreate"
			:width="620"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('contract')"
			:data="model"
      :initData="filterInitData"
			editable
			@on-submit="handlePatchArchive"
			@on-event="handleEvent"
		/>

   

    <Modal v-model="showChange" title="变更管理" footer-hide>
      
    </Modal>
  </Layout>
</template>

<script>
import {mapGetters} from "vuex"
import Payment from "./Payment"
export default {
  data(){
    return {
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
					key: "payment",
					name: "支付管理",
					icon: "md-cash",
        },
        {
					key: "changed",
					name: "变更管理",
					icon: "md-key",
				}],
      f_project_id:null,
      showPay:false,
      f_dep_id:null,
      part_mode:"partA",
      showChange:false,
      current:null,
      f_search_text:"",
      f_type_1:null,
      f_type_2:null,
      f_type_3:null,
      //
      items:[],
      modalCreate:false,
      payColumns:[{
         title:"序号",
        key:"id",
        type:"index"
      },{
         title:"支付金额",
        type:"number",
        key:"amount",
        width:150,
        option:{
          type:"fullAmount"
        }
      },{
        title:"支付时间",
        type:"time",
        key:"register_date",
        width:100,
        option:{
          type:'date',
          align:"center"
        }
      },{
          title:"支付凭证",
          width:60,
          sortable:false,
          render:(h,params)=>{
            let file = params.row.file
            if(file){
            return h('Button',{props:{icon:'md-download',size:'small'},on:{click:()=>{
              this.handleDownload(file)
            }}  
            }) }else{
              return h('span','-')
            }

          }
          }, {
        title:"创建时间",
        type:"time",
        key:"created_at",
        width:100,
        option:{
          align:"center"
        }
      },{
        title:"创建人",
        type:"user",
        key:"created_by",
        width:100,
        option:{
          align:"center",
          getters:"core/users"
        }
      },{
        title:"操作",
        type:'tool',
        buttons:["edit","delete"],
        option:{
          
        }
      }],
      model:{}, 
      columns:[{
        title:"序号",
        key:"id",
        type:"index"
      },{
        title:"合约编号",
        key:"code",
        width:100,
        type:"text",
        option:{
          align:"center",
          color:"darkred"
        },
        render:(h,param)=>{
          return h('div',{style:{textAlign:"center",color:"red",fontWeight:"bold"}},param.row.code || '-')
        }
      },{
        title:"合约类型",
        key:"type",
        sortable:false,
        width:100,
        },{
        title:"合约名称",
        minWidth:200,
        type:"text",
        key:"name",
        linkEvent:"open"
      },{
        title:"所属部门",
        type:"type",
        width:150,
        key:"dep_id",
         linkEvent:"dep",
        option:{
          align:"center",
          getters:"core/deps"
        }
      },{
        title:"所属项目",
        width:200,
        type:"type",
        key:"project_id",
         linkEvent:"project",
        option:{
          align:"center",
          getters:"core/projects",
         
        }
      },{
        title:"甲方名称",
        type:"user",
        key:"partA",
        width:220,
        option:{
          getters:"core/enterprises",
          idKey:'id',
          labelKey:'name'
        }
      },{
        title:"乙方名称",
        type:"user",
        key:"partB",
        width:220,
        option:{
          getters:"core/enterprises",
          idKey:'id',
          labelKey:'name'
        }
      },{
        title:"签约时间",
        type:"time",
        key:"register_date",
        width:100,
        option:{
          type:'date',
          align:"center"
        }
      },{
        title:"合同金额",
        type:"number",
        key:"amount",
        width:150,
        option:{
          type:"fullAmount",
            sumable:true,
          formatter:(v)=>'¥ '+this.hs.formatSalarySemicolon(v)
        }
      },{
        title:"超概",
        width:80,
        key:'isOverPlan',
        sortable:false
      },{
        title:"累计支付",
        width:80,
        key:'payed_amount',
        type:'number',
        option:{
          type:'progress',
            sumable:true,
          formatter:(v)=>'¥ '+this.hs.formatSalarySemicolon(v),
          percentTo:'adjusted_amount'
        }
      }, {
        title:"累计变更",
        width:80,
        key:'adjusted_amount',
        type:'number',
        option:{
          type:'progress',
            sumable:true,
          formatter:(v)=>'¥ '+this.hs.formatSalarySemicolon(v),
          percentTo:'amount'
        }
      }, {
          title:"合同",
          width:40,
          sortable:false,
          render:(h,params)=>{
            let file = params.row.file
            if(file){
            return h('Button',{props:{icon:'md-download',size:'small'},on:{click:()=>{
              this.handleDownload(file)
            }}  
            }) }else{
              return h('span','-')
            }

          }
          }, {
          title:"担保",
          width:40,
          sortable:false,
          render:(h,params)=>{
            let file = params.row.file_assurance
            if(file){
            return h('Button',{props:{icon:'md-download',size:'small'},on:{click:()=>{
              this.handleDownload(file)
            }}  
            }) }else{
              return h('span','-')
            }

          }
          },{
        title:"联系人",
        type:"user",
        key:"contactor",
        width:100,
        option:{
          align:"center",
          getters:"core/users"
        }
      },
      // {
      //   title:"创建时间",
      //   type:"time",
      //   key:"created_at",
      //   width:100,
      //   option:{
      //     align:"center"
      //   }
      // },{
      //   title:"创建人",
      //   type:"user",
      //   key:"created_by",
      //   width:100,
      //   option:{
      //     align:"center",
      //     getters:"core/users"
      //   }
      // },{
      //   fixed:"right",
      //   title:"操作",
      //   minWidth:300,
      //   type:'tool',
      //   buttons:[{label:'支付',key:'pay',event:'pay'},{label:'变更',key:'change',event:'change'},"edit","delete"],
      //   option:{
          
      //   }
      //}
      ]

    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$refs.table.calcTableHeight()
    })
    this.getData()
  },
 props:{filter:{
    type:Object,
    default:{}
  }},
  components:{
    Payment
  },
   computed:{
      ...mapGetters('file',['files','uploadingFiles','makeURL']),
      toolDisabled(){
        let isSelected = this.current == null
        return {
          add:false,
          edit:isSelected,
          delete:isSelected,
          payment:isSelected,
          changed:isSelected
        }
      },
      isFiltering(){
        return this.f_search_text || this.f_type_1 != null ||  this.f_type_2 != null ||  this.f_type_3 != null ||  this.f_project_id != null ||  this.f_dep_id != null 
      },
      filterInitData(){
        let data = {
          project_id:this.project_id,
          dep_id:this.f_dep_id,
          type1:this.f_type_1,
          type2:this.f_type_2,
          type3:this.f_type_3
        }
          let ent_id = this.$store.getters['core/current_enterprise']
        if(this.part_mode == 'partA'){
          data.partA = ent_id
          delete data.partB
        }else if(this.part_mode == 'partB'){
          data.partB = ent_id
          delete data.partA
        }else{
          delete data.partA
          delete data.partB 
        }

        return data
      },
      filtredColumns(){
        let cols = [...this.columns]
        if(this.part_mode == "partA"){
          cols.splice(6,1)
        }else if(this.part_mode == "partB"){
          cols.splice(7,1)
        }
        return cols
      },
      filteredByProject(){
        if(this.filter && this.filter.project_id)
          return true
        else
          return false
      },
      filteredItems(){
        return this.items.filter(v=>{
          let search_text = this.f_search_text ? this.f_search_text.trim() : ""
          if(search_text && (!v.name || !v.name.includes(search_text)) && (!v.code || !v.code.includes(search_text)))
            return false
          if(this.project_id && v.project_id != this.project_id)
            return false
          
          if(this.f_dep_id && v.dep_id != this.f_dep_id)
            return false

          if(this.f_type_1 && v.type1 != this.f_type_1)
            return false
          
          if(this.f_type_2 && v.type2 != this.f_type_2)
            return false
          
          if(this.f_type_3 && v.type3 != this.f_type_3)
            return false

          if(this.part_mode){
            let ent_id = this.$store.getters['core/current_enterprise']
            console.log(this.part_mode,v.partB,ent_id,v.partB !== ent_id)
            if(this.part_mode == 'partA' && v.partA !== ent_id){
               return false
            }
            if(this.part_mode == 'partB' && v.partB !== ent_id){
              return false
            }
            if(this.part_mode == 'third' && (v.partA == ent_id || v.partB == ent_id)){
              return false
            }
          }

          return true
        })
      }
    },
  methods:{
    handleUpdateContract(id){
       this.api.enterprise.GET_CONTRACTS({param:{id}}).then(res=>{
        let item = res.data.data
        let index = this.items.findIndex(v=>v.id == id)
          if(index != -1)
            this.items.splice(index,1,item)
      })
    },
    handleTabChanged(e){
      this.part_mode = e
    },
    handleClearFilter(){
      this.f_search_text=""
      this.f_type_1 = null 
      this.f_type_2 = null 
      this.f_type_3 = null 
      this.f_project_id = null 
      this.f_dep_id = null 
    },
    handlePreCreate(){
      this.model={}
      if(this.f_project_id !== null)
        this.model.project_id = this,f_project_id
      if(this.f_dep_id)
        this.model.dep_id = this.f_dep_id
      if(this.f_type_1 !== null)
        this.model.type1 = this.f_type_1
       if(this.f_type_2 !== null)
        this.model.type2 = this.f_type_2
       if(this.f_type_3 !== null)
        this.model.type3 = this.f_type_3
      this.modalCreate=true;
    },
    handlePreview(e){

    },
    handleDownload(file_str){
      let [name,url,ext] = file_str.split(',')
     this.DownloadWithName(url,name+'.'+ext)
    },
    get_archive(id, cb){
      this.api.enterprise.GET_CONTRACTS({param:{id}}).then(res=>{
        let model = res.data.data
        console.log(model)
        cb(model)
      }).catch(e=>{
        this.Error('打开资料失败:',e)
      })
    },
    handleOpen(id){
       this.get_archive(id,data=>{
        this.model = this.current
        this.modalArchivePreview = true 
      })
    },
    handleBeforeEdit(id){
      this.model = {}
      this.get_archive(id,data=>{
        this.model = data
        this.modalCreate = true 
      })
    },
    onToolEvent(e){
      console.log(e)
      if(e == 'add'){
        this.handlePreCreate()
      }else if(e == 'edit'){
        this.handleBeforeEdit(this.current.id)
      }else if(e == 'delete'){
        this.handleDelete(this.current)
      }else if(e == 'payment'){
        this.showPay = true
      }else if(e == 'changed'){
        this.showChange = true
      }
    },
    handleDelete(model){
      this.Confirm(`确定删除该合约<b style='color:red;margin:0 2px;'>${model.name}</b>的所有资料`,()=>{
        this.api.enterprise.DELETE_CONTRACTS({param:{id:model.id}}).then(res=>{
          setTimeout(() => {
            this.Success('删除成功')
            this.items.splice(this.items.findIndex(v=>v.id == model.id),1)
          }, (1000));
          
        }).catch(e=>{
          this.Error('删除失败')
        })
      })
    },
    async upload(files,onFilesProgress){
     return new Promise((resolve,reject)=>{
       this.$store.dispatch("file/upload",{files,onProgress:onFilesProgress}).then(files=>{
         console.log(files)
         resolve(files.map(v=>v.url))
       }).catch(reject)
     })
    },
    onTableEvent(e){
      console.log(e)
      if(!e.data)
        return
      if(e.type == 'select'){
        this.current = this.items.find(v=>v.id == e.data)
      }else if(e.type == 'open'){
        this.handleOpen(e.data.id)
      }else if(e.type == 'project'){
        if(e.data.project_id)
          this.RouteTo('/core/projects/'+e.data.project_id)
      }else if(e.type == 'dep'){
        if(e.data.dep_id)
          this.RouteTo('/core/deps/'+e.data.dep_id)
      }
    },
    handlePatchArchive(item){
      console.log("submit:",item)
      if(item.id){
        let id = item.id
        delete item.id
        this.api.enterprise.PATCH_CONTRACTS(item,{param:{id}}).then(res=>{
          let updateInfo = res.data.data
         
          let new_item = Object.assign({},item,updateInfo)
          let index = this.items.findIndex(v=>v.id == id)
          if(index != -1){
            new_item = Object.assign({},this.items[index],new_item)
           this.items.splice(index,1,new_item)
          }
          this.modalCreate = false
          this.Success('修改成功')
         
        }).catch(e=>{
          this.Error('修改失败:'+e)  
        }).finally(e=>{
          this.loading = false
        })    
      }else{
        this.api.enterprise.POST_CONTRACTS(item).then(res=>{
          let updateInfo = res.data.data
          let new_item = Object.assign({},item,updateInfo)
          this.items.splice(0,0,new_item)
           this.modalCreate = false
          this.Success('创建成功')
        }).catch(e=>{
          this.Error('创建失败:'+e)  
        }).finally(e=>{
          this.loading = false
        })
      }
     
      // 创建资料
    },
    getData(){
       this.loading = true
    
       this.api.enterprise.LIST_CONTRACTS().then(res=>{
         let items = res.data.data
         items.forEach(v=>{
           v.payed_amount = v.payed_amount || 0
           v.adjusted_amount = ((v.adjusted_amount || 0) + (v.amount || 0))
           v.plan_amount = v.plan_amount || 0
           if(v.plan_amount)
              v.isOverPlan = v.adjusted_amount > v.plan_amount ? '是':'否'
         })
          this.items = items
       }).finally(e=>{
         this.loading = false
       })
     },
  }

}
</script>

<style>
</style>