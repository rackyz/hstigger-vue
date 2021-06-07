const moment = require("moment")
export default {
  layout:`<div>
  
  <Row  :gutter="10"><Col :span="18">{{name}}</Col><Col :span="6">{{charger}}</Col></Row>
  <Row  :gutter="10" style="margin-top:10px"><Col :span="24">{{address}}</Col></Row>
  <Row  :gutter="10" style="margin-top:10px"><Col :span="12">{{started_at}}</Col><Col :span="12">{{finished_at}}</Col></Row>
  <Row :gutter="10" style="margin-top:10px"><Col :span="8" style="height:150px">{{avatar}}</Col>
  <Col :span="16">{{desc}}</Col></Row>
  
  </div>`,
  def: {
    
    name: {
      label: "培训名称",
      control: "input",
      option: {
        maxlen: 64,
        required: true
      }
    },
    charger: {
      label: "负责人",
      control: "select",
      option: {
        group_labeled:true,
        getters: "core/getEntUsers",
        labelKey:"name",
        idKey:"id",
        filterable:true
      }
    },
    address: {
      label: "培训地点",
      control: "input",
      option: {
        maxlen: 128,
      }
    },
    avatar:{
      label:'封面图片',
      control:'avatar',
      option:{
        uploader: "file/uploadAvatar",
        w2h:1.5
      }
    },
    started_at:{
      label: '开始',
        control: 'time',
        option:{
         defaultValue:moment().format("YYYY-MM-DD HH:mm:ss")
        }
    },
    finished_at:{
        label: '结束',
          control: 'time'
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

  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}