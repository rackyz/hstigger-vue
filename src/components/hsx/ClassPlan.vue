<template>
  <div class="l-class-plan">
    <Row :gutter="20" style="width:100%;">
      <Col :span="1">
        {{data.index}}
      </Col>
      <Col :span="11">
        {{data.name}}
      </Col>
      <Col :span="4">
        {{data.started_at || '开始时间'}}
      </Col>
       <Col :span="4">
        {{data.finished_at || '结束时间'}}
      </Col>
       <Col :span="4">
        {{data.state || '状态'}}
      </Col>
    </Row>

  </div>
</template>

<script>
export default {
  props:['data']
}
</script>
<style lang="less" scoped>
.l-class-plan{
  width:100%;
  height:60px;
}
</style>