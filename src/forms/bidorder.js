export default {
  title: '招标资料',
  layout: `
  <div style='position:relative;'>

  <Row :gutter='10'>
    <Col :span='8'>{{code}}</Col>
    <Col :span='16'>{{name}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
  <Col :span='24'>{{project_id}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='12'>{{open_bid_date}}</Col>
    <Col :span='12'>{{bid_amount}}</Col>
    
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
   <Col :span='12'>{{down_percent}}</Col>
    <Col :span='12'>{{charger}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
  <Col :span='24'>{{bid_unit}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
  <Col :span='24'>{{desc}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{files}}</Col>
  </Row>
  
  </div>
  `,
  def: {
    code: {
      label: "招标编号",
      control: 'input',
      option: {
        required: true
      }
    },
    name: {
      label: "招标名称",
      control: 'input',

      option: {
        required: true
      }
    },
   

    charger: {
      label: "负责人",
      control: 'select',
      option: {
        getters: 'core/employees',
        idKey: 'id',
        labelKey: 'name'
      }
    },
    project_id: {
      label: "项目名称",
      control: "select",
      option: {
        getters: "core/projects",
        idKey: 'id',
        labelKey: 'name'
      }
    },
    desc: {
      label: "招标详情",
      control: "input",
      option: {
        type: 'textarea',
        height: 100
      }
    },
   
     files: {
       label: '附件',
       control: 'files',
       option: {
         type: 'list',
         required: true,
         uploader: "upload",
         rename: "file/rename",
         uploaderSource: "env"
       }
     },
    open_bid_date:{
      label:"开标日期",
      control:"time",
      option:{
        defaultValue:moment().format('YYYY-MM-DD')
      }
    },
    bid_amount:{
      label:"开标金额",
      control:"input",
      option:{
        type:"amount",
        defaultValue:0
      }
    },
    down_percent:{
      label:'下浮率',
      control:'input',
      option:{
        type:"number",
        defaultValue:0
      }
    },
    bid_unit:{
      label:"中标单位",
      control:'input',
      option:{
        maxlen:128
      }
    }
  },
  option: {
    editable: true
  }
}