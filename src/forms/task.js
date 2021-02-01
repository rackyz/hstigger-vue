export default {
  layout: `<div>
    <Row  :gutter="10">
      <Col :span="24">{{parent_id}}</Col>
     
    </Row>
     <Row  :gutter="10" style='margin-top:10px'>
      <Col :span="8">{{type_id}}</Col>
      <Col :span="16">{{name}}</Col>
    </Row>
    <Row  :gutter="10" style='margin-top:10px'>
      <Col :span="12">{{project_id}}</Col>
      <Col :span="12">{{dep_id}}</Col>
    </Row>
     <Row  :gutter="10" style='margin-top:10px'>
     
      <Col :span="12">{{charger}}</Col>
      <Col :span="12">{{duration}}</Col>
    </Row>
    <Row  :gutter="10" style='margin-top:10px'>
      <Col :span="24">{{desc}}</Col>
     
    </Row>
      <Row  :gutter="10" style='margin-top:10px'>
      <Col :span="24">{{files}}</Col>
     
    </Row>
    </div>
  `,
  def: {
    parent_id: {
      label: "父级任务",
      control: "select",
      option: {
        editable: false,
        getters: "user/tasks",
        defaultValue: 0
      }
    },
    name: {
      label: "任务名称",
      control: "input",
      option: {
        maxlen: 16,
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
      type_id:{
          label: "任务类别",
            control: 'select',
            option: {
              getters: 'core/getTypes',
              key: "TASK_TYPE",
              idKey: 'id',
              labelKey: 'name'
            }
      },
      charger:{
         label: "负责人",
           control: 'select',
           option: {
             getters: 'core/employees',
             idKey: 'id',
             labelKey: 'name'
           }
      },
      duration:{
        label:"期限(天)",
        control:"input",
        option:{
          type:'number'
        }
      },
       desc: {
         label: "任务简介",
         control: "input",
         option: {
           type: 'textarea',
           height: 200
         }
       },
        files: {
          label: '文件(支持批量上传)',
          control: 'files',
          option: {
            type: 'list',
            required: true,
            uploader: "upload",
            rename: "file/rename",
            uploaderSource: "env"
          }
        }
    
  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}