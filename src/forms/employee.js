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
        control: "avatar",
      },
      phone: {
        label:"绑定手机",
        control: "input",
      },
      email:{
          label:"EMAIL",
        control: "input",
      },
      gender:{
          label:"性别",
          control:"select",
          option:{
              options:['男','女'],
              defaultValue:0
          }
      },
      birth:{
          label:"出生日期",
          control:"time"
      },
      jiguan:{
          label:"籍贯",
          control:"input"
      },
      married:{
          label:"婚姻状况",
          control:"select",
          option:{
            options:['未婚','已婚'],
            defaultValue:0
        }
      },
      photo:{
          label:'证件照',
          control:"avatar"
      },
      politics:{
          label:'政治面貌',
          control:"select",
          option:{
              options:['群众','党员'],
              defaultValue:0
          }
      },
      education:{
          label:"学历",
          control:"select",
          option:{
              options:['博士','研究生','本科(全日制)','本科(非全日制)','专科','高中及以下'],
              defaultValue:2
          }
      },
      xw:{
          label:"学位",
          control:"select",
          option:{
              options:['博士','硕士','学士','无'],
              defaultValue:3
          }
      },
      deps:{
          label:"部门",
          control:"select",
          option:{
              getters:"entadmin/deps",
              labelKey:"name",
              idKey:'id'
          }
      },
      roles:{
          label:"职务",
          control:"select",
          option:{
              getters:"entadmin/roles",
              labelKey:"name",
              idKey:"id"
          }
      },
      jointime:{
          label:"入职时间"
          ,control:"time"
      },
      subject:{
          label:"所学专业",
          control:"input"
      },
      undergraduatedTime:{
          label:"毕业时间",
          control:"time"
      },
      undergradutedSchool:{
          label:"毕业院校",
          control:"input"
      }
    },
    layout: `<div>
    <div style="margin:5px 0;color:#aaa;">账号信息</div>
    <div class="flex-wrap flex-between" style="width:100%">
        <Row :gutter='10' style="width:calc(100% - 60px)">
            <Col span='12'>{{user}}</Col>
            <Col span='12'>{{phone}}</Col>
        </Row>
        <div style="width:60px">
            {{avatar}}
        </div>
    </div>
    <Row :gutter="10" style="margin-top:10px">
        <Col span='12'>{{deps}}</Col>
        <Col span='12'>{{roles}}</Col>
    </Row>
    <div style="margin:5px 0;color:#aaa;">员工信息</div>
    <div class="flex-wrap flex-between" style="width:100%">
        <Row :gutter='10' style="width:calc(100% - 100px)">
            <Col span='8'>{{name}}</Col>
            <Col span='6'>{{gender}}</Col>
            <Col span='10'>{{birth}}</Col>
            <Col span='24' style='margin-top:5px'>{{jiguan}}</Col>
        </Row>
        <div style="width:100px;height:130px;position:relative;">
            {{photo}}
        </div>
    </div>
    <Row :gutter='10' style="margin-top:10px">
        <Col span='6'>{{married}}</Col>
        <Col span='6'>{{politics}}</Col>
        
    </Row>
    <div style="margin:5px 0;color:#aaa;">学历信息</div>
    <Row :gutter='10'>
        <Col span='6'>{{education}}</Col>
        <Col span='6'>{{xw}}</Col>
        <Col span='6'>{{subject}}</Col>
        <Col span='6'>{{undergraduatedTime}}</Col>
    </Row>
    <Row :gutter='10' style="margin-top:10px">
        <Col span='24'>{{undergradutedSchool}}</Col>
        
    </Row>
    </div>`,
  
    option: {
      hideReset:true
    }
  }