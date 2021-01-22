export default {
  title: '上传资料',
  layout: "<div style='position:relative;'><Row :gutter='10'><Col :span='6'>{{code}}</Col><Col :span='18'>{{name}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='12'>{{project_id}}</Col><Col :span='12'>{{dep_id}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='6'>{{type}}</Col><Col :span='6'>{{type2}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='24'>{{desc}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='24'>{{files}}</Col></Row></div>",
  def: {
    code: {
      label: "资料编号",
      control: 'input',
      option: {
      }
    },
    name: {
      label: "资料名称",
      control: 'input',
      option: {
        required: true
      }
    },
    project_id:{
      label:"项目名称",
      control: "select",
      option:{
        getters:"core/projects",
        idKey: 'id',
          labelKey: 'name'
      }
    },
    dep_id:{
      label:"部门名称",
      control:"select",
      option: {
        getters: "core/deps",
        idKey: 'id',
          labelKey: 'name'
      }
    },
    type: {
      label: "一级分类",
      control: 'select',
      option: {
        getters: 'core/getTypes',
        key: "project_type"
      }
    },
    type2: {
      label: "二级分类",
      control: 'select',
      option: {
        relativeGetter: 'core/getTypesByID',
        relKey: 'project_type',
        relMode: 'replace',
        idKey: 'id',
        labelKey: 'name'
      }
    },
    desc: {
      label: "备注",
      control: "input",
      option: {
        type: 'textarea',
        height: 100
      }
    },
    files: {
      label: '文件(支持批量上传)',
      control: 'files',
      option:{
        type:'list',
        required:true,
        uploader:"upload",
        uploaderSource:"env"
      }
    }
  },
  option: {
    editable: true,
    hideReset:true
  }
}