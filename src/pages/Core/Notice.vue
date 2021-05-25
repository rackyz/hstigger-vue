<template>
  <Layout class="">
    <Header class="flex-wrap" style="color:#fff;padding:0 8px;height:40px;background:#246;font-size:15px;align-items:center;display:flex;line-height:40px;justify-content:space-between;">
      <span>通知管理</span> <Button type='primary' icon="md-create" size="small" @click="showModalCreate=true">新增</Button></Header>
    <Content>
      
       <Tabs value="name1" :animated="false">
        <TabPane :label="`已发布 (${publishedItems.length})`" name="name1"><hs-list :data="publishedItems" :option="{tmpl:'BaseArticle'}" style='border:0;' ></hs-list></TabPane>
        <TabPane :label="`未发布 (${hiddenItems.length})`" name="name2">
          <hs-list :data="hiddenItems" :option="{tmpl:'BaseArticle'}" style='border:0;' ></hs-list>
        </TabPane>
        <TabPane :label="`未审核/草稿 (${draftItems.length})`" name="name3">
          <hs-list :data="draftItems" :option="{tmpl:'BaseArticle'}" style='border:0;' @event="handleEvent"></hs-list>
        </TabPane>
    </Tabs>
      
    </Content>

    <hs-modal-form title="新增通知" width='900' v-model="showModalCreate" :form="form" :data="modelArticle" @on-submit="handleSubmit"></hs-modal-form>
  </Layout>
</template>

<script>
export default {
  data(){
    return {
      showModalCreate:false,

      notices:[
       
      ],
      tools:[{
					key: "sync",
					name: "同步",
					icon: "md-plane",
				}]
    }
  },
  computed:{
    form(){
      let f = this.Form('article')
      return {
        layout:`<div style='position:relative;'>

        <Row :gutter='10'>
         
          <Col :span='24'>{{title}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px'>
          <Col :span='24'>{{content}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px'>
          <Col :span='24'>{{files}}</Col>
        </Row>
        
        </div>`,
        def:f.def,
        option:f.option
      }
    },
    toolDisabled(){

    },
    publishedItems(){
      return this.notices.filter(v=>v.state == 2)
    },
    hiddenItems(){
      return this.notices.filter(v=>v.state == 1)
    },
    draftItems(){
      return this.notices.filter(v=>v.state == 0)
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.api.enterprise.LIST_ARTICLES({query:{q:1}}).then(res=>{
        this.notices = res.data.data
      })
    },
    onToolEvent(){

    },
    handleEvent(e){
      console.log(e)
    },
    handleDelete(e){
      this.Confirm("确定删除该通知?",e=>{
        this.api.enterprise.DELETE_ARTICLES({params:{id:e}}).then(res=>{
          this.Success("删除成功")
          let index = this.notices.findIndex(v=>v.id == e)
          this.notices.splice(index,1)
        })
      })
    },
    handleSubmit(e){
      e.article_type = 1
       this.api.enterprise.POST_ARTICLES(e).then(res=>{
        let item = Object.assign({},e,res.data.data)
        this.notices.push(item)
        this.Success("保存成功")
        this.showModalCreate = false
      })
    }
  }
}
</script>

<style>

</style>