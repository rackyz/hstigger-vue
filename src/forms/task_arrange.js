const moment = require('moment')
export default {
  layout: `<div><Row  :gutter="10">
    <Col :span="12">{{started_at}}</Col>
    <Col :span="12">{{plan_finished_at}}</Col>
    </Row>
    <Row  :gutter="10" style='margin-top:10px'>
    <Col :span="24">{{executor}}</Col>
    </Row>
    <Row  :gutter="10"  style='margin-top:10px'>
    <Col :span="24">{{desc}}</Col>
    </Row>
    </div>
  `,
  def: {
    started_at: {
      label: "开始时间",
     control: "time",
      option: {
        defaultValue: moment().format()
      }
    },
    plan_finished_at: {
      label: "完成时间",
     control: "time"
    },
    executor:{
      label:"负责人",
      control:"select",
      option:{
        getters:"core/users",
        idKey:"id",
        labelKey:"name"
      }
    },
    desc:{
      label:"任务描述",
      control:"input",
      option:{
        height:100
      }
    }
  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}