import moment from 'moment'
export default {
  layout:`<div>
  
  <Row  :gutter="10"><Col :span="24">{{name}}</Col></Row>
  
  <Row :gutter="10" style="margin-top:10px">
  <Col :span="12">{{started_at}}</Col><Col :span="6">{{duration}}</Col><Col :span="6">{{state}}</Col></Row>
  <Row  :gutter="10" style="margin-top:10px"><Col :span="24">{{address}}</Col></Row>
  <Row :gutter="10" style="margin-top:10px">
  <Col :span="24">{{desc}}</Col></Row>
  
  </div>`,
  def: {
    
    name: {
      label: "课程名称",
      control: "input",
      option: {
        maxlen: 64,
        required: true,
        placeholder:"填写课程名称"
      }
    },
    address: {
      label: "培训地点(和主地点无变更可不填)",
      control: "input",
      option: {
        maxlen: 128,
      }
    },
    desc: {
      label: "内容简介",
      control: "input",
      option: {
        type:"textarea",
        maxlen: 1024,
        height:150
      }
    },
    started_at:{
      label:"培训时间",
      control:"time",
      option:{
        defaultValue:moment().format("L")
      }
    },
    duration:{
      label:"时长(小时)",
      control:"input",
      option:{
        type:"number",
        defaultValue:3
      }
    },
    state:{
      label:"状态",
      control:"select",
      option:{
        getters:"core/getTypes",
        key:"TASK_STATE",
        idKey:'value',
        labelKey:'name',
        defaultValue:0
      }
    }

  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}