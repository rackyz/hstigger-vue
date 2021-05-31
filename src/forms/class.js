export default {
  layout:`<div>
  
  <Row  :gutter="10"><Col :span="18">{{name}}</Col><Col :span="6">{{charger}}</Col></Row>
  <Row  :gutter="10" style="margin-top:10px"><Col :span="24">{{address}}</Col></Row>
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
        getters:"core/getEntUsers",
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
      label:'头像',
      control:'avatar',
      option:{
        uploader: "file/uploadAvatar",
        w2h:1.5
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

  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}