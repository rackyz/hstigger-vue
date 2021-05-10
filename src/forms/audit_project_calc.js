export default {
  title: '项目审计基本情况',
  layout: `
  <div style='position:relative;'>
  
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='8'>{{contract_calc_mode}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{contract_calc_method}}</Col>
  </Row>
   <Row :gutter='10' style='margin-top:10px'>
    <Col :span='8'>{{amount}}</Col>
     <Col :span='8'>{{contract_adjust_amount}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{contract_split_amounts}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{contract_calc_fomula}}</Col>
  </Row>
  
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{contract_adjust_records}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px' >
    <Col :span='24'>{{contract_addition_records}}</Col>
  </Row>
  </div>`,
  def:{
    contract_calc_mode:{
      label:"合同形式",
      control:"select",
      option:{
        options:['单价包干','文件下浮','单价','下浮率']
      }
    },
    contract_calc_method:{
      label:"合同结算办法",
      control:"input",
      option:{
        type:"textarea",
        height:100
      }
    },
    amount:{
      label:'合同金额',
      control:'input',
      option:{
        type:'amount'
      }
    },
    contract_split_amounts:{
      label:"合同分项金额",
      control:'dataset',
      option:{
        columns:[{
          key:"name",
          label:"分项名称",
          span:10,
          control:"input"
        },{
          key:"amount",
          label:"金额",
          control:"input",
          span:6,
          option:{
            type:'amount'
          }
        },{
          key:"note",
          label:"备注",
          control:'input',
          span:8
        }]
      }
    },
    contract_calc_fomula:{
      label:"合同计算公式",
      control:'input'
    },
    contract_adjust_amount:{
      label:"合同增加金额",
      control:'input',
      option:{
        type:"amount"
      }
    },
    contract_adjust_records:{
      label:"增减原因",
      control:"dataset",
      option:{
        columns: [{
              key: "time",
              label: "日期",
              control: 'time',
              span: 4
            }, {
          key:"name",
          label:"原因",
          control:'input',
          span:8
        },{
          key:'amount',
          label:"金额",
          control:"input",
          span:4,
          option:{
            type:"amount"
          }
        },{
          key:'note',
          label:"备注",
          control:'input',
          span:8
        }]
      }
    },
    contract_addition_records:{
      label:"补充合同主要内容",
      control:"dataset",
      option:{
        columns: [{
          key: "time",
          label: "日期",
          control: 'time',
          span: 4
        }, {
          key: "content",
          label: "内容",
          control: 'input',
          span: 12
        }, {
          key: "note",
          label: "备注",
          control: 'input',
          span: 8
        }, ]
      }
    }

  },
  option:{
    editable:true
  }
}
