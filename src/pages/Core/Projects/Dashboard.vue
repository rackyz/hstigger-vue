<template>
  <div class='hs-container hs-container-scroll' style='padding:20px;height:calc(100% - 40px);overflow-y:auto;color:#333;'>
    <Row :gutter='20'>
      <Col :span='6'> <Card style='min-height:600px;'  title="项目概况">

        <img v-lazy="project.avatar" style="width:100%;margin-bottom:10px;" />
        {{project.desc}}
        <p style='margin-top:10px;'>
        技术服务 <b>宁波高专建设监理有限公司</b>
        </p><p>
        参建单位 <b>江北慈城开发投资有限责任公司</b>
        </p>
      </Card></Col>
      <Col :span='18'><Row :gutter="20">
     
      <Col :span='12'>
      <Card style='height:200px;' title="项目通知">
        <div class="flex-wrap flex-between">
          <div>建设中... </div>
          <div>2021/03/12</div>

        </div>
      </Card>
      </Col>
      <Col :span='12'>
      <Card style='height:200px;'  title="项目动态"></Card>
      </Col>
    </Row>
     <Row :gutter="20" style='margin-top:20px;'>
      <Col :span='24'>
      <Card style='height:200px;' title="进度安排"></Card>
      </Col>
    </Row>
    <Row :gutter="20" style='margin-top:20px;margin-bottom:20px;'>
      <Col :span='6'>
      <Card style='height:300px;' title="项目人员"></Card>
      </Col>
      <Col :span='6'>
      <Card style='height:300px;' title="最新资料"></Card>
      </Col>
       <Col :span='6'>
      <Card style='height:300px;' title="合同管理"></Card>
      </Col>
      <Col :span='6'>
      <Card style='height:300px;' title="招标管理"></Card>
      </Col>
    </Row></Col>
    </Row>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      project:{}
    }
  },
  metaInfo:{
    title:'项目概况',
     route:"/:id"
  },
  computed:{
    ...mapGetters('core',['get_project']),
    id(){
      return this.$route.params.id
    },
  },
  mounted(){
    this.api.enterprise.GET_PROJECTS({param:{id:this.id}}).then(res=>{
      let data = res.data.data
      this.project = data
    })
  }

}
</script>

<style>

</style>