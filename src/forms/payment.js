export default {
  title: '上传资料',
  layout: `<div style='position:relative;'>
  <Row :gutter='10'>
    <Col :span='6'>{{code}}</Col>
    <Col :span='18'>{{desc}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='12'>{{paydate}}</Col>
    <Col :span='12'>{{amount}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='8'>{{dep_id}}</Col>
    <Col :span='8'>{{project_id}}</Col>
    <Col :span='8'>{{contract_id}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{files}}</Col>
  </Row>
  </div>"`,
  def: {
    code: {
      label: "凭证编号",
      control: 'input',
      option: {}
    },
    desc: {
      label: "支付依据",
      control: 'input',
      option: {
        required: true
      }
    },
    project_id: {
      label: "项目",
      control: "select",
      option: {
        getters: "core/projects",
        idKey: 'id',
        labelKey: 'name'
      }
    },
    dep_id: {
      label: "部门",
      control: "select",
      option: {
        getters: "core/deps",
        idKey: 'id',
        labelKey: 'name'
      }
    }, contract_id: {
      label: "合同",
      control: "select",
      option: {
        getters: "core/contracts",
        idKey: 'id',
        labelKey: 'name'
      }
    },
    amount:{
      label:"支付金额",
      control:'input',
      option:{
        type:"amount"
      }
    },
    paydate:{
      label:"支付日期",
      control:"time"
    },
    files: {
      label: '凭证文件',
      control: 'files',
      option: {
        type: 'list',
        required: true,
        uploader: "upload",
        rename: "file/rename",
        uploaderSource: "env"
      }
    }
  },
  option: {
    editable: true,
    hideReset: true
  }
}