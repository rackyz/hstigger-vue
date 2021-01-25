<template>
  <Layout class="hs-container hs-container-full statistics" style="border-top:1px solid #000;">
    <Header style="color:#fff;padding:20px;font-size:20px;display:flex;align-items:center;background:#234;">资料管理</Header>
    <Content style="padding:10px;">
    <div class="filter-box flex-between" style="margin:5px 0;">
      <div class="flex-wrap">
        <Input style="width:230px;" search clearable placeholder="输入资料关键字" />
        <Select style="width:200px;margin-left:5px;text-align:center" placeholder="- - 所属项目 - -" clearable></Select>
         <Select style="width:150px;margin-left:5px;text-align:center" placeholder="- - 所属部门 - -" clearable></Select>
         <Select style="width:150px;margin-left:5px;text-align:center" placeholder="- - 一级目录 - -" clearable></Select>
          <Select style="width:150px;margin-left:5px;text-align:center" placeholder="- - 二级目录 - -" clearable></Select>
           <Select style="width:150px;margin-left:5px;text-align:center" placeholder="- - 三级目录 - -" clearable></Select>
      </div>
      <div class="flex-wrap">
        <!-- authed.ArchiveCategoryManage -->
          <Button @click="modalCreateArchive=true"  icon="md-add">创建资料集</Button>
      <Button @click="modalCreateArchive=true" icon="md-build" style="margin-left:5px;">分类管理</Button>
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
			:title="model.id?'修改资料':'新增资料'"
			v-model="modalCreateArchive"
			:width="620"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('archive')"
			:data="model"
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
      items:[],
      modalCreateArchive:false,
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
          return h('icon',{props:{custom:'gzicon gzi-xiangmu2',size:20,color:"#3af"}})
        }
        },{
        title:"档案号",
        key:"code",
        width:80,
        type:"text",
         algin:"center",
        option:{
          algin:"center"
        }
      },{
        title:"资料名称",
        width:300,
        type:"text",
        key:"name",
        linkEvent:"open"
      },{
        title:"所属部门",
        type:"text",
        width:150,
        key:"dep_id",
        option:{
          align:"center"
        }
      },{
        title:"所属项目",
        width:200,
        type:"text",
        key:"project_id",
        option:{
          align:"center",

        }
      },{
        title:"业务类别",
        type:"type",
        key:"type",
        width:100,
        option:{
          align:"center",
          getters:"core/getTypes",
          getters_key:"ARCHIVE_WORKTYPE"
        }

      },{
        title:"归档目录",
        type:"type",
        key:"type2",
        width:130,
        option:{
          align:"center",
          getters:"core/getTypes",
          getters_key:"ARCHIVE_SAVETYPE"
        }

      },{
        title:"资料类型",
        type:"type",
        key:"type3",
        width:100,
        option:{
          align:"center",
          getters:"core/getTypes",
          getters_key:"ARCHIVE_DOCTYPE"
        }

      },{
        title:"附件数",
        type:"number",
        sortable:false,
        width:20,
        key:"count"
        },{
          title:"预览",
          width:40,
          sortable:false,
          render:(h,params)=>{
            return h('Button',{props:{icon:'md-eye',size:'small'}})
          }
          },{
          title:"下载",
          width:40,
          sortable:false,
          render:(h,params)=>{
            return h('Button',{props:{icon:'md-download',size:'small'}})
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
        type:"time",
        key:"created_at",
        width:100,
        option:{
          align:"center"
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
      filteredItems(){
        return this.items
      }
    },
  methods:{
    async upload(files,onFilesProgress){
     return new Promise((resolve,reject)=>{
       this.$store.dispatch("file/upload",{files,onProgress:onFilesProgress}).then(files=>{
         console.log(files)
         resolve(files.map(v=>v.url))
       }).catch(reject)
     })
    },
    onTableEvent(e){
      if(e.type == 'edit'){
        this.model = e.data
        this.modalCreateArchive = true
      }
    },
    handlePatchArchive(item){
      console.log("submit:",item)
      if(item.id){
        let id = item.id
        delete item.id
        this.ENT.PATCH_ARCHIVE(item,{param:{id}}).then(res=>{
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
        this.ENT.POST_ARCHIVE(item).then(res=>{
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
       this.ENT.LIST_ARCHIVE().then(res=>{
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