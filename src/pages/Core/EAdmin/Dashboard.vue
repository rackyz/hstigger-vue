<template>
<div class='hs-container hs-container-scrollable'>
  <Row :gutter='10' style='margin:10px 5px;'>
    <Col :span='4'>
      <Card style='height:80px;'>
        员工数 {{users.length}}
      </Card>
    </Col>
     <Col :span='4'>
      <Card  style='height:80px;'>
        项目数
      </Card>
    </Col>
     <Col :span='4'>
      <Card  style='height:80px;'>
        任务数
      </Card>
    </Col>
     <Col :span='4'>
      <Card  style='height:80px;'>
        访问人次
      </Card>
    </Col>
     <Col :span='4'>
      <Card  style='height:80px;'>
        云盘容量
      </Card>
    </Col>
     <Col :span='4'>
      <Card  style='height:80px;'>
        系统错误
      </Card>
    </Col>

  </Row>
  <Row :gutter='10' style='margin:10px 5px;'>
    <Col :span='8'>
      <Card style='height:300px;'> <h3>系统公告</h3>
        <p><b>企业信息平台</b>是我司独立开发的企业级数据管理平台，基于数字化理念，建立的企业多端一体化平台。目前仍处于开发阶段，感谢大家参与体验，提出宝贵的意见和建议！</p>
        <p>目前可以使用的模块有： <b>用户管理</b>、<b>部门管理</b>、<b>角色权限</b>、<b>项目管理</b>、<b>任务管理</b>、<b>流程管理</b>、<b>文件管理</b></p>
        <p>当前正在开发的模块有：<c>项目管理/成本管理</c>、<c>任务拆分</c>、<c>RSS订阅及自定义模块</c></p>

      </Card>
    </Col>
     <Col :span='16'>
      <Card style='height:300px;'>
        <h3>系统说明</h3>
        <p>
          1.鉴于企业数据隐私和安全考虑，企业采用独立的数据库存储，包括项目、任务、流程、记录等业务数据以及相关人员的档案数据。可采用平台提供的统一数据库的单独库，或者自建数据库（远程绑定可能会增加访问延迟）。数据安全性方案，一是管理员采用数据库级别的角色权限（仅有管理员可以远程查看数据库的数据，其他人员均无权查看，包括平台工程师），二是关键数据采用管理员私钥进行加密。COS存储同数据库处理。
           <br>
         2.企业后台对企业内部数据具有绝对的权限，但所有操作均会保留操作的历史记录，同时可以撤回。正常业务操作是不需要后台进行操作，后台系统的使用场景主要为，账号管理，部门组织结构，角色权限分配，强制性的数据操作，以及企业个性化配置等等。
          <br>
          3.企业对外部用户的邀请，或者用户对企业的申请加入是需要双方同时同意的
          <br>
          4.企业的注销，管理员申请注销企业，由平台工作人员进行审核处理，企业所有数据保留15日后删除
        </p>

      </Card>

    </Col>
  </Row>
  <Row :gutter='10' style='margin:10px 5px;'>
    <Col :span='8'>
      <Card style='height:300px;'>操作记录</Card>
    </Col>
     <Col :span='8'>
      <Card style='height:300px;'>工作流监控</Card>
    </Col>
    <Col :span='8'>
      <Card style='height:300px;'>系统状态</Card>
    </Col>
  </Row>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  metaInfo:{
    title:'后台',
    group:'Admin'
  },
  computed:{
    ...mapGetters('entadmin',['users'])
  }
}
</script>

<style lang="less">
h3{
  font-size:20px;
  margin:5px 0;
}

b{
  color:rgb(46, 175, 255);
}
c{
  color:orange;
  font-weight: bold;
}
</style>