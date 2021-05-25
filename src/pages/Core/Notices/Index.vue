<style lang="less">
.l-msg-item-active{
  background:rgb(34, 140, 245);
  color:#fff;

  .ivu-list-item-meta-title{
    color:#fff;
  }

  .ivu-list-item-meta-description{
    color:#dfdfdf;
    font-size:13px;
    line-height:16px;
  }
}

.no-padding-collapse{
  .ivu-collapse-content{
    padding:0;
  }

  .ivu-collapse-content-box{
    padding:0;
  }
}
</style>
<template>
  <Layout style='flex-direction:row;overflow:hidden;'>
    <hs-menu  :data="menus" style='min-width:160px;width:160px;padding-bottom:60px;padding:0;border-right:1px solid #dfdfdf;background:#123;color:#fff;' @on-select='onClickMenu' :current="ActivePath">
      <div slot='title' style="padding:10px;padding-top:10px;font-size:16px;font-weight:bold;text-shadow:none !important;">
          消息中心
       </div>
    </hs-menu>
     <Content>
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
      </Content>
  </Layout>
</template>

<script>
export default {
  data(){
    return {
      items:[],
      selected:null,
      loading:false,
       menus:[{
          name:'通知消息',
          icon:"mail",
           path:'/core/notices/dashboard',
        },
        {
          name:'订阅管理',
          icon:"share",
           path:'/core/notices/rss'
        }]
    }
  },
  computed:{
    MenuMap(){
      let map = {}
      this.menus.forEach(v=>{
        map[v.path] = v
        if(Array.isArray(v.subs)){
          v.subs.forEach(s=>{
            map[s.path] = s
          })
        }
      })
      return map
    },
    ActiveMenu(){
      return this.MenuMap[this.ActivePath]
    },
    ActivePath(){
      return this.$route.path
    },
  },
  metaInfo:{
    title:'我的消息'
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      // this.loading = true
      // this.api.enterprise.LIST_MESSAGES().then(res=>{
      //   this.items = res.data.data
      // }).finally(e=>{
      //   this.loading = false
      // })
    },
    
    onClickMenu(e){
      this.RouteTo(e)
    }
  }
}
</script>
<style lang="less" scoped>

.l-msg-item{
  background:#fff;
}

.l-msg-item:hover{
  background:rgb(245, 245, 205);
  transition: all 0.3s;
  cursor: pointer;
  filter:none !important;
}

.l-msg-item-readed{
  filter:grayscale(1);
  background:linear-gradient(to right bottom,#fff,#ddd);
}

.l-msg-item-active{
  background:rgb(34, 140, 245);
}


.l-msg-item-active:hover{
  background:rgb(34, 140, 245);
  color:#fff;
  cursor:arrow;
}

.l-title{
  height:40px;
  padding:0 10px;
  display: flex;
  background:#23334c;
  color:#fff;
  align-items: center;
  border-top:1px solid #000;
  i{
    margin-right:5px;
  }
}


.l-footer{
  height:30px;
   background:#23334c;
   color:#fff;
   text-align:center;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size:12px;
}

</style>