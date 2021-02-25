<template>
  <div v-if="data">
      <div style="margin:20px;padding:0 20px;" class="title">述职报告 <span style="color:#3af;margin-left:20px;" @click="showPreview=true;getReport()"><Icon type='md-eye' /> 查看</span></div>
      
      <div class="flex-wrap inner-margin"  style="flex-wrap:wrap;margin:20px;padding:0 20px;align-items:flex-start;">
  
      <template v-for="o in filledSeries">
          <div :key='o.node' style="width:32%;overflow:hidden;">
            <div class="flex-wrap flex-between title">
              <span>{{o.name}}</span>
              <div class="flex-wrap"><hs-avatar :userinfo="getUserByNode(o.node)" size="22" style='margin-right:5px' /> {{getUserByNode(o.node).name}}</div>
            </div>
           
          <div class="chart" ref="chart">
            
          </div>
          <div class="flex-wrap flex-between title">综合评分 <span style="color:#3af;margin-left:20px;"> {{CalcScore(data[sheet+o.node])}} <Icon type='md-star' /></span></div>
          <div class="qa">
            <div class="title">
            调查问卷
            </div>
            <template v-for="(q,i) in getEV(o.node).questions">
              <div class="flex-wrap flex-between hoverable" style="width:100%;" :key='i'>
                <div class="l-question" :key='i'>
                  {{i+1}}.{{q.title}}
                </div>
                <div class="l-answer"  style="color:#3af">
                  {{q.options[data[getEV(o.node).key+(o.node.includes('n3')?o.extraIndex:'')][i]]}}
                </div>
            </div>
            </template>
          </div>
          
          <div class="commit" v-if="o.node != 'n1'">
            <template v-for="(c,i) in CommitFields">
              <div class="flex-wrap flex-between hoverable" style="align-items:flex-start;width:100%;" :key='i' v-if="!data[c+'_'+o.node] || data[c+'_'+o.node].length < 200">
              <div class="l-question" :key="i">
                {{CommitFieldsNames[i]}}
              </div>
              <div class="l-answer"  style="color:#3af">

                   {{data[c+'_'+o.node] || '无'}}
              </div>
                </div>
              <Collapse  style="width:100%;margin:5px 0;" simple :key="c.node"  v-if="data[c+'_'+o.node] && data[c+'_'+o.node].length > 200">
              <Panel>
                  评语
                  <p slot='content'>{{data[c+'_'+o.node]}}</p>
                  </Panel>
              </Collapse>
            </template>
          
          </div>
          </div>
        
      </template> 
       </div>

         <BackTop></BackTop>
     <Drawer class='l-drawer' :title="`述职报告 ${data?' - '+data.name:''}`" transfer v-model="showPreview" width="800">
        <Spin fix v-show='loadingReport'  />
        <div slot='close' style='font-size:16px;line-height:33px;margin-right:10px;'>
        <a v-if="reportURL"  :href="reportURL" ><Icon type='md-download' style='margin-right:5px;' />下载文件</a>
        <span v-else>未上传文件</span></div>
        <template v-if="!loadingReport && reportURL">
         <template v-if="report">
          <div class='hs-article' v-html="report" style='padding:0px 10px;font-family:"仿宋";font-size:16px;' />
          </template>
          <template v-else>
            <BasePreview :url="reportURL" />
          </template>
        </template>
      </Drawer>

  </div>
</template>

<script>
import * as echarts from 'echarts';
import { mapGetters } from 'vuex';


