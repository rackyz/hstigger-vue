<template>
  <Layout class="hs-container hs-container-full statistics" style="border-top:1px solid #000;">
    <Content style="padding:5px;">
    <div class="filter-box flex-between" style="margin:5px 0">
      <div class="flex-wrap">
        <Input style="width:230px;" v-model="f_search_text" search clearable placeholder="输入编号或名称查询" />
         <Select style="width:150px;margin-left:5px;text-align:center" v-model="f_type_2" placeholder="- - 所属部门 - -" clearable>
             <template v-for="d in $store.getters['core/deps']">
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
          <Button @click="handlePreCreate()" type="primary" icon="md-add">新建项目</Button>
      <Button @click="modalCreate=true" icon="md-build" style="margin-left:5px;" v-show="false">分类管理</Button>
      </div>
    </div>
    <div class="filter-box">

    </div>
    <div style="height:400px;position:relative;">
      <hs-table ref="table" :total="1000" :columns="columns" bordered :data="filteredItems" @event="onTableEvent" selectable="false" />
    </div>
    </Content>

    <hs-modal-form
			ref="form"
			:title="model.id?'修改项目':'新增项目'"
			v-model="modalCreate"
			:width="620"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('project')"
			:data="model"
      :initData="filterInitData"
			editable
			@on-submit="handlePatchArchive"
			@on-event="handleEvent"
		/>
  </Layout>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      f_project_id:null,
      f_dep_id:null,
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
        title:"项目编号",
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
        title:"项目类型",
        key:"stype",
        sortable:false,
        width:100,
        render:(h)=>{
          return h('icon',{props:{custom:'gzicon gzi-xiangmu2',size:20,color:"#aaa"}})
        }
        },{
        title:"项目名称",
        width:300,
        type:"text",
        key:"name",
        linkEvent:"open"
      },{
        title:"项目简称",
        width:100,
        type:"text",
        key:"name"
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
        title:"项目地址",
        type:"text",
        key:"type1",
        width:300
      },{
        title:"项目状态",
        type:"type",
        key:"state",
        width:100,
        option:{
          align:"center",
          getters:"core/getTypes",
          getters_key:"TASK_STATE"
        }

      },{
        title:"项目负责人",
        type:"user",
        key:"charger",
        width:100,
        option:{
          align:"center",
          getters:"core/employees"
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
      console.log(this.model)
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
      this.api.enterprise.GET_PROJECTS({param:{id}}).then(res=>{
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
      this.get_archive(id,data=>{
        this.model = data
        this.modalCreate = true 
      })
    },
    handleDelete(model){
      console.log(this.api.enterprise)
      this.Confirm(`确定删除该项目<b style='color:red;margin:0 2px;'>${model.name}</b>的所有资料`,()=>{
        this.api.enterprise.DELETE_PROJECTS({param:{id:model.id}}).then(res=>{
          setTimeout(() => {
            this.Success('删除成功')
            this.items.splice(this.items.findIndex(v=>v.id == model.id),1)
             this.$store.commit('core/delProject',model.id)
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
      if(!e.data)
        return
      if(e.type == 'edit'){
       this.handleBeforeEdit(e.data.id)
      }else if(e.type == 'delete'){
        this.handleDelete(e.data)
      }else if(e.type == 'open'){
        this.RouteTo(`/core/projects/${e.data.id}`)
      }
    },
    handlePatchArchive(item){
      console.log("submit:",item)
      if(item.id){
        let id = item.id
        delete item.id
        this.api.enterprise.PATCH_PROJECTS(item,{param:{id}}).then(res=>{
          let updateInfo = res.data.data
         
          let new_item = Object.assign({},item,updateInfo)
          let index = this.items.findIndex(v=>v.id == id)
          if(index != -1){
            new_item = Object.assign({},this.items[index],new_item)
           this.items.splice(index,1,new_item)
          }
           this.$store.commit('core/saveProject',new_item)
          this.modalCreate = false
          this.Success('修改成功')
         
        }).catch(e=>{
          this.Error('修改失败:'+e)  
        }).finally(e=>{
          this.loading = false
        })    
      }else{
        this.api.enterprise.POST_PROJECTS(item).then(res=>{
          let updateInfo = res.data.data
          let new_item = Object.assign({},item,updateInfo)
          this.items.splice(0,0,new_item)
          this.$store.commit('core/saveProject',new_item)
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
       this.api.enterprise.LIST_PROJECTS().then(res=>{
         this.items = res.data.data
       }).finally(e=>{
         this.loading = false
       })
     },
  }

}
</script>

<style>
</style>