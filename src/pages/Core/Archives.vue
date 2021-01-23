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
      <hs-table ref="table_private" :total="1000" :columns="columns" bordered :data="files" @event="onTableEvent" selectable="false" />
    </div>
    </Content>

    <hs-modal-form
			ref="form"
			title="新增资料"
			v-model="modalCreateArchive"
			:width="620"
      :env="{upload}"
			style="margin: 10px"
			footer-hide
			:form="Form('archive')"
			:data="model"
			editable
			@on-submit="handleCreateArchive"
			@on-event="handleEvent"
		/>
  </Layout>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  data(){
   
    return {
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
          return h('icon',{props:{type:'ios-folder-open',size:20}})
        }
        },{
        title:"资料名称",
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
        title:"一级分类",
        type:"text",
        key:"ext",
        width:80,
        option:{
          align:"center"
        }

      },{
        title:"二级分类",
        type:"text",
        key:"ext",
        width:80,
        option:{
          align:"center"
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
      this.$refs.table_private.calcTableHeight()
      this.$refs.table_public.calcTableHeight()
    })
    this.getData()
  },
   computed:{
      ...mapGetters('file',['files','uploadingFiles','makeURL']),
    },
  methods:{
    async upload(files,onFilesProgress){
     return this.$store.dispatch("file/upload",{files,onProgress:onFilesProgress})
    },
    onTableEvent(e){
      
    },
    handleCreateArchive(e){
      console.log("submit:",e)
      // 创建资料
    },
    getData(){
       this.loading = true
       this.$store.dispatch('file/query',{vdisk:"tmp"}).then(res=>{

       }).finally(e=>{
         this.loading = false
       })
     },
  }

}
</script>

<style>

</style>