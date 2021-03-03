<template>
  <Layout class="hs-container hs-container-full statistics" >
   
    <Content style="padding:5px;">
    <div class="filter-box flex-between" style="margin:5px 0;margin-top:0;">
      <div class="flex-wrap">
        <Input style="width:230px;" v-model="f_search_text" search clearable placeholder="输入资料编号或名称查询" />
        <Select style="width:200px;margin-left:5px;text-align:center" v-model="project_id" placeholder="- - 所属项目 - -" clearable v-show="!filter.project_id">
           <template v-for="d in $store.getters['core/projects']">
             <Option :value="d.id" :key="d.id">{{d.name}}</Option>
           </template>

        </Select>
         
            <Button @click="handleClearFilter()" type="info" v-show="isFiltering">清除筛选条件</Button>
      </div>
      <div class="flex-wrap">
        <!-- authed.ArchiveCategoryManage -->
          <Button @click="handlePreCreate()" type="primary" icon="md-add">上传资料</Button>
      <Button @click="modalCreateArchive=true" icon="md-build" style="margin-left:5px;" v-show="false">分类管理</Button>
      </div>
    </div>
    <div class="filter-box">

    </div>
    <div style="height:calc(100% - 30px);position:relative;">
      <hs-table ref="table" :columns="cols" bordered :data="filteredItems" @event="onTableEvent" selectable="false"  />
    </div>
    </Content>

    <hs-modal-form
			ref="form"
			:title="model.id?'修改资料':'新增资料'"
			v-model="modalCreateArchive"
			:width="520"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('coc_record')"
			:data="model"
      :initData="filterInitData"
			editable
			@on-submit="handlePatchArchive"
			@on-event="handleEvent"
      
		/>

    <Modal v-model='modalArchivePreview' footer-hide width="800" title="查看资料">
      <BaseArchive :data="model" />
    </Modal>
  </Layout>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      project_id:null,
      f_dep_id:null,
      f_search_text:"",
      f_type_1:null,
      f_type_2:null,
      f_type_3:null,
      items:[],
      modalCreateArchive:false,
      modalArchivePreview:false,
      filterProjectId:null,
      filterDepId:null,
      filterCategory:null,
      filterCategory2:null,
      filterText:null,
      model:{}, 
      columns:[{
        title:"序号",
        key:"id",
        type:"index"
      },{
        title:"类型",
        key:"stype",
        sortable:false,
        width:40,
        render:(h)=>{
          return h('icon',{props:{custom:'gzicon gzi-iconset0118',size:20,color:"#aaa"}})
        }
        },{
        title:"档案号",
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
        title:"名称",
        width:300,
        type:"text",
        key:"name",
        linkEvent:"open"
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
        title:"资料时间",
        type:"time",
        key:"date",
        width:100,
        option:{
          type:'date',
          align:"center"
        }
      },
        {
          title:"预览",
          width:60,
          sortable:false,
          render:(h,params)=>{
              let count = 0
            let files = params.row.files
            if(files.includes(','))
            {  files = files.split(';')
              count = files.length
            }
            return h('Button',{props:{icon:'md-eye',size:'small'},on:{click:()=>{
              this.handlePreview(params.row.id)
            }}},count || '')
          }},
          {
          title:"下载",
          width:60,
          sortable:false,
          render:(h,params)=>{
            let count = 0
            let files = params.row.files
            if(files.includes(','))
            {  files = files.split(';')
              count = files.length
            }
    
            return h('Button',{props:{icon:'md-download',size:'small'},on:{click:()=>{
              this.handleDownload(params.row)
            }}},count || '')
          }
          },{
        title:"上传时间",
        type:"time",
        key:"created_at",
        width:100,
        option:{
          align:"center"
        }
      },{
        title:"上传人",
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
      }]
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$refs.table.calcTableHeight()
    })
    this.getData()
    for(let key in this.filter){
      this[key] = this.filter[key]
    }
  },
  props:{filter:{
    type:Object,
    default:{}
  }},
   computed:{
      ...mapGetters('file',['files','uploadingFiles','makeURL']),
      isFiltering(){
        return this.f_search_text || this.f_type_1 != null ||  this.f_type_2 != null ||  this.f_type_3 != null || (!this.filter.project_id && this.project_id != null) ||  this.f_dep_id != null 
      },
      filterInitData(){
        return {
          project_id:this.project_id,
          dep_id:this.f_dep_id,
          type1:this.f_type_1,
          type2:this.f_type_2,
          type3:this.f_type_3
        }
      },
      cols(){
        if(this.filter && this.filter.project_id){
          return this.columns.filter(v=>v.key != 'project_id')
        }else
        {
          return this.columns
        }
      },
      filteredItems(){
        return this.items.filter(v=>{
          let search_text = this.f_search_text ? this.f_search_text.trim() : ""
          if(search_text && (!v.name || !v.name.includes(search_text)) && (!v.code || !v.code.includes(search_text)))
            return false
          if(this.project_id && v.project_id !== this.project_id)
            return false
          
          if(this.f_dep_id &&  v.dep_id !== this.f_dep_id)
            return false

          if(this.f_type_1 != undefined && (v.type1 === null || v.type1 !== this.f_type_1))
            return false
          
          if(this.f_type_2!= undefined && v.type2 !== this.f_type_2)
            return false
          
          if(this.f_type_3!= undefined && v.type3 !== this.f_type_3)
            return false

          return true
        })
      }
    },
  methods:{
    handleClearFilter(){
      this.f_search_text=""
      this.f_type_1 = null 
      this.f_type_2 = null 
      this.f_type_3 = null 
      this.project_id = null 
      this.f_dep_id = null 
    },
    handlePreview(id){
      this.RouteTo('/core/archives/'+id,true)
    },
    handlePreCreate(){
      this.model={}
      // if(this.project_id !== null)
      //   this.model.project_id = this.project_id
      // if(this.f_dep_id)
      //   this.model.dep_id = this.f_dep_id
      // if(this.f_type_1 !== null)
      //   this.model.type1 = this.f_type_1
      //  if(this.f_type_2 !== null)
      //   this.model.type2 = this.f_type_2
      //  if(this.f_type_3 !== null)
      //   this.model.type3 = this.f_type_3
      // console.log(this.model)
      this.modalCreateArchive=true;
    },
    handleDownload(data){
      if(!data.files)
        return 
     let files = data.files.split(';').map(v=>v.split(','))
        if(files.length > 5)
          this.Confirm('文件数量较多，确定继续?',()=>{
            files.forEach(([name,url,ext])=>{
             
              let filename = name.lastIndexOf('.'+ext) == name.length-4?name:name+'.'+ext
               this.DownloadWithName(url,filename)
            })
          })
        else{
             files.forEach(([name,url,ext])=>{
               let filename = name.lastIndexOf('.'+ext) == name.length-4?name:name+'.'+ext
                this.DownloadWithName(url,filename)
            })
        }
    },
    handleOpen(item){
       this.model = item
        this.modalArchivePreview = true 
    },
    handleBeforeEdit(item){
       this.model = item
        this.modalCreateArchive = true 
    },
    handleDelete(model){
      this.Confirm(`确定删除该资料<b style='color:red;margin:0 2px;'>${model.name}</b>及相关文件`,()=>{
        this.api.enterprise.DELETE_COCRECORDS({param:{id:model.id}}).then(res=>{
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
       
         resolve(files.map(v=>v.url))
       }).catch(reject)
     })
    },
    onTableEvent(e){
      if(!e.data)
        return
      if(e.type == 'edit'){
       this.handleBeforeEdit(e.data.id)
      }else if(e.type == 'delete'){
        this.handleDelete(e.data)
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
      if(item.id){
        let id = item.id
        delete item.id
        this.api.enterprise.PATCH_COCRECORDS(item,{param:{id}}).then(res=>{
          let updateInfo = res.data.data
         
          let new_item = Object.assign({},item,updateInfo)
          let index = this.items.findIndex(v=>v.id == id)
          if(index != -1){
            new_item = Object.assign({},this.items[index],new_item)
           this.items.splice(index,1,new_item)
          }
          this.modalCreateArchive = false
          this.Success('修改成功')
         
        }).catch(e=>{
          this.Error('修改失败:'+e)  
        }).finally(e=>{
          this.loading = false
        })    
      }else{
        this.api.enterprise.POST_COCRECORDS(item).then(res=>{
          let updateInfo = res.data.data
          let new_item = Object.assign({},item,updateInfo)
          this.items.splice(0,0,new_item)
           this.modalCreateArchive = false
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
       this.api.enterprise.LIST_COCRECORDS().then(res=>{
         this.items = res.data.data
       }).finally(e=>{
         this.loading = false
       })
     },
  }

}
</script>

<style>
.c{
 
}
</style>