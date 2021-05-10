const moment = require('moment')
export default {
  layout: `<div><Row  :gutter="10">
    <Col :span="6">{{time}}</Col>
    <Col :span="18">{{name}}</Col>
    </Row>
    <Row  :gutter="10" style='margin-top:10px'>
    <Col :span="24">{{desc}}</Col>
    </Row>
    <Row  :gutter="10"  style='margin-top:10px'>
    <Col :span="24">{{file}}</Col>
    </Row>
    <Row  :gutter="10"  style='margin-top:10px'>
    <Col :span="24">{{extras}}</Col>
    </Row>
    </div>
  `,
  def: {
    time: {
      label: "时间",
      control: "time",
      option: {
        defaultValue: moment().format('YYYY-MM-DD')
      }
    },
    name: {
      label: "问题名称",
      control: "input",
    },
    desc: {
      label: "问题描述",
      control: "input",
      option: {
        type: 'textarea',
        height: 100
      }
    },
    file: {
      label: '审计取证单',
      control: 'files',
      option: {
        single:true,
         uploader: "file/upload"
      }
    },
    extras: {
      label: '其他附件',
      control: 'files',
      option: {
        single: true,
        uploader: "file/upload"
      }
    }
  },
  option: {
    hideReset: true
  }
}