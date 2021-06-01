export default {
  layout:`<div>
  
  <Row  :gutter="10"><Col :span="18">{{name}}</Col><Col :span="6">{{charger}}</Col></Row>
  <Row  :gutter="10" style="margin-top:10px"><Col :span="24">{{address}}</Col></Row>
  <Row :gutter="10" style="margin-top:10px"><Col :span="8" style="height:150px">{{avatar}}</Col>
  <Col :span="16">{{desc}}</Col></Row>
  
  </div>`,
  def: {
    
    name: {
      label: "课程名称",
      control: "input",
      option: {
        maxlen: 64,
        required: true
      }
    },
    address: {
      label: "培训地点",
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
    duration:{
      label:"培训时段",
      control:"time",
      option:{
        type:"duration"
      }
    },
    state:{
      label:"状态",
      control:"select",
      option:{
        getters:"core/getTypes",
        getters_key:"TASK_STATE",
        idKey:'value'
      }
    }

  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}