<template>
  <div style="padding:20px;">
    <Row :gutter="20">
      <Col :span="6">
      <Card title="合同信息">
        <div>
          <div class="l-salary">
            {{hs.formatSalary(project.amount)}} ( +{{hs.formatSalary(project.adjusted_amount)}})
          </div>
        </div>
      </Card>
      <Card style="margin-top:10px;" title="收费条款">
        {{project.condition_raw}} 
      </Card>
      <Card style="margin-top:10px;" title="其他重要事项">
        {{project.condition_raw}} 
      </Card>
      </Col>
      <Col :span='18'>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters('project',['get']),
    project(){
      return this.get(this.id)
    },
     id(){
    return this.$route.params.id
    },
  },
  metaInfo:{
    title:'项目管理',
     route:"/:id"
  },
}
</script>

<style lang="less">
.l-salary{
  font-size:18px;
}
</style>