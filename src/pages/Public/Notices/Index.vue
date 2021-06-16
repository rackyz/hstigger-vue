<template>
  <div class="l-wrapper">
    
    <div class="l-page">
      <Row :gutter="20">
        <Col :span="18">
        <div style="padding:20px 60px;">
         <h1 style="font-weight:bold;font-size:25px;padding-bottom:10px;">{{item.title}}</h1>
          <Breadcrumb>
        <BreadcrumbItem to="/public">首页</BreadcrumbItem>
        <BreadcrumbItem to="/public/notices">通知公告</BreadcrumbItem>
        <BreadcrumbItem>详情</BreadcrumbItem>
    </Breadcrumb>
      </div>
      
       <Row  :gutter="20">
      <Col :span='24'>
        <article style="background:#fff;padding:0 40px;"  class="hs-md">
         
         
          <hs-markdown style="min-height:500px;" :data="item.content">
          </hs-markdown>
          <div style="color:#aaa;font-size:12px;padding-top:10px;border-top:1px dashed #aaa;padding-bottom:100px;">
            <div class="flex-wrap">
              发布人  
              <!-- <div class="flex-wrap" style="margin-left:20px;">
                   <hs-avatar :userinfo="getUser(item.created_by)" style="margin-right:5px" /> {{getUser(item.created_by).name}}
              </div> -->
             
             
            </div>
            <div style="margin-top:5px;">
              发布时间 {{moment(item.created_at).format("L HH:mm:ss")}}
            </div>
            
            
            
          </div>
        </article>
      </Col>
     
    </Row>
        </Col>
        <Col :span='6'>
           相关列表
        </Col>
      </Row>
      
    </div>
   
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      item:{}
    }
  },
  watch:{
    id:{
      handler(v){
        this.getData()
      }
    }
  },
  mounted(){
    this.getData()
  },
  computed:{
    ...mapGetters('core',['getUser']),
    id(){
      return this.$route.params.id
    }
  },
  metaInfo:{
    title:"公告",
    route:"/:id"
  },
  methods:{
    getData(){
      let id = this.$route.params.id
      this.api.public.GET_NOTICES({param:{id}}).then(res=>{
        let item = res.data.data
        item.type = {} //this.$store.getters['core/getTypes']('MESSAGE_TYPE')[item.msg_type].name
        this.item = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.l-wrapper{
  width:100%;
 
  height:100%;
  position: relative;
  overflow: hidden;
}
.l-page{
  margin:0 auto;
  padding:10px;
  width:1200px;
  min-height:800px;
  padding-bottom:100px;
   overflow: hidden;
}
</style>