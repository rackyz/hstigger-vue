<template>
  <Layout style='width:1200px;margin:0 auto;'>
    <Spin fix v-show="loading">加载中...</Spin>
    <Card style='color:#fff;display:flex;align-items:center;height:150px;background:background: #373B44;
background: -webkit-linear-gradient(to right, #4286f4, #373B44);background: linear-gradient(to right, #4286f4, #373B44);margin-top:5px;border:5px solid #fff;' :padding='30'>
      <hs-avatar style='margin-right:10px' :userinfo="userinfo" size="50"></hs-avatar>  <span style='color:#fff;font-size:25px'>{{userinfo.name}}</span>
    </Card>
     <Tabs value="name1">
        <TabPane label="基本信息" name="name1">
           <div class="group">
          <div class='group-title'>账户信息</div>
          <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='8'><div class='flex-wrap'><div class='seg-label'>用户名</div><div class='seg-value'>{{userinfo.user}}</div></div></Col>
            
             
               <Col :span='6'><div class='flex-wrap'><div class='seg-label'>最近登录</div><div class='seg-value'>{{userinfo.lastlogin_at || "无"}}</div></div></Col>
          </Row>
           <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
              <Col :span='8'><div class='flex-wrap'><div class='seg-label'>创建时间</div><div class='seg-value'>{{userinfo.created_at}}</div></div></Col>
               <Col :span='8'><div class='flex-wrap'><div class='seg-label'>创建人</div><div class='seg-value'>{{userinfo.created_by}}</div></div></Col>
           </Row>
          
          </div>
          <div class="group">
          <div class='group-title'>个人信息</div>
          <Alert type="warning" show-icon style="margin:10px;width:300px;" closable>本信息段只对管理员和个人开放</Alert>
          <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='5'><div class='flex-wrap'><div class='seg-label'>姓名</div><div class='seg-value'>{{userinfo.name}}</div></div></Col>
             <Col :span='4'><div class='flex-wrap'><div class='seg-label'>性别</div><div class='seg-value'>男</div></div></Col>
              <Col :span='6'><div class='flex-wrap'><div class='seg-label'>出生日期</div><div class='seg-value'>1988/03/12</div></div></Col>
               <Col :span='6'><div class='flex-wrap'><div class='seg-label'>年龄</div><div class='seg-value'>29</div></div></Col>
          </Row>
           <Row :gutter="12" style='margin:10px;margin-right:100px;'>
            <Col :span='5'><div class='flex-wrap'><div class='seg-label'>联系电话</div><div class='seg-value'>{{userinfo.phone}}</div></div></Col>
             <Col :span='4'><div class='flex-wrap'><div class='seg-label'>性别</div><div class='seg-value'>男</div></div></Col>
              <Col :span='6'><div class='flex-wrap'><div class='seg-label'>出生日期</div><div class='seg-value'>1988/03/12</div></div></Col>
               <Col :span='6'><div class='flex-wrap'><div class='seg-label'>年龄</div><div class='seg-value'>29</div></div></Col>
               
          </Row>
          </div>
        </TabPane>
        <TabPane label="项目经历(15)" name="name2">标签二的内容</TabPane>
        <TabPane label="培训经历(3)" name="name3">标签三的内容</TabPane>
        <TabPane label="证书(2)" name="name3">标签三的内容</TabPane>
       
    </Tabs>
    
  </Layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      loading:false,
      userinfo:{}
    }
  },
  metaInfo:{
    title:"用户信息",
    route:"/:id"
  },
  computed:{
    user_id(){
    return this.$route.params.id
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      this.loading = true
      this.CORE.GET_USER({param:{id:this.user_id}}).then(res=>{
        this.userinfo = res.data.data
        
      }).finally(e=>{
        this.loading = false
      })

    }
  }
}
</script>
<style lang="less" scoped>
.seg-label{

  margin-right:10px;
  padding:0 10px;
  color:#37d;
  min-width:80px;
  text-align: center;
  border-bottom:2px solid #37d;
}

.group-title{
  margin:10px;
  font-size:16px;
  border-left:10px solid #666;
  background:#333;
  width:120px;
  color:#fff;
  padding-left:10px;
}
</style>