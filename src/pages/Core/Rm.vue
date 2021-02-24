<template>
  <Layout class="hs-container hs-container-full statistics">
    <Header class="flex-wrap" style="padding:5px 10px;height:80px;">
      <div style="color:#fff;font-size:12px;line-height:15px;display:flex;flex-direction:column;align-items:center;" >
        <div style="width:40px;height:40px;background:#235;border-radius:10px;justify-content:center;" class="flex-wrap flex-center"><img style="width:80%;height:80%;" src="https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/system/hr.png"></img>
        </div>
        <div style="height:25px;line-height:25px;">总览</div>
      </div>
    </Header>
    <Content style="padding:5px;position:relative;height:calc(100% - 80px)">
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
          <Button @click="handlePreCreate()" type="primary" icon="md-add">新增员工</Button>
      <Button @click="modalCreate=true" icon="md-build" style="margin-left:5px;" v-show="false">分类管理</Button>
      </div>
    </div>
    <div class="filter-box">

    </div>
    <div style="height:calc(100% - 82px);position:relative;overflow-y:auto;">
      <hs-list  :data="filteredItems" @event="onListEvent" :option='{tmpl:"hsx-employee"}' style='border:none;' />
    </div>
    </Content>

    <hs-modal-form
			ref="form"
			title="新增员工"
			v-model="modalCreate"
			:width="620"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('employee')"
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
     
      model:{}, 
    }
  },
  mounted(){
    this.getData()
  },
  metaInfo:{
    title:"人事管理"
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
      this.Confirm(`确定删除该合约<b style='color:red;margin:0 2px;'>${model.name}</b>的所有资料`,()=>{
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
    onListEvent(e){
      if(e.event == 'open'){
        this.RouteTo('/core/users/'+e.param.id,true)
      }
    },
    handlePatchArchive(item){
      console.log("submit:",item)
      if(item.id){
        let id = item.id
        delete item.id
        this.api.enterprise.PATCH_EMPLOYEES(item,{param:{id}}).then(res=>{
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
        this.api.enterprise.POST_EMPLOYEES(item).then(res=>{
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
       this.api.enterprise.LIST_EMPLOYEES().then(res=>{
         let items = res.data.data
         
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