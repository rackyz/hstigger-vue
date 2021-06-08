<template>
  <div class="hs-container" style="padding:10px;position:relative;height:100%;">
    <div class="flex-wrap flex-between">
    <div class="flex-wrap" style="width:800px;">
      <Button icon="md-arrow-back" style="margin-right:0px;border-right:none;border-radius:0;" v-if="current.parent">返回</Button>
      <Input style="width:300px;" class="l-path" placeholder="搜索" >
         <Icon type="md-search" slot="prefix" style="margin-left:5px;" />
      </Input>
      <Button icon="md-create" style="margin-left:5px;" v-if="current.id" @click="model=current;modal=true" />
      <Button icon="md-trash" style="margin-left:5px;" v-if="current.id" 
      @click="handleDelete"/>
    </div>
    <div class="flex-wrap">
     <Button  icon="ios-cloud-upload" @click="modalUpload=true">上传</Button>
    </div></div>
    
    <div class="l-list-wrap" style="height:calc(100% - 80px)">
      <hs-list :data="current.files" style="margin-top:5px;border-color:#ddd;height:100%;" :option="{tmpl:'HsxFileIcon'}" selectable="single" @event='handleListEvent' />
    </div>
    <div class="flex-wrap flex-center" style="margin-top:5px;justify-content:center;">
      <Page :count="100"></Page>
    </div>
    <hs-modal-form title="上传资料" v-model="modalUpload" :form="Form('simple_archive')" :data='model' @on-submit="handleUpload" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      current:{},
      model:{},
      modalUpload:false,
      folder:{
        name:'PPT基础培训',
        files:[]
      }
    }
   
  },
  mounted(){
    this.current = this.folder
    this.getData()
  },
  computed:{
    dirs(){
      let dirs = []
      let t = this.current
      while(t.parent){
       dirs.push(t.parent)
       t = t.parent.parent 
      }
      dirs.reverse()
      return dirs
    },
    id(){
      return this.$route.params.id
    }
  },
  methods:{
    getData(root){
      this.api.enterprise.LIST_ARCHIVES({project_id:this.id}).then(res=>{
        this.folder.files = res.data.data
      })
    },
    mapParent(dir){
      if(dir.files){
        dir.files.forEach(v=>{
          if(!v.ext){
            v.parent = dir
            this.mapParent(v)
          }
        })
      }
    },
    handleListEvent(e){
      console.log(e)
      if(e.event.type == 'select'){
        let item = e.param
        this.current = item
      }
    },
    handleBack(){
      this.current = this.current.parent
    },
    handleUpload(e){
      this.$store.state.API.enterprise.POST_ARCHIVES(e).then(res=>{
        this.Success('上传成功')
        this.modalUpload =false
        let updateInfo = res.data.data
        this.model = {}
        this.folder.files.push(Object.assign({},updateInfo,e))
      }).catch(e=>{
        this.Error(e)
      })
    },
    handleDelete(){
      this.Confirm("确认删除改文件?",e=>{
        this.api.enterprise.DEL_ARCHIVES({param:{id:this.current.id}}).then(res=>{
          this.Success("删除成功")
          this.folder.files.splice(this.folder.files.findIndex(v=>v.id == this.current.id),1)
        })
      })
    }
  },
  props:{
    readonly:{
      type:Boolean
    },
    root:{
      type:String
    }
  }
}
</script>

<style lang="less">
.l-path{
   min-width: 300px;
  input{
     background:#fff;
  padding:5px 20px;
  padding-left:33px;
 
  border:1px solid #dfdfdf;
  height:32px;
  border-radius: 30px;;
  }
 
}

</style>