export default {
  title: '上传资料',
  layout: `<div style='position:relative;'>
  <Row :gutter='20'>
  <Col :span='24'>{{name}}</Col></Row>
  <Row :gutter='10' style='margin-top:15px'><Col :span='24'>{{desc}}</Col></Row><Row :gutter='10' style='margin-top:10px'><Col :span='24'>{{files}}</Col></Row></div>`,
  def: {
    code: {
      label: "资料编号",
      control: 'input',
      option: {}
    },
    name: {
      label: "资料名称",
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
    dep_id: {
      label: "部门名称",
      control: "select",
      option: {
        getters: "core/deps",
        idKey: 'id',
        labelKey: 'name'
      }
    },
    type1: {
      label: "业务类别",
      control: 'select',
      option: {
        getters: 'core/getTypes',
        key: "ARCHIVE_WORKTYPE",
        idKey: 'id',
        labelKey: 'name'
      }
    },
    type2: {
      label: "归档目录",
      control: 'select',
      option: {
        getters: 'core/getTypes',
        key: "ARCHIVE_SAVETYPE",
        idKey: 'id',
        labelKey: 'name'
      }
    },
    type3: {
      label: "资料类型",
      control: 'select',
      option: {
        getters: 'core/getTypes',
        key: "ARCHIVE_DOCTYPE",
        idKey: 'id',
        labelKey: 'name'
      }
    },
    desc: {
      label: "备注",
      control: "input",
      option: {
        type: 'textarea',
        height: 100,
        maxlen:128
      }
    },
    files: {
      label: '文件(支持批量上传)',
      control: 'files',
      option: {
        type: 'list',
        required: true,
        uploader: "file/upload"
      }
    }
  },
  option: {
    editable: true,
    hideReset: true
  }
}