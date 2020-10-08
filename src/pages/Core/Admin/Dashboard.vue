<template>
<div>
  <Row :gutter='10' style='margin:10px 5px;'>
    <Col :span='4'>
      <Card style='height:80px;'>
        用户数 {{users.length}}
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
      <Card style='height:300px;'>系统公告</Card>
    </Col>
     <Col :span='16'>
      <Card style='height:300px;'>系统状态</Card>
    </Col>
  </Row>
  <Row :gutter='10' style='margin:10px 5px;'>
    <Col :span='8'>
      <Card style='height:300px;'>敏感操作</Card>
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
    ...mapGetters('admin',['users'])
  }
}
</script>

<style>

</style>