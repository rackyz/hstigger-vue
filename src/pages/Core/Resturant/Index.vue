<template>
  <Layout>
    <Header style="color:#fff;font-size:20px;padding:0 20px;background:#123;">
      餐厅管理
    </Header>
    <Layout>
       <Sider width="220" style="background:#234;">
         <div style="width:200px;margin:10px;text-align:center;background:#346;color:#fff;padding:10px;border-radius:5px;text-shadow:1px 1px 1px #333;">
           <div>{{moment().add('day',1).format("LL")}} (明天)</div>
            <div>已定餐人数</div>
           <div style="font-size:30px;font-weight:bold;color:#3ef;">{{orders.length}}</div>
          
         </div>
         <Button type="primary" style="width:200px;height:40px;display:flex;algin-items:center;justify-content:center;line-height:35px;margin:10px;" @click="PatchOrder" v-if="!ordered">
           我要订餐
         </Button>
         <Button type="error" style="width:200px;height:40px;display:flex;algin-items:center;justify-content:center;line-height:35px;margin:10px;" @click="CancelOrder" v-else>
           已预订 (取消)
         </Button>
      </Sider>
      <Content>
          <hs-list :data="users" :option="{tmpl:'BaseUser'}" style="height:100%;background:#dfdfdf;border:none;"></hs-list>
      </Content>
    </Layout>
   
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      orders:[]
    }
  },
  computed:{
    ...mapGetters('core',['uid','users','getUser']),
    ordered(){
      return this.orders.find(v=>v.user_id == this.uid)
    },
    users(){
      return this.orders.map(v=>this.getUser(v.user_id))
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.api.enterprise.LIST_RESTORDERS().then(res=>{
        let orders = res.data.data
        this.orders = orders
      })
    },
    PatchOrder(){
      this.api.enterprise.POST_RESTORDERS().then(res=>{
        let updateInfo = res.data.data
        this.orders.splice(0,0,{user_id:this.uid,id:updateInfo[0]})
        this.Success("预定成功")
      }).catch(e=>{
        this.Error(e)
      })
    },
    CancelOrder(){
      let index = this.orders.findIndex(v=>v.user_id == this.uid)
      if(index == -1)
        return
      let id = this.orders[index].id
      this.api.enterprise.DELETE_RESTORDERS({param:{id}}).then(res=>{
        this.orders.splice(index,1)
        this.Success("已取消")
      }).catch(e=>{
        this.Error(e)
      })
    }
  }
}
</script>

<style>

</style>