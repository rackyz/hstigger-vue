<template>
  <div class='hs-container hs-container-scroll oaold' style='padding:20px;height:calc(100% - 40px);overflow-y:auto;color:#333;'>
    <Row :gutter='20'>
      <Col :span='7'> <Card style='min-height:600px;' padding="0">

        <img :src="project.avatar || 'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/timg.jpg'" style="width:100%;" />
        {{project.desc}}
         <table
                            class='ivu-table ivu-table-body gz-small-table l-info-table'
                            cellspacing="0"
                            border="0"
                        >
                            <tbody>
                                <tr>
                                    <th class='ivu-table-cell'>合约编号</th>
                                    <td class='ivu-table-cell'>{{project.code || ''}}</td>
                                    <th class='ivu-table-cell'>合约类型</th>
                                    <td class='ivu-table-cell'>{{project.type.name || ''}}</td>
                                </tr>

                                <tr>
                                    <th class='ivu-table-cell'>合约金额</th>
                                    <td class='ivu-table-cell'>{{hs.formatSalary(project.amount) || ''}}</td>
                                    <th class='ivu-table-cell'>调整金额</th>
                                    <td class='ivu-table-cell'>{{hs.formatSalary(project.amount_adjust) || ''}}</td>
                                </tr>
                               

                                <tr>
                                    <th class='ivu-table-cell'>签约时间</th>
                                    <td class='ivu-table-cell'>{{project.registerDate?moment(project.registerDate).format('L'):'-'}}</td>
                                    <th class='ivu-table-cell'>中标时间</th>
                                    <td class='ivu-table-cell'>{{project.effectiveDate?moment(project.effectiveDate).format('L'):'-'}}</td>

                                </tr>
                                <tr>
                                    <th class='ivu-table-cell'>业主单位</th>
                                    <td
                                        class='ivu-table-cell'
                                        colspan='3'
                                    >{{project.partA || ''}}</td>
                                </tr>

                               
                                <tr>
                                    <th class='ivu-table-cell'>建筑类型</th>
                                    <td class='ivu-table-cell'>{{project.buildingCategory || ''}}</td>
                                    <th class='ivu-table-cell'>项目地点</th>
                                    <td class='ivu-table-cell'>{{project.buildingAddress || ''}}</td>
                                </tr>
                                <tr>

                                    <th class='ivu-table-cell'>总建筑面积 (m<sup>2</sup>)</th>
                                    <td class='ivu-table-cell'>{{project.buildingArea || ''}}</td>
                                    <th class='ivu-table-cell'>建筑高度 (m)</th>
                                    <td class='ivu-table-cell'>{{project.buildingHeight || ''}}</td>

                                </tr>
                                <tr>
                                    <th class='ivu-table-cell'>单体数量 (幢)</th>
                                    <td class='ivu-table-cell'>{{project.buildingCount || ''}}</td>
                                    <th class='ivu-table-cell'>地下室层数</th>
                                    <td class='ivu-table-cell'>{{project.basementLevels || ''}}</td>
                                </tr>

                                <tr>
                                    <th class='ivu-table-cell'>服务开始日期</th>
                                    <td class='ivu-table-cell'>{{project.proStartDate ?hs.moment(project.proStartDate).format('YYYY-MM-DD'):''}}</td >
                                     <th class='ivu-table-cell'>服务状态</th>
                                    <td class='ivu-table-cell'>{{states[project.state]}}</td >
                                   
                                </tr>
                                <tr>
                                     <th class='ivu-table-cell'>开工日期</th>
                                    <td class='ivu-table-cell'>{{project.proStartWorkDate ? hs.moment(project.proStartWorkDate).format('YYYY-MM-DD') : ''}}</td>
                                     <th class='ivu-table-cell'>竣工日期</th>
                                    <td class='ivu-table-cell'>{{project.proFinishedDate ? hs.moment(project.proFinishedDate).format('YYYY-MM-DD') : ''}}</td>
                                    </tr>

                                    <tr>
                                     <th class='ivu-table-cell'>当前进度</th>
                                    <td class='ivu-table-cell' colspan="3">{{project.progressDetail}}</td >
                                    </tr>



                            </tbody>
                        </table>
      </Card>
      
      <Card style='margin-top:10px;'  title="合同概况">

        业主单位，金额，收费条款，其他重要事项，调整与变更
      </Card></Col>
      <Col :span='17'><Row :gutter="20">
     
      <Col :span='14'>
      <Card padding="0">
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
                                  {{hs.formatSalary(adjustAmount/planHR*12)}}
                                </td>
                                <th class='ivu-table-cell '>调整计划人均产值</th>
                                <td class='ivu-table-cell'>
                                  {{actualHR>0?hs.formatSalary(adjustAmount/actualHR*12):'-'}}
                                  </td>
                                <th class='ivu-table-cell '>当前投入人均产值</th>
                                <td
                                    class='ivu-table-cell'
                                    style='color:rgb(95, 171, 241);font-weight:bold;'
                                >
                                {{hs.formatSalary(actualProductionComplete*12/actualHRCompleted)}}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    </div>
      </Card>
      </Col>
      <Col :span='10'>
      <Card style='height:200px;'  title="项目动态">
        {{vMonthData}}
      </Card>
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
      <Card style='height:300px;' title="最新资料">
        
      </Card>
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
const moment = require('moment')
export default {
  data(){
    return {
       rplan: false,
            modalHrList: false,
            rawplan1:false,
            content:null,
            dynamicMode:'month',
            selectedTime:moment(),
            modalInfo:false,
            //只显示在职员工
            inPosition: false,
            rawplan: false,
            score: 88,
            scoreColor: '#666',
            actual_production: 0,
            hrplan_production: 0,
            chartMode:'average-human-production',
            modalBillDetail: false,
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
                    return this.util.renderCompareProgress(h, percent, params.index > 1 )
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
                    return this.util.renderProgress(h, percent)
                }
            }],
            totalDataProgress: [],
            printing:false,
             totalData: [{
                target: '劳动力', total: 100, infact: 50
            }, {
                target: '进度'
            }, {
                target: '产值'
            }, {
                target: '收费'
            }],
    }
  },
  metaInfo:{
    title:'项目概况',
     route:"/:id"
  },
  mounted(){
    this.updateFactor()
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

      planHR() {
            let c = 0
            this.vnodes.forEach(v => {
                v.hrplan.forEach(r => {
                    if (r)
                        c += parseFloat(r) * parseFloat(v.rplan_duration) / 30.4
                })
            })

            return c
        },
        planHRCompleted() {
            let c = 0
            let now = this.now
            let startTime = moment(this.startDate)
            this.vnodes.forEach(v => {
                let nodeStartDate = startTime
                let nodeEndDate = startTime.clone().add(v.rplan_duration, 'd')
                startTime = nodeEndDate
                
                if (nodeEndDate.isBefore(now)) {
                    v.hrplan.forEach(r => {
                        if (r)
                            c += parseFloat(r) * parseFloat(v.rplan_duration) / 30.4
                    })
                } else if (nodeStartDate.isBefore(now)) {
                    v.hrplan.forEach(r => {
                        if (r)
                            c += parseFloat(r) * moment.duration(now - nodeStartDate).as('month')
                    })

                }
            })

            return c
        },
        actualHRCompleted() {
            let c = 0
            let now = moment()
            let startTime = moment(this.startDate)
            // this.vnodes.forEach(v => {
            //     let nodeStartDate = startTime
            //     let nodeEndDate = startTime.clone().add(v.actual_duration, 'd')
            //     startTime = nodeEndDate
                
            //     if (nodeEndDate.isBefore(now)) {
            //         v.actual_hrplan.forEach(r => {
            //             if (r)
            //                 c += parseFloat(r) * parseFloat(v.actual_duration) / 30.4
            //         })
            //     } else if (nodeStartDate.isBefore(now)) {
            //         v.actual_hrplan.forEach(r => {
            //             if (r)
            //                 c += parseFloat(r) * moment.duration(now - nodeStartDate).as('month')
            //         })
            //     }
            // })
            this.project.employeesEx.forEach(e=>{
                let filterStart = startTime
                let filterEnd = now.clone()
                let eStart = moment(e.start_date)
                let eEnd = e.end_date?moment(e.end_date):now
                let duration = this.hs.calcInDuration(filterStart,filterEnd,eStart,eEnd)
                c += e.factor * duration
                    console.log(e.name,e.factor*duration)
            })

            return c
        },
        parentRefData(){
            return {
                planDuration:this.planDuration,
                actualDuration:this.completeDuration,
                planDurationCompleted:this.planDurationCompleted,
                actualDurationCompleted:this.actualDurationCompleted,
                planHR:this.planHR,
                actualHR:this.actualHR,
                actualProductionComplete:this.actualProductionComplete,
                planProductionComplete:this.planProductionComplete,
                 planHRCompleted:this.planHRCompleted,
                actualHRCompleted:this.actualHRCompleted
            }
        },
        aPlanHR() {
            let c = 0
            this.vnodes.forEach(v => {
                let t = 0;
                v.actual_hrplan.forEach(r => {
                    if (r){
                       t += parseFloat(r) * parseFloat(v.actual_duration) / 30.4
                       c += parseFloat(r) * parseFloat(v.actual_duration) / 30.4
                    }
                })
                v.hr = t
            })
            return c
        },
        vMonthData() {
            if (this.project.monthData && this.project.monthData.length) {
                
                let monthData = this.project.monthData
                for(let i=monthData.length;i>=0;i--){
                    if(monthData[i] && monthData[i].data)
                        return monthData[i]
                }
            }

        },
         states(){return ['前期','在建','竣工','结束','中止']},
          positionMap(){
            let positionGroups =[{
                id:1,
                name:'项目管理',
                positions:['项目经理', '项目经理助理', '前期工程师', '技术工程师', '合约工程师', '机电工程师','项目副经理','造价工程师','现场工程师'].map((v,i)=>({id:'a'+(i+1),name:v}))
            },{
                id:2,
                name:'监理',
                positions:['总监', '总代', '土建工程师', '土建监理员', '安装工程师', '市政工程师', '市政监理员','资料员','安装监理员','桩基监理员'].map((v,i)=>({id:'b'+(i+1),name:v}))
            },{
                id:3,
                name:"其他岗位",
                positions:[{id:"c3",name:'其他岗位'}]
            }]
            let map = {}
            positionGroups.forEach(v=>{
                v.positions.forEach(p=>{
                    map[p.id] = p.name
                })
            })
            return map
        },
         positionsEx(){
            let combinePositions = [...this.project.positions,...this.project.actualPositions,...Object.values(this.positionMap)]
            let uniquePosition = new Set(combinePositions)
            return [...uniquePosition]
        },
         vnodes() {
            let date_id = this.now.format('YYYY-MM')
            let hrplan = this.vMonthData ? this.vMonthData.data : null
            let employees = this.project.employeesEx
           
            let positions = this.positionsEx
            if(!this.project.nodes || this.project.nodes.length == 0)
                return []
            let nodes = this.project.nodes

            for(let i=0;i<nodes.length;i++){
                if(nodes[i].rplan_start_time == null || nodes[i].rplan_duration == null)
                    return []
            }

            const mapHrPlan = (plan,mapper)=>{
                let mapped = []
                if(Array.isArray(plan)){
                    plan.forEach((v,i)=>mapped[mapper[i]] = v)
                }
                return mapped
            }

            const getPositionName = (eid)=>this.positionMap[eid]
            
            if(this.vMonthData){
                this.vMonthData.data.nodes.forEach(v=>{
                    let n = nodes.find(n=>n.id == v.id)
                    if(n){
                        n.actual_start_time = v.actual_start_time
                        n.actual_duration = v.actual_duration
                        n.actual_hrplan = v.actual_hrplan
                    }
                })

                
            }

            nodes.forEach(v=>{
                    if(!v.actual_duration)
                        v.actual_duration = v.rplan_duration
                })

            let start =  this.startDate
            let startPlan = start
            let startActual = start
            nodes = this.project.nodes.map((v, i, a) => {
                let vnode =  {
                    id: v.id,
                    percent: v.percent,
                    amount: this.adjustAmount * (v.percent || 0) / 100,
                    complete: v.complete,
                    nodeName: v.nodeName,
                    rplan_start_time: startPlan,
                    rplan_duration: v.rplan_duration,
                    actual_start_time: startActual,
                    actual_duration: v.actual_duration,
                    hrplan: mapHrPlan(v.hrplan,this.planPosMapper),
                    actual_hrplan: (hrplan && hrplan.nodes[i] ?mapHrPlan(hrplan.nodes[i].actual_hrplan,this.actualPosMapper): mapHrPlan(v.hrplan,this.planPosMapper))
                }

                startPlan = this.hs.dateAddDays(startPlan, v.rplan_duration).format()
                startActual = this.hs.dateAddDays(startActual, v.actual_duration).format()
                return vnode
            })

            nodes.forEach((v, i, a) => {
                let hrplanData = []
                let hrplanDuration = []
                let nodeStart = moment(v.actual_start_time)
                 v.start = nodeStart.format('YYYY-MM-DD')
                let nodeEnd = moment(v.actual_start_time).add(v.actual_duration, 'days')
               
                v.end = nodeEnd.format('YYYY-MM-DD')
                let inDuration = 0
                if (this.now.isAfter(nodeEnd) && Array.isArray(employees)) {
                    employees.forEach((e,ei) => {
                        e.index = ei + 1
                        let hrplanDataEmployee = 0
                        let hrplanDateEmployeeDuration = 0
                        let inDate = moment(e.start_date)
                        let outDate = e.end_date ? moment(e.end_date) : this.now
                        let eStart = inDate.isBefore(nodeStart) ? nodeStart : inDate
                        let eEnd = outDate.isAfter(nodeEnd) ? nodeEnd : outDate

                        let posIndex = positions.findIndex(v=>v==getPositionName(e.position_id))
                        if(posIndex == -1)
                            console.error(getPositionName(e.position_id)+'is no exist')

                        let hr = 0
                        let duration = 0
                        if (typeof hrplanData[posIndex] == 'undefined') {
                            hrplanData[posIndex] = 0
                            hrplanDuration[posIndex] = 0
                        }

                        //处理未调整的数据,f=employee.factor
                        inDuration = this.hs.calcInDuration(inDate, outDate, eStart, eEnd)
                        if(inDuration && e.factor){
                            let hrData = inDuration * parseFloat(e.factor)
                            hrplanDataEmployee += hrData
                            hrplanDateEmployeeDuration += inDuration
                        }

                        hrplanData[posIndex] += (hrplanDateEmployeeDuration ? hrplanDataEmployee :0)
                        hrplanDuration[posIndex] += hrplanDateEmployeeDuration
                    })

                    if(nodeEnd.isBefore(this.vnow)){
                        let nodeDuration = moment.duration(nodeEnd - nodeStart).as('months')
                        a[i].actual_hrplan = hrplanData.map((v,t)=>hrplanDuration[t]?v/nodeDuration:0)
                    }else if(nodeStart.isBefore(this.vnow)){
                        let plan = a[i].actual_plan
                        let planDuration = moment.duration(nodeEnd - this.vnow).as('months')
                        let aDuration = moment.duration(this.vnow - nodeStart).as('months')
                        a[i].actual_hrplan = hrplanData.map((v,t)=>{
                            let a = hrplanDuration[t]?v/aDuration:0
                            let r = v * planDuration + a * aDuration
                            return r
                        }
                        
                        )
                    }
                    
                    hrplanData = []
                }
            })

            return nodes
        },
        /** actualHR 实际的人力(预测值) */
        actualHR() {
            let c = 0
            this.vnodes.forEach(v => {
                let nodeStart = moment(v.actual_start_time)
                let nodeEnd = moment(v.actual_start_time).add(v.actual_duration, 'd')
                
                if (nodeEnd.isAfter(this.now)) {
                    let duration =  this.now.isBefore(nodeStart)?v.actual_duration/30.4:moment.duration(nodeEnd - this.now).as('months')
                    console.log("DU:",v.actual_duration/30.4,duration)
                    
                    v.actual_hrplan.forEach(r => {
                        if (r)
                            c += parseFloat(r) * duration
                    })
                }
            })
            return this.actualHRCompleted + c
        },
        planDuration() {
            let c = 0
            for (let i = 0; i < this.project.nodes.length; i++) {
                let v = this.project.nodes[i]
                if (v.rplan_duration)
                    c += parseFloat(v.rplan_duration) / 30.4
                if (v.complete)
                    break
            }
            return c
        },
        completeDuration() {
            let c = 0
            let nodes = this.vnodes
            for (let i = 0; i < nodes.length; i++) {
                let v = nodes[i]

                if (v.actual_duration)
                    c += parseFloat(v.actual_duration) / 30.4
                if (v.complete)
                    break
            }
            return c
        },
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
        
        updateFactor(){
            let val = this.project
            let totalData = this.totalData
            if (val) {
                // 人力
                totalData[0].total = this.planHR
                totalData[0].predict = this.aPlanHR
                totalData[0].infact = this.actualHRCompleted
                totalData[0].plan = this.planHRCompleted
                // 工期
                totalData[1].infact = this.actualDurationCompleted
                totalData[1].total = this.planDuration
                totalData[1].plan = this.planDurationCompleted
                totalData[1].predict = this.actualDuration
                // 产值
                totalData[2].total = totalData[2].predict = this.adjustAmount
                totalData[2].plan = this.planProductionComplete
                totalData[2].infact = this.actualProductionComplete
                // 收费
                totalData[3].total = totalData[3].predict = this.adjustAmount
                totalData[3].infact = val.transferredAmount
                totalData[3].plan = this.planBill
                // 人均产值
                this.hrplan_production = this.totalData[3].total / totalData[0].total * 12
                this.actual_production = this.totalData[0].infact ? this.totalData[2].infact / totalData[0].infact * 12 : 0

                totalData.splice(0, 1, totalData[0])
            }
        }
  }
}
</script>

