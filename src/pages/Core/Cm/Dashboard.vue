<style>
.l-text:hover {
    position: relative;
    z-index: 1000;
    cursor: pointer;
}
</style>
<template>
  <div class='hs-container hs-container-scroll oaold' style='padding:20px;height:calc(100% - 40px);overflow-y:auto;color:#333;'>
    <Row :gutter='20'>
      <Col :span='7'> <Card style='min-height:600px;' padding="0">

        <img :src="project.avatar || 'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/timg.jpg'" style="width:100%;" />
        {{project.desc}}
         <table
                            class='ivu-table ivu-table-body gz-small-table l-info-table oaold'
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
                        class='gz-small-table oaold'
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
      <Card style='height:300px;'  title="项目动态">
         <div :style="`position:relative;overflow:visible;height:240px;width:100%;background:#fff;margin-top:80px;`">

        <div
            class='l-progress-wrapper'
            v-if="hide"
            style='left:60px;right:60px;bottom:40px;height:230px;z-index:-1;'
        >
            <div
                key='start'
                class='l-progress'
                :style='`background:linear-gradient(to bottom,#fff,#eee);width:${headOffset*100/fullDuration}%;`'
            >

            </div>
            <template v-for='(n,i) in renderNodes'>
                <div
                    :key='i'
                    class='l-progress'
                    :style='`opacity:${i<futureNodeIndex?"0.8":"0.3"};background:linear-gradient(to bottom,#fff,${nodes[i].percent==0?"#e0f0ff":colors[i%2]});width:${n.width}%;`'
                >
                    <a
                        href='#'
                        class='l-text l-text-duration'
                        :style='`color:#aaa;position:relative;top:0px;height:${-n.topOffset}px;z-index:101;overflow:hidden;`'
                    >{{n.name}} <span
                            style='color:#aaf'
                            v-if="n.offset"
                        >{{n.offset>0?'+':'-'}}{{Math.abs(n.offset).toFixed(1)}}</span> </a>
                    <div
                        :key='i'
                        class='l-progress l-progress-offset'
                        :style='`right:${n.offset>0?0:-Math.abs(n.offset)/n.duration * 100}%;background:linear-gradient(to bottom,#fff,${n.offset>0?"#fff0e8":"#f0ffe0"});width:${Math.abs(n.offset)/n.duration* 100}%;z-index:100;`'
                    >
                    </div>
                </div>
            </template>

            <div
                key='end'
                class='l-progress'
                :style='`background:linear-gradient(to bottom,#fff,#eee);width:${tailOffset*100/fullDuration}%;`'
            >

            </div>
        </div>

        <div
            ref='myChart'
            style="width:100%;height:320px;position:absolute;bottom:0px;overflow:visible;"
        >

        </div>
    </div>
      </Card>
      </Col>
    </Row>
     <Row :gutter="20" style='margin-top:20px;'>
        <Col :span='6'>
      <Card style='height:300px;' title="项目人员" padding="5">
         <hs-list style="position:relative;border:none;"  :data="employees" :option="{tmpl:'BaseEmployeeDetail'}" />
      </Card>
      </Col>
      <Col :span='18'>
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
import cmutil from './cmutil'

let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')

require('echarts/lib/component/toolbox')
require('echarts/lib/component/legend')

require('echarts/lib/component/title')

require('echarts/lib/component/dataZoom')
require('echarts/lib/component/markPoint')
require('echarts/lib/component/markLine')
require('echarts/lib/component/grid')
require('moment')
const theme = require('./theme')
 const renderTarget = (index) => {
            if (index > 1)
                return (h, d) => cmutil.formatSalary(d)
            else if (index == 0)
                return (h, d) => (typeof d != "number" ? '-' : (d.toFixed(2) + ' 人月'))
            else
                return (h, d) => (typeof d != "number" ? '-' : (d.toFixed(1) + ' 月'))

        }
