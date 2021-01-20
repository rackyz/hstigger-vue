import API from '@/plugins/axios'
const axiosServer = API.CORE.axios
import util from '@/plugins/old/util.js'
import moment from 'moment'
const state = {
  contracts: [],
  bills: [],
  transfers: [],
  employees: [],
  loading_state: 0,
  nodes: [],
  payplans: [],
  payConditions: [],
  contractsBelongToDep: [],
  years: {},
  cates: {},
  templates: [],
  running: {
    contracts: []
  },
  durations: [],
  downloadPercent: {},
  types: {
    management: {
      0: '无类别',
      1: '全过程咨询',
      2: '房建监理',
      3: 'BIM咨询',
      4: '造价咨询',
      5: '招标代理',
      6: '项目管理',
      7: '市政监理',
      8: '其他服务'

    },
    manageState: ["前期", "在建", "竣工", "结束", "中止"],
    dep: {
      1: '项目管理事业部',
      5: '造价咨询事业部',
      6: 'BIM咨询事业部',
      7: '装修工程事业部',
      8: '市政监理事业部',
      9: '房建监理事业部',
      10: '对外合作(挂靠)',
      11: '其他'
    },
    dep_did: {
      1: 67324392,
      5: 67324393,
      6: 69172002,
      7: 69119063,
      8: 68827000,
      9: 67324391
    }
  }
}

const getters = {
  downloadPercent(state) {
    return state.downloadPercent
  },
  loading(state) {
    return state.loading_state
  },
  templates(state) {
    return state.templates || []
  },
  contracts(state) {
    return state.contracts
  },
  bills(state) {
    return state.bills
  },
  payplans(state) {
    return state.payplans
  },
  trans(state) {
    return state.trans
  },
  years(state) {
    return state.years
  },
  cates(state) {
    return state.cates
  },
  running(state) {
    return state.running
  },
  durations(state) {
    return state.durations
  },
  get: (state) => (id) => {
    return state.contracts.find(v => v.id == id) || {}
  },
  employees: (state) => {
    return state.employees
  },
  getType: (state) => (key, value) => {
    return state.types[key][value]
  },
  examples: (state) => {
    return state.contracts.slice(0, 10)
  },
  total: (state) => {
    return {
      amount: state.totalAmount,
      count: state.runCount,
      billAmount: state.billAmount,
      memberCount: state.memberCount
    }
  }
}

const actions = {
  sendDingMessage({}, {
    ding_id,
    msg
  }) {
    return new Promise((resolve, reject) => {
      return axiosServer.post('oa/messages?t=dd', {
        ding_id,
        msg
      }).then(res => {
        resolve()
      }).catch(reject)
    })
  },
  sendSMSMessage({
    commit
  }, {
    contract_id,
    ding_id
  }) {
    return new Promise((resolve, reject) => {
      return axiosServer.post('oa/messages?t=sms', {
        ding_id,
        contract_id
      }).then(res => {
        let ding_time = res.data.data
        if (ding_time)
          commit('save', {
            id: contract_id,
            ding_time
          })
        resolve()
      }).catch(reject)
    })
  },
  // 到账提醒
  sendSMSMessage2({
    commit
  }, {
    contract_id,
    ding_id
  }) {
    return new Promise((resolve, reject) => {
      return axiosServer.post('oa/messages?t=sms-tran', {
        ding_id,
        contract_id
      }).then(res => {
        let ding_time = res.data.data
        if (ding_time)
          commit('save', {
            id: contract_id,
            ding_time
          })
        resolve()
      }).catch(reject)
    })
  },
  addTemplate({
    commit
  }, t) {
    return new Promise((resolve, reject) => {
      return axiosServer.patch('oa/AddTemplate', t).then(res => {
        let updateInfo = res.data.data
        Object.assign(t, updateInfo)
        commit('addTemplate', t)
        resolve()
      }).catch(reject)
    })
  },
  delTemplate({
    commit
  }, tid) {
    if (!tid)
      return
    return new Promise((resolve, reject) => {
      return axiosServer.patch('oa/DelTemplate', {
        tid
      }).then(res => {
        commit('delTemplate', tid)
        resolve()
      }).catch(reject)
    })
  },
  changeState({
    commit
  }, param) {
    return new Promise((resolve, reject) => {
      return axiosServer.patch('oa/' + param.id, param).then(res => {
        commit("save", param)
        resolve()
      }).catch(e => {
        console.error(e)
        reject(e)
      })
    })
  },
  query({
    commit,
    rootState
  }) {
    return new Promise((resolve, reject) => {
      commit('loading', 1)
      axiosServer.get("oa", {
        onDownloadProgress(e) {
          commit('downloadPercent', {
            loaded: e.loaded,
            total: e.total
          })
        }
      }).then(res => {
        commit("saveUserInfo", rootState.core.session)
        commit('loading', 3)


        commit("saveList", res.data.data)
        resolve(res.data.data)
      }).finally(e=>{
        commit("loading",0)
      })
    })
  },
  getOldContract({}, id) {
    return new Promise((resolve, reject) => {
      axiosServer.get("oa/" + id).then(res => {
        resolve(res.data.data)
      })
    })
  },
  getEmployees({}, id) {
    return new Promise((resolve, reject) => {
      axiosServer.get(`oa/${id}?q=employees`).then(res => {
        resolve(res.data.data)
      })
    })
  },
  saveContracts({}, c) {
    return new Promise((resolve, reject) => {
      axiosServer.post(`oa?q=list`, c).then(res => {
        resolve(res.data.data)
      })
    })
  }
}


