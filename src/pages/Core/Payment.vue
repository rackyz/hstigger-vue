<template>
  <Layout class="hs-container hs-container-full statistics">
   
    <Content style="padding:5px;">
    <div class="filter-box flex-between" style="margin:5px 0;margin-top:0;">
      <div class="flex-wrap">
        <Input style="width:230px;" v-model="f_search_text" search clearable placeholder="输入凭证号或内容查询" />
         <Select style="width:150px;margin-left:5px;text-align:center" v-model="f_type_2" placeholder="- - 所属部门 - -" clearable v-if="!contract_id">
             <template v-for="d in $store.getters['core/getTypes']('ARCHIVE_SAVETYPE')">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>

          </Select>
        <Select style="width:200px;margin-left:5px;text-align:center" v-model="f_project_id" placeholder="- - 所属项目 - -" clearable v-if="!contract_id">
          

        </Select>
         <Select style="width:200px;margin-left:5px;text-align:center" v-model="f_project_id" placeholder="- - 所属合同 - -" clearable v-if="!contract_id">
          

        </Select>
       
            <Button @click="handleClearFilter()" type="info" v-show="isFiltering">清除筛选条件</Button>
      </div>
      <div class="flex-wrap">
        <!-- authed.ArchiveCategoryManage -->
          <Button @click="handlePreCreate()" type="primary" icon="md-add">新增支付记录</Button>
      <Button @click="modalCreate=true" icon="md-build" style="margin-left:5px;" v-show="false">分类管理</Button>
      </div>
    </div>
    <div class="filter-box">

    </div>
    <div style="height:calc(100% - 100px);position:relative;">
      <hs-table ref="table" :total="1000" :columns="filtredColumns" bordered :data="filteredItems" @event="onTableEvent" selectable="false" />
    </div>
    </Content>

    <hs-modal-form
			ref="form"
			:title="model.id?'修改合约支付记录':'新增支付记录'"
			v-model="modalCreate"
			:width="620"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('payment')"
			:data="model"
      :initData="filter"
			editable
			@on-submit="handlePatchArchive"
			@on-event="handleEvent"
		/>

    <Modal v-model="showPay" title="支付管理" footer-hide width="800">
      <hs-table ref='table2' :columns="payColumns" :data="pay_events" @event="onPayTableEvent" selectable="false" :paged="false" />
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
        key:"paydate",
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
            
            let files = params.row.files
            if(files){
            return h('Button',{props:{icon:'md-download',size:'small'},on:{click:()=>{
              this.handleDownload(files)
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
        width:200,
        type:"type",
        key:"project_id",
        option:{
          align:"center",
          getters:"core/projects"
        }
      },{
        title:"所属合同",
        width:200,
        type:"type",
        key:"contract_id",
        option:{
          align:"center",
          getters:"core/contracts"
        }
      },{
        title:"支付依据",
        type:"text",
        key:"desc",
        width:200,
        option:{
          align:"center"
        }
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
        key:"paydate",
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
            let files = params.row.files
            if(files){
            return h('Button',{props:{icon:'md-download',size:'small'},on:{click:()=>{
              this.handleDownload(files)
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
    }
  },
  props:{
    filter:{
      type:Object,
      default:{}
    }
  },
  watch:{
    contract_id:{
      handler(v){
        this.getData()
      },
      immediate:true
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$refs.table.calcTableHeight()
    })
    this.getData()
  },
   computed:{
     contract_id(){
       if(this.filter && this.filter.contract_id)
        return this.filter.contract_id
     },
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
        if(this.contract_id){
          cols.splice(1,2)
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
    handleDownload(id){
      this.get_archive(id,data=>{
        console.log(data)
        let files = data.files.split(';').map(v=>v.split(','))
        if(files.length > 5)
          this.Confirm('文件数量较多，确定继续?',()=>{
            files.forEach(([name,url,ext])=>{
               this.DownloadWithName(url,name+'.'+ext)
            })
          })
        else{
             files.forEach(([name,url,ext])=>{
                this.DownloadWithName(url,name+'.'+ext)
            })
        }
      })
    },
    get_archive(id, cb){
      this.api.enterprise.GET_PAYMENTS({param:{id}}).then(res=>{
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
      this.Confirm(`确定删除该合约<b style='color:red;margin:0 2px;'>${model.desc}</b>的所有资料`,()=>{
        this.api.enterprise.DELETE_PAYMENTS({param:{id:model.id}}).then(res=>{
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
        this.current = e.data
        this.showPay = true
      }else if(e.type == 'change'){
        this.current = e.data
        this.showChange = true
      }
    },
    handleUpdateContract(id){
     this.$emit('update',id)
    },
    handlePatchArchive(item){
      console.log("submit:",item)
      if(item.id){
        let id = item.id
        delete item.id
        this.api.enterprise.PATCH_PAYMENTS(item,{param:{id}}).then(res=>{
          let updateInfo = res.data.data
         
          let new_item = Object.assign({},item,updateInfo)
          let index = this.items.findIndex(v=>v.id == id)
          if(index != -1){
            new_item = Object.assign({},this.items[index],new_item)
           this.items.splice(index,1,new_item)
          }
          this.modalCreate = false
          this.handleUpdateContract(id)
          this.Success('修改成功')
         
        }).catch(e=>{
          this.Error('修改失败:'+e)  
        }).finally(e=>{
          this.loading = false
        })    
      }else{
        this.api.enterprise.POST_PAYMENTS(item).then(res=>{
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
        let queryCondition = this.contract_id?{query:{contract_id:this.contract_id}}:undefined
       this.api.enterprise.LIST_PAYMENTS(queryCondition).then(res=>{
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