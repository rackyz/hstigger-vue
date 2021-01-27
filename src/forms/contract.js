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
    <Row :gutter='10' style='margin-top:10px'>
      <Col :span='12'>{{partA}}</Col>
      <Col :span='12'>{{partB}}</Col>
    </Row>
    <Row :gutter='10'>
      <Col :span='12'>{{file_id}}</Col>
      <Col :span='12'>{{file_assurance}}</Col>
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
        getters: "core/users",
        idKey: "id",
        labelKey: "name"
      }
    },
    partB: {
      label: "乙方名称",
      control: "select",
      option: {
        getters: "core/users",
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
    file_id: {
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
