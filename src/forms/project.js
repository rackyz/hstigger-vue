export default {
  title: '项目基本情况',
  layout: "<div style='position:relative;'><Row :gutter='10'><Col :span='6'>{{code}}</Col><Col :span='18'>{{name}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='6'>{{project_type}}</Col><Col :span='6'>{{charger}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='24'>{{desc}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='24'>{{images}}</Col></Row></div>",
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
    },
    project_type: {
      label: "项目类型",
      control: 'select',
      option: {
        getters: 'core/getTypes',
        key: "project_type",
        required: true
      }
    },
    service_type: {
      label: "服务类型",
      control: 'select',
      option: {
        relativeGetter: 'core/getTypesByID',
        relKey: 'project_type',
        relMode: 'replace',
        idKey: 'id',
        labelKey: 'name'
      }
    },
    charger:{
      label:"项目负责人",
      control:'select',
      option:{
        getters:'core/users'
      }
    },
    desc:{
      label:"项目简介",
      control:"input",
      option:{
        type:'textarea',
        height:300
      }
    },
    avatar: {
      label: "封面",
      control: "image"
    },
    images:{
      label:'项目图片',
      control:'files',
      option:{
        type:'image'
      }
    }
  },
  option: {
    editable: true
  }
}