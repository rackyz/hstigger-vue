<template>
  <div class="l-wrapper">
    <div class="title flex-wrap flex-between" style="height:30px;background:#fff;padding:0 10px;border-bottom:1px solid #dfdfdf;">
      <div class="flex-wrap" style="color:#3af;">
        <a @click="RouteTo('/core/notices/dashboard')"><Icon type="md-arrow-back" size="16" /> 返回列表</a>
      </div>
      
       <div class="flex-wrap" style="color:#3af;">
        <Button style="margin-right:5px" :disabled="!item.prev" size="small" icon="md-arrow-back" @click="RouteTo(`/core/notices/${item.prev}/detail`)">上一封</Button>
         <Button :disabled="!item.next"  @click="RouteTo(`/core/notices/${item.next}/detail`)" size="small" icon="md-arrow-forward">下一封</Button>


        <a @click="handleDelete(item)" style="color:#aaa;margin-left:15px;"><Icon type="md-trash" /> 删除</a>
      </div>
      </div>
    <div class="l-page">
      
       <Row  :gutter="20">
      <Col :span='24'>
        <article style="background:#fff;padding:80px 100px;">
          <h1 style="font-weight:bold;font-size:20px;border-bottom:2px solid #dfdfdf;padding-bottom:10px;">{{item.title}}</h1>
         
          <hs-markdown style="min-height:500px;" :data="item.content">
          </hs-markdown>
          <div style="color:#aaa;font-size:12px;padding-top:10px;border-top:1px dashed #aaa;">
            <div class="flex-wrap">
              发布人  
              <div class="flex-wrap" style="margin-left:20px;">
                   <hs-avatar :userinfo="getUser(item.created_by)" style="margin-right:5px" /> {{getUser(item.created_by).name}}
              </div>
             
             
            </div>
            <div style="margin-top:5px;">
              发布时间 {{moment(item.created_at).format("L HH:mm:ss")}}
            </div>
            
            
            
          </div>
        </article>
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
    title:"消息通知",
    route:"/:id"
  },
  methods:{
    getData(){
      let id = this.$route.params.id
      this.api.enterprise.GET_MESSAGES({param:{id}}).then(res=>{
        let item = res.data.data
        item.type = this.$store.getters['core/getTypes']('MESSAGE_TYPE')[item.msg_type].name
        this.item = res.data.data
      })
    },
    handleDelete(e){
      this.Confirm('确定删除该通知?',_=>{
          this.api.enterprise.DELETE_MESSAGES({param:{id:e.id}}).then(res=>{
            this.Success('删除成功')
            if(e.prev || e.next)
              this.RouteTo(`/core/notices/${e.prev || e.next}/detail`)
            else
              this.RouteTo(`/core/notices/dashboard`)
          })
      })
     
    }
  }
}
</script>

<style lang="less" scoped>
.l-wrapper{
  width:100%;
  background:#eee;
  height:100%;
}
.l-page{
  margin:0 auto;
  padding:10px;
  width:800px;
}
</style>