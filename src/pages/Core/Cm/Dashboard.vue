<template>
  <div class='hs-container hs-container-scroll' style='padding:20px;height:calc(100% - 40px);overflow-y:auto;color:#333;'>
    <Row :gutter='20'>
      <Col :span='6'> <Card style='min-height:600px;'  title="项目概况">

        <img :src="project.avatar || 'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/timg.jpg'" style="width:100%;margin-bottom:10px;" />
        {{project.desc}}
        <p style='margin-top:10px;'>
        技术服务 <b>宁波高专建设监理有限公司</b>
        </p><p>
        参建单位 <b>江北慈城开发投资有限责任公司</b>
        </p>
      </Card>
      
      <Card style='margin-top:10px;'  title="合同概况">

        业主单位，金额，收费条款，其他重要事项，调整与变更
      </Card></Col>
      <Col :span='18'><Row :gutter="20">
     
      <Col :span='14'>
      <Card style='height:200px;' padding="0">
         <Table
                        ref='factorTable'
                        class='gz-small-table'
                        :columns='totolCols'
                        :data='totalData'
                        :rowClassName='rowClassName'
                    />
                     <div style='width:100%;'>
                    <table
                        class='ivu-table ivu-table-body gz-small-table l-info-table'
                        cellspacing="0"
                        border="0"
                    >
                        <tbody>
                            <tr>
                                <th class='ivu-table-cell'>签约计划人均产值</th>
                                <td class='ivu-table-cell'>
                                  <!-- {{hs.formatSalary(adjustAmount/planHR*12)}} -->
                          {{hs.formatSalary(adjustAmount)}}
                                </td>
                                <th class='ivu-table-cell '>调整计划人均产值</th>
                                <td class='ivu-table-cell'>
                                  <!-- {{actualHR>0?hs.formatSalary(adjustAmount/actualHR*12):'-'}} -->423
                                  </td>
                                <th class='ivu-table-cell '>当前投入人均产值</th>
                                <td
                                    class='ivu-table-cell'
                                    style='color:rgb(95, 171, 241);font-weight:bold;'
                                >423
                                <!-- {{hs.formatSalary(actualProductionComplete*12/actualHRCompleted)}} -->
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    </div>
      </Card>
      </Col>
      <Col :span='10'>
      <Card style='height:200px;'  title="项目动态"></Card>
      </Col>
    </Row>
     <Row :gutter="20" style='margin-top:20px;'>
      <Col :span='24'>
      <Card style='height:200px;' title="进度安排">
          <Steps :current="1">
        <Step title="前期准备">
          <div slot='content'>
            253 / 245 
            <div>
              ...
            </div>
            <div>
              <Icon type='md-checkmark' /> 现场踏勘
            </div>
          </div>

        </Step>
        <Step title="桩基" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
         <Step title="待进行" content="这里是该步骤的描述信息"></Step>
        <Step title="待进行" content="这里是该步骤的描述信息"></Step>
    </Steps>

      </Card>
      </Col>
    </Row>
    <Row :gutter="20" style='margin-top:20px;margin-bottom:20px;'>
      <Col :span='6'>
      <Card style='height:300px;' title="项目人员" padding="5">
         <hs-list style="position:relative;border:none;"  :data="employees" :option="{tmpl:'BaseEmployeeDetail'}" />
      </Card>
      </Col>
      <Col :span='6'>
      <Card style='height:300px;' title="最新资料"></Card>
      </Col>
       <Col :span='6'>
      <Card style='height:300px;' title="合同管理"></Card>
      </Col>
      <Col :span='6'>
      <Card style='height:300px;' title="招标管理"></Card>
      </Col>
    </Row></Col>
    </Row>
    
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  data(){
    return {

    }
  },
  metaInfo:{
    title:'项目概况',
     route:"/:id"
  },
  computed:{
    ...mapGetters('project',['get']),
    id(){
      return this.$route.params.id
    },
    totolCols: [{
                key: 'target',
                title: '指标',
                width: 80,
                className: 'l-th',
                align: 'center'
            }, {
                key: 'totalStr',
                width: 80,
                title: '总体(签约)',
                align: 'center',
                render: (h, params) => {
                    let renderFunc = renderTarget(params.index)
                    return h('span', {}, renderFunc(h, params.row.total))
                }
            },
            {
                key: 'predict',
                width: 100,
                title: '总体(预测)',
                align: 'center',
                render: (h, params) => {
                    let renderFunc = renderTarget(params.index)
                    return h('span', {                        style: {
                            color: 'rgb(95, 171, 241)',
                            fontWeight: 'bold'
                        }                    }, renderFunc(h, params.row.predict))
                }
            }, {
                key: 'plan',
                width: 100,
                title: '当前(签约)',
                align: 'center',
                render: (h, params) => {
                    let renderFunc = renderTarget(params.index)
                    return h('span', {
                        style: {
                            color: '#888',
                            fontWeight: 'bold'
                        }                    }, renderFunc(h, params.row.plan))
                }
            }, {
                key: 'infactStr',
                width: 100,
                title: '当前(实际)',
                align: 'center',
                render: (h, params) => {
                    let renderFunc = renderTarget(params.index)
                    return h('span', {
                        style: {
                            color: 'rgb(95, 171, 241)',
                            fontWeight: 'bold'
                        }                    }, renderFunc(h, params.row.infact))
                }
            }, {
                key: 'percent',
                title: '对比(实际/签约)',
                width: 120,
                align: 'center',
                render: (h, params) => {
                    let percent = 0
                    if (params.row.infact && params.row.plan)
                        percent = (parseFloat(params.row.infact) * 100 / parseFloat(params.row.plan)).toFixed(2)
                    return this.hs.renderCompareProgress(h, percent, params.index > 1 )
                }
            },{
                key: 'percent',
                title: '进度(实际/总体)',
                align: 'center',
                minWidth:80,
                render: (h, params) => {
                    let percent = 0
                    if (params.row.infact && params.row.predict)
                        percent = (parseFloat(params.row.infact) * 100 / parseFloat(params.row.predict)).toFixed(2)
                    return this.hs.renderProgress(h, percent)
                }
            }],
            totalDataProgress: [],
            totalData: [{
                target: '劳动力', total: 100, infact: 50
            }, {
                target: '进度'
            }, {
                target: '产值'
            }, {
                target: '收费'
            }],
    project(){
      return this.get(this.id) || {}
    },
     employees(){
       let employee = {}
       let items = this.project.records || []
       items.forEach(v=>{
         if(employee[v.employee_id]){
           employee[v.employee_id].hr += v.hr = this.calcHr(v)
           if(moment(employee[v.employee_id].inDate).isBefore(moment(v.inDate))){
             employee[v.employee_id].inDate = v.inDate
             
             employee[v.employee_id].outDate = v.outDate
             employee[v.employee_id].factor = v.factor
             employee[v.employee_id].position_id = v.position_id 
           }
         }else{
            employee[v.employee_id] = {}
            employee[v.employee_id].employee_id = v.employee_id
            employee[v.employee_id].hr = v.hr = this.calcHr(v)
             employee[v.employee_id].factor = v.factor
            employee[v.employee_id].inDate = v.inDate
            employee[v.employee_id].outDate = v.outDate
            employee[v.employee_id].position_id = v.position_id 
         }
       })

       return Object.values(employee).filter(v=>!v.outDate)
     },

      // planHR() {
      //       let c = 0
      //       this.vnodes.forEach(v => {
      //           v.hrplan.forEach(r => {
      //               if (r)
      //                   c += parseFloat(r) * parseFloat(v.rplan_duration) / 30.4
      //           })
      //       })

      //       return c
      //   },
      //   planHRCompleted() {
      //       let c = 0
      //       let now = this.now
      //       let startTime = moment(this.startDate)
      //       this.vnodes.forEach(v => {
      //           let nodeStartDate = startTime
      //           let nodeEndDate = startTime.clone().add(v.rplan_duration, 'd')
      //           startTime = nodeEndDate
                
      //           if (nodeEndDate.isBefore(now)) {
      //               v.hrplan.forEach(r => {
      //                   if (r)
      //                       c += parseFloat(r) * parseFloat(v.rplan_duration) / 30.4
      //               })
      //           } else if (nodeStartDate.isBefore(now)) {
      //               v.hrplan.forEach(r => {
      //                   if (r)
      //                       c += parseFloat(r) * moment.duration(now - nodeStartDate).as('month')
      //               })

      //           }
      //       })

      //       return c
      //   },
      //   actualHRCompleted() {
      //       let c = 0
      //       let now = moment()
      //       let startTime = moment(this.startDate)
      //       // this.vnodes.forEach(v => {
      //       //     let nodeStartDate = startTime
      //       //     let nodeEndDate = startTime.clone().add(v.actual_duration, 'd')
      //       //     startTime = nodeEndDate
                
      //       //     if (nodeEndDate.isBefore(now)) {
      //       //         v.actual_hrplan.forEach(r => {
      //       //             if (r)
      //       //                 c += parseFloat(r) * parseFloat(v.actual_duration) / 30.4
      //       //         })
      //       //     } else if (nodeStartDate.isBefore(now)) {
      //       //         v.actual_hrplan.forEach(r => {
      //       //             if (r)
      //       //                 c += parseFloat(r) * moment.duration(now - nodeStartDate).as('month')
      //       //         })
      //       //     }
      //       // })
      //       this.project.employeesEx.forEach(e=>{
      //           let filterStart = startTime
      //           let filterEnd = now.clone()
      //           let eStart = moment(e.start_date)
      //           let eEnd = e.end_date?moment(e.end_date):now
      //           let duration = this.hs.calcInDuration(filterStart,filterEnd,eStart,eEnd)
      //           c += e.factor * duration
      //               console.log(e.name,e.factor*duration)
      //       })

      //       return c
      //   },
      //   parentRefData(){
      //       return {
      //           planDuration:this.planDuration,
      //           actualDuration:this.completeDuration,
      //           planDurationCompleted:this.planDurationCompleted,
      //           actualDurationCompleted:this.actualDurationCompleted,
      //           planHR:this.planHR,
      //           actualHR:this.actualHR,
      //           actualProductionComplete:this.actualProductionComplete,
      //           planProductionComplete:this.planProductionComplete,
      //            planHRCompleted:this.planHRCompleted,
      //           actualHRCompleted:this.actualHRCompleted
      //       }
      //   },
      //   aPlanHR() {
      //       let c = 0
      //       this.vnodes.forEach(v => {
      //           let t = 0;
      //           v.actual_hrplan.forEach(r => {
      //               if (r){
      //                  t += parseFloat(r) * parseFloat(v.actual_duration) / 30.4
      //                  c += parseFloat(r) * parseFloat(v.actual_duration) / 30.4
      //               }
      //           })
      //           v.hr = t
      //       })
      //       return c
      //   },
      //   vMonthData() {
      //       if (this.project.monthData && this.project.monthData.length) {
                
      //           let monthData = this.project.monthData
      //           for(let i=monthData.length;i>=0;i--){
      //               if(monthData[i] && monthData[i].data)
      //                   return monthData[i]
      //           }
      //       }

      //   },
      //    vnodes() {
      //       let date_id = this.now.format('YYYY-MM')
      //       let hrplan = this.vMonthData ? this.vMonthData.data : null
      //       let employees = this.project.employeesEx
           
      //       let positions = this.positionsEx
      //       if(!this.project.nodes || this.project.nodes.length == 0)
      //           return []
      //       let nodes = this.project.nodes

      //       for(let i=0;i<nodes.length;i++){
      //           if(nodes[i].rplan_start_time == null || nodes[i].rplan_duration == null)
      //               return []
      //       }

      //       const mapHrPlan = (plan,mapper)=>{
      //           let mapped = []
      //           if(Array.isArray(plan)){
      //               plan.forEach((v,i)=>mapped[mapper[i]] = v)
      //           }
      //           return mapped
      //       }

      //       const getPositionName = (eid)=>this.positionMap[eid]
            
      //       if(this.vMonthData){
      //           this.vMonthData.data.nodes.forEach(v=>{
      //               let n = nodes.find(n=>n.id == v.id)
      //               if(n){
      //                   n.actual_start_time = v.actual_start_time
      //                   n.actual_duration = v.actual_duration
      //                   n.actual_hrplan = v.actual_hrplan
      //               }
      //           })

                
      //       }

      //       nodes.forEach(v=>{
      //               if(!v.actual_duration)
      //                   v.actual_duration = v.rplan_duration
      //           })

      //       let start =  this.startDate
      //       let startPlan = start
      //       let startActual = start
      //       nodes = this.project.nodes.map((v, i, a) => {
      //           let vnode =  {
      //               id: v.id,
      //               percent: v.percent,
      //               amount: this.adjustAmount * (v.percent || 0) / 100,
      //               complete: v.complete,
      //               nodeName: v.nodeName,
      //               rplan_start_time: startPlan,
      //               rplan_duration: v.rplan_duration,
      //               actual_start_time: startActual,
      //               actual_duration: v.actual_duration,
      //               hrplan: mapHrPlan(v.hrplan,this.planPosMapper),
      //               actual_hrplan: (hrplan && hrplan.nodes[i] ?mapHrPlan(hrplan.nodes[i].actual_hrplan,this.actualPosMapper): mapHrPlan(v.hrplan,this.planPosMapper))
      //           }

      //           startPlan = this.hs.dateAddDays(startPlan, v.rplan_duration).format()
      //           startActual = this.hs.dateAddDays(startActual, v.actual_duration).format()
      //           return vnode
      //       })

      //       nodes.forEach((v, i, a) => {
      //           let hrplanData = []
      //           let hrplanDuration = []
      //           let nodeStart = moment(v.actual_start_time)
      //            v.start = nodeStart.format('YYYY-MM-DD')
      //           let nodeEnd = moment(v.actual_start_time).add(v.actual_duration, 'days')
               
      //           v.end = nodeEnd.format('YYYY-MM-DD')
      //           let inDuration = 0
      //           if (this.now.isAfter(nodeEnd) && Array.isArray(employees)) {
      //               employees.forEach((e,ei) => {
      //                   e.index = ei + 1
      //                   let hrplanDataEmployee = 0
      //                   let hrplanDateEmployeeDuration = 0
      //                   let inDate = moment(e.start_date)
      //                   let outDate = e.end_date ? moment(e.end_date) : this.now
      //                   let eStart = inDate.isBefore(nodeStart) ? nodeStart : inDate
      //                   let eEnd = outDate.isAfter(nodeEnd) ? nodeEnd : outDate

      //                   let posIndex = positions.findIndex(v=>v==getPositionName(e.position_id))
      //                   if(posIndex == -1)
      //                       console.error(getPositionName(e.position_id)+'is no exist')

      //                   let hr = 0
      //                   let duration = 0
      //                   if (typeof hrplanData[posIndex] == 'undefined') {
      //                       hrplanData[posIndex] = 0
      //                       hrplanDuration[posIndex] = 0
      //                   }

      //                   //处理未调整的数据,f=employee.factor
      //                   inDuration = this.hs.calcInDuration(inDate, outDate, eStart, eEnd)
      //                   if(inDuration && e.factor){
      //                       let hrData = inDuration * parseFloat(e.factor)
      //                       hrplanDataEmployee += hrData
      //                       hrplanDateEmployeeDuration += inDuration
      //                   }

      //                   hrplanData[posIndex] += (hrplanDateEmployeeDuration ? hrplanDataEmployee :0)
      //                   hrplanDuration[posIndex] += hrplanDateEmployeeDuration
      //               })

      //               if(nodeEnd.isBefore(this.vnow)){
      //                   let nodeDuration = moment.duration(nodeEnd - nodeStart).as('months')
      //                   a[i].actual_hrplan = hrplanData.map((v,t)=>hrplanDuration[t]?v/nodeDuration:0)
      //               }else if(nodeStart.isBefore(this.vnow)){
      //                   let plan = a[i].actual_plan
      //                   let planDuration = moment.duration(nodeEnd - this.vnow).as('months')
      //                   let aDuration = moment.duration(this.vnow - nodeStart).as('months')
      //                   a[i].actual_hrplan = hrplanData.map((v,t)=>{
      //                       let a = hrplanDuration[t]?v/aDuration:0
      //                       let r = v * planDuration + a * aDuration
      //                       return r
      //                   }
                        
      //                   )
      //               }
                    
      //               hrplanData = []
      //           }
      //       })

      //       return nodes
      //   },
      //   /** actualHR 实际的人力(预测值) */
      //   actualHR() {
      //       let c = 0
      //       this.vnodes.forEach(v => {
      //           let nodeStart = moment(v.actual_start_time)
      //           let nodeEnd = moment(v.actual_start_time).add(v.actual_duration, 'd')
                
      //           if (nodeEnd.isAfter(this.now)) {
      //               let duration =  this.now.isBefore(nodeStart)?v.actual_duration/30.4:moment.duration(nodeEnd - this.now).as('months')
      //               console.log("DU:",v.actual_duration/30.4,duration)
                    
      //               v.actual_hrplan.forEach(r => {
      //                   if (r)
      //                       c += parseFloat(r) * duration
      //               })
      //           }
      //       })
      //       return this.actualHRCompleted + c
      //   },
      //   planDuration() {
      //       let c = 0
      //       for (let i = 0; i < this.project.nodes.length; i++) {
      //           let v = this.project.nodes[i]
      //           if (v.rplan_duration)
      //               c += parseFloat(v.rplan_duration) / 30.4
      //           if (v.complete)
      //               break
      //       }
      //       return c
      //   },
      //   completeDuration() {
      //       let c = 0
      //       let nodes = this.vnodes
      //       for (let i = 0; i < nodes.length; i++) {
      //           let v = nodes[i]

      //           if (v.actual_duration)
      //               c += parseFloat(v.actual_duration) / 30.4
      //           if (v.complete)
      //               break
      //       }
      //       return c
      //   },
        adjustAmount(){
            this.project.amount_adjust = parseFloat(this.project.amount_adjust || 0)
            return this.project.amount + this.project.amount_adjust
        },
  }
  ,methods:{
    calcHr(data){
        let duration = moment.duration((data.outDate?moment(data.outDate):moment()) - moment(data.inDate)).as('month')
        return duration * data.factor
     },
     renderTarget:(index) => {
            if (index > 1)
                return (h, d) => this.hs.formatSalary(d)
            else if (index == 0)
                return (h, d) => (typeof d != "number" ? '-' : (d.toFixed(2) + ' 人月'))
            else
                return (h, d) => (typeof d != "number" ? '-' : (d.toFixed(1) + ' 月'))

        },
        
        // updateFactor(){
        //     let val = this.project
        //     let totalData = this.totalData
        //     if (val) {
        //         // 人力
        //         totalData[0].total = this.planHR
        //         totalData[0].predict = this.aPlanHR
        //         totalData[0].infact = this.actualHRCompleted
        //         totalData[0].plan = this.planHRCompleted
        //         // 工期
        //         totalData[1].infact = this.actualDurationCompleted
        //         totalData[1].total = this.planDuration
        //         totalData[1].plan = this.planDurationCompleted
        //         totalData[1].predict = this.actualDuration
        //         // 产值
        //         totalData[2].total = totalData[2].predict = this.adjustAmount
        //         totalData[2].plan = this.planProductionComplete
        //         totalData[2].infact = this.actualProductionComplete
        //         // 收费
        //         totalData[3].total = totalData[3].predict = this.adjustAmount
        //         totalData[3].infact = val.transferredAmount
        //         totalData[3].plan = this.planBill
        //         // 人均产值
        //         this.hrplan_production = this.totalData[3].total / totalData[0].total * 12
        //         this.actual_production = this.totalData[0].infact ? this.totalData[2].infact / totalData[0].infact * 12 : 0

        //         totalData.splice(0, 1, totalData[0])
        //     }
        // }
  }
}
</script>

<style>

</style>