<style lang="less">

.oaold {
    
}

.oaold-head {
    padding-top: 3rem;
    padding-bottom: 0;
}

.oaold .ivu-form-item-label {
    font-size: 1rem;
    font-weight: bold;
}

.oaold-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #aaa;
    margin: 0.5rem 0;
}

.oaold-tail {
    padding-top: 2rem;
    padding-bottom: 5rem;
}

.oaold-head .ivu-form-item-label {
    background: #eee !important;
    font-size: 0.8rem;
    color: #333;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    font-weight: normal;
    border: 1px solid #ddd;
    height: 2.5rem;
}

.oaold-head .ivu-form-item-content {
    border: 1px solid #ddd;
    height: 2.5rem;
}



.gz-cell {
    display: flex;
    align-items: center;
    padding-left: 1rem;
   
}

.sqaure-button {
    width: 2rem;
    height: 2rem;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.form-title {
    font-size: 2rem;
    color: #aaa;
    margin-bottom: 1rem;
}

.form-static {
    clear: both;
    color: white;
    font-size: 1rem;
    margin-left: 1rem;
}

.form-sub {
    color: #bbb;
    font-size: 0.8rem;
    position: relative;
    top: -1rem;
}

.form-view {
    margin-bottom: 2rem;
}

.form-view .form-title {
    color: #aaa;
}

.form-view .form-sub {
    color: #999;
}

.l-info-table {
    width: 100%;
    border-collapse: collapse;
}

.l-info-table tr {
    height: 2rem !important;
}

.l-info-table th {
    width: 102px;
    text-align: center;
    height: 2rem !important;
    font-size: 0.7rem !important;
}
.l-info-table td {
    width: 102px;
    height: 2rem !important;
    text-align: center;
    border: 0.5px solid #eee;
    border-right: 2px solid #eee;
}

sup {
    font-weight: normal;
}

.emphersized{
    font-weight:bold;
    margin-right:0.25rem;
}


.l-link{
    text-decoration:underline;color:blue;font-weight:bold;margin-left:0.25rem;
}

.l-warning-title{
    font-weight:bold;

}
.l-warning-item{
    color:red;
}

.l-wraning-content{
    margin:1rem;
    font-family: 'Courier New', Courier, monospace;
    color:#000;
    text-shadow: 0 0 1px #000;
    font-size:1rem;
}

.l-warning-sign{
    background:#333;
    color:#eee;
}

.l-section-expand {
    position: fixed;
    left: 0rem;
    right: 0rem;
    top: 0px;
    bottom: 0rem;
    overflow: hidden;
    padding: 1rem 1rem;

    background: rgba(255, 255, 255, 0.8);
    z-index: 999;
    border: 2px solid #333;
}

.l-section-expand .l-title {
    color: #888;
}

.l-section-expand .l-content {
    position: absolute;
    padding-top: 30px;
    top: 20px;
    bottom: 40px;
    left: 0.5rem;
    right: 0.5rem;
    overflow-y: auto;
}

.l-info {
    color: #aaa;
    max-width: 800px;
}

::-webkit-scrollbar {
    background-color: #dddddd;
    background-clip: padding-box;
    min-height: 28px;
    width: 10px;
}
::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
}

::-webkit-scrollbar {
    width: 9px;
    height: 9px;
}

::-webkit-scrollbar-thumb {
    background-color: #888;
    background-clip: padding-box;
    min-height: 28px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
}

</style>