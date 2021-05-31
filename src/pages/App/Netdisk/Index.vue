<template>
  <div class="hs-container" style="padding:10px;position:relative;height:100%;">
    <div class="flex-wrap flex-between">
    <div class="flex-wrap">
      <Button icon="md-arrow-back" style="margin-right:0px;border-right:none;border-radius:0;" v-if="current.parent">返回</Button>
      <div class="l-path">
        <Icon type="md-folder" size="18" style="margin-right:10px" /> 
        <template v-for="d in dirs">
          <span :key="d.id"> <a style="color:#346;margin-left:10px;font-weight:bold;" @click="Open(d)">{{d.name}}</a> \ </span>
        </template>
       
        <span style="">{{current.name}}</span>
      </div>
      <Input search style="width:200px;margin-left:10px;" />
    </div>
    <div class="flex-wrap">
      <Button type="primary" icon="md-cloud" style="border-radius:0;">上传</Button>
    </div></div>
    
    <div class="l-list-wrap" style="height:calc(100% - 80px)">
      <hs-list :data="current.files" style="margin-top:10px;border-color:#eee;height:100%;" :option="{tmpl:'HsxFileIcon'}" selectable="single" @event='handleListEvent' />
    </div>
    <div class="flex-wrap flex-center" style="margin-top:5px;justify-content:center;">
      <Page :count="100"></Page>
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      current:{},
      document1:{
        name:'PPT基础培训',
         files:[{
        id:1,
        name:"胡佳翰的什么文件胡佳翰的什么文件",
        ext:null,
        
         files:[{
        id:1,
        name:"胡佳翰的什么文件胡佳翰的什么文件",
        ext:null,
      },
      {
        id:2,
        name:"胡佳翰的什么资料2",
        ext:'jpg'
      }]
      },
      {
        id:2,
        name:"胡佳翰的什么资料2",
        ext:'jpg'
      },
      {
        id:2,
        name:"测试",
        ext:'jpg'
      }],
      }
    }
   
  },
  mounted(){
    
    this.mapParent(this.document1)
    this.current = this.document1
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
    }
  },
  methods:{
    getData(root){

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
      if(e.event.type == 'click'){
        let item = e.param
        this.current = item
      }
    },
    handleBack(){
      this.current = this.current.parent
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
  background:#fff;
  padding:5px 10px;
  border:1px solid #dfdfdf;
  height:32px;
}

</style>