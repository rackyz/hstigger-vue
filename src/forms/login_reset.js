export default {
  layout:`<div style='padding-left:150px;position:relative;'><img src='https://file-1301671707.cos.ap-chengdu.myqcloud.com/static/pass.jpg' style='width:135px;height:140px;position:absolute;left:0px;top:0px;filter:drop-shadow(1px 1px 1px #333);border:3px solid #fff;' /><div style='margin-bottom:5px;font-size:14px;'>请输入新密码</span></div>
  <Row :gutter='12' >
      <Col :span='24'>{{password}}</Col></Row>
      <div style='padding:5px 0'>请再输一遍</div>
      <Row :gutter='12'>
      <Col :span='24'>{{password_confirm}}</Col>
      
  </Row></div>`,
  def:{
      password:{
          control:'input',
          option:{
              require:true,
              type:'password'
          }
      },
      password_confirm:{
          control:'input',
          option:{
              require:true,
              type:'password'
          }
      }
  },
  option:{
      submitText:'提交',
      hideReset:true
  }
}