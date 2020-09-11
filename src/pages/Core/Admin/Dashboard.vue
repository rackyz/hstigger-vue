<template>
  <Row :gutter='10' style='margin:10px;'>
    <Col :span='4'>
      <Card>
        用户数 {{users.length}}
      </Card>
    </Col>
     <Col :span='4'>
      <Card>
        项目数
      </Card>
    </Col>
     <Col :span='4'>
      <Card>
        任务数
      </Card>
    </Col>
     <Col :span='4'>
      <Card>
        访问人次
      </Card>
    </Col>
     <Col :span='4'>
      <Card>
        云盘容量
      </Card>
    </Col>
     <Col :span='4'>
      <Card>
        系统错误
      </Card>
    </Col>

  </Row>
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