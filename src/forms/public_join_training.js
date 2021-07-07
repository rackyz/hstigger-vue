export default {
  layout: `<div style='position:relative;'><div style='margin-bottom:5px;font-size:14px;'>请输入您的<span style='color:red'>账号</span>或<span style='color:red'>手机号</span></div>
                <Row :gutter='12' >
                    <Col :span='24'>{{account}}</Col></Row>
                    <div style='padding:5px 0'>发送至您手机短信的<span style='color:red'>验证码</span></div>
                    <Row :gutter='12'>
                    <Col :span='16'>{{vcode}}</Col>
                    <Col :span='8'><Button long type='warn' style='height:40px;border:none;font-size:16px;border-radius:5px;' :disabled='!model.account || env.cooldown' @click='onEvent({type:"sendVerifyCode",data:model.account})'>发送<span v-if='env.cooldown'>({{env.cooldown}}s)</span></Button></Col>
                </Row></div>`,
  def: {
    account: {
      control: 'input',
      option: {
        required: true,
      }
    },
    vcode: {
      control: 'input',
      option: {
        required: true,
        maxlen: 6
      }
    }
  },
  option: {
    submitText: '报名',
    hideSubmit:true,
    hideCancel:true,
    hideReset: true
  }
}