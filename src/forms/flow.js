export default {
  def: {
      flow_type: {
        label: "类型",
        editable: true,
        control: "select",
        option: {
          options: ['企业管理', '人事管理', '项目管理']
        }
      },
      name: {
        label: "名称",
        editable: true,
        control: "input",
        option: {}
      },
      desc: {
        label: "描述",
        editable: true,
        control: "input",
        option: {
          type: "textarea",
          height: 200
        }
      }
    },
    layout: `<div>
        <Row :gutter='10'>
        <Col span='8'>{{flow_type}}</Col><Col span='16'>{{name}}</Col>
        </Row>
        <Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{desc}}</Col>
        </Row></div>`,

    option: {}
}