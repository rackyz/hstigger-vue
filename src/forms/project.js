export default {
  title: '项目基本情况',
  layout: "<div style='position:relative;'><Row :gutter='10'><Col :span='6'>{{code}}</Col><Col :span='14'>{{name}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='8'>{{charger}}</Col><Col :span='8'>{{shortname}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='8'><div style='height:200px;position:relative;'>{{avatar}}</div></Col><Col :span='16'>{{desc}}</Col></Row><Row :gutter='10' style='margin-top:10px'></Row></div>",
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
    charger:{
      label:"项目负责人",
      control:'select',
      option:{
        getters:'core/users',
        idKey:'id',
        labelKey:'name'
      }
    },
    desc:{
      label:"项目简介",
      control:"input",
      option:{
        type:'textarea',
        height:200
      }
    },
    avatar: {
      label: "封面",

      control: "avatar",
       option: {
         uploader: "file/uploadAvatar"
       }
    },
  },
  option: {
    editable: true
  }
}