const MakeCategory = (set, contracts) => {
  const TYPE_NAMES = {
    0: "未分类",
    1: "全过程",
    2: "房建",
    3: "BIM",
    4: "造价",
    5: "招标",
    6: "项目",
    7: "市政",
    8: "其他"
  }
  let cates = {}
  contracts.forEach(v => {
    let type = v.type_id || 0
    v.typename = TYPE_NAMES[v.type_id]
    if (cates[type]) {

      cates[type].amount += v.amount || 0
      cates[type].billAmount += v.billedAmount || 0
      cates[type].transAmount += v.transAmount || 0
      cates[type].contracts.push(v)
    } else {
      cates[type] = {}
      cates[type].id = type
      cates[type].name = TYPE_NAMES[type]
      cates[type].amount = v.amount || 0
      cates[type].billAmount = v.billedAmount || 0
      cates[type].transAmount = v.transAmount || 0
      cates[type].contracts = [v]
    }
  })
  set.cates = Object.values(cates)
}

const PushArray = (target, item, key = 'list') => {
  if (!target || !item)
    return
  if (target[key]) {
    target[key].push(item)
  } else {
    target[key] = [item]
  }
}

const MakeBuildState = (contracts = [], years) => {
  let now = moment()
  contracts.forEach(v => {
    if (v.startTime) {
      let mStart = moment(v.startTime)
      PushArray(years[mStart.year()], v, 'startIn')
    }

    if (v.completeTime) {
      let mComplete = moment(v.completeTime)


      if (mComplete.isBefore(now))
        PushArray(years[mComplete.year()], v, 'CompleteIn')
      else
        PushArray(years[mComplete.year()], v, 'CompleteInFuture')
    }


  })
}


const calcInDuration = (inStart, inEnd, outStart, outEnd) => {
  let start, end
  if (inStart.isBefore(outStart)) {
    if (inEnd.isBefore(outStart))
      return 0
    else {
      start = outStart
      end = inEnd.isBefore(outEnd) ? inEnd : outEnd
    }
  } else {
    if (inStart.isAfter(outEnd)) {
      return 0
    } else {
      start = inStart
      end = inEnd.isBefore(outEnd) ? inEnd : outEnd
    }
  }
  if (end < start)
    return 0

  return moment.duration(end - start).as('month')
}


