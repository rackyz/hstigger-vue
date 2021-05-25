export default {
  title: '文章',
  layout: `
  <div style='position:relative;'>

  <Row :gutter='10'>
    <Col :span='8'>{{art_type}}</Col>
    <Col :span='16'>{{title}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{content}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{files}}</Col>
  </Row>
  
  </div>
  `,
  def: {
    art_type: {
      label: "文章类型",
      control: 'select',
      option: {
        getters: "core/type",
        idKey: 'id',
        labelKey: 'name'
      }
    },
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
      option:{
        type:"md",
        height:600
      }
    },
    files: {
      label: '附件',
      control: 'files',
      option: {
        type: 'list',
        required: true,
        uploader: "file/upload",
      }
    }

  },
  option: {
    editable: true
  }
}