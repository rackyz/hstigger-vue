<template>
  <div class='hs-container hs-container-scroll' style='padding:20px;height:calc(100% - 40px);overflow-y:auto;color:#333;'>
    <Row :gutter='20'>
      <Col :span='6'> <Card style='min-height:600px;'  title="项目概况">

        <img :src="project.avatar || ''" style="width:100%;margin-bottom:10px;" />
        {{project.desc}}
        <p style='margin-top:10px;'>
        技术服务 <b>宁波高专建设监理有限公司</b>
        </p><p>
        参建单位 <b>江北慈城开发投资有限责任公司</b>
        </p>
      </Card>
      
      <Card style='margin-top:10px;'  title="合同概况">

        业主单位，金额，收费条款，其他重要事项，调整与变更
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
      <Card style='height:200px;' title="进度安排">
          <Steps :current="1">
        <Step title="前期准备">
          <div slot='content'>
            253 / 245 
            <div>
              ...
            </div>
            <div>
              <Icon type='md-checkmark' /> 现场踏勘
            </div>
          </div>

        </Step>
        <Step title="桩基" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
         <Step title="待进行" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
    </Steps>

      </Card>
      </Col>
    </Row>
    <Row :gutter="20" style='margin-top:20px;margin-bottom:20px;'>
      <Col :span='6'>
      <Card style='height:300px;' title="项目人员" padding="5">
         <hs-list style="position:relative;border:none;"  :data="employees" :option="{tmpl:'BaseEmployeeDetail'}" />
      </Card>
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

    }
  },
  metaInfo:{
    title:'项目概况',
     route:"/:id"
  },
  computed:{
    ...mapGetters('project',['get']),
    id(){
      return this.$route.params.id
    },
    project(){
      return this.get(this.id) || {}
    },
     employees(){
       let employee = {}
       let items = this.project.records || []
       items.forEach(v=>{
         if(employee[v.employee_id]){
           employee[v.employee_id].hr += v.hr = this.calcHr(v)
           if(moment(employee[v.employee_id].inDate).isBefore(moment(v.inDate))){
             employee[v.employee_id].inDate = v.inDate
             
             employee[v.employee_id].outDate = v.outDate
             employee[v.employee_id].factor = v.factor
             employee[v.employee_id].position_id = v.position_id 
           }
         }else{
            employee[v.employee_id] = {}
            employee[v.employee_id].employee_id = v.employee_id
            employee[v.employee_id].hr = v.hr = this.calcHr(v)
             employee[v.employee_id].factor = v.factor
            employee[v.employee_id].inDate = v.inDate
            employee[v.employee_id].outDate = v.outDate
            employee[v.employee_id].position_id = v.position_id 
         }
       })

       return Object.values(employee).filter(v=>!v.outDate)
     },
  }
  ,methods:{
    calcHr(data){
        let duration = moment.duration((data.outDate?moment(data.outDate):moment()) - moment(data.inDate)).as('month')
        return duration * data.factor
     },
  }
}
</script>

<style>

</style>