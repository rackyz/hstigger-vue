import {
  NODE_STATES,
  ACTION_TYPES,
  GetActionType
} from './flow'
// predefined result
var C1 = {
  key: "CommitLevel",
  label: "推荐等级",
  control: 'select',
  option: {
    required: true,
    options: ['优秀', '称职', '基本称职', '不称职'],
    text: true
  }
}


var C3 = {
  key: "CommitPride",
  label: "评优等级",
  control: 'select',
  option: {
    options: ['进步奖', '敬业奖', '贡献奖'],
    text: true
  }
}

var C2 = {
  key: "Commit",
  label: "简要评语",
  control: 'input',
  option: {
    type: "textarea",
    height: 200,
    maxlen: 1200
  }
}

var CreateCommit = (arr) => {
  let o = {}
  arr.forEach(v => {
    o[C1.key + '_' + v] = C1,
      o[C2.key + '_' + v] = C2
    o[C3.key + '_' + v] = C3
  })
  return o
}

var CommitLayout = (key) => {
  return `<Row :gutter='12'><Col :span='12'>{{${C1.key+'_'+key}}}</Col><Col :span='12'>{{${C3.key+'_'+key}}}</Col></Row><div style='margin-top:10px;margin-bottom:20px;'>{{${C2.key+'_'+key}}}</div>`
}


var MAKE_CONDITION_LAYOUT = (key, condition) => {
  return `<div style='margin-top:10x' ${condition}>{{${key}}}</div>`
}

var MAKE_CONDITION_LAYOUTS = (arr, postfix = "") => {
  return arr.map(v => MAKE_CONDITION_LAYOUT(v.key + postfix, v.condition)).join('')
}


var SCORE_OPTIONS = ['10分', '9.5分', '9分', '8.5分', '8分', '7.5分', '7分', '6.5分', '6分', '5.5分', '5分及以下']
var EQ0 = {
  title: "职业道德",
  desc: "实行一票否决制，凡存在问题，考核结论即为不称职",
  heavy: 1,
  values: [0, -50],
  options: ['合格', '不合格']
}


