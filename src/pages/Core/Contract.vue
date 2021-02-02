<template>
  <Layout class="hs-container hs-container-full statistics">
   
    <Content style="padding:5px;">
    <div class="filter-box flex-between" style="margin:5px 0;margin-top:0;">
      <div class="flex-wrap">
        <Input style="width:230px;" v-model="f_search_text" search clearable placeholder="输入编号或名称查询" />
         <Select style="width:150px;margin-left:5px;text-align:center" v-model="f_type_2" placeholder="- - 所属部门 - -" clearable>
             <template v-for="d in $store.getters['core/getTypes']('ARCHIVE_SAVETYPE')">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>

          </Select>
        <Select style="width:200px;margin-left:5px;text-align:center" v-model="f_project_id" placeholder="- - 项目类型 - -" clearable>
          

        </Select>
         <Select style="width:150px;margin-left:5px;text-align:center" v-model="f_dep_id" placeholder="- - 建筑类型 - -" clearable>
           <template v-for="d in $store.getters['core/deps']">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>
         </Select>
       
            <Button @click="handleClearFilter()" type="info" v-show="isFiltering">清除筛选条件</Button>
      </div>
      <div class="flex-wrap">
        <!-- authed.ArchiveCategoryManage -->
          <Button @click="handlePreCreate()" type="primary" icon="md-add">新增合同</Button>
      <Button @click="modalCreate=true" icon="md-build" style="margin-left:5px;" v-show="false">分类管理</Button>
      </div>
    </div>
    <div class="filter-box">

    </div>
     <Tabs type="card" @on-click="handleTabChanged">
        <TabPane label="付款合同" name="partA"></TabPane>
        <TabPane label="收款合同" name="partB"></TabPane>
        <TabPane label="第三方合同" name="third"></TabPane>
    </Tabs>
    <div style="height:calc(100% - 100px);position:relative;">
      <hs-table ref="table" :total="1000" :columns="filtredColumns" bordered :data="filteredItems" @event="onTableEvent" selectable="false" />
    </div>
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

    <Modal v-model="showPay" title="支付管理" footer-hide>

    </Modal>

    <Modal v-model="showChange" title="变更管理" footer-hide>
      
    </Modal>
  </Layout>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      f_project_id:null,
      showPay:false,
      f_dep_id:null,
      part_mode:"partA",
      showChange:false,
      f_search_text:"",
      f_type_1:null,
      f_type_2:null,
      f_type_3:null,
      //
      items:[],
      modalCreate:false,
    
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
        width:200,
        type:"text",
        key:"name",
        linkEvent:"open"
      },{
        title:"所属部门",
        type:"type",
        width:150,
        key:"dep_id",
        option:{
          align:"center",
          getters:"core/deps"
        }
      },{
        title:"所属项目",
        type:"type",
        width:150,
        key:"project_id",
        option:{
          align:"center",
          getters:"core/projects"
        }
      },{
        title:"甲方",
        type:"user",
        key:"partA",
        width:220,
        option:{
          getters:"core/enterprises",
          idKey:'id',
          labelKey:'name'
        }
      },{
        title:"乙方",
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
          type:"fullAmount"
        }
      },{
        title:"超概",
        width:80,
        key:'isOverPlan',
        sortable:false
      },{
        title:"累计支付",
        width:80,
        key:'payed',
        type:'number',
        option:{
          type:'progress',
          percentTo:'adjusted_amount'
        }
      }, {
        title:"累计变更",
        width:80,
        key:'adjusted_amount',
        type:'number',
        option:{
          type:'progress',
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
      },{
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
        fixed:"right",
        title:"操作",
        minWidth:300,
        type:'tool',
        buttons:[{label:'支付',key:'pay',event:'pay'},{label:'变更',key:'change',event:'change'},"edit","delete"],
        option:{
          
        }
      }]
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$refs.table.calcTableHeight()
    })
    this.getData()
  },
   computed:{
      ...mapGetters('file',['files','uploadingFiles','makeURL']),
      isFiltering(){
        return this.f_search_text || this.f_type_1 != null ||  this.f_type_2 != null ||  this.f_type_3 != null ||  this.f_project_id != null ||  this.f_dep_id != null 
      },
      filterInitData(){
        return {
          project_id:this.f_project_id,
          dep_id:this.f_dep_id,
          type1:this.f_type_1,
          type2:this.f_type_2,
          type3:this.f_type_3
        }
      },
      filtredColumns(){
        let cols = [...this.columns]
        if(this.part_mode == "partA"){
          cols.splice(5,1)
        }else if(this.part_mode == "partB"){
          cols.splice(6,1)
        }
        return cols
      },
      filteredItems(){
        return this.items.filter(v=>{
          let search_text = this.f_search_text ? this.f_search_text.trim() : ""
          if(search_text && (!v.name || !v.name.includes(search_text)) && (!v.code || !v.code.includes(search_text)))
            return false
          if(this.f_project_id && v.project_id != this.f_project_id)
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
    handleDelete(model){
      console.log(this.api.enterprise)
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
      if(e.type == 'edit'){
       this.handleBeforeEdit(e.data.id)
      }else if(e.type == 'delete'){
        this.handleDelete(e.data)
      }else if(e.type == 'open'){
        this.handleOpen(e.data.id)
      }else if(e.type =='pay'){
        this.showPay = true
      }else if(e.type == 'change'){
        this.showChange = true
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
           v.payed = 0
           v.adjusted_amount = v.amount || 0
           v.isOverPlan = v.payed > v.adjusted_amount ? '是':'否'
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