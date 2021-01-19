export default {
  def: {
    user: {
      control: "input",
      option: {
        required: true,
        rules: [{
            type: "name",
          }
        ],
      },
    },
    name: {
      control: "input",
      option: {
        required: true,
      },
    },
    avatar: {
      label: "头像",
      control: "image",
    },
    phone: {
      control: "input",
    },
    email: {
      control: "input",
    }
  },
  layout: `<div>
  <Row :gutter='10' style='margin-top:10px;'><Col span='5' style='line-height:40px;text-align:right;' >用户名</Col><Col span='19'>{{user}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:10px;'><Col span='5' style='line-height:40px;text-align:right;' >姓名</Col><Col span='19'>{{name}}</Col></Row>
  <Row :gutter='10' style='margin-top:10px;'><Col span='5' style='line-height:40px;text-align:right;' >电话</Col><Col span='19'>{{phone}}</Col>
  </Row><Row :gutter='10' style='margin-top:10px;'><Col span='5' style='line-height:40px;text-align:right;' >邮箱</Col><Col span='19'>{{email}}</Col>
  </Row>
  <Row :gutter='10' style='margin-top:0px;'><Col span='5' style='line-height:40px;text-align:right;' ></Col>
  </Row></div>`,

  option: {
    hideReset: true,
    hideLabel:true
  }
}