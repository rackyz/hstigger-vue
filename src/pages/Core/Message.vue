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
  <Layout>
    <Sider width='300' style='background:#fff;filter:drop-shadow(0 2px 16px #dfdfdf);position:fixed;top:44px;
    bottom:0;'>
      <div class='l-title'><Icon custom='gzicon gzi-mail'></Icon> 系统消息</div>
       <List style='background:#aaa;position:relative;height:calc(100% - 70px);overflow-y:auto;' :loading="loading" >
        <template v-for='item in items'>
          <a  @click='selected=item' :key='item.id'>
        <ListItem :key='item.id' style='padding:10px;'  class='l-msg-item' :class="{'l-msg-item-active':selected==item,'l-msg-item-readed':item.readtime}">
            <ListItemMeta  avatar="https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/avatars/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191105133509.jpg" :title="item.created_at" :description="item.content"   />
        </ListItem></a>
        
         </template>
        
    </List>
     <div class='l-footer'>{{items.length}}条消息, {{items.filter(v=>!v.readtime).length}}条未读</div>
    </Sider>
    <Content>
        <Card class='hs-doc' v-if='selected' style='margin:20px auto;max-width:900px;min-height:900px;border-radius:0;' shadow>

        <div class="header" style='text-align:center;border-bottom:2px dashed #ddd;color:#aaa;'>
            <h4>系统消息</h4>
            <div class='info' style='font-size:12px;margin:10px 0;'>
              <div>发布人 管理员</div>
              <div>发布时间 2020年3月8日</div>

            </div>
        
        </div>
        <transition name='fade'>
          <div class="content" style='padding:20px;font-size:16px;color:#aaa;'>
            {{selected.content}}
          </div>
        </transition>
      </Card>
        <div class="no-content" v-else>
          无内容
        </div>
    </Content>
  </Layout>
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
      this.Request('GET_MESSAGES').then(res=>{
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