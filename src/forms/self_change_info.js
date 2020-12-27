export default {
  def: {
    user: {
      label: "登录名",
      editable: true,
      control: "input",
      option: {
        required: true,
        rules: [
          {
            type: "name",
          },
          {
            msg: "该名称已存在,请更换",
          },
        ],
      },
    },
    name: {
      label: "姓名",
      editable: true,
      control: "input",
      option: {
        required: true,
      },
    },
    avatar: {
      label: "头像",
      editable: true,
      control: "avatar",
    },
    phone: {
      label:"电话",
      control: "input",
    },
    email:{
      label:"邮箱",
      control: "input",
    }
  },
  layout: `<div>
  <Row :gutter='10'><Col span='24'>{{user}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{phone}}</Col>
  </Row><Row :gutter='10' style='margin-top:10px;'><Col span='24'>{{email}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:0px;'><Col span='5' style='line-height:40px;text-align:right;' ></Col>
  </Row></div>`,

  option: {
    hideReset:true
  }
}