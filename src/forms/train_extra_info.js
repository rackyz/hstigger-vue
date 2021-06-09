export default {
  layout: `<div>
  <div style="padding:10px 0;color:#3af;padding-top:0;">根据培训统计要求，请填写您当前所属的部门、项目部、以及直属领导的姓名</div>
  <Row  :gutter="10">
      <Col :span="24">{{raw_dep}}</Col>
  </Row>
  <Row  :gutter="10" style="margin-top:10px">
      <Col :span="24">{{raw_project}}</Col>
  </Row>
  <Row  :gutter="10" style="margin-top:10px">
      <Col :span="24">{{raw_leader}}</Col>
  </Row>
   </div>`,
  def: {
    raw_dep: {
      label: "部门",
      control: "input",
      option: {
      }
    },
     raw_project: {
       label: "项目部",
       control: "input",
       option: {
       }
     },
      raw_leader: {
        label: "直属领导",
        control: "input",
        option: {
        }
      },
   
  },
  option: {
    hideReset: true,
    hideLabel: true
  }
}