export default {

data(){
    return {
       rplan: false,
            modalHrList: false,
            rawplan1:false,
            content:null,
                colors: [ '#eee','#fff'],
            height: 200,
            dynamicMode:'month',
            selectedTime:moment(),
            modalInfo:false,
            //只显示在职员工
            inPosition: false,
            rawplan: false,
            vnow:null,
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
                    return cmutil.renderCompareProgress(h, percent, params.index > 1 )
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
                    return cmutil.renderProgress(h, percent)
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
     this.vnow = moment().isAfter(moment(this.endDate)) ? moment(this.endDate).endOf('month').add(1, 'month') : (moment().format())
      this.pastdays = util.offsetMonth(this.startDate, this.vnow) - 1
      

    this.updateFactor()
  },
  computed:{
    ...mapGetters('project',['get']),
    id(){
      return this.$route.params.id
    },
     futureNodeIndex(){
            let start = moment(this.startDate)
            let passed = true
            let nodes = this.vnodes
            for (let i = 0; i < nodes.length; i++) {

                let nodeStart = moment(nodes[i].actual_start_time)
                let nodeEnd = moment(nodes[i].actual_start_time).add(nodes[i].actual_duration,'days')
                if(nodeStart.isAfter(this.now)){
                    return -1
                }else if(!nodeEnd.isBefore(this.now)) {
                    return i
                }
            }

            return nodes.length
        },
        futureMonthIndex() {

            let start = moment(this.startDate)
            let passed = true
            for (let i = 0; i < this.fullDuration; i++) {

                let monthStart = start.clone().startOf('month').add(i, 'month')
                let monthEnd = start.clone().endOf('month').add(i, 'month')
                if(monthStart.isAfter(this.now)){
                    return -1
                }else if(!monthEnd.isBefore(this.now)) {
                    return i
                }
            }

            return this.fullDuration
        },
        renderNodes() {
            let nodes = this.vnodes.map((v, i, a) => ({
                width: v.actual_duration * 100 / 30.4 / this.fullDuration,
                offset: (v.actual_duration - v.rplan_duration) / 30.4,
                name: v.nodeName,
                duration: (v.actual_duration / 30.4)
            }))


            return nodes
        },
        planStartDate() {
           if(this.vnodes){
            return this.vnodes.length > 0 && this.vnodes[0] ? moment(this.vnodes[0].plan_start_time) : moment()
             }
          else{
            return moment()
          }
        },
        actualStartDate() {
          if(this.vnodes){
            return this.vnodes.length > 0 && this.vnodes[0] ? moment(this.vnodes[0].actual_start_time) : moment()
          }
          else{
            return moment()
          }
        },
        // actual startDate
        startDate() {
            return this.actualStartDate
        },
        fullDuration() {
            return cmutil.offsetMonth(this.startDate.format(), this.endDate.format())
        },
        // actual duration
        duration() {
            let plan_sum = 0
            let actual_sum = 0
            this.vnodes.forEach(v => {
                plan_sum += parseInt(v.rplan_duration)
                actual_sum += parseInt(v.actual_duration)
            })

            return plan_sum > actual_sum ? (plan_sum / 30.4) : (actual_sum / 30.4)
        },
        // bigger one of plan endDate or actual endDate(predict)
        endDate() {
            return this.startDate.clone().add(this.duration, 'month')
        },
        headOffset() {
            return moment.duration(this.startDate - this.startDate.clone().startOf('month')).as('month')
        },
        tailOffset() {
            return moment.duration(this.endDate.clone().endOf('month') - this.endDate).as('month')
        },
        now() {
            return moment(this.vnow)
        },
        // offset between planStartDate and actualStartDate
        hrChartNodeData(){
            let pPrdtArray = []
            let aPrdtArray = []
            let aAvgPrdtArray = []
            let pAvgPrdtArray = []
             let aAvgPrd=0
             let pAvgPrd = 0
            let totalProduct = 0
            let xArray = []
            let offsetDuration = moment.duration(moment(this.startDate) - moment(this.startDate).startOf('month')).as('month')
            let pDuration = offsetDuration
            let aDuration = offsetDuration
            let aHRArray = []
            let pHRArray = []
            let aHR = 0
            let aHRSum = 0
            let pHR = 0
            let pHRSum = 0
            
            let pPrdt = 0
            let aPrdt = 0

            let pCompleteDuration = 0
            let aCompleteDuration = 0

            console.log('[nodes]:',this.vnodes)
            this.vnodes.forEach((v,i)=>{
                aAvgPrd=0
                pAvgPrd = 0
                aHR = 0
                pHR = 0
                if(i==0){
                    pPrdtArray.push([pDuration ,0])
                    aPrdtArray.push([aDuration ,0])
                    xArray.push([pDuration,'起始'])
                }
                
                v.hrplan.forEach(f=>{
                    if(f){
                        pHR += parseFloat(f) * parseInt(v.rplan_duration) /30.4
                    }
                })

                v.actual_hrplan.forEach(f=>{
                    if(f){
                        aHR += parseFloat(f) * parseInt(v.actual_duration) /30.4
                    }
                })

                

                pDuration += v.rplan_duration/30.4
                pPrdt += v.amount
                pPrdtArray.push([pDuration ,pPrdt])
                xArray.push([pDuration,'p'+(i+1)])
                aDuration += v.actual_duration/30.4
                aPrdt += v.amount
                aPrdtArray.push([aDuration ,aPrdt])
                xArray.push([aDuration,'a'+(i+1)])
                
                if(v.complete){
                    pCompleteDuration = pDuration
                    aCompleteDuration = aDuration
                }

                aHRSum += aHR
                pHRSum += pHR
                pAvgPrd = pHRSum>0?(pPrdt/pHRSum * 12):0
                aAvgPrd = aHRSum>0?(aPrdt/aHRSum * 12):0
                aAvgPrdtArray.push(aAvgPrd)
                pAvgPrdtArray.push(pAvgPrd)
                aHRArray.push(aHR)
                pHRArray.push(pHR)
            })

            return {
                xAxis:xArray,
                planProduction:pPrdtArray,
                actualProduction:aPrdtArray,
                aAvgPrdt:aAvgPrdtArray,
                pAvgPrdt:pAvgPrdtArray,
                xAxisNode:this.vnodes.map(v=>v.nodeName),
                aCompleteDuration,
                pCompleteDuration,
                aHR:aHRArray,
                pHR:pHRArray
            }
        },
        hrChartData() {
            let start = moment(this.startDate)
            let duration = this.fullDuration
            var planArray = []
            var actualArray = []
            var adjustArray = []

            let planHR = 0
            let actualHR = 0
            let planHRFactor = 0
            let aplanHRFactor = 0
            let aplanHR = 0
            let planProduction = 0
            let actualProduction = 0
            let planProductionArray = []
            let actualProductionArray = []
            let planProductionAVG = 0
            let actualProductionAVG = 0
            let planHRTotal = 0
            let actualHRTotal = 0
            let planProductionAVGArray = []
            let actualProductionAVGArray = []
            let planStartOffset = moment.duration(this.planStartDate, this.startDate).as('month')
            let actualStartOffset = moment.duration(this.actualStartDate, this.startDate).as('month')

            for (let i = 0; i < duration; i++) {
                planHR = 0
                planHRFactor = 0
                aplanHR = 0
                aplanHRFactor = 0
                planProductionAVG = 0
                actualProductionAVG = 0

                let inDuration = 0
                let inDurationPlan = 0
                let monthStart = start.clone().startOf('month').add(i, 'month')
                let monthEnd = start.clone().endOf('month').add(i, 'month')

                let inPlan = false
                let inActual = false
                // 之前的应按月份实际投入来算

            
                this.vnodes.forEach((v, i, a) => {
                    if (!Array.isArray(v.hrplan) || v.hrplan.length == 0)
                        return
                    let amount = v.amount || 0
                    let nodePlanStart = moment(v.rplan_start_time).add(planStartOffset, 'month')
                    let nodePlanEnd = nodePlanStart.clone().add(v.rplan_duration, 'days')
                    let nodeActualStart = moment(v.actual_start_time)
                    let nodeActualEnd = nodeActualStart.clone().add(v.actual_duration, 'days')

                    inDuration = this.calcInDuration(monthStart, monthEnd, nodePlanStart, nodePlanEnd)

                    if (inDuration) {
                        inPlan = true
                        planProductionAVG += amount * inDuration / v.rplan_duration * 30.4
                        v.hrplan.forEach(f => {
                            if (f) {
                                planHR += parseFloat(f) * inDuration
                                planHRFactor += parseFloat(f)
                            }
                        })
                    }

                    if (!Array.isArray(v.actual_hrplan) || v.actual_hrplan.length == 0)
                        return


                    inDuration = this.calcInDuration(monthStart, monthEnd, nodeActualStart, nodeActualEnd)

                    if (inDuration) {
                        inActual = true
                        actualProductionAVG += amount * inDuration / v.actual_duration * 30.4
                        v.actual_hrplan.forEach(f => {
                            if (f){
                                aplanHR += parseFloat(f) * inDuration
                                aplanHRFactor += parseFloat(f)
                            }
                        })
                    }
                })

                if(monthEnd.isBefore(this.now)){
                    aplanHR = 0
                    aplanHRFactor = 0
                    let employees  = this.hrdata.employees
                    let factors = this.hrdata.factors
                    let inDuration = 0
                    employees.forEach(e=>{
                        let inDate = moment(e.inDate)
                        let outDate = e.outDate ? moment(e.outDate) :this.now
                         inDuration =  cmutil.calcInDuration(inDate,outDate,monthStart,monthEnd)
                        if(!factors || factors.length == 0 ){
                            aplanHR += parseFloat(e.factor) * inDuration
                            aplanHRFactor += parseFloat(e.factor)
                            return
                        }else if(factors[0].id > monthStart.format('YYYY-MM')){
                            inDuration =  cmutil.calcInDuration(inDate,outDate,factors[0].id,monthEnd)
                            aplanHR += parseFloat(e.factor) * inDuration
                            aplanHRFactor += parseFloat(e.factor)
                        }

                        for(let fi=0;fi<factors.length;fi++){
                            let fStart = moment(factors[fi].id,'YYYY-MM')
                            let fEnd = fi==factors.length-1?outDate:moment(factors[fi+1].id,'YYYY-MM')
                            inDuration = cmutil.calcInDuration(fStart,fEnd,monthStart,monthEnd)
                            if(inDuration && factors[fi].data && (factors[fi].data[e.name])){
                                aplanHR += parseFloat(factors[fi].data[e.name]) *inDuration
                                aplanHRFactor += parseFloat(factors[fi].data[e.name])
                            }
                           
                        }
                      
                        
                    })
                }
                
                planProduction += planProductionAVG
                actualProduction += actualProductionAVG
                planHRTotal += planHR
                actualHRTotal += aplanHR
                actualProductionAVG = aplanHR ? actualProduction * 12 / planHRTotal : 0
                planProductionAVG = planHR ? planProduction * 12 / planHRTotal : 0
                
                planProductionAVGArray.push(inPlan ? planProductionAVG : '-')
                planProductionArray.push(inPlan ? planProduction : '-')
                planArray.push(inPlan ? planHRTotal: '-')

                actualProductionAVGArray.push(inActual ? actualProductionAVG : '-')
                actualProductionArray.push(inActual ? actualProduction : '-')
                adjustArray.push(inActual ? actualHRTotal : '-')
                // end month caculating
            }
            let data = {
                production: planProductionArray,
                actualProduction: actualProductionArray,
                plan: planArray,
                adjust: adjustArray,
                actualProductionAVG: actualProductionAVGArray,
                planProductionAVG: planProductionAVGArray
            }

            return data

        },

    },
   
    methods: {
        formatterAmount(e){
            return e.toFxied(0) + '万'
        },
        // caculater intersection between in and out
        calcInDuration(inStart, inEnd, outStart, outEnd) {
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

            return moment.duration(end - start).as('month')
        },
        makeAxis(startDate, endDate) {
            let x = []
            let duration = this.fullDuration
            for (let i = 0; i < duration; i++)
                x.push(startDate.clone().startOf('month').add(i, 'month').format('M月'))
            return x
        },
        initChart(forced) {
            let that = this
            let data = this.hrChartData
            let nodeData = this.hrChartNodeData
            let xAxis,yAxis,tooltipFormatter,series,color = undefined
            console.log('[initchart]:',nodeData)
            const avgThreshold = 0
            switch(this.mode){
                case 'average-human-production':
                    color = ['#8d98b3', '#e5cf0d'],
                    xAxis = [ {type: 'category',data: nodeData.xAxisNode,axisLabel:{
                       rotate:15,
                       margin:20,
                      axisLine:{
                          onZero:true
                      },
                       align:'center',
                    }}]
                
                    yAxis = [  {
                        type: 'value',
                         min:-avgThreshold,
                        axisLabel: {
                            formatter(e) {
                                return ((e+avgThreshold) / 10000).toFixed(0) + '万'
                            }
                        }
                       
                    },]
                     tooltipFormatter = (a,b,c)=>{
                        let ret = ""
                        a.forEach(v => {
                            if (typeof v.value != 'number')
                                return
                            let valueString = (((v.value+avgThreshold) / 10000).toFixed(1) + ' 万元<br>')
                            ret += '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                                v.color +
                                ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:140px; display:inline-block;">' +
                                v.seriesName +
                                '</span>' + valueString
                        })
                        return `<div class="l-showbox">${a[0].axisValue}<br>${ret}</div>`
                    },
                    series = [{
                            name: '人均产值(签约)',

                                        type: 'bar',
                                        z:11,
                                        data: nodeData.pAvgPrdt.map(v=>v-avgThreshold) || [],
                                        itemStyle : { normal: {
                        
                            borderRadius: 5
                        }}
                                    },
                                    {

                                        name: '人均产值(调整)',
                                        type: 'bar',
                                        z:10,
                                        data: nodeData.aAvgPrdt.map(v=>v-avgThreshold),
                                        itemStyle : { normal: {
                            
                            borderRadius: 10
                        }}

                        }]
                break
                case 'production':
                     color = ['#97b552', '#d87a80'],
                    xAxis = [{
                        type: 'category',
                        data: this.makeAxis(this.startDate, this.endDate),
                        axisLabel:{
                            margin:8,
                            rotate:0
                        }
                    },{  type: 'value',
                        min:0,
                        max:this.fullDuration}]
                    yAxis = [{ type:'value',  min:0,axisLabel: {
                            formatter(e) {
                                return (e / 10000).toFixed(0) + '万'
                            }}}]
                    tooltipFormatter = (a,b,c)=>{
                        let ret = ""
                        a.forEach((v) => {
                            
                            let [x,y] = v.data
                            if (typeof x != 'number' || typeof y != 'number')
                                return

                            let valueString =(y / 10000).toFixed(1) + ' 万元<br>'
                            ret += '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                                v.color +
                                ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:140px; display:inline-block;">' +
                                v.seriesName +
                                '</span>' + valueString
                        })
                        let index = a[0].dataIndex
                        let nodeName = index >= this.vnodes.length?'结束':  this.vnodes[index].nodeName
                       
                        return `<div class="l-showbox">${that.startDate.clone().add(a[0].data[0],'month') .format('YYYY-MM')} <span style="float:right">${nodeName}</span><br>${ret}</div>`
                    },
                    series = [{
                            name: '总产值(签约计划)',
                            // yAxisIndex: 3,
                             xAxisIndex: 1,
                            z:5,
                            
                            type: 'line',
                            data:nodeData.planProduction,
                            itemStyle: { normal: {
                                areaStyle: { type: 'default',color:'#97b55266' },label : {show: true,
                            distance:20,formatter(e) {
                                    return (e.data[1] / 10000).toFixed(0) + '万'
                             
                            },position:'top',} } },
                            markLine:{
                                symbol:'none',
                                data:[[
                                {name:'竣工节点',y:80,xAxis:nodeData.pCompleteDuration},{name:'竣工节点',y:290,xAxis:nodeData.pCompleteDuration}
                            ]]
                            }
                           
                        },
                         {
                            name: '总产值(调整计划)',
                            // yAxisIndex: 3,
                            xAxisIndex: 1,
                            z:5,
                            type: 'line',
                            data:nodeData.actualProduction,
                            itemStyle: { normal: { areaStyle: { type: 'default',color:'#d87a8066' },label : {show: true, formatter(e) {
                                    return (e.data[1] / 10000).toFixed(0) + '万'
                                
                            }} } },
                            markLine:{
                                symbol:'none',
                                data:[[
                                {name:'竣工节点',y:80,xAxis:nodeData.aCompleteDuration},{name:'竣工节点',y:275,xAxis:nodeData.aCompleteDuration}
                            ]]
                            }
                        
                             }]
                    
                break
                

            }


            let option = {
                
                tooltip: {
                    trigger: 'axis',
                    formatter: tooltipFormatter
                        //function (a, b, c) {
                        // console.log(a,b,c)
                        // let ret = ""
                        // a.forEach(v => {
                        //     if (typeof v.value != 'number')
                        //         return
                        //     let valueString = (that.mode == 'hr' ? (v.value.toFixed(1) + ' 人月<br>') : ((v.value / 10000).toFixed(1) + ' 万元<br>'))
                        //     ret += '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        //         v.color +
                        //         ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:140px; display:inline-block;">' +
                        //         v.seriesName +
                        //         '</span>' + valueString
                        // })
                        // return `<div class="l-showbox">${a[0].axisValue}<br>${ret}</div>`
                        //  console.log(a,b,c)
                        //  let ret = ""
                        // a.forEach(v => {
                            
                        //     let [x,y] = v.data
                        //     if (typeof x != 'number' || typeof y != 'number')
                        //         return

                        //     let valueString =(y / 10000).toFixed(1) + ' 万元<br>'
                        //     ret += '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                        //         v.color +
                        //         ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:140px; display:inline-block;">' +
                        //         v.seriesName +
                        //         '</span>' + valueString
                        // })
                        // return `<div class="l-showbox">${that.startDate.clone().add(a[0].axisValue,'month') .format('YYYY-MM')} <span style="float:right">${'阶段'}</span><br>${ret}</div>`
                  //  }
                },
                grid: {
                    show: false,
                    x: 60,
                    x2: 60,
                    y: 80,
                    y2: 60,
                    borderWidth: 0
                },
                calculable: true,

                xAxis,
                // [
                //     {
                //         type: 'category',
                //         data: this.makeAxis(this.startDate, this.endDate)
                //     },
                //      {
                //         type: 'value',
                //         min:0,
                //         max:this.fullDuration
                       
                //     }, {
                //         type: 'category',
                //         boundaryGap: false,
                //         data: this.makeAxis(this.startDate, this.endDate).concat([""]),
                //         show: false
                //     },
                //       {
                //         type: 'category',
                //         data:nodeData.xAxisNode
                       
                //     }
                // ],
                legend: {
                    zlevel: 100,
                    z: 100,
                    top: 0,
                    right: 30
                },
                yAxis,
                // [
                //     {
                //         type: 'value',
                //         axisLine:{

                //         },
                //         axisLabel: {
                //             formatter(e) {
                //                 return (e / 10000 + 20).toFixed(0) + '万'
                //             }
                //         }
                //     },
                //     {
                //         type: 'value',
                //         axisLabel: {
                //             formatter(e) {
                //                 return (e / 10000).toFixed(0) + '万'
                //             }
                //         }
                //     },
                //     {
                //         type: 'value',
                //         axisLabel: {
                //             formatter(e) {
                //                 return (e / 10000).toFixed(2)
                //             }
                //         }
                //     },
                //      {
                //            type: 'value',
                //         axisLabel: {
                //             formatter(e) {
                //                 return (e / 10000).toFixed(0) + '万'
                //             }
                //         }
                //     }
                // ],
                color,
                series,
                  
                    
            //             {
            //                 name: '人均产值(签约)',

            //                 type: 'bar',
            //                 z:11,
            //                 yAxisIndex:0,
            //                 zlevel:10, 
            //                 data: data.planProductionAVG.map(v=>v-200000) || [],
            //                  itemStyle : { normal: {
             
            //     borderRadius: 5,
            //     label : {
            //         show: true,
            //         position: 'top',
            //         formatter: '{b}'
            //     }
            // }}
            //             },
            //             {

            //                 name: '人均产值(调整)',
            //                 type: 'bar',
            //                 yAxisIndex:0,
            //                 zlevel:10,
            //                  z:10,
            //                 data: data.actualProductionAVG.map(v=>v-200000) || [],
            //                  itemStyle : { normal: {
                
            //     borderRadius: 10
            // }}

            //             },
            
                     
                //         {
                //             name: '总产值(签约)',
                //             yAxisIndex: 1,
                //             xAxisIndex: 1,
                //             z:5,
                            
                //             type: 'line',
                //             data: [0].concat(data.production) || [],
                //             itemStyle: { normal: { areaStyle: { type: 'default' } } },
                //             markLine:{
                //                 z:15,
                //                 data:[
                //                     [ {xAxis:data.production.length, y:60, itemStyle:{normal:{color:'#dc143c'}}}
                //                     ,{xAxis:data.production.length,y:280, name: '签约', itemStyle:{normal:{color:'#dc143c'}}}
                //                     ],
                                     
                //                 ]
                //             }
                //         },
                //          {
                //             yAxisIndex: 1,
                //             name: '总产值(调整)',
                //             xAxisIndex: 1,
                //              z:5,
                //             type: 'line',
                //             data: [0].concat(data.actualProduction) || [],
                //             itemStyle: { normal: { areaStyle: { type: 'default' } } },
                //              markLine:{
                //                 z:15,
                //                 data:[
                //                     [ {xAxis:data.actualProduction.length-1, y:60, itemStyle:{normal:{color:'#97b552'}}}
                //                     ,{xAxis:data.actualProduction.length-1,y:280, name: '调整', itemStyle:{normal:{color:'#97b552'}}}
                //                     ]
                //                 ]
                //             }
                //         },
                       
                // //           {
                // //     name: '累计人力投入(签约)',
                // //     step:true,
                // //     type: 'bar',
                // //      yAxisIndex: 2,
                // //       z:10,
                // //     data: data.plan || []
                // // },
                // // {

                // //     name: '累计人力投入(调整)',
                // //     type: 'bar',
                // //      z:10,
                // //      yAxisIndex: 2,
                // //     step:true,
                // //     data: data.adjust || []

                // // },
                

                    
            };
            let myChart = echarts.init(this.$refs.myChart, theme)

            myChart.setOption(option, forced)

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
      console.log('PROJECT:',this.get(this.id))
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
        }, planPosMapper(){
            return this.project.positions.map(v=>this.positionsEx.findIndex(p=>p==v))
        },
        actualPosMapper(){
            return this.project.actualPositions.map(v=>this.positionsEx.findIndex(p=>p==v))
        },now() {
            return moment().clone()
        },
         vnodes() {
           console.log('start vnodes')
            let hrplan = this.vMonthData ? this.vMonthData.data : null
            console.log(hrplans)
            let employees = this.project.employeesEx
             

            let positions = this.positionsEx
            if(!this.project.nodes || this.project.nodes.length == 0)
                return []
            let nodes = []
          

            for(let i=0;i<this.project.nodes.length;i++){
                if(this.project.nodes[i].rplan_start_time == null || this.project.nodes[i].rplan_duration == null)
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

            if(!this.project.nodes)
              return []


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
                console.log(this.hs.dateAddDays)
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
        }, planProductionComplete() {
            let c = 0
            let startTime = moment(this.startDate)
            this.vnodes.forEach(v => {
                let nodeStart = startTime.clone()
                let nodeEnd = startTime.clone().add(v.rplan_duration,'d')
                startTime = nodeEnd
                if (nodeEnd.isBefore(this.now.clone())) {
                    c += this.adjustAmount * parseFloat(v.percent) / 100
                } else if (nodeStart.isBefore(this.now.clone())) {
                    let duration = moment.duration(this.now - nodeStart).as('month')
                    c += this.adjustAmount * parseFloat(v.percent) * duration * 30.4 / 100 / v.rplan_duration
                }
            })
            return c

        },
        actualProductionComplete() {
            let c = 0
             let startTime = moment(this.startDate)
            this.vnodes.forEach(v => {
                 let nodeStart = startTime.clone()
                let nodeEnd = startTime.clone().add(v.actual_duration,'d')
                startTime = nodeEnd
                    if (nodeEnd.isBefore(this.now.clone())) {
                        c += this.adjustAmount * parseFloat(v.percent) / 100
                    } else if (nodeStart.isBefore(this.now.clone())) {
                        let duration = moment.duration(this.now - nodeStart).as('month')
                        c += this.adjustAmount * parseFloat(v.percent) * duration * 30.4 / 100 / v.actual_duration
                    }
            })
            return c
        }
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
        },
         formatProgress(v) {
            let start = moment(this.startDate)
            let date = moment(this.startDate).clone().startOf('month').add(v, 'month')
            return `${date.format('YYYY-MM')}`
        },
  },updateSlider(e) {
            this.pastdays = util.offsetMonth(this.startDate, e + '-1') - 1
            if (this.pastdays < 0) {
                this.pastdays = 0
                this.vnow = this.startDate
            } else if (this.pastdays >= this.totalPastDays) {
                this.pastdays = this.totalPastDays
                this.vnow = this.endDate
            }
            this.vnow = e + '-1'
        },hasPlan(i) {
            let vnow = moment(this.startDate).clone().startOf('month').add(i, 'month').format('YYYY-MM')
            if (this.project.monthData) {
                let f = this.project.monthData.find(v => v.id == vnow)
                if (f && f.data)
                    return true
            }
        },getCompleteTime() {
            let complete = null
            this.project.nodes.forEach(v => {
                if (v.complete)
                    complete = moment(v.actual_start_time).add(v.actual_duration, 'd').format()
            })
            return complete
        },
        getWorkPoint() {
            let wp = "已竣工"
            this.project.nodes.forEach(v => {
                if (moment(v.actual_start_time).isBefore(this.now) && moment(v.actual_start_time).add(v.actual_duration, 'd').isAfter(this.now))
                    wp = v.nodeName
            })
            return wp
        },
        getCalc() {
            return {
                actual_duration: this.actualDuration,
                rplan_production: this.hrplan_production,
                current_workpoint: this.getWorkPoint(),
                actual_human_complete: this.actualHRCompleted,
                actual_human_production: this.actual_production,
                plan_human_complete: this.planHRCompleted,
                rplan_duration: this.planDuration,
                rplan_human: this.planHR
            }
        },
        onUploadCalc() {
            let calcInfo = this.getCalc()
            let text = '合约数据已提交管理员审核'
            if(this.isAdmin){
                calcInfo.state = 2
                text = '该合约数据已审核完毕，投入生产使用'
            } 
            else if(this.isInputor)
                calcInfo.state = 1
            this.$patch(`oa/contracts/${this.project.id}`, { calc: calcInfo }).then(res => {
                this.$Modal.success({
                    title: '保存成功',
                    content: text
                })
                this.$emit('reload', this.project.id)
                this.project.state = calcInfo.state
            }).catch(e=>{
                console.error(e)
            })
        },
        renderChart() {
            setTimeout(() => {
                this.$refs.chart.initChart(true)
            }, (1000));

        },
}
</script>

<style lang="less">

.oaold {
    .ivu-table-cell{
      font-size:10px;
    }
}

.oaold-head {
    padding-top: 3rem;
    padding-bottom: 0;
}

.oaold .ivu-form-item-label {
    font-size: 12px;
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

.l-time {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.l-progress-wrapper {
    position: absolute;
    left: 0;
    height: 260px;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.l-text-active {
    font-weight: bold;
    color: #506780 !important;
}

.l-text-today {
    color: red;
}

.l-progress {
    position: relative;
    height: 100%;
    background: rgb(212, 245, 212);
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.l-progress-offset {
    position: absolute !important;
}

.l-text-year {
    font-weight: bold;
    color: slateblue;
}

.l-text-duration {
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
}

.l-progress .l-text {
    position: absolute;
    left: 0;
    top: -20px;
    font-size: 10px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
}

</style>