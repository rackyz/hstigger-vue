<style lang="less">
.user-tab{
  width:100%;
  .ivu-tabs-nav-wrap{
    background:#fff;
    width:100%;
    border-bottom:2px solid #aaa;
    z-index:100;
  }
  .ivu-tabs-nav-scroll{
     box-shadow: 1px 1px 1px #333;
  }
  .ivu-tabs-content{
    position: relative;
    height:calc(100% - 60px);
  }
  .ivu-tabs-tabpane{
    height:100%;
    background:linear-gradient(to bottom right,#eee,#fff);
    overflow-y:auto;
  }
}
</style>
<template>
  <Layout style='background:#dfdfdf;'>
    <Spin fix v-show="loading">加载中...</Spin>
    <Sider width='285' style="padding:15px;">
        <hsx-employee style='margin-right:10px;background:#ffffff55;' :nohover='true' :data="userinfo" size="50"></hsx-employee>

        <div class="section">
          <h2>所在项目</h2>
        </div>


        <div class="section">
          <h2>近期工作</h2>
        </div>

        <div class="section">
          <h2>个人动态</h2>
        </div>

    </Sider>
    
     <Tabs :value="tabIndex" class="user-tab" :animated="false" v-if="ready" @on-click="cacheTabIndex">
        <TabPane label="档案" name="profile" >
          
          <div class="group">
          <div class='group-title'>基本情况 <span class='warning'>(本信息段只对管理员和个人开放)</span></div>
          
          <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'><div class='seg-label'>姓名</div><div class='seg-value'>{{userinfo.name}}</div></div></Col>
             <Col :span='6'><div class='flex-wrap'><div class='seg-label'>性别</div><div class='seg-value'>{{getTypeName('Gender',userinfo.gender)}}</div></div></Col>
              <Col :span='6'><div class='flex-wrap'><div class='seg-label'>出生日期</div><div class='seg-value'>{{FormatDate(userinfo.birthday)}}</div></div></Col>
               <Col :span='6'><div class='flex-wrap'><div class='seg-label'>年龄</div><div class='seg-value'>{{yearsold}}</div></div></Col>
          </Row>
           <Row :gutter="12" style='margin:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'><div class='seg-label'>籍贯</div><div class='seg-value'>{{userinfo.native_place}}</div></div></Col>
             <Col :span='6'><div class='flex-wrap'><div class='seg-label'>婚姻状况</div><div class='seg-value'>{{getTypeName('MaritalStatus',userinfo.marital_status)}}</div></div></Col>
              <Col :span='6'><div class='flex-wrap'><div class='seg-label'>政治面貌</div><div class='seg-value'>{{getTypeName('PoliticalStatus',userinfo.political_status)}}</div></div></Col>
              
               
          </Row>
           <Row :gutter="12" style='margin:10px;margin-right:100px;'>
              <Col :span='6'><div class='flex-wrap'><div class='seg-label'>电话</div><div class='seg-value'>{{userinfo.phone}}</div></div></Col>
            <Col :span='6'><div class='flex-wrap'><div class='seg-label'>QQ</div><div class='seg-value'>{{userinfo.qq}}</div></div></Col>
             <Col :span='6'><div class='flex-wrap'><div class='seg-label'>EMAIL</div><div class='seg-value'>{{userinfo.email}}</div></div></Col>
             
              
               
          </Row>
           <Row :gutter="12" style='margin:10px;margin-right:100px;'>
              <Col :span='24'><div class='flex-wrap'><div class='seg-label'>家庭住址</div><div class='seg-value'>{{userinfo.address}}</div></div></Col>
            
             
              
               
          </Row>
          <Row :gutter="12" style='margin:10px;margin-right:100px;'>
              <Col :span='6'><div class='flex-wrap'><div class='seg-label'>紧急联系人</div><div class='seg-value'>{{userinfo.emergency_contact}}</div></div></Col>
               <Col :span='6'><div class='flex-wrap'><div class='seg-label'>紧急联系电话</div><div class='seg-value'>{{userinfo.emergency_phone}}</div></div></Col>
            
             
              
               
          </Row>
            <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'>
              <div class='seg-label'>家庭成员</div></div></Col></Row>
              <hsx-datasetview style='margin:0 15px;margin-top:10px;margin-right:100px;' :columns="family_contact_dataset_def" :data="userinfo.family_contact" />
         
          </div>
            <div class="group">
          <div class='group-title'>工作信息 </div>
             <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'><div class='seg-label'>入职时间</div><div class='seg-value'>{{FormatDate(userinfo.employee_date)}}</div></div></Col>
             <Col :span='6'><div class='flex-wrap'><div class='seg-label'>当前部门</div><div class='seg-value'>{{getDeps(userinfo.deps)}}</div></div></Col>
              
               
              </Row>
                <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'>
              <div class='seg-label'>工作经历</div></div></Col></Row>
              <hsx-datasetview style='margin:0 15px;margin-top:10px;margin-right:100px;' :columns="work_history_dataset_def" :data="userinfo.work_history" />
          </div>
            <div class="group">
          <div class='group-title'>教育情况 </div>
            <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'><div class='seg-label'>学历</div><div class='seg-value'>{{getTypeName('Education',userinfo.education)}}</div></div></Col>
             <Col :span='6'><div class='flex-wrap'><div class='seg-label'>学位</div><div class='seg-value'>{{getTypeName('Degree',userinfo.degree)}}</div></div></Col>
              <Col :span='6'><div class='flex-wrap'><div class='seg-label'>所学专业</div><div class='seg-value'>{{userinfo.major}}</div></div></Col>
               
              </Row>
                <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'><div class='seg-label'>毕业时间</div><div class='seg-value'>{{FormatDate(userinfo.graduate_time)}}</div></div></Col>
             <Col :span='12'><div class='flex-wrap'><div class='seg-label'>毕业院校</div><div class='seg-value'>{{userinfo.graduate_institution}}</div></div></Col>
               
              </Row>
            <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'>
              <div class='seg-label'>教育经历</div></div></Col></Row>
              <hsx-datasetview style='margin:0 15px;margin-top:10px;margin-right:100px;' :columns="education_school_dataset_def" :data="userinfo.education_history" />
          </div>
           
           
        </TabPane>
        <TabPane label="能力*(2)" name="ability">标签三的内容</TabPane>
        <TabPane label="任务(2)" name="task">标签三的内容</TabPane>
        <TabPane label="项目(15)" name="project">标签二的内容</TabPane>
        <TabPane label="培训(3)" name="study">标签三的内容</TabPane>
        <TabPane label="薪酬*(2)" name="salary">标签三的内容</TabPane>
        <TabPane label="劳务合同(2)" name="contract">标签三的内容</TabPane>
        <TabPane label="福利待遇*(2)" name="goody">标签三的内容</TabPane>
        <TabPane :label="`考核*(${appraises.length})`" name="check" v-if="session.my_deps.includes(48110048)">
          <div class="group" v-for="a in appraises" :key='a.id'>
             <div class='group-title'>{{a.desc}} <span class='warning'>(本信息段只对管理层)</span></div>
            <hsx-appraise :data="a"  />
          </div>
        </TabPane>
        <TabPane :label="`证书(${userinfo.certifacitons?userinfo.certifacitons.length:0})`" name="cert">
           <div class="group">
              <div class='group-title'>证书情况</div>
              <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='6'><div class='flex-wrap'>
              <div class='seg-label'>证书台账</div></div></Col></Row>
              <hsx-datasetview style='margin:0 15px;margin-top:10px;margin-right:100px;' :columns="certifications_dataset_def" :data="userinfo.certifications || []" />
          </div>
          
           
        </TabPane>
         <TabPane label="系统*" name="system">
             <div class="group">
               
          <div class='group-title'>账户信息</div>
         
          <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='12'><div class='flex-wrap'><div class='seg-label'>用户名</div><hs-avatar :userinfo="userinfo" size="30" style="margin-right:10px" /><div class='seg-value'>  {{userinfo.user}}</div></div></Col>
            
             
               <Col :span='12'><div class='flex-wrap'><div class='seg-label'>最近登录</div><div class='seg-value'>{{FormatTime(userinfo.lastlogin_at)}}</div></div></Col>
          </Row>
           <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
              <Col :span='12'><div class='flex-wrap'><div class='seg-label'>创建时间</div><div class='seg-value'>{{FormatTime(userinfo.created_at)}}</div></div></Col>
               <Col :span='12'><div class='flex-wrap'><div class='seg-label'>创建人</div><div class='seg-value'>{{userinfo.created_by}}</div></div></Col>
           </Row>
            <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
              <Col :span='12'><div class='flex-wrap'><div class='seg-label'>账号类型</div><div class='seg-value'>{{getTypeName('AccountType',userinfo.type)}}</div></div></Col>
               <Col :span='12'><div class='flex-wrap'><div class='seg-label'>账号状态</div><div class='seg-value'>{{getTypeName('EntStateType',userinfo.locked)}}</div></div></Col>
           </Row>
           <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
              <Col :span='12'><div class='flex-wrap'><div class='seg-label'>绑定手机</div><div class='seg-value'>{{getTypeName('AccountType',userinfo.phone)}}</div></div></Col>
               
           </Row>
          
          </div>
<div class="group">
          <div class='group-title'>权限信息</div>
         
          
          </div>

           <div class="group">
          <div class='group-title'>关联平台</div>
         
          <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='12'><div class='flex-wrap'><div class='seg-label'>钉钉</div><div class='seg-value'>  {{userinfo.ding_id}}</div></div></Col>
            
             
          </Row>
           <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
            <Col :span='12'><div class='flex-wrap'><div class='seg-label'>高专项目管理</div><div class='seg-value'>  {{userinfo.zzl_id}}</div></div></Col>
            <Col :span='12'><div class='flex-wrap'><div class='seg-label'>账户名</div><div class='seg-value'>  {{userinfo.user}}</div></div></Col>
           
             
          </Row>
           <Row :gutter="12" style='margin:0 10px;margin-top:10px;margin-right:100px;'>
               <Col :span='12'><div class='flex-wrap'><div class='seg-label'>微信</div><div class='seg-value'>  {{userinfo.wechat_id}}</div></div></Col>
                <Col :span='12'><div class='flex-wrap'><div class='seg-label'>QQ</div><div class='seg-value'>  {{userinfo.wechat_id}}</div></div></Col>
               </Row>
          </div>

         </TabPane>
       
    </Tabs>
    
  </Layout>
</template>

<script>
import {mapGetters} from 'vuex'
import EmployeeForm from '@/forms/employee'
export default {
  data(){
    return {
      loading:false,
      ready:false,
      tabIndex:"profile",
      appraises:[],
      userinfo:{}
    }
  },
  metaInfo:{
    title:"用户信息",
    route:"/:id"
  },
  props:['id'],
  computed:{
    ...mapGetters('core',['session','getTypes','deps','roles']),
   
    user_id(){
      return this.$route.params.id || this.id
    },
    yearsold(){
      return Math.ceil(moment.duration(moment() - moment(this.userinfo.birthday)).as('years'))
    },
    education_school_dataset_def(){
      return EmployeeForm.def.education_history.option.columns
    },
    family_contact_dataset_def(){
       return EmployeeForm.def.family_contact.option.columns
    },
    certifications_dataset_def(){
       return EmployeeForm.def.certifications.option.columns
    },
    work_history_dataset_def(){
       return EmployeeForm.def.work_history.option.columns
    }
  },
  mounted(){
    let index = localStorage.getItem('user_tab_index')
    if(index)
      this.tabIndex = index
    this.getData()
  },
  methods:{
    cacheTabIndex(name){
      localStorage.setItem('user_tab_index',name)
    },
    getDeps(dep_ids){
      let deps = '暂无部门'
      if(Array.isArray(dep_ids)){
        deps = dep_ids.map(v=>{
          let d = this.deps.find(d=>d.id == v)
          if(d)
            return d.name
          else
            return null
        }).filter(v=>v).join(', ')
      }
      return deps
    },
     getTypeName(key,val){
      let types = this.getTypes(key)
      let t = types.find(v=>v.value == val)
      if(t)
        return t.name
      else
        return '无'
    },
    FormatDate(d){
      if(!d)
        return '-'
      return moment(d).format("L")
    },
    FormatTime(t){
      if(!t)
        return '-'
      let offset = moment.duration(moment()-moment(t)).as('days')
      if(offset < 3)
        return moment(t).fromNow()
      else 
        return moment(t).format('LL')
    },
    getData(){
      this.loading = true
      this.api.enterprise.GET_EMPLOYEES({param:{id:this.user_id}}).then(res=>{
        this.userinfo = res.data.data
        this.$nextTick(e=>{
          this.ready = true
        })
        
      }).finally(e=>{
        this.loading = false
      })

      this.api.enterprise.LIST_A_FLOWS({query:{user_id:this.user_id}}).then(res=>{
        this.appraises = res.data.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.group{
  max-width:1200px;
  background:#fff;
  margin:5px;
  padding:5px;
  padding-bottom:20px;
}
.seg-label{

  margin-right:10px;
  padding:2px 10px;
  min-width:80px;
  text-align: center;
  background:#515a6e;
  color:#fff;
}

.group-title{
  margin:0 10px;
  font-size:16px;
  border-bottom:2px solid #aaa;
  margin-bottom:20px;
  max-width:90%;
  color:#333;
  padding:10px;
}

.section{
  color:#fff;
  padding:10px;
  margin-top:10px;
  h2{
    font-size:14px;
    border-bottom:1px solid #aaa;
    padding-bottom:5px;
  }
}

.warning{
  color:darkred;
  font-size:12px;
}
</style>