const mutations = {
  downloadPercent(state, d) {
    state.downloadPercent = d
    state.loading_state = 2
  },
  addTemplate(state, t) {
    state.templates.push(t)
  },
  delTemplate(state, tid) {
    let index = state.templates.findIndex(t => t.id == tid)
    if (index != -1)
      state.templates.splice(index, 1)

  },
  loading(state, s) {
    state.loading_state = s
  },
  saveUserInfo(state, userinfo) {
    state.userinfo = userinfo
  },
  save(state, item) {
    let index = state.contracts.findIndex(v => v.id == item.id)
    item.manageState = item.state

    if (index != -1) {
      item = Object.assign({}, state.contracts[index], item)
      if (item.amount_adjust != undefined) {
        item.amount_adjusted = item.amount + item.amount_adjust
        item.remainedAmount = item.amount_adjusted - item.billedAmount
      }
      state.contracts.splice(index, 1, item)
    } else
      state.contracts.push(item)



  },
  saveList(state, lists) {
    // preprocesser
    // caculate target by years
    //
    let years = {}
    let {
      contracts,
      bills,
      trans,
      nodes,
      conditions,
      employees,
      monthDatas,
    } = lists

    let now = moment()

    let payplans = [...conditions]


    const MANAGE_TYPES = ['全过程咨询', '房建监理', 'BIM咨询', '造价咨询', '招标代理', '项目管理', '市政监理', '其他服务']

    const MANAGE_STATES = ["准备中", "已开工", "已竣工", "已结束", "中止"]
    const depMap = {
      1: 0,
      5: 1,
      6: 2,
      7: 3,
      8: 4,
      9: 5,
      10: 6,
      11: 7,
      12: 8
    }
    // calc bills,trans
    contracts.forEach(v => {
      v.manageType = v.type_id
      v.amount_adjust = v.amount_adjust || 0
      v.amount_adjusted = v.amount + v.amount_adjust

      if (v.payplan) {
        v.payplans = JSON.parse(v.payplan)
        v.payplans.forEach(p => {
          p.fullamount = v.amount_adjusted
          p.projectname = v.name
          p.contract_id = v.id
          p.state = {
            '收费条款': 0,
            '合约内': 1,
            '新增': 3,
            '替换': 2
          } [p.extraType]
        })
        payplans = payplans.concat(v.payplans)
      } else {
        v.payplans = []
      }

      if (v.dep_id)
        v.depmapped = depMap[v.dep_id]
      else
        v.depmapped = 7

      v.dep_did = state.types.dep_did[v.dep_id]


      if (v.registerDate)
        v.startYear = (moment(v.registerDate).year() - 2011)
      else {
        v.startYear = 0
      }

      if (v.startYear < 0)
        v.startYear = 0

      if (v.amount_adjusted < 100000)
        v.contractScale = 0
      else if (v.amount_adjusted < 500000)
        v.contractScale = 1
      else if (v.amount_adjusted < 1000000)
        v.contractScale = 2
      else if (v.amount_adjusted < 3000000)
        v.contractScale = 3
      else if (v.amount_adjusted < 6000000)
        v.contractScale = 4
      else if (v.amount_adjusted < 10000000)
        v.contractScale = 5
      else
        v.contractScale = 6



    })
    let userinfo = state.userinfo
    contracts = contracts.filter(v =>
      (!v.split && !v.name.includes('副本')))

    state.amount = 0
    contracts.forEach(v => {
      state.amount += v.amount + v.amount_adjust
      v.thisYearBilled = 0
      v.thisYearTransferred = 0
      v.thisYearUnTransferred = 0

    })



    // calc category
    let cates = {}
    MakeCategory(cates, contracts)

    let contractMap = {}
    contracts.forEach(v => {
      contractMap[v.id] = v
    })
    employees = employees.filter(v => v.contract_id && contractMap[v.contract_id])


    // calc years
    contracts.forEach(v => {
      if (v.nodes) {
        v.nodes.forEach(n => {
          if (n.hrplan)
            n.hrplan = JSON.parse(n.hrplan)
          if (n.actual_hrplan)
            n.actual_hrplan = JSON.parse(n.actual_hrplan)

        })
      }
      let year = moment(v.registerDate, 'YYYY-MM-DD').year()
      v.currentNode = {
        nodeName: "已结束"
      }
      console.log('项目名称:', v.name)
      if (moment(v.inputTime).isAfter(moment().subtract(7, 'days')))
        v.new = true

      v.employees = employees.filter(e => e.contract_id == v.id)
      v.hrplans = monthDatas.filter(m => m.contract_id == v.id && m.type == 'hrplan')
      if (Array.isArray(v.hrplans) && v.hrplans.length > 0) {
        v.latestPlan = JSON.parse(v.hrplans[v.hrplans.length - 1].data)
        console.log(v.latestPlan)
        v.latestPlan.time = v.hrplans[v.hrplans.length - 1].updateTime
        if (v.nodes) {
          v.nodes.forEach((n, i) => {
            v.nodes[i] = Object.assign(v.nodes[i], v.latestPlan.nodes[i])
          })
        }
      }
      v.signPlanText = "无签约计划"
      if (v.latestPlan)
        v.signPlanText = "调整计划 " + moment(v.latestPlan.updateTime).format("YYYY-MM")
      else if (v.nodes)
        v.signPlanText = "签约计划"
      console.log(v.nodes)
      // 处理nodes  
      //  1 - 将最新的调整计划填充为actual_duration/actual_hrplan
      //  2 - 将实际的人员数据填充到actual_hrplan的历史值



      if (v.images) {
        v.images = JSON.parse(v.images)
        v.avatar = v.images[0]
      }

      if (typeof year === 'NaN')
        year = "empty"
      if (years[year]) {
        years[year].amount += (v.amount || 0)
        years[year].billAmount += (v.billedAmount || 0)
        years[year].contracts.push(v)
      } else {
        years[year] = {
          name: year,
          amount: (v.amount || 0),
          billAmount: (v.billedAmount || 0),
          StartIn: [],
          CompleteIn: [],
          CompleteInFuture: [],
          contracts: [v]
        }
      }

      v.startTime = v.proStartDate
      let time = moment(v.startTime)
      v.percent = 0
      v.duration = 0
      v.planWorkLoad = 0
      v.actualWorkLoad = 0
      v.thisYearWorkLoad = 0
      v.thisYearPlanedWorkLoad = 0
      v.TotalPlanHR = 0
      v.TotalActualPlanHR = 0
      v.PlanHR = 0
      v.ActualPlanHR = 0
      v.current_actual_duration = moment.duration(moment() - moment(v.startTime)).as('month')

      if (v.nodes) {

        let is_current = false
        let start
        let end
        let planStart
        let planEnd
        let time2 = time.clone()
        v.planDuration = 0
        v.duration = 0
        for (let i = 0; i < v.nodes.length; i++) {
          start = time.clone()
          end = time.add(v.nodes[i].actual_duration, 'days')
          planStart = time2.clone()
          planEnd = planStart.clone().add(v.nodes[i].rplan_duration, 'days')
          v.nodes[i].startTime = start.toString()
          v.nodes[i].endTime = end.toString()
          v.nodes[i].planEndTime = planEnd.toString()
          time = end
          time2 = planEnd
          v.planDuration += v.nodes[i].rplan_duration / 30.4
          v.duration += v.nodes[i].actual_duration / 30.4
          if (v.nodes[i].complete)
            v.completeTime = v.nodes[i].endTime

          if (!is_current && moment(v.nodes[i].endTime).isAfter(now)) {
            v.currentNode = v.nodes[i]
            is_current = true
            v.currentNodeDetail = v.nodes[i].nodeName
          }

          if (i == v.nodes.length - 1)
            v.endTime = v.nodes[i].endTime

          // 计算时间段内的工作量
          if (v.startTime && !v.startTime.includes('0000')) {

            let duration = calcInDuration(start.clone(), end.clone(), moment(v.startTime), moment()) * 30.4


            if (v.nodes[i].actual_duration) {
              v.actualWorkLoad += v.nodes[i].percent * duration / v.nodes[i].actual_duration

            }

            if (v.nodes[i].rplan_duration)
              v.planWorkLoad += v.nodes[i].percent * duration / v.nodes[i].rplan_duration
            let inYearDuration = calcInDuration(start.clone(), end.clone(), moment().startOf('year'), moment()) * 30.4
            v.nodes[i].hrplanValue = 0
            if (Array.isArray(v.nodes[i].hrplan)) {
              v.nodes[i].hrplan.forEach(h => {
                v.nodes[i].hrplanValue += h && h != "" ? parseFloat(h) : 0
              })
            }
            v.nodes[i].hrActualPlanValue = 0
            if (Array.isArray(v.nodes[i].actual_hrplan)) {
              v.nodes[i].actual_hrplan.forEach(h => {
                v.nodes[i].hrActualPlanValue += h && h != "" ? parseFloat(h) : 0
              })
            }

            v.TotalPlanHR += v.nodes[i].hrplanValue * (v.nodes[i].rplan_duration || 0) / 30.4
            v.TotalActualPlanHR += v.nodes[i].hrActualPlanValue * (v.nodes[i].actual_duration || 0) / 30.4

            let PlanDuration = calcInDuration(planStart.clone(), planEnd.clone(), moment(v.startTime), moment()) * 30.4

            v.PlanHR += v.nodes[i].hrplanValue * PlanDuration / 30.4
            v.ActualPlanHR += v.nodes[i].hrActualPlanValue * PlanDuration / 30.4

            if (v.nodes[i].actual_duration)
              v.thisYearWorkLoad += v.nodes[i].percent * inYearDuration / v.nodes[i].actual_duration


            inYearDuration = calcInDuration(start.clone(), end.clone(), moment().startOf('year'), moment().endOf('year')) * 30.4

            if (v.nodes[i].actual_duration)
              v.thisYearPlanedWorkLoad += v.nodes[i].percent * inYearDuration / v.nodes[i].actual_duration

          }


        }


        v.ActualHR2 = 0
        console.log('employees:', v.employees)
        v.employees.forEach(e => {
          let inDate = moment(e.start_date)
          let outDate = moment(e.end_date)
          let d = calcInDuration(inDate, outDate, moment(v.startTime), moment())
          v.ActualHR2 += d * e.factor

        })
        v.Production = v.actualWorkLoad * v.amount_adjusted / 100
        v.ThisYearProduction = v.thisYearWorkLoad * v.amount_adjusted / 100
        v.ThisYearPlanProduction = v.thisYearPlanedWorkLoad * v.amount_adjusted / 100
        console.log("HR:", v.TotalPlanHR, v.PlanHR, v.TotalActualPlanHR, v.ActualPlanHR)
        v.PlanHRPercent = v.PlanHR * 100 / v.TotalPlanHR
        v.ActualHRPercent = v.ActualHR2 * 100 / v.TotalActualPlanHR
        if (v.actual_duration)
          v.AverageHR = v.ActualHR2 / v.current_actual_duration
        if (v.AverageHR) {
          v.HumanProduction = v.Production / v.AverageHR / v.current_actual_duration * 12
          v.HumanBill = v.billedAmount / v.AverageHR / v.current_actual_duration * 12
        }
        console.log("PERCENMT:", v.actualWorkLoad)


      }




      v.manageState = v.state
      // if(!v.state){
      //     let mStartTime = moment(v.startTime)
      //     let mEndTime = moment(v.endTime)
      //     let mComplete = mEndTime
      //     if (v.completeTime) {
      //         mComplete = moment(v.completeTime)
      //     }

      //     if(now.isBefore(mStartTime)){
      //         v.manageState = 0
      //     }else if(now.isBefore(mComplete)){
      //         v.manageState = 1
      //     }else if(now.isBefore(mEndTime)){
      //         v.manageState = 2
      //     }else{
      //         v.manageState = 3
      //     }
      // }



      if (v.duration && v.startTime) {
        v.percent = moment.duration(now - moment(v.startTime)).as('days') / v.duration * 100

      } else {
        v.percent = 0
      }

    })

    bills = bills.filter(v => v.contract_id && contractMap[v.contract_id])
    payplans = payplans.filter(v => v.contract_id && contractMap[v.contract_id])

    // payplans
    payplans.forEach(v => {
      let c = contractMap[v.contract_id]
      v.estimate_date = v.estimate_payment_date
      if (c) {
        v.fullamount = c.amount_adjusted
        v.projectname = c.name
        v.charger = c.charger
        c.payplans.push(v)

      }
    })




    const billMap = {}

    bills.forEach(v => {
      billMap[v.id] = v
      let c = contractMap[v.contract_id]

      if (v.billingDate) {
        v.startYear = (moment(v.billingDate).year() - 2011)


      }

      v.month = moment(v.billingDate).month()
      v.quarter = moment(v.billingDate).quarter() - 1


      if (v.condition_id == '10086')
        v.conditionDetail = '[特殊] ' + (v.note || '未备注')
      else {
        let condition = conditions.find(c => c.id == v.condition_id)
        let payplan = payplans.find(c => c.id == v.condition_id)
        if (condition) {
          v.conditionDetail = '[条款] ' + condition.detail
          condition.estimate_date = v.billingDate




        }

        if (payplan) {
          if (payplan.billed) {
            payplan.billed += v.amount
          } else {
            payplan.billed = v.amount
          }
        }
      }


      if (c) {
        v.projectcharger = c.charger
        v.projectname = c.name
        v.contractType = c.type_id

        if (v.billingDate) {
          let em = moment(v.billingDate)
          if (em.year() == now.year()) {
            c.thisYearBilled += v.amount || 0
          }
        }

        if (c.bills) {
          c.bills.push(v)
        } else {
          c.bills = [v]
        }
      }


    })

    trans.forEach(v => {
      let c = contractMap[v.contract_id]
      let b = billMap[v.bill_id]

      if (c) {
        if (c.trans) {
          c.trans.push(v)
        } else {
          c.trans = [v]
        }
      }

      if (b) {
        if (b.trans) {
          b.trans.push(v)
        } else {
          b.trans = [v]
        }
      }


    })

    bills.forEach(v => {
      v.transferredAmount = 0
      if (Array.isArray(v.trans)) {
        v.trans.forEach(t => {
          v.transferredAmount += t.amount
        })
      }

      v.unTransferredAmount = v.amount - v.transferredAmount
      if (v.unTransferredAmount <= 0)
        v.transferred = 1
      else
        v.transferred = 0

    })

    lists.years = Object.values(years)

    lists.years.forEach(v => {
      MakeCategory(v, v.contracts)

    })


    lists.running = {
      contracts: contracts.filter(v => v.completeTime ? moment(v.completeTime).isAfter(moment()) : (v.nodes ? true : false))
    }

    MakeCategory(lists.running, lists.running.contracts)
    MakeBuildState(contracts, years)


    let durations = [{
      name: '未设置',
      contracts: []
    }, {
      name: '1年内',
      contracts: []
    }, {
      name: '1-2年',
      contracts: []
    }, {
      name: '2-5年',
      contracts: []
    }, {
      name: '5年以上',
      contracts: []
    }, ]



    contracts.forEach(v => {
      v.rplan_human = 0
      v.focused = v.focused || 0

      if (!v.duration) {
        durations[0].contracts.push(v)
      } else if (v.duration < 365) {
        durations[1].contracts.push(v)
      } else if (v.duration < 730) {
        durations[2].contracts.push(v)
      } else if (v.duration < 365 * 5) {
        durations[3].contracts.push(v)
      } else {
        durations[4].contracts.push(v)
      }

      if (v.positions)
        v.positions = JSON.parse(v.positions)
      else
        v.positions = []
      if (v.special_conditions)
        v.special_conditions = JSON.parse(v.special_conditions)

      if (v.payplan)
        v.payplan = JSON.parse(v.payplan)

      if (v.biamount)
        v.biamount = JSON.parse(v.biamount)

      if (v.actual_positions)
        v.actualPositions = JSON.parse(v.actual_positions)
      else
        v.actualPositions = []

      v.transferredAmount = 0
      if (Array.isArray(v.trans)) {
        v.trans.forEach(t => {
          v.transferredAmount += t.amount || 0
        })
      }



      v.conditions = conditions.filter(c => c.contract_id == v.id)

      v.payconditionsText = []
      if (v.conditions && v.conditions.length > 0) {

        v.conditions.forEach((p, i) => {
          let a = util.formatSalary(p.amount)
          let percent = parseInt(p.amount * 100 / v.amount_adjusted)
          v.payconditionsText.push(`[${i+1}] ` + p.detail + ' ' + a + `(${percent}%)`)
        })
      }
      v.payconditionsTextString = v.payconditionsText.join(';')

      v.nodes = nodes.filter(n => n.contract_id == v.id)

      v.rplanText = []
      if (v.nodes && v.nodes.length > 0) {
        v.nodes.forEach((p, i) => {
          v.rplanText.push(`[${i+1}] ` + p.nodeName + ' ' + (p.rplan_duration ? ((p.rplan_duration / 30.4).toFixed(1) + '月') : '0月'))
        })
      }


      if (v.bills && v.bills.length > 0) {
        v.lastBill = v.bills[v.bills.length - 1]
        if (v.lastBill.condition_id == '10086')
          v.lastBillNodeDetail = '[特殊] ' + (v.lastBill.note || '未备注')
        else {
          let condition = conditions.find(c => c.id == v.lastBill.condition_id)
          if (condition)
            v.lastBillNodeDetail = '[条款] ' + condition.detail
        }
        v.lastBillAmount = v.lastBill.amount
        v.lastBillDate = v.lastBill.billingDate
        let percent = parseInt(v.lastBillAmount / v.amount_adjusted * 100)
        v.lastBillDetail = v.lastBillNodeDetail + ' ' + util.formatSalary(v.lastBillAmount) + `(${percent})% ` +
          moment(v.lastBillDate).format("YY/MM/DD")

      }
      if (v.type_id === null || v.type_id === undefined)
        v.type_id = 7

      if (!v.amount_adjust)
        v.amount_adjust = 0
      v.remainedAmount = v.amount_adjusted - v.billedAmount
      v.unTransferredAmount = v.billedAmount - v.transferredAmount


      if (v.nodes && v.nodes.length > 0)
        v.hasNodes = 1
      else
        v.hasNodes = 0

      if (v.conditions && v.conditions.length > 0)
        v.hasPaymenConditions = 1
      else
        v.hasPaymenConditions = 0

      state.loading_state = 0


    })

    monthDatas.forEach(v => {
      let c = contractMap[v.contract_id]
      if (c) {
        if (c.monthData) {
          c.monthData.push(v)
        } else {
          c.monthData = [v]
        }
      }
    })

    employees.forEach(v => {
      let c = contractMap[v.contract_id]
      if (c) {
        v.projectname = c.name
        v.manageType = c.type_id

        if (v.end_date && moment(v.end_date).isBefore(now)) {
          v.current = 0
        } else {
          v.current = 1
        }

        if (v.start_date) {
          v.startYear = (moment(v.start_date).year() - 2012)
        }

        if (v.position_id && v.current) {
          if (v.position_id.includes('a')) {

            if (c.employeesA) {
              c.employeesA.push(v)
            } else {
              c.employeesA = [v]
            }
          } else if (v.position_id.includes('b')) {
            if (c.employeesB) {
              c.employeesB.push(v)
            } else {
              c.employeesB = [v]
            }
          } else {
            if (c.employeesC) {
              c.employeesC.push(v)
            } else {
              c.employeesC = [v]
            }
          }
        }

        v.employees = []
      }





      v.hr = moment.duration(v.end_date ? moment(v.end_date) : moment() - moment(v.start_date)).as('month') * v.factor

    })

    now = moment()

    contracts.forEach(v => {

      if (v.billedAmount > 0)
        v.hasBill = true

      // 子合约
      if (v.parent_id && contractMap[v.parent_id]) {
        v.parent = contractMap[v.parent_id]
        v.registerDate = v.registerDate || v.parent.registerDate
        v.effectiveDate = v.effectiveDate || v.parent.effectiveDate
        v.area = v.area || v.parent.area
        if (!v.payConditionsText || !v.payconditionsTextString)
          v.payconditionsTextString = v.parent.payconditionsTextString
        v.payConditionsText = v.parent.payConditionsText

      }


      if (v.employees && v.employees.length > 0)
        v.hasHumanPlan = 1
      else
        v.hasHumanPlan = 0

      let thisYearPayed = 0
      let thisYearPlaned = 0
      let seasonsPayed = [0, 0, 0, 0]
      let monthsPayed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let nextYearPayed = 0
      v.yearsPlaned = [0, 0, 0, 0, 0, 0]



      if (v.payplans) {
        let nextPay = true

        let havePayed = null

        for (let i = 0; i < v.payplans.length; i++) {
          let p = v.payplans[i]
          p.index = i + 1
          p.amount = p.amount || 0
          if (p.estimate_payment_date)
            p.estimate_date = p.estimate_payment_date

          if (p.estimate_date) {
            let em = moment(p.estimate_date)


            for (let x = now.year() + 1; x < now.year() + 6; x++) {
              if (em.year() == x) {
                v.yearsPlaned[x - now.year()] += p.amount

              }
            }


            if (em.year() == now.year()) {
              thisYearPayed += p.amount
              seasonsPayed[em.quarter() - 1] += p.amount
              monthsPayed[em.month()] += p.amount
              if (em.isAfter(now)) {
                thisYearPlaned += p.amount
              }
            } else if (em.year() == now.year() + 1) {
              nextYearPayed += p.amount
            }
            if (moment(p.estimate_date).isAfter(now) && nextPay) {
              v.nextPay = p
              nextPay = false
              let date = moment(p.estimate_date).format("YY/MM/DD")
              let detail = (p.extraType ? "[" + p.extraType + "]" : "") + ' ' + p.detail
              let amount = util.formatSalary(p.amount)
              v.nextPayDetail = `${detail} ${amount}(${parseInt(p.percent)}%) ${date}`
              v.nextPayAmount = p.amount
              v.nextPayDate = p.estimate_date
            }
          }


        }

        v.payplans = v.payplans.filter(v => v.estimate_date)
        v.payplansText = []



        if (v.payplans && v.payplans.length > 0) {

          v.payplans.forEach((p, i) => {
            let d = moment(p.estimate_date).format("YYYY/MM/DD")
            let a = util.formatSalary(p.amount)
            v.payplansText.push(`[${i + 1}] ` +
              d + ' ' + p.detail + ' ' + a)

          })
          v.hasPayPlan = true
        }
        v.payplansTextString = v.payplansText.join(';')

        v.progressDetail = v.progressDetail || v.currentNodeDetail

        //  v.thisYearPlanPayed = thisYearPayed
        v.thisYearPlanPayed = v.thisYearBilled + thisYearPlaned
        v.yearsPlaned[0] = v.thisYearPlanPayed
        v.yearhasplan = []
        v.yearhasplan[0] = (v.thisYearPlanPayed == 0)

        v.yearsPlaned.forEach((p, i) => {
          v.yearhasplan[i + 1] = (p != 0)
          v['yearsPlan' + i] = p
        })

        v.nextYearPayed = nextYearPayed
        v.monthsPayed = monthsPayed
        v.seasonsPayed = seasonsPayed
        v.seasonsPayed.forEach((s, i) => {
          v['seasons' + i] = s
        })

        v.monthsPayed.forEach((s, i) => {
          v['month' + i] = s
        })

        if (v.amount_adjusted) {
          v.billedPercent = v.billedAmount / v.amount_adjusted * 100
          v.transPercent = v.transferredAmount / v.amount_adjusted * 100
        } else {
          v.billedPercent = v.transPercent = 0
        }
        if (v.thisYearPlanPayed) {
          v.thisYearBilledPercent = v.thisYearBilled / v.thisYearPlanPayed * 100
        } else {
          v.thisYearBilledPercent = 0
        }

      }

      if (v.proFinishedDate) {
        v.finishYear = (moment(v.proFinishedDate).year() - 2011)
      } else {
        v.finishYear = 0
      }

      if (v.finishYear < 0)
        v.finishYear = 0
      if (v.finsihYear > 14)
        v.finishYear = 15

      if (v.employeesA) {
        let index = v.employeesA.findIndex(s => s.position_id == 'a1')

        if (index != -1) {
          let manager = v.employeesA[index]
          v.employeesA.splice(index, 1)
          v.employeesA.splice(0, 0, manager)
        }
        let s = new Set(v.employeesA.filter(v => v.current).map(e => e.name))
        v.employeesA = Array.from(s)
      }
      if (v.employeesB) {
        let index = v.employeesB.findIndex(s => s.position_id == 'b1')

        if (index != -1) {
          let manager = v.employeesB[index]
          v.employeesB.splice(index, 1)
          v.employeesB.splice(0, 0, manager)
        }
        let s = new Set(v.employeesB.filter(v => v.current).map(e => e.name))
        v.employeesB = Array.from(s)
      }
      if (v.employeesC) {
        let s = new Set(v.employeesC.filter(v => v.current).map(e => e.name))
        v.employeesC = Array.from(s)
      }





    })





    payplans = payplans.filter(v => v.projectname && v.amount && v.estimate_date)

    let accurate_plans_amounts = {}


    payplans.forEach(v => {

      v.index = v.index || v.id
      v.accurated = 0
    })

    payplans.sort((a, b) => {
      return (moment(a.estimate_date).isAfter(moment(b.estimate_date)) ? 1 : -1)
    })

    payplans.forEach(v => {
      let c = contractMap[v.contract_id]
      if (c) {
        if (accurate_plans_amounts[v.contract_id])
          accurate_plans_amounts[v.contract_id] += v.amount
        else
          accurate_plans_amounts[v.contract_id] = v.amount
      }

      v.accurated_amount = accurate_plans_amounts[v.contract_id]
    })

    payplans.forEach(v => {
      if (v.fullamount)
        v.planPercent = v.accurated_amount * 100 / v.fullamount

      v.billPercent = v.billed * 100 / v.amount
      if (moment(v.estimate_date).isBefore(now))
        v.past = 1
      else
        v.past = 0

      if (v.billPercent > 99)
        v.finished = 1
      else
        v.finished = 0

      v.year = moment(v.estimate_date).year() - 2012
      v.quarter = moment(v.estimate_date).quarter() - 1
      v.month = moment(v.estimate_date).month()


    })

    contracts.forEach(v => {
      if (v.payplans) {
        v.NextYearPayPlans = v.payplans.filter(p => p.estimate_date && moment(p.estimate_date).year() === (moment().year() + 1))
        v.NextYearPayPlansDetail = v.NextYearPayPlans.map((p, i) => {
          let d = moment(p.estimate_date).format("YYYY/MM/DD")
          let a = util.formatSalary(p.amount)
          return `[${i + 1}] ` + d + ' ' + p.detail + ' ' + a
        }).join(';')

        v.NextYearPayPlanNodes = v.NextYearPayPlans.map(p => p.detail).join(';')
        v.overdatePlansText = v.payplans.filter(p => !p.finished && p.past && p.estimate_date).map((p, i) => {
          let d = moment(p.estimate_date).format("YYYY/MM/DD")
          let a = util.formatSalary(p.amount)
          return `[${i + 1}] ` + d + ' ' + p.detail + ' ' + a
        })
        if (v.overdatePlansText.length)
          v.overdatePlansTextString = '逾期计划' + v.overdatePlansText.length
        v.fromStartYearBill = 0
        v.toEndYearBill = 0
        v.toNewYearBill = 0
        if (Array.isArray(v.bills))
          v.bills.forEach(b => {
            if (moment(b.billingDate).isBefore('2020/09/31', 'YYYY/MM/DD') && moment(b.billingDate).isAfter(moment().startOf('year')))
              v.fromStartYearBill += b.amount

            v.thisYearUnTransferred += (b.amount - b.transferredAmount)
          })

        v.payplans.forEach(p => {

          if (!p.past) {
            if (moment(p.estimate_payment_date).isBefore(moment().endOf('year'))) {
              v.toEndYearBill += p.amount
            } else if (moment(p.estimate_payment_date).isBefore(moment('2021/2/12', 'YYYY/MM/DD'))) {
              v.toNewYearBill += p.amount
            }
          }
        })
      }

      v.thisYearLatest = v.thisYearPlanPayed - v.thisYearBilled
      v.lastBillPercent = 0
      if (v.lastBill) {
        v.lastBillPercent = v.lastBill.transferredAmount * 100 / v.lastBill.amount
        v.lastBillTransferred = v.lastBill.transferredAmount
        v.lastBillNode = v.lastBill.detail
      }
      if (Array.isArray(v.trans)) {
        v.trans.forEach(t => {
          if (moment(t.transferredDate).year() == moment().year()) {
            v.thisYearTransferred += t.amount || 0
          }
        })

      }

    })


    lists.payplans = payplans
    lists.bills = bills
    lists.employees = employees
    lists.durations = durations
    lists.contracts = contracts

    Object.assign(state, lists)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}