let options =  ['10','9.5','9','8.5','8','7.5','7','6.5','6','5.5','5↓']
// 项目经理总监
var E0 ={
  key:'E0',
  label:"部门经理/项目经理/总监",
  condition:'v-if="db.model.position==0"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
2、“统筹管理能力”指面对突发、复杂、系统性问题的分析和解决能力。
3、“实际服务效果”指项目客观服务结果及业主单位评价。
4、“团队建设”含员工培养、内部管理、内部氛围等。`,
options:[['合格','不合格'],options,options,options,options,options,options,options,options,options],
 cats:['专业技术能力', '沟通协调能力', '统筹管理能力', '勤奋敬业精神', '目标实现能力', '实际服务效果', '团队建设情况', '配合公司情况'
],
shorts:['专业','沟通','统筹','勤奋','目标','实际','团建','配合'],
  heavy:[15,10,10,10,15,15,15,10]
}
// 岗位工程师
var E1={
  key:"E1",
  label:'岗位工程师',
  options:[['合格','不合格'],options,options,options,options,options,options,options,options,options],
  condition:'v-else-if="(db.model.dep >= 3) && (db.model.position==1 || db.model.position==2)"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
2、“岗位通用能力”是指软件、文字、语言表达、汇报等通用型能力。
3、“优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
4、“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
cats: ['岗位专业能力', '岗位通用能力', '其他岗位通识', '精细严谨程度', '勤奋敬业精神', '沟通协调能力', '工作成果质量', '团队配合情况'],
shorts:['专业','通用','通识','严谨','敬业','沟通','质量','配合'],
heavy:[15,15,10,10,10,10,15,15]
}
// 工程师助理/员
var E2={
  key:"E2",
  label:"工程师助理/员级",
  options:[['合格','不合格'],options,options,options,options,options,options,options,options,options],
  condition:'v-else-if="(db.model.dep >= 3) && (db.model.position==3)"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
2、“知识与技能”各分项需按成熟工程师助理要求，权衡评分。
3、“优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
4、	“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
cats: ['专业基础知识', '流程制度掌握', '基础软件操作', '文字语言表达', '勤奋敬业精神', '精细严谨程度', '沟通协作态度', '学习发展潜力'],
shorts:['专业','流程','软件','表达','勤奋','严谨','沟通','学习'],
heavy:[10,10,10,10,20,15,15,10]
}

// 监理工程师
var E3 = {
  key:"E3",
  label:'监理工程师',
  options:[['合格','不合格'],options,options,options,options,options,options,options,options,options],
  condition:'v-else-if="(db.model.dep==1 || db.model.dep==2) && (db.model.position==1 || db.model.position==2)"',
 desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
2、“优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
3、“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
cats: ['内业能力', '外业能力', '学习与创新', '精细严谨程度', '勤奋敬业精神', '沟通协调能力', '工作指导能力', '团队建设情况'],
shorts:['内业','外业','创新','严谨','勤奋','沟通','指导','团队'],
heavy:[15,15,10,10,20,10,10,10]
}

// 监理员
var E4 ={
  key:"E4",
  label:"监理员",
  options:[['合格','不合格'],options,options,options,options,options,options,options,options,options],
  condition:'v-else-if="(db.model.dep==1 || db.model.dep==2) && (db.model.position==3)"',
  desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
 2、“知识与技能”各分项需按成熟监理员要求，权衡评分。
 3、“优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
 4、	“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
cats: ['专业基础知识', '施工工艺经验', '仪器操作技能', '资料整理能力', '勤奋敬业精神', '精细严谨程度', '沟通协作态度', '学习发展潜力'],
shorts:['专业','施工','仪器','资料','勤奋','严谨','沟通','学习'],
heavy:[10,10,10,10,20,15,15,10]
}

// 行政
var E5={
  key:"E5",
  label:'行政',
  options:[['合格','不合格'],options,options,options,options,options,options,options,options,options],
  condition:'v-else-if="db.model.dep==0"',
desc: `1、凡遇有职业道德违规事项，必须随时逐级上报，个案处理。
 2、 “优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。
 3、“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。`,
cats: ['服务意识', '协作意识', '严谨程度', '工作质量', '工作效率', '勤奋敬业精神', '支持项目情况', '支持部门情况'],
shorts:['服务','协作','严谨','质量','效率','敬业','项目','部门'],
heavy:[15,15,10,10,10,10,15,15]

}
const getQASheet = (dep,position)=>{
  if(position === 0){
    return E0
  }else if(dep === 0){
    return E5
  }else if(dep === 1 || dep === 2){
    if(position === 1 || position === 2)
      return E3
    else
      return E4
  }else if(dep > 2){
    if(position === 1 || position === 2)
      return E1
    else
      return E2
  }
}
const getEVSheets = (user,nodes)=>{
  return nodes.map(v=> getEVSheet(user.position,v)
  )
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
  Q5= {
    title: "能力提升",
    desc: "描述",
    options: ['非常大', '很大', '大', '比较大', '正常', '不大', '几乎没有']
  },
  Q6= {
    title: "发展潜力",
    desc: "发展潜力",
    options: ['潜力非常大', '潜力很大', '潜力大', '潜力较大', '潜力一般', '潜力不大', '没啥潜力']
  },
  Q7= {
    title: "岗位等级",
    desc: "描述",
    options: ['见习', '初级', '合格', '成熟', '优秀']
  },
  Q8={
    title:"环境适应度",
    options:['非常舒适','很舒适','舒适','还算舒适','适应','还算适应','不大适应']
  },
  Q9={
    title:"工作态度",
    options:['非常努力','很努力','努力','还算努力','正常','不太努力','不努力']
  },
  Q10={
    title:"薪酬评估",
    options:['明显高于岗位','高于岗位','偏高与岗位','匹配','基本匹配','稍低于岗位','明显低于岗位']
  },
  Q11={
    title:"薪酬建议",
    options:['明显提升','适当提升','略有提升','保持不变','可适当降低']
  },
  Q12={
    title:"建议岗位",
    options: ['项目经理/部门经理/总监(含副职)', '项目/部门经理助理/总代', '工程师级', '助理级/员级']
  }


var QN0 = {
  key:'mem_self',
  condition:`v-if="db.model.position!=0"`,
  label: '员工->自评',
  questions:[Q1,Q5,Q8]
}
var QN1 = {key:'mgr_self',label:'项目/部门经理->自评',condition:`v-else`,questions:[Q1, Q4, Q2, Q3]}
var QN2 = {key:'mgr2mem',label:'项目/部门经理->员工',questions:[Q1, Q5, Q9, Q6, Q12, Q7]}
var QN3 = {key:'dep2mem',label:'事业部->员工',condition:`v-if="db.model.position!=0"`,questions:[Q1, Q5, Q9, Q6,Q12, Q7, Q10, Q11]}
var QN4 = {key:'dep2mgr',label:'事业部->项目/部门经理',condition:`v-else`,questions:[Q1, Q4, Q2, Q3,Q12,Q7, Q10, Q11]}
const getEVSheet = (position,node)=>{
  if(node == 'n1'){
      if(position == 0)
        return QN1
      else
        return QN0
    }else if(node == 'n4'){
       if(position == 0)
        return QN4
      else
        return QN3
    }else{
      return QN2
    }
}


let series = [{
        name:"自评",
        node:'n1',
       
        color:'#333'
      },{
        name:"第一责任人",
        node:'n2',
        color:'yellowgreen'
      },{
        name:"平行责任人",
        node:'n31',
        color:'orange',
        extraIndex:1
        },{
        name:"平行责任人",
        node:'n32',
        color:'orange',
        extraIndex:2
        },{
        name:"平行责任人",
        node:'n33',
        color:'orange',
        extraIndex:3
        },{
        name:"事业部",
        node:'n4',
        color:'#3af'
      }]
export default {
  data(){
    return {
      showPreview:false,
      loadingReport:false,
      reportURL:null,
      report:""
    }
  },
  props:['data'],
  computed:{
    ...mapGetters('core',['users']),
    CommitFields(){
      return ['CommitLevel','CommitPride','Commit']
    },
    CommitFieldsNames(){
      return ['评优等级','评优奖项','评语']
    },
    filledSeries(){
      return series.filter(v=>this.data[this.sheet+v.node])
    },
    sheet(){
      let QASheet = getQASheet(this.data.dep,this.data.position)
      return QASheet.key
    },
    abilityRadarOptions(){
      let QASheet = getQASheet(this.data.dep,this.data.position)
      this.sheet = QASheet.key
      let QAIdicators = ['职业道德',...QASheet.cats].map((v,i)=>{
        return {
          name:v,
          max:i==0?1:10,
          min:i==0?0:4
        }
      })

      return this.filledSeries.map(s=>({
        tooltip:{},
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            radius:75,
            indicator: QAIdicators
        },
        series: [{
            name: s.name,
            type: 'radar',
            areaStyle: {color:[s.color],opacity:0.3},
            data: [
                {
                    value: this.formatValue(this.data[QASheet.key+s.node])
                },
               
            ]
        }]
    }))
    }
  },
  mounted(){
    console.log(this.data)
    let QASheet = getQASheet(this.data.dep,this.data.position)
    this.sheet = QASheet.key
    this.$nextTick(e=>{
      this.filledSeries.forEach((v,i)=>{
          let chartDom = this.$refs.chart[i]
          console.log(chartDom)
          var chart = echarts.init(chartDom)
          chart.setOption(this.abilityRadarOptions[i])
      })
     
    })
    
  },
  methods:{
    CalcScore(value = []){
      let sheet = getQASheet(this.data.dep,this.data.position)
      const values = [10,9.5,9,8.5,8,7.5,7,6.5,6,5.5,5]
      if(sheet && sheet.heavy){
      let s = 0
      
      if(value[0] == 1)
        s = -50
      sheet.heavy.forEach((v,i)=>{
        s += (values[value[i+1]] || 0) * v / 10
      })
      return s
      }
    },
    getUser(id){
      return this.users.find(v=>v.id == id) || {}
    },
    getReport(){
      if(!this.data || !this.data.id)
        return
         this.report = ""
          this.reportURL = ""
      this.loadingReport = true
      this.ENT.GET_REPORT({param:{id:this.data.id},timeout:10000}).then(res=>{
        let data = res.data.data
        if(data)
        {
          this.report = data.html
          this.reportURL = data.url
        }
        
      }).finally(e=>{
        this.loadingReport = false
      })
    },
    getEV(node){
      let EV = getEVSheet(this.data.position,node)
      return EV
    },
    formatValue(values){
      return values.map((v,i)=>
        i==0?[1,0][v]:options[v]
      )
    },
    getUserByNode(node){
      let historyNode = null
      if(!Array.isArray(this.data.historyNodes))
        return {}
      if(node.includes('n3')){
        let executors = this.data.executors["n3"]
        let index = parseInt(node.slice(-1))
        
        let executor = executors[index-1]
        historyNode = this.data.historyNodes.find(v=>v.key == 'n3' && v.op == executor)
      }else{
        historyNode = this.data.historyNodes.find(v=>v.key == node)
      }
      
      if(historyNode){
        return this.getUser(historyNode.op)
      }else
      {
        return {}
      }
    }
  }

}
</script>

<style lang="less" scoped>
.inner-margin{
  >*{
    margin-right:10px;
  }
  
}
.title{
  margin:10px 0;
  font-weight:bold;
}
.chart{
  width:350px;
  height:300px;
  background:#dfdfdf;
}

.l-answer{
  max-width:230px;
  text-align: right;
}

.hoverable:hover{
  background:rgb(245, 245, 160);
}
</style>