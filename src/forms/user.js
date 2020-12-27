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
    type:{
      control:"select",
      option:{
        
        required:true,
        labelKey:"name",
        idKey:"value",
        getters:"core/getTypes",
        key:"AccountType",
        defaultValue:0
      }
    },
    avatar: {
      label: "头像",
      editable: true,
      control: "image",
    },
    phone: {
      control: "input",
    },
    email:{
      control: "input",
    }
  },
  layout: `<div>
  <Row :gutter='10'>

  <Col span='5' style='line-height:40px;text-align:right;' >账号类型</Col><Col span='19'>{{type}}</Col></Row>
  <Row :gutter='10' style='margin-top:10px;'><Col span='5' style='line-height:40px;text-align:right;' >用户名</Col><Col span='19'>{{user}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px;'><Col span='5' style='line-height:40px;text-align:right;' >电话</Col><Col span='19'>{{phone}}</Col>
  </Row><Row :gutter='10' style='margin-top:10px;'><Col span='5' style='line-height:40px;text-align:right;' >邮箱</Col><Col span='19'>{{email}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:0px;'><Col span='5' style='line-height:40px;text-align:right;' ></Col>
  </Row></div>`,

  option: {
    hideReset:true
  }
}