export default {
  title: '造价成果',
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
    <Col :span='12'>{{date}}</Col>
    
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
   

    
    project_id: {
      label: "项目名称",
      control: "select",
      option: {
        getters: "core/projects",
        idKey: 'id',
        labelKey: 'name'
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
    date:{
      label:"日期",
      control:"time",
      option:{
        defaultValue:moment().format('YYYY-MM-DD')
      }
    },
  
  },
  option: {
    editable: true
  }
}