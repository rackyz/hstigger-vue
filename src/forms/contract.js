export default {
  title: '合约信息',
  layout: `<div style='position:relative;'>
    <Row :gutter='10'>
      <Col :span='6'>{{code}}</Col>
      <Col :span='14'>{{name}}</Col>
    </Row>
    <Row :gutter='10' style='margin-top:10px'>
      <Col :span='8'>{{register_date}}</Col>
      <Col :span='8'>{{amount}}</Col>
      <Col :span='8'>{{plan_amount}}</Col>
    </Row>
     <Row :gutter='10' style='margin-top:5px'>
      <Col :span='24'>{{project_id}}</Col>
      </Row>
    <Row :gutter='10' style='margin-top:10px'>
      <Col :span='12'>{{partA}}</Col>
      <Col :span='12'>{{partB}}</Col>
    </Row>
    <Row :gutter='10' style='margin-top:10px'>
      <Col :span='24'>{{file}}</Col>
    </Row>
    <Row :gutter='10' style='margin-top:10px'>
      <Col :span='24'>{{file_assurance}}</Col>
    </Row>
    <Row :gutter='10' style='margin-top:10px'>
     <Col :span='24'>{{pay_condition_raw}}</Col>
    
    </Row>
    <Row :gutter='10' style='margin-top:10px'>
     <Col :span='24'>{{important_raw}}</Col>
    
    </Row>
  </div>`,
  def: {
    code: {
      label: "合约编号",
      control: 'input',
      option: {
        required: true
      }
    },
    name: {
      label: "合约名称",
      control: 'input',

      option: {
        required: true
      }
    },
    register_date: {
      label: '签订日期',
      control: 'time'
    },
    amount: {
      label: "合同金额",
      control: "input",
      option: {
        type: "amount"
      }
    }, project_id: {
      label: "项目名称",
      control: "select",
      option: {
        getters: "core/projects",
        idKey: 'id',
        labelKey: 'name'
      }
    },
    plan_amount:{
       label: "概算金额",
         control: "input",
         option: {
           type: "amount",
           placeholder:"参考批复文件,没有可不填"
         }
    },
    partA: {
      label: "甲方名称",
      control: "select",
      option: {
        getters: "core/enterprises",
        idKey: "id",
        labelKey: "name"
      }
    },
    partB: {
      label: "乙方名称",
      control: "select",
      option: {
        getters: "core/enterprises",
        idKey: "id",
        labelKey: "name"
      }
    },
    comment: {
      label: "备注",
      control: "input",
      option: {
        type: 'textarea',
        height: 100
      }
    },
    pay_condition_raw:{
      label:"付款条件",
      control:"input",
      option:{
        type:"textarea",
        height:200
      }
    },
    important_raw: {
      label: "其他重要条款",
      control: "input",
      option: {
        type: "textarea",
        height: 200
      }
    },
    file: {
      label: "合同文件",

      control: "files",
      option: {
        single: true,
        uploader: "file/upload"
      }
    },
    file_assurance: {
      label: "担保文件",
      control: "files",
      option: {
        uploader: "file/upload"
      }
    },
  },
  option: {
    editable: true
  }
}
