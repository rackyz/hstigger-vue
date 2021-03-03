export default {
  title: '项目基本情况',
  layout: `
  <div style='position:relative;'>

  <Row :gutter='10'>
    <Col :span='8'>{{code}}</Col>
    <Col :span='16'>{{name}}</Col>
  </Row>
  
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='8'>{{business_type}}</Col>
    <Col :span='8'>{{building_type}}</Col>
     <Col :span='8'>{{shortname}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='8'>{{charger}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
  <Col :span='24'>{{address}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
    <Col :span='4'><div style='height:100px;position:relative;'>{{avatar}}</div></Col>
    <Col :span='20'>{{images}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px'>
  <Col :span='24'>{{desc}}</Col>
  </Row>
  </div>
  `,
  def: {
    code: {
      label: "项目编号",
      control: 'input',
      option: {
        required: true
      }
    },
    name: {
      label: "项目名称",
      control: 'input',

      option: {
        required: true
      }
    }, shortname: {
      label: "项目简称",
      control: 'input',
    },
    address: {
      label: "项目地址",
      control: 'input',

    },

    charger:{
      label:"项目负责人",
      control:'select',
      option:{
        getters:'core/employees',
        idKey:'id',
        labelKey:'name'
      }
    },
    desc:{
      label:"项目简介",
      control:"input",
      option:{
        type:'textarea',
        height:100
      }
    },
    avatar: {
      label: "封面",

      control: "avatar",
       option: {
         uploader: "file/uploadAvatar"
       }
    },
    images:{
      label:"效果图",
      control:'images',
      option:{
        uploader:"file/upload"
      }
    },
    business_type:{
      label:"服务类型",
      control:"select",
      option:{
        getters:"core/getTypes",
        key: "P_ARCH_TYPE",
        labelKey:'name',
        idKey:'value'
      }
    },
    building_type:{
      label: "建筑类型",
        control: "select",
        option: {
          getters: "core/getTypes",
          key: "P_BUILDING_TYPE",
          labelKey: 'name',
          idKey: 'value'
        }
    }
  },
  option: {
    editable: true
  }
}