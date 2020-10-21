export default {
  title: '项目基本情况',
  layout: "<div style='position:relative;'><Row :gutter='10'><Col :span='10'>{{code}}</Col><Col :span='14'>{{name}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='10'>{{project_type}}</Col><Col :span='10'>{{service_type}}</Col><Col :span='4'>{{avatar}}</Col></Row></div>",
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
    avatar: {
      label: "封面",
      control: "image"
    }
  },
  option: {
    editable: true
  }
}