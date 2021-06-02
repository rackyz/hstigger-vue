import moment from 'moment'
export default {
  layout: `<div>
  
  <Row  :gutter="10"><Col :span="24">{{name}}</Col></Row>
  
  <Row :gutter="10" style="margin-top:10px">
  <Col :span="12">{{started_at}}</Col><Col :span="12">{{deadline}}</Col>
  </Row>
 
  <Row :gutter="10" style="margin-top:10px">
  <Col :span="24">{{desc}}</Col>
  </Row>
  
  </div>`,
  def: {
    name: {
      label: "考核名称",
      control: "input",
      option: {
        maxlen: 64,
        required: true,
        placeholder: "填写课程名称"
      }
    },
    desc: {
      label: "考核内容",
      control: "input",
      option: {
        type: "textarea",
        maxlen: 1024,
        height: 150
      }
    },
    started_at: {
      label: "开始",
      control: "time",
      option: {
        defaultValue: moment().format("L")
      }
    },
     deadline: {
       label: "截止日期",
       control: "time",
       option: {
         defaultValue: moment().format("L")
       }
     }

  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}