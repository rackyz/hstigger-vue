export default {
  title: '项目审计基本情况',
  layout: `
  <div style='position:relative;'>
  
  <Row :gutter='10'>
    <Col :span='8'>{{service_started_at}}</Col>
    <Col :span='8'>{{service_finished_at}}</Col>
  </Row>
  <div style="margin-top:5px;color:#888;">总包分包执行情况</div>
  <Row :gutter='10' style='margin-top:5px'>
    <Col :span='8'>{{main_contractor_started_at}}</Col>
    <Col :span='8'>{{main_contractor_finished_at}}</Col>
    
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
     <Col :span='8'>{{main_contract_attached}}</Col>
  </Row>

   <Row :gutter='10' style='margin-top:10px'>
     <Col :span='24'>{{split_contractor_durations}}</Col>
  </Row>

   <Row :gutter='10' style='margin-top:10px'>
     <Col :span='8'>{{create_full_investment_salary}}</Col>
      <Col :span='8'>{{about_full_investment_salary}}</Col>
     
  </Row>


  <Row style='margin-top:10px' :gutter="10">
    <Col :span='8'>
       <Row :gutter='10'>
      <Col>{{settlement_audit_salary}}</Col>
      
  </Row>
       <Row :gutter='10'  style='margin-top:10px'>
   <Col>{{settlement_audit_summary_attached}}</Col>
   </Row>

    
    </Col>
     <Col :span='8'>
  <Row :gutter='10'>
      <Col>{{settlement_audit_full_investment_salary}}</Col>
      
  </Row>
    <Row :gutter='10' style='margin-top:10px'>
      <Col>{{settlement_audit_full_investment_attached}}</Col>
   </Row>
    </Col>
     <Col :span='8'>
     <Row :gutter='10'>
      <Col>{{contruction_project_cost_audit}}</Col>
      
  </Row>
    <Row :gutter='10' style='margin-top:10px'>
      <Col>{{contruction_project_cost_audit_attached}}</Col>
   </Row>
    </Col>
  </Row>

  <Row style='margin-top:10px' :gutter="10">
    <Col :span='8'>{{audit_send_time}}</Col>
  </Row>
  <Row style='margin-top:10px' :gutter="10">
    <Col :span='8'>{{first_audit_started_at}}</Col>
    <Col :span='8'>{{first_audit_finished_at}}</Col>
  </Row>
  <Row style='margin-top:10px' :gutter="10">
    <Col :span='8'>{{contruction_project_cost_audit_attached}}</Col>
  </Row>
  <Row style='margin-top:10px' :gutter="10">
    <Col :span='8'>{{second_audit_started_at}}</Col>
    <Col :span='8'>{{second_audit_finished_at}}</Col>
  </Row>
  
  <Row :gutter='10' style='margin-top:10px'>
     <Col :span='24'>{{help_audit_units}}</Col>
  </Row>

   <Row :gutter='10' style='margin-top:10px'>
     <Col :span='24'>{{audit_units}}</Col>
  </Row>
  
  
  </div>
  `,
  def: {
    service_started_at:{
      label:'服务开始时间',
      control:'time'
    },
    service_finished_at: {
      label: '服务结束时间',
      control: 'time'
    },
    main_contractor_started_at:{
      label: '总包开始时间',
        control: 'time'
    },
    main_contractor_finished_at:{
      label: '总包结束时间',
        control: 'time'
    },
    main_contract_attached:{
      label:"总包竣工验收报告/合同约定",
      control:'files',
      option:{
        single:true,
         uploader: "file/upload"
      }

    },
    split_contractor_durations:{
      label:"分包开竣工时间",
      control:"dataset",
      option:{
         columns: [{
               key: "name",
               control: "input",
               label: "分包项目",
               span: 8
             }, {
               key: "unit",
               control: "input",
               label: "分包单位",
               span: 8
             }, {
               key: "from",
               control: "time",
               label: "开工时间",
               span: 4
             }, {
               key: "to",
               label: "竣工时间",
               control: "time",
               span: 4
             }]
      }
    },
    create_full_investment_salary:{
      label:"立项总投资",
      control:"input",
      option:{
        type:"amount"
      }
    },
    about_full_investment_salary:{
      label: "概算总投资",
        control: "input",
        option: {
          type: "amount"
        }
    },
    settlement_audit_salary:{
      label: "结算送审金额",
        control: "input",
        option: {
          type: "salary"
        }
    },
    settlement_audit_summary_attached:{
       label: "结算送审表",
         control: 'files',
         option: {
           single: true,
           uploader: "file/upload"
         }
    },
    settlement_audit_full_investment_salary:{
      label: "结/决算审定总投资",
        control: "input",
        option: {
          type: "amount"
        }
    },
    settlement_audit_full_investment_attached: {
      label: "结/决算汇总表",
      control: 'files',
      option: {
        single: true,
        uploader: "file/upload"
      }
    },
    contruction_project_cost_audit:{
      label: "建安造价审定",
        control: "input",
        option: {
          type: "amount"
        }
    },
     contruction_project_cost_audit_attached: {
       label: "建安造价汇总表",
       control: 'files',
       option: {
         single: true,
         uploader: "file/upload"
       }
     },
    audit_send_time:{
       label: '审计送审时间',
         control: 'time'
    },
    audit_send_time_attached: {
      label: "移交清单",
        control: 'files',
        option: {
          single: true,
          uploader: "file/upload"
        }
    },
    first_audit_started_at:{
 label: '一审开始时间',
   control: 'time'
    },
    first_audit_finished_at:{
 label: '一审结束时间',
   control: 'time'
    },
    contruction_project_cost_audit_attached: {
      label: "一审审定单（汇总表)",
      control: 'files',
      option: {
        single: true,
        uploader: "file/upload"
      }
    },
    second_audit_started_at:{
      label: '二审开始时间',
      control: 'time'
    },
    second_audit_finished_at:{
      label: '二审结束时间',
      control: 'time'
    },
    // audit_document_transferred:{

    // },
    help_audit_units:{
      label:"协审单位信息",
      control:'dataset',
      option:{
        columns: [{
          key: "name",
          control: "input",
          label: "单位名称",
          span: 12
        }, {
          key: "charger",
          control: "input",
          label: "负责人",
          span: 6
        }, {
          key: "phone",
          control: "input",
          label: "电话",
          span: 6,
          option:{
            type:'number'
          }
        }]
      }
    },
    audit_units:{
      label: "审计机关信息",
        control: 'dataset',
        option: {
          columns: [{
            key: "name",
            control: "input",
            label: "单位名称",
            span: 12
          }, {
            key: "charger",
            control: "input",
            label: "主办人",
            span: 6
          }, {
            key: "phone",
            control: "input",
            label: "电话",
            span: 6,
            option: {
              type: 'number'
            }
          }]
        }
    }
  },
  option: {
    editable: true
  }
}