// 项目经理总监
var E0 = {
  label: "部门经理/项目经理/总监",
  condition: 'v-if="db.model.position==0"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
2、“统筹管理能力”指面对突发、复杂、系统性问题的分析和解决能力。
3、“实际服务效果”指项目客观服务结果及业主单位评价。
4、“团队建设”含员工培养、内部管理、内部氛围等。`,
  cats: ['专业技术能力', '沟通协调能力', '统筹管理能力', '勤奋敬业精神', '目标实现能力', '实际服务效果', '团队建设情况', '配合公司情况'],
  heavy: [15, 10, 10, 10, 15, 15, 15, 10]
}
// 岗位工程师
var E1 = {
  label: '岗位工程师',
  condition: 'v-else-if="(db.model.dep >= 3) && (db.model.position==1 || db.model.position==2)"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
2、“岗位通用能力”是指软件、文字、语言表达、汇报等通用型能力。
3、“优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
4、“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
  cats: ['岗位专业能力', '岗位通用能力', '其他岗位通识', '精细严谨程度', '勤奋敬业精神', '沟通协调能力', '工作成果质量', '团队配合情况'],
  heavy: [15, 15, 10, 10, 10, 10, 15, 15]
}
// 工程师助理/员
var E2 = {
  label: "工程师助理/员级",
  condition: 'v-else-if="(db.model.dep >= 3) && (db.model.position==3)"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
2、“知识与技能”各分项需按成熟工程师助理要求，权衡评分。
3、“优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
4、	“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
  cats: ['专业基础知识', '流程制度掌握', '基础软件操作', '文字语言表达', '勤奋敬业精神', '精细严谨程度', '沟通协作态度', '学习发展潜力'],
  heavy: [10, 10, 10, 10, 20, 15, 15, 10]
}

// 监理工程师
var E3 = {
  label: '监理工程师',
  condition: 'v-else-if="(db.model.dep==1 || db.model.dep==2) && (db.model.position==1 || db.model.position==2)"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
2、“优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
3、“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
  cats: ['内业能力', '外业能力', '学习与创新', '精细严谨程度', '勤奋敬业精神', '沟通协调能力', '工作指导能力', '团队建设情况'],
  heavy: [15, 15, 10, 10, 20, 10, 10, 10]
}

// 监理员
var E4 = {
  label: "监理员",
  condition: 'v-else-if="(db.model.dep==1 || db.model.dep==2) && (db.model.position==3)"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
 2、“知识与技能”各分项需按成熟监理员要求，权衡评分。
 3、“优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
 4、	“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
  cats: ['专业基础知识', '施工工艺经验', '仪器操作技能', '资料整理能力', '勤奋敬业精神', '精细严谨程度', '沟通协作态度', '学习发展潜力'],
  heavy: [10, 10, 10, 10, 20, 15, 15, 10]
}

// 行政
var E5 = {
  label: '行政',
  condition: 'v-else-if="db.model.dep==0"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
 2、 “优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
 3、“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
  cats: ['服务意识', '协作意识', '严谨程度', '工作质量', '工作效率', '勤奋敬业精神', '支持项目情况', '支持部门情况'],
  heavy: [15, 15, 10, 10, 10, 10, 15, 15]

}

// E => E(n) 生成对应节点的控件
var qnraw = [E0, E1, E2, E3, E4, E5]

var CreateENLayout = (n) => (
  qnraw.map((v, i) => `<div style='margin-top:10px' ${v.condition}>{{E${i}${n}}}</div>`).join(''))
var EX_LIST = qnraw.map((v, qni) => ({
  key: 'E' + qni,
  label: `考核评分(${v.label})`,
  control: 'questionairy',

  option: {
    required: true,
    desc: v.desc,
    scorable: true,
    questions: [EQ0].concat(v.cats.map((c, i) => ({
      title: c,
      heavy: v.heavy[i] / 10,
      values: SCORE_OPTIONS.map((_, j) => (10 - j * 0.5)),
      options: SCORE_OPTIONS
    })))
  }
}))

var CreateENDef = (n, compared) => {
  let obj = {}
  EX_LIST = [...EX_LIST]
  EX_LIST.forEach(v => {
    obj[v.key + n] = {
      ...v
    }
    if (compared)
      v.option = {
        ...v.option,
        compared: compared.map(s => v.key + s)
      }
  })
  console.log(n, obj)
  return obj

}


var
  Q1 = {
    title: "工作饱满度",
    desc: "描述",
    options: ['非常饱满', '很饱满', '饱满', '有点饱满', '正常', '偏少', '很少']
  },
  Q2 = {
    title: "业主关系",
    desc: "发展潜力",
    options: ['非常认可', '很认可', '认可', '比较认可', '正常', '一般般', '不大认可']
  },
  Q3 = {
    title: "目标达成",
    desc: "描述",
    options: ['完全实现', '大多数实现', '重点实现', '基本实现', '有点差距', '差距很大']
  },
  Q4 = {
    title: "团队建设",
    desc: "描述",
    options: ['非常好', '很好', '好', '比较好', '正常', '一般般', '不大好']
  },
  Q5 = {
    title: "能力提升",
    desc: "描述",
    options: ['非常大', '很大', '大', '比较大', '正常', '不大', '几乎没有']
  },
  Q6 = {
    title: "成长性、发展潜力",
    desc: "发展潜力",
    options: ['潜力非常大', '潜力很大', '潜力大', '潜力较大', '潜力一般', '潜力不大', '没啥潜力']
  },
  Q7 = {
    title: "岗位等级",
    desc: "描述",
    options: ['见习', '初级', '合格', '成熟', '优秀']
  },
  Q8 = {
    title: "环境适应度",
    options: ['非常舒适', '很舒适', '舒适', '还算舒适', '适应', '还算适应', '不大适应']
  },
  Q9 = {
    title: "工作态度",
    options: ['非常努力', '很努力', '努力', '还算努力', '正常', '不太努力', '不努力']
  },
  Q10 = {
    title: "薪酬评估",
    options: ['明显高于岗位', '高于岗位', '偏高与岗位', '匹配', '基本匹配', '稍低于岗位', '明显低于岗位']
  },
  Q11 = {
    title: "薪酬调整或岗位晋升建议",
    options: ['明显提升', '适当提升', '略有提升', '保持不变', '可适当降低']
  },
  Q12 = {
    title: "建议岗位",
    options: ['项目经理/部门经理/总监(含副职)', '项目/部门经理助理/总代', '工程师级', '助理级/员级']
  }

var QN0 = {
  key: 'mem_self',
  condition: `v-if="db.model.position!=0"`,
  label: '员工->自评',
  questions: [Q1, Q5, Q8]
}
var QN1 = {
  key: 'mgr_self',
  label: '项目/部门经理->自评',
  condition: `v-else`,
  questions: [Q1, Q4, Q2, Q3]
}
var QN2 = {
  key: 'mgr2mem',
  label: '项目/部门经理->员工',
  questions: [Q1, Q5, Q9, Q6, Q12, Q7]
}
var QN3 = {
  key: 'dep2mem',
  label: '事业部->员工',
  condition: `v-if="db.model.position!=0"`,
  questions: [Q1, Q5, Q9, Q6, Q12, Q7, Q10, Q11]
}
var QN4 = {
  key: 'dep2mgr',
  label: '事业部->项目/部门经理',
  condition: `v-else`,
  questions: [Q1, Q4, Q2, Q3, Q12, Q7, Q10, Q11]
}


var MAKE_QN = (q) => {
  return {
    label: `调查问卷(${q.label})`,
    control: 'questionairy',
    option: {
      questions: q.questions,
      required: true
    }
  }
}

const QN_LIST = [QN0, QN1, QN2, QN3, QN4]

var CreateQNDef = () => {
  let o = {}
  QN_LIST.forEach(qn => {
    o[qn.key] = MAKE_QN(qn)
  })
  o.mgr2mem1 = o.mgr2mem2 = o.mgr2mem3 = o.mgr2mem
  return o
}




var flow = {
  name: '年终考核',
  desc: '2020年度人员考核定级及评优工作',
  icon: 'gongzuobaogao',
  def: {
    name: {
      label: "姓名",
      control: 'input',
      option: {
        required: true,
        editable: false,
        defaultValueGetter: "core/username",
      }
    },
    dep: {
      label: "部门",
      control: 'select',
      option: {
        options: ['行政综合', '房建监理事业部', '市政监理事业部', '建设管理事业部', '装修管理事业部', '造价咨询事业部', 'BIM咨询'],

        required: true,
      }
    },
    position: {
      label: "职务",
      control: 'select',
      option: {
        options: ['项目经理/部门经理/总监(含副职)', '项目/部门经理助理/总代', '工程师级', '助理级/员级'],
        required: true,
        defaultValue: 2
      }
    },
    rank: {
      label: "职称",
      control: 'select',
      option: {
        options: ['正高级', '高级', '中级', '初级', '无'],
        text: true,
        defaultValue: '无',
        required: true,
      }
    },
    project: {
      label: "所在项目部名称(可简写)",
      control: "input",
      option: {
        maxlen: 40
      }

    },
    report: {
      control: "docx",
      label: "述职报告",
      option: {
        single: true,
        required: true
      }
    },
    hire_date: {
      label: "入职时间",
      control: 'time',
      option: {
        required: true,
        type: 'date'
      }
    },
    cerificate: {
      label: "岗位证书",
      control: "select",
      option: {
        options: ['国家注册监理', '其他注册类', '监理工程师', '监理员', '其他'],
        defaultValue: '其他',
        text: true,
        required: true
      }
    },
    education: {
      label: "学历",
      control: "select",
      option: {
        options: ['硕士', '本科(全日制)', '本科(非全日制)', '专科', '中专', '其他'],
        defaultValue: '本科(全日制)',
        text: true,
        required: true
      }
    },
    ...CreateENDef('n1'),
    ...CreateENDef('n2', ['n1']),
    ...CreateENDef('n31', ['n1']),
    ...CreateENDef('n32', ['n1']),
    ...CreateENDef('n33', ['n1']),
    ...CreateENDef('n4', ['n1', 'n2', 'n31', 'n32', 'n33']),
    ...CreateCommit(['n2', 'n31', 'n32', 'n33', 'n4']),
    ...CreateQNDef()
  },
  nodes: {
    n1: {
      name: "员工自评",
      desc: "员工自行填写《员工考核表》进行自评打分并上传年度述职报告，选择相关的打分负责人",
      layout: ` <div>
      <div><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>2020年年终考核流程</h2>
      <Row :gutter='12' style='margin-top:30px'><Col :span='5'>{{name}}</Col><Col :span='9'>{{dep}}</Col><Col :span='10'>{{position}}</Col></Row>
       <Row :gutter='12' style='margin-top:10px'><Col :span='6'>{{rank}}</Col><Col :span='6'>{{education}}</Col><Col :span='6'>{{hire_date}}</Col><Col :span='6'>{{cerificate}}</Col></Row>
       <div style='margin-top:5px'>{{project}}</div>
       <div style='margin:10px 0'>{{executors}}</div>
       <h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2>
      <div style='margin-top:10px'>{{report}}</div>
      ${CreateENLayout('n1')}
      ${MAKE_CONDITION_LAYOUTS([QN0,QN1])}`,
      executor_default_getter: "core/uid",
      executor_getters: "core/users",
      executor_modifiable: false,
      //out_type
    },
    n2: {
      name: "第一责任人打分",
      desc: "由员工所在项目部/部门负责人对员工进行打分",
      layout: `
      <div><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>项目部打分评价表(第一责任人)</h2>
      ${CreateENLayout('n2')}
      ${CommitLayout('n2')}
      ${MAKE_CONDITION_LAYOUTS([QN2])}
      </div>`,
      view: `<div><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2>
      <Row :gutter='12' style='margin-top:30px'><Col :span='5'>{{name}}</Col><Col :span='9'>{{dep}}</Col><Col :span='10'>{{position}}</Col></Row>
       <Row :gutter='12' style='margin-top:10px'><Col :span='6'>{{rank}}</Col><Col :span='6'>{{education}}</Col><Col :span='6'>{{hire_date}}</Col><Col :span='6'>{{cerificate}}</Col></Row>
       <div style='margin-top:5px'>{{project}}</div>
      <div style='margin-top:10px'>{{report}}</div>
      ${CreateENLayout('n1')}
      ${MAKE_CONDITION_LAYOUTS([QN0,QN1])}`,
      executor_getters: 'core/users',
       sms: true
    },
    n3: {
      name: "平行责任人打分",
      desc: "由员工选定的平行负责人进行打分，结果不计入考核，仅作为参考 (至多3名)",
      layout: `
      <div>
      <template v-if='db.model.executors'><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>项目部打分评价表(平行责任人)</h2>
      <template v-if='db.env.executor == db.model.executors[0]'>
      ${CreateENLayout('n31')}
      ${CommitLayout('n31')}
        ${MAKE_CONDITION_LAYOUTS([QN2],"1")}
        </template><template v-else='db.env.executor == db.model.executors[1]'>
      ${CreateENLayout('n32')}
      ${CommitLayout('n32')}
        ${MAKE_CONDITION_LAYOUTS([QN2],"2")}
        < /template><template v-else='db.env.executor == db.model.executors[2]'>
      ${CreateENLayout('n33')}
      ${CommitLayout('n33')}
        ${MAKE_CONDITION_LAYOUTS([QN2],"3")}
        < /template>
     < /template>
      </div>`,
      view: `<div><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2>
      <Row :gutter='12' style='margin-top:30px'><Col :span='5'>{{name}}</Col><Col :span='9'>{{dep}}</Col><Col :span='10'>{{position}}</Col></Row>
       <Row :gutter='12' style='margin-top:10px'><Col :span='6'>{{rank}}</Col><Col :span='6'>{{education}}</Col><Col :span='6'>{{hire_date}}</Col><Col :span='6'>{{cerificate}}</Col></Row>
       <div style='margin-top:5px'>{{project}}</div>
      <div style='margin-top:10px'>{{report}}</div>
    
     <h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2> 
     ${CreateENLayout('n1')}
      ${MAKE_CONDITION_LAYOUTS([QN0,QN1])}`,
      optional: true,
      in_type: 1, // 1-每个人单独的
      executor_multiple: true,
      executor_max: 3,
      executor_getters: 'core/users',
      sms: true
    },
    n4: {
      name: "第二责任人打分",
      desc: "由所属事业部负责人对员工进行评分",
      layout: `
      <div><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>事业部打分(第二责任人)</h2>
      ${CreateENLayout('n4')}
      ${CommitLayout('n4')}
      ${MAKE_CONDITION_LAYOUTS([QN3,QN4])}
      </div>`,
      view: `<div><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2>
      <Row :gutter='12' style='margin-top:30px'><Col :span='5'>{{name}}</Col><Col :span='9'>{{dep}}</Col><Col :span='10'>{{position}}</Col></Row>
       <Row :gutter='12' style='margin-top:10px'><Col :span='6'>{{rank}}</Col><Col :span='6'>{{education}}</Col><Col :span='6'>{{hire_date}}</Col><Col :span='6'>{{cerificate}}</Col></Row>
       <div style='margin-top:5px'>{{project}}</div>
      <div style='margin-top:10px'>{{report}}</div>
    
      <h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>项目部打分评价表(第一责任人) 打分结果</h2>
      ${CreateENLayout('n2')}
      ${CommitLayout('n2')}
      ${MAKE_CONDITION_LAYOUTS([QN2])}
      <h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2> 
      ${CreateENLayout('n1')}
      ${MAKE_CONDITION_LAYOUTS([QN0,QN1])}`,
      exe_mul: true,
      executor_modifiable: false,
      out_type: 0, // 汇总只有一个即可，共享
      executor_default_getter_key: 'dep',
      executor_default_getter: 'core/_get_flow_dep_manager',
      executor_getters: "core/users",
      executor_multiple: true,
    },
    n5: {
      name: "结果汇总 (行政)",
      desc: "最终结果发送至行政部进行汇总",
      view: `<div><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2>
      <Row :gutter='12' style='margin-top:30px'><Col :span='5'>{{name}}</Col><Col :span='9'>{{dep}}</Col><Col :span='10'>{{position}}</Col></Row>
       <Row :gutter='12' style='margin-top:10px'><Col :span='6'>{{rank}}</Col><Col :span='6'>{{education}}</Col><Col :span='6'>{{hire_date}}</Col><Col :span='6'>{{cerificate}}</Col></Row>
       <div style='margin-top:5px'>{{project}}</div>
      <div style='margin-top:10px'>{{report}}</div>
      <h2 style = 'text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'> 事业部打分(第二责任人) 打分结果</h2>
      ${CreateENLayout('n4')}
       ${CommitLayout('n4')}
      ${MAKE_CONDITION_LAYOUTS([QN3,QN4])}
      <h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>项目部打分评价表(第一责任人) 打分结果</h2>
      ${CreateENLayout('n2')}
        ${CommitLayout('n2')}
      ${MAKE_CONDITION_LAYOUTS([QN2])}
       <h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2>
      ${CreateENLayout('n1')}
      ${MAKE_CONDITION_LAYOUTS([QN0,QN1])}
      `,
      executor_default: "ed49e690-3b83-11eb-8e1e-c15d5c7db744",
      executor_modifiable: false,
      executor_getters: "core/users",

    }
  },
  actions: {
    a1: {
      name: "发送",
      from: "n1",
      to: "n2",
      type: ACTION_TYPES.submit
    },
    a2: {
      name: "发送",
      from: "n1",
      to: "n3",
      type: ACTION_TYPES.submit,
      with: 'a1'
    },
    a4: {
      name: "发送",
      from: "n2",
      to: "n4",
      type: ACTION_TYPES.submit
    },
    a5: {
      name: "提交",
      from: "n3",

      type: ACTION_TYPES.submit
    },
    a7: {
      name: "发送",
      from: "n4",
      to: "n5",
      type: ACTION_TYPES.submit
    },
    a8: {
      name: "接收",
      from: "n5",
      type: ACTION_TYPES.accept
    },
  },
}


export default flow