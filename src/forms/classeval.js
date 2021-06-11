export default {
  title: '文章',
  layout: `
  <div style='position:relative;'>

  <Row :gutter='10'>
    <Col :span='12'>{{result}}</Col>
    <Col :span='12'>{{score}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{content}}</Col>
  </Row>
  
  </div>
  `,
  def: {
    result: {
      label: "评价结果",
      control: 'select',
      option: {
       options:['不合格','合格','良好','优秀'],
       defaultValue:1
      }
    },
    score: {
      label: "得分",
      control: 'input',
      option: {
      
        type:"number"
      }
    },
    content: {
      label: "评语/备注",
      control: "input",
      option: {
        type: "textarea",
        
        height: 300
      }
    }

  },
  option: {
    editable: true,
    hideCancel:true,
    hideSubmit:true,
    hideReset:true
  }
}