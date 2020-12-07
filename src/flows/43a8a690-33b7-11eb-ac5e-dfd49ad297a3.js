var flow = {
  id: 1,
  name: '年终考核',
  desc: '2020年度人员考核定级及评优工作',
  icon: 'gongzuobaogao',
  def: {
    name: {
      label: "姓名",
      control: 'input',
      option: {
        required: true
      }
    },
    dep: {
      label: "部门",
      control: 'select',
      option: {
        options: ['装修事业部', '建设管理事业部', '房建监理事业部', '市政监理事业部'],
        defaultValue: 0,
        required: true,
      }
    },
    position: {
      label: "职务",
      control: 'select',
      option: {
        options: ['项目总监', '监理工程师', '监理员', '行政'],
        required: true,
        defaultValue: 2
      }
    },
    rank: {
      label: "职称",
      control: 'input'
    },
    executors: {
      control: ''
    },
    report: {
      control: "files",
      label: "述职报告 (docx)",
      option: {
        single: true,
        list: true
      }
    },
    score: {
      label: "考核打分",
      control: "questionairy",
      option: {
        questions: [{
          title: "工作饱满度",
          desc: "描述",
          options: ['非常饱满', '很饱满', '饱满', '有点饱满', '正常', '偏少', '很少']
        }, {
          title: "能力提升",
          desc: "描述",
          options: ['非常大', '很大', '大', '比较大', '正常', '不大', '几乎没有']
        }, {
          title: "成长性",
          desc: "发展潜力",
          options: ['潜力非常大', '潜力很大', '潜力大', '潜力较大', '潜力一般', '潜力不大', '没啥潜力']
        }, {
          title: "岗位等级",
          desc: "描述",
          options: ['见习', '初级助理', '助理', '成熟助理', '初级/偏弱工程师', '工程师', '成熟工程师', '优秀工程师']
        }, {
          title: "工作饱满度",
          desc: "描述",
          options: ['非常饱满', '很饱满', '饱满', '有点饱满', '正常', '偏少', '很少']
        }]
      }
    },
    self_ev: {
      label: "考核自评(员工)",
      control: "questionairy",
      option: {
        desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
          2、“ 分析判断能力” 指面对突发、 复杂、 系统性问题的分析和解决能力。
          3、“ 实际效果” 指项目客观上质量、 安全实际情况及业主单位评价。
          4、“ 团队建设” 含员工培养、 内部管理、 内部氛围等。
`,
        questions: [{
          title: "职业道德",
          desc: "实行一票否决制，凡存在问题，考核结论即为不称职",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }, {
          title: "学习创新能力",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }, {
          title: "沟通协调能力",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }, {
          title: "分析判断能力",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }, {
          title: "勤奋敬业精神",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }, {
          title: "控制力度",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }, {
          title: "实际效果",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }, {
          title: "配合公司情况",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }, {
          title: "团队建设情况",
          options: ['5分及以下', '6分', '6.5分', '7分', '7.5分', '8分', '8.5分', '9分', '9.5分', '10分']
        }]
      }
    },
    self_qn: {
      label: "调查问卷(员工)",
      control: "questionairy",
      option: {
        questions: [{
          title: "工作饱满度",
          desc: "描述",
          options: ['非常饱满', '很饱满', '饱满', '有点饱满', '正常', '偏少', '很少']
        }, {
          title: "团队建设",
          desc: "描述",
          options: ['非常好', '很好', '好', '比较好', '正常', '一般般', '不大好']
        }, {
          title: "业主关系",
          desc: "发展潜力",
          options: ['非常认可', '很认可', '认可', '比较认可', '正常', '一般般', '不大认可']
        }, {
          title: "目标达成",
          desc: "描述",
          options: ['完全实现', '大多数实现', '重点实现', '基本实现', '有点差距', '差距很大']
        }]
      }
    }

  },
  nodes: {
    n1: {
      name: "员工自评",
      desc: "员工自行填写《员工考核表》进行自评打分并上传年度述职报告，选择相关的打分负责人",
      layout: ` <div class='view'>
      <div class='paper-view'>
      <div><h2 style='text-align:center;font-family:仿宋;font-size:20px;font-weight:bold;'>员工自评表</h2><Row :gutter='12' style='margin-top:30px'><Col :span='6'>{{name}}</Col><Col :span='6'>{{dep}}</Col><Col :span='6'>{{position}}</Col><Col :span='6'>{{rank}}</Col></Row>
      <Row :gutter='12' style='margin-top:10px'><Col :span='24'>{{report}}</Col></Row></div>
      </div><div style='margin-top:10px'>{{self_ev}}</div><div style='margin-top:10px'>{{self_qn}}</div>
      </div>`,
    },
    n2: {
      name: "第一负责人打分(项目部/部门)",
      desc: "由项目部/部门负责人对员工进行打分"
    },
    n3: {
      name: "平行负责人打分",
      desc: "由员工选定的其他负责人进行打分，结果不计入考核，仅作为参考"
    },
    n4: {
      name: "第二负责人打分(事业部)",
      desc: "由所属事业部负责人对员工进行评分"
    },
    n5: {
      name: "结果汇总",
      desc: "最终结果发送至行政部进行汇总"
    }
  },
  actions: {
    a1: {
      name: "发送",
      from: "n1",
      to: "n2"
    },
    a2: {
      name: "发送",
      from: "n1",
      to: "n3"
    },
    a3: {
      name: "退回",
      from: "n2",
      to: "n1"
    },
    a4: {
      name: "发送",
      from: "n2",
      to: "n4"
    },
    a5: {
      name: "发送",
      from: "n3",
      to: "n4"
    },
    a6: {
      name: "退回",
      from: "n4",
      to: "n2"
    },
    a7: {
      name: "发送",
      from: "n4",
      to: "n5"
    },
    a8: {
      name: "接收",
      from: "n5",
      to: "finished"
    },
    a9: {
      name: "退回",
      from: "n5",
      to: "n4"
    }
  },
}




module.exports = flow