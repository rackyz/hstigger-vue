<template>
  <Layout class="hs-container hs-container-full statistics" style="border-top:1px solid #000;">
    <Header style="color:#fff;padding:20px;font-size:20px;display:flex;align-items:center;background:#234;">临时文件</Header>
    <Content style="padding:10px;">
    <div class="filter-box" style="margin:5px 0;">
      <Button>上传文件</Button> <Input style="width:200px;" search /> 
    </div>
    <div style="height:400px;position:relative;">
    <hs-table ref="table_private" :columns="columns" bordered :data="files" @event="onTableEvent" selectable="false" />
    </div>
    </Content>
  </Layout>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      columns:[{
        title:"序号",
        key:"id",
        type:"index"
      },{
        title:"文件名",
        type:"text",
        key:"name",
        linkEvent:"open"
      },{
        title:"文件类型",
        type:"text",
        key:"ext",
        width:80,
        option:{
          align:"center"
        }

      },{
        title:"文件大小",
        type:"number",
        key:"size",
        width:120,
        option:{
          align:"center"
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
        title:"操作",
        type:'tool',
        buttons:["delete"],
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
    onTableEvent(e){
      
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