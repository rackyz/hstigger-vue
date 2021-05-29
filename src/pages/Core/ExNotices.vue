<template>
  <Layout >
    <Header class="flex-wrap" style="color:#346;padding:0 24px;height:40px;background:#fff;border-bottom:1px solid #dfdfdf;font-size:15px;align-items:center;display:flex;line-height:40px;justify-content:space-between;">
      <span>企业通知</span></Header>
    <Content style="margin:0 auto;width:1200px;">
     <hs-list :data="notices" :option="{tmpl:'BaseArticle'}" style='border:0;height:calc(100% - 60px);background:none;' ></hs-list>
      <div class="flex-wrap" style="justify-content:center;width:100%;">
        <Page  :total="total" show-total @change="getData"/>
        </div>
    </Content>

  </Layout>
</template>

<script>
export default {
  data(){
    return {
      showModalCreate:false,
      total:0,
      page:1,
      notices:[
       
      ],
      tools:[{
					key: "sync",
					name: "同步",
					icon: "md-plane",
				}]
    }
  },
  mounted(){
    this.getCount()
    this.getData()
  },
  methods:{
    getCount(){
      this.api.enterprise.LIST_ARTICLES({query:{q:'notice-count'}}).then(res=>{
        this.total = res.data.data
      })
    },
    getData(page = 1){
      this.api.enterprise.LIST_ARTICLES({query:{q:'notice',page}}).then(res=>{
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