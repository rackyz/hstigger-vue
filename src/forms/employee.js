export default {
    def: {
      user: {
        label: "登录名",
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
        control: "input",
        option: {
          required: true,
        },
      },
      avatar: {
        label: "头像",
        control: "avatar",
         option: {
           uploader: "file/uploadAvatar"
         }
      },
      phone: {
        label:"绑定手机",
        control: "input",
      },
      email:{
          label:"EMAIL",
        control: "input",
      },
      address:{
          label:"地址",
        control: "input",
      },
      gender:{
          label:"性别",
          control:"select",
          option:{
               getters: "core/getTypes",
                 key: "Gender",
                 idKey: 'id',
                 labelKey: 'name',
              defaultValue:0
          }
      },
      birthday:{
          label:"出生日期",
          control:"time"
      },
      native_place:{
          label:"籍贯",
          control:"input"
      },
      qq:{
         label:"QQ",
          control:"input"
      },
      zzl_id:{
        label: "zzl_id",
        control: "input"
      },
      ding_id: {
        label: "ding_id",
        control: "input"
      },
      wechat_id: {
        label: "wechat_id",
        control: "input"
      },
      marital_status: {
          label:"婚姻状况",
          control:"select",
          option:{
            getters: "core/getTypes",
              key: "MaritalStatus",
              idKey: 'id',
              labelKey: 'name',
            defaultValue:0
        }
      },
      photo:{
          label:'证件照',
          control:"avatar",
           option: {
               uploader:"file/uploadAvatar",
               w2h:0.7
           }
      },
      political_status: {
          label:'政治面貌',
          control:"select",
          option:{
               getters: "core/getTypes",
                 key: "PoliticalStatus",
                 idKey: 'id',
                 labelKey: 'name',
              defaultValue:0
          }
      },
      education:{
          label:"学历",
          control:"select",
          option:{
                getters: "core/getTypes",
                  key: "Education",
                  idKey: 'id',
                  labelKey: 'name',
              defaultValue:2
          }
      },
      professor_rank: {
          label:"职称",
          control:"select",
          option:{
              getters:"core/getTypes",
              key: "ProfessorRank",
                idKey: 'id',
                labelKey: 'name',
              defaultValue:3
          }
      },
       degree: {
         label: "学位",
         control: "select",
         option: {
            getters: "core/getTypes",
              key: "Degree",
              idKey: 'id',
              labelKey: 'name',
           defaultValue: 2
         }
       },
      deps:{
          label:"部门",
          control:"select",
          option:{
              getters:"core/deps",
              labelKey:"name",
              multiple:true,
              idKey:'id'
          }
      },
      roles:{
          label:"职务",
          control:"select",
          option:{
              getters:"core/roles",
              labelKey:"name",
              
              multiple:true,
              idKey:"id"
          }
      },
      employee_date:{
          label:"入职时间"
          ,control:"time"
      },
      major:{
          label:"所学专业",
          control:"input"
      },
      graduate_time: {
          label:"毕业时间",
          control:"time"
      },
      graduate_institution: {
          label:"毕业院校",
          control:"input"
      },
      education_history:{
        label:"教育经历",
        control:"dataset",
        option:{
            columns:[{
                key:"from",
                control:"time",
                label:"起始时间",
                span:5
            },{
                key:"to",
                label: "截止时间",
                control:"time",
                span:5,
                option:{
                  clerable:true
                }
            },{
                key:"education_level",
                label:"学历",
                control:"select",
                span:5,
                option:{
                    getters: "core/getTypes",
                    key: "Education",
                    idKey: 'id',
                    labelKey: 'name'
                }
            },{
                key:"school_name",
                label: "就读院校",
                control:"input",
                span:9
            }]
        }
      },
      emergency_contact:{
        label:"紧急联系人",
        control:"input"
      },
      emergency_phone:{
        label:"紧急联系电话",
        control:"input"
      },
      family_contact:{
         label: "家庭成员",
           control: "dataset",
           option: {
             columns: [{
                   key: "name",
                   label: "姓名",
                   control: "input",
                   span: 4,
                 }, {
               key: "relation",
               label: "家庭关系",
               control: "input",
               span: 3,
             }, {
               key: "phone",
               label: "联系电话",
               control: "input",
               span: 6,
             }, {
               key: "workplace",
               label: "工作单位",
               control: "input",
               span: 10
             }, ]
           }
      },
      certifications:{
        label:"证书",
        control:'dataset',
         option: {
             columns: [{
                key:'pass_date',
                control:"time",
                label:"获得日期",
                span:5
            },{
                   key: "cert_type",
                   control: "select",
                   label: "证书种类",
                   getters:"core/getTypes",
                   key:"CertType",
                    labelKey:"name",
                    idKey:"id",
                   span: 12
                 }, {
                   key: "locked",
                   label: "锁定中",
                   control: "select",
                   option:{
                    options:['未锁定','已锁定'],
                    defaultValue:0
                   },
                   span: 5
                 }]
                }
      },
       work_history: {
         label: "工作经历",
         control: "dataset",
         option: {
           columns: [{
             key: "from",
             control: "time",
             label: "起始时间",
             span: 5
           }, {
             key: "to",
             label: "截止时间",
             control: "time",
             span: 5
           }, {
             key: "position",
             label: "岗位职务",
             control: "input",
             span: 5,
           }, {
             key: "workplace",
             label: "工作单位",
             control: "input",
             span: 9
           }]
         }
       }

    },
    layout: `<div style="padding:40px;">
    <div style="margin:10px 0;color:#333;border-left:10px solid orange;padding-left:5px;">账号信息</div>
    <div class="flex-wrap flex-between" style="width:100%">
        <Row :gutter='10' style="width:calc(100% - 60px)">
            <Col span='5'>{{user}}</Col>
              <Col span='6'>{{phone}}</Col>
               <Col span='7'>{{email}}</Col>
        <Col span='6'>{{qq}}</Col>
        </Row>
        <div style="width:60px">
            {{avatar}}
        </div>
    </div>
  
   
    <div style="margin:10px 0;color:#333;border-left:10px solid orange;padding-left:5px;">员工信息</div>
    <div class="flex-wrap flex-between" style="width:100%">
        <Row :gutter='10' style="width:calc(100% - 100px)">
            <Col span='8'>{{name}}</Col>
            <Col span='6'>{{gender}}</Col>
            <Col span='10'>{{birthday}}</Col>
             <Col span='6' style='margin-top:5px'>{{marital_status}}</Col>
        <Col span='6' style='margin-top:5px'>{{political_status}}</Col>
            <Col span='12' style='margin-top:5px'>{{native_place}}</Col>
        </Row>
        <div style="width:100px;height:130px;position:relative;">
            {{photo}}
        </div>
    </div>
    <Row :gutter='10' style="margin-top:10px">
        <Col span='24'>{{address}}</Col>
        
    </Row>
    <Row :gutter='10' style="margin-top:10px">
        <Col span='6'>{{emergency_contact}}</Col>
        <Col span='8'>{{emergency_phone}}</Col>
        
    </Row>
     <Row :gutter='10' style="margin-top:10px">
        <Col span='24'>{{family_contact}}</Col>
        
    </Row>
    
    <div style="margin:10px 0;color:#333;border-left:10px solid orange;padding-left:5px;">工作信息</div>
    <Row :gutter='10'>
        <Col span='6'>{{employee_date}}</Col>
        <Col span='6'>{{professor_rank}}</Col>
    </Row>
   
    <Row :gutter='10' style="margin-top:10px">
        <Col span='24'>{{work_history}}</Col>
    </Row>
    <Row :gutter='10' style="margin-top:10px">
        <Col span='24'>{{certifications}}</Col>
    </Row>
  

    <div style="margin:10px 0;color:#333;border-left:10px solid orange;padding-left:5px;">学历信息</div>
    <Row :gutter='10'>
        <Col span='6'>{{education}}</Col>
        <Col span='6'>{{degree}}</Col>
        <Col span='6'>{{major}}</Col>
        <Col span='6'>{{graduate_time}}</Col>
    </Row>
    <Row :gutter='10' style="margin-top:10px">
        <Col span='24'>{{graduate_institution}}</Col>
        
    </Row>
    <Row :gutter='10' style="margin-top:10px">
        <Col span='24'>{{education_history}}</Col>
        
    </Row>
    </div>`,
  
    option: {
      hideReset:true
    }
  }