export default {
  title: '消息',
  layout: `
  <div style='position:relative;'>

  <Row :gutter='10'>
    <Col :span='8'>{{msg_type}}</Col>
    <Col :span='16'>{{title}}</Col>
    
  </Row>
   <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{to}}</Col>
  </Row>
   <Row :gutter='10' style='margin-top:10px' v-if="model.msg_type==2">
    <Col :span='24'>{{dep_id}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px' v-if="model.msg_type==3">
    <Col :span='24'>{{project_id}}</Col>
  </Row>
  <Row :gutter='10'  style='margin-top:10px'>
    <Col :span='8'>{{hurry}}</Col>
    <Col :span='8'>{{enable_readed}}</Col>
    <Col :span='8'>{{enable_list}}</Col>
  </Row>
   <Row :gutter='10' style='margin-top:10px'>
    <Col :span='24'>{{content}}</Col>
   
  </Row>
  </div>
  `,
  def: {
    msg_type: {
      label: "通知类型",
      control: 'select',
      option: {
        required: true,
        getters: 'core/getTypes',
        key:'MESSAGE_TYPE',
        defaultValue:0,
        idKey: 'id',
        labelKey: 'name'
      }
    },
    title:{
      label:"标题",
      control:"input",
      option:{
        required:true
      }
    },
    hurry:{
      label:"紧急",
      control:"select",
      option:{
        options:['否','是'],
        defaultValue:0
      }
    },
    enable_readed: {
      label:"启用站内信",
      control:"select",
      option: {
        options: ['否', '是'],
        defaultValue: 0
      }
    },
    enable_list:{
      label:"启用专栏发布",
      control:"select",
      option:{
        options:['否','是'],
        defaultValue:0
      }
    },
    to:{
      label:"接收方",
      control:"select",
      option:{
        getters: 'core/getSource',
        idKey: 'id',
        filterable:true,
        multiple:true,
        labelKey: 'name'
      }
    },
    dep_id: {
      label: "部门",
      control: "select",
      option: {
        getters: 'core/deps',
        idKey: 'id',
        filterable: true,
        labelKey: 'name'
      }
    },
    project_id:{
    label: "项目部",
      control: "select",
      option: {
        getters: 'core/projects',
        idKey: 'id',
        filterable: true,
        labelKey: 'name'
      }
    },
    content:{
      label:"正文",
      control:"input",
      option:{
        type:"md",
        height:400
      }
    }
  },
  option:{
    editable:true
 }
}