const moment = require('moment')
export default {
  title: '项目基本情况',
  layout: `
  <div style='position:relative;'>

  <Row :gutter='10'>
    <Col :span='10'>{{employee_id}}</Col>
    <Col :span='8'>{{position_id}}</Col>
    <Col :span='6'>{{factor}}</Col>
  </Row>
   <Row :gutter='10' style='margin-top:10px'>
    <Col :span='8'>{{inDate}}</Col>
    <Col :span='8'>{{outDate}}</Col>
  </Row>
   <Row :gutter='10' style='margin-top:10px'>
    <Col :span='8'>{{trainee}}</Col>
    <Col :span='16'>{{comment}}</Col>
  </Row>
  </div>
  `,
  def: {
    employee_id: {
      label: "调入人员",
      control: 'select',
      option: {
        required:true,
        getters: 'core/employees',
        idKey: 'id',
        labelKey: 'name'
      }
    },
    position_id:{
      label:"项目岗位",
      control:"select",
      option:{
        getters: 'core/getRoles',
       key:12,
        idKey:'id',
        labelKey:'name'
      }
    },
    factor: {
      label: "系数",
      control: "input",
      option: {
        type: 'number',
        max:1,
        defaultValue:1.0
      }
    },
    inDate:{
      label:"调入日期",
      control:'time',
      option:{
        defaultValue:moment().format('YYYY-MM-DD')
      }
    },
     outDate: {
       label: "调出日期",
       control: 'time',
       option: {

       }
     },
    trainee:{
      label:"是否实习生",
      control:"select",
      option:{
        options:['否','是'],
        defaultValue:0
        
      }
    },
    comment:{
      label:"备注",
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