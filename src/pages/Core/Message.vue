<style lang="less">
.l-msg-item-active{
  background:rgb(34, 140, 245);
  color:#fff;

  .ivu-list-item-meta-title,{
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
  <div class="hs-full-container">
    <hs-menu style="width:180px;"></hs-menu>
    
    <Content style='padding-left:180px;'>
      <div class='l-title'><Icon custom='gzicon gzi-mail'></Icon> 系统消息
       <div>{{items.length}}条消息, {{items.filter(v=>!v.readtime).length}}条未读</div></div>
       <div class="l-tool-wrap" style='margin:10px 0;'>
        <Button>删除</Button>
        </div> 
       <hs-table />  
    </Content>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[],
      selected:null,
      loading:false
    }
  },
  metaInfo:{
    title:'我的消息'
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.loading = true
      this.CORE.GET_MESSAGES().then(res=>{
        this.items = res.data.data
      }).finally(e=>{
        this.loading = false
      })
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