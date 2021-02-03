const moment = require('moment')
export default {
  layout:`<div><Row  :gutter="10">
    <Col :span="24">{{finished_at}}</Col>
    </Row>
    <Row  :gutter="10" style='margin-top:10px'>
    <Col :span="24">{{desc}}</Col>
    </Row>
    <Row  :gutter="10"  style='margin-top:10px'>
    <Col :span="24">{{files}}</Col>
    </Row>
    </div>
  `,
  def: {
    finished_at:{
      label:"完成时间",
      control:"time",
      option:{
        defaultValue:moment().format()
      }
    },
    desc: {
      label: "备注",
      control: "input",
      option: {
        type: 'textarea',
        height: 100
      }
    },
    files: {
      label: '任务成果(支持批量上传)',
      control: 'files',
      option:{
        type:'list',
        required:true,
        uploader:"upload",
        rename:"file/rename",
        uploaderSource:"env"
      }
    }
  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}