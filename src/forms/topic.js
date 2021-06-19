export default {
  title: '话题',
  layout: `
  <div style='position:relative;'>

  <Row :gutter='10'>
    <Col :span='24'>{{title}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{content}}</Col>
  </Row>
  
  </div>
  `,
  def: {
    title: {
      label: "标题",
      control: 'input',
      option: {
        required: true
      }
    },
    content: {
      label: "内容",
      control: "input",
      option: {
        type: "md",
        height: 300
      }
    }
  },
  option: {
    editable: true
  }
}