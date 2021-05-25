<template>
  <div class="l-wrapper">
    <div class="l-page">
       <Row  :gutter="20">
      <Col :span='18'>
        <article style="background:#fff;padding:40px;">
          <h1 style='padding:20px 0'>{{item.title}}</h1>
          <div class="flex-wrap flex-between" style="margin:0 auto;width:600px;">
            <div>发布人</div>
            <div>已阅</div>
            <div>发布时间</div>  </div>
          <content style="margin:100px 0;">
            {{item.content}}
          </content>
        </article>
      </Col>
      <Col :span='6'>
        目录
      </Col>
    </Row>
    </div>
   
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      item:{}
    }
  },
  mounted(){
    this.getData()
  },
  metaInfo:{
    title:"档案",
    route:"/:id"
  },
  methods:{
    getData(){
      let id = this.$route.params.id
      this.api.enterprise.GET_ARTICLES({param:{id}}).then(res=>{
        this.item = res.data.data
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
  width:1200px;
}
</style>