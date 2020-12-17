<style lang="less">
.cell-row{
  height:30px;
  border-bottom:1px solid #dfdfdf;
  display: flex;
  align-items: center;
  >*{
    margin-right:10px;
  }

  .cell-node{
    background:#aaa;
    padding:0 5px;
    border-radius: 3px;
    color:#fff;
    margin-right:10px;
  }
}
.cell-row:last-child{
  border:none;
}

.cell-row-wrapper{

}

.ivu-table-wrapper{
  overflow-x:auto;
}
.ivu-table-fixed-header{
   border:1px solid #aaa;
}
.ivu-table-fixed-body{
  border-top:none;
  top:-2px;
   border:1px solid #aaa;
  bottom:-2px;
}


</style>
<template>
  <div class='hs-container-full' style='height:100%;'>
   
      <!-- <div class="hs-left">
         <div class='caption'>2020年年终考核情况汇总统计</div>
         <div class='dep'>
            所有员工 <span class='count'>123/321</span>
          </div>
          <div class='dep'>
            建设管理事业部 <span class='count'>123/321</span>
          </div>
           <div class='dep'>
            市政监理事业部 <span class='count'>123/1234</span>
          </div>
           <div class='dep'>
            房建监理事业部 <span class='count'>123/123</span>
          </div>
           <div class='dep'>
            装修事业部 <span class='count'>123/231</span>
          </div>
      </div> -->
      <div class='hs-content'>
        <!-- filters -->
		<div class="filter-wrap" style="padding: 5px" @click="selected = null">
		
      <Button
				style="margin-right: 5px"
				type="error"
				:loading="loading"
				@click="getData()"
				>刷新</Button>
			<Input v-model="searchText" search style="width: 200px" clearable />
      <Button
				style="margin-left: 5px"
				:type="showPersonalInfo?'info':''"
				@click="showPersonalInfo = !showPersonalInfo"
				>人员信息</Button
			>
      <Button
				style="margin-left: 5px"
				:type="showFlowInfo?'info':''"
				@click="showFlowInfo = !showFlowInfo"
				>流程信息</Button
			>

      <Button
				style="margin-left: 5px"
				:type="showSelf?'info':''"
				@click="showSelf = !showSelf;$refs.table.render()"
				>自评分</Button
			>

      <Button
				style="margin-left: 5px"
				:type="showFirst?'info':''"
				@click="showFirst = !showFirst"
				>第一责任人</Button
			>

      <Button
				style="margin-left: 5px"
				:type="showFirstExtra?'info':''"
				@click="showFirstExtra = !showFirstExtra"
				>平行责任人</Button
			>

		</div>
    <!-- table -->
		<div
			style="
				height: calc(100% - 90px);
				overflow: hidden;
				background: #ddd;
				position: relative;
			"
		>
     <!--  -->
			<hs-table
       v-tableDrag
        ref='table'
				style="height:100%;width:100%;"
				:columns="filteredColumns"
				:data="pagedData"
				:paged="false"
        	:loading="loading"
				selectable="none"

       
				full
				@event="onTableEvent"
			>
			</hs-table>
    
		</div>
		
    <!-- paging -->
		<div
			style="
				height: 50px;
				background: #fff;
				display: flex;
				justify-content: center;
				border-top: 1px solid #dfdfdf;
				align-items: center;
			"
		>
			<Page
				:total="filterdData.length"
				size="small"
				:page-size="current_page_size"
				:page-size-opts="[25, 50, 100]"
				show-elevator
				show-sizer
				show-total
        @on-change="current_page=($event-1)"
        @on-opage-size-change="current_page_size=$event"
			/>
		</div>

	
      </div>

      <Drawer :title="`述职报告 ${current?' - '+current.name:''}`" v-model="showPreview" width="800">
        <Spin fix v-show='loadingReport' />
        <div slot='close' style='font-size:16px;line-height:33px;margin-right:10px;'>
        <a v-if="reportURL"  :href="reportURL" ><Icon type='md-download' style='margin-right:5px;' />下载文件</a>
        <span v-else>未上传文件</span></div>
        <template v-if="!loadingReport && reportURL">
         <template v-if="report">
          <div v-html="report" style='padding:0px 10px;font-family:"仿宋";font-size:16px;' />
          </template>
          <template v-else>
            <BasePreview :url="reportURL" />
          </template>
        </template>
      </Drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
    title: "成长性、发展潜力",
    desc: "发展潜力",
    options: ['潜力非常大', '潜力很大', '潜力大', '潜力较大', '潜力一般', '潜力不大', '没啥潜力']
  },
  Q7= {
    title: "岗位等级",
    desc: "描述",
    options: ['见习', '初级助理', '助理', '成熟助理', '优秀助理',
      '初级/偏弱工程师', '工程师', '成熟工程师', '优秀工程师'
    ]
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
    title:"薪酬调整或岗位晋升建议",
    options:['明显提升','适当提升','略有提升','保持不变','可适当降低']
  }

var QN0 = {
  key:'mem_self',
  condition:`v-if="db.model.position!=0"`,
  label: '员工->自评',
  questions:[Q1,Q5,Q8]
}
var QN1 = {key:'mgr_self',label:'项目/部门经理->自评',condition:`v-else`,questions:[Q1, Q4, Q2, Q3]}
var QN2 = {key:'mgr2mem',label:'项目/部门经理->员工',questions:[Q1, Q5, Q9, Q6, Q7]}
var QN3 = {key:'dep2mem',label:'事业部->员工',condition:`v-if="db.model.position!=0"`,questions:[Q1, Q5, Q9, Q6, Q7, Q10, Q11]}
var QN4 = {key:'dep2mgr',label:'事业部->项目/部门经理',condition:`v-else`,questions:[Q1, Q4, Q2, Q3, Q7, Q10, Q11]}



export default {
  computed:{
    ...mapGetters('core',['users']),
    filterdData(){
      return this.items.filter(v=>{
        if(this.searchText && (!v.name || !v.name.includes(this.searchText)))
          return false
        return true
      })
    },
    pagedData(){
      return this.filterdData.slice(this.current_page*this.current_page_size,(1+this.current_page)*this.current_page_size)
    },
    columns(){
      var that=this
      return [
        { type: "index", title: "序号" ,fixed:"left",sortable:false,render(h,param){
          return h('div',{style:{background:'#333',color:'#fff',width:'25px',height:'25px',display:"flex",alignItems:'center',justifyContent:'center',borderRadius:'5px',margin:"0 auto"}},param.index+1)       }},
        
			 { type: "text", key: "name", width:80,title: "姓名",option:{align:"left"},fixed:"left",render(h,param){
         return h('span',{style:{fontSize:"16px"}},[param.row.name])
       }},
            { type: "state", key: "dep", width:120,title: "部门",option:{align:"center"},	option: {states: ['行政综合','房建监理','市政监理','建设管理','装修管理', '造价咨询', 'BIM咨询'],
            colors:["#990066","#FFCC00","#009999","#003399","#009966","#663399","#666699","#FF6666"]}},
           { type: "state", key: "position", width:120,title: "职务",option:{align:"center"},	option: { 
             states: ['经理/总监(含副)', '经理助理/总代', '工程师级','助理级/员级'],
             colors:['#339933','#CC9900','#003366','#336699']},},
              { type: "text",cat:'person', key: "rank", width:120,title: "职称",option:{align:"center"}},
               { type: "text",cat:'person', key: "project", width:200,title: "所在项目",option:{align:"center"}},
               {type:'time',cat:'person',title:"入职时间",key:'hire_date',width:120,option:{type:"date"}},
                 { type: "text",cat:'person', key: "cerificate", width:200,title: "岗位证书",option:{align:"center"}},
                  { type: "text",cat:'person', key: "education", width:200,title: "学历",option:{align:"center"}},
                { type: "text", key: "report", sortable:false,width:100,title: "述职报告",render(h,param){
                  return h('a',{domProps:{href:'#'},style:{marginLeft:"10px"},on:{click(){that.showPreview=true;
                  that.current=param.row;that.getReport()}}},'预览')
                 }},

                 	{ type: "text",cat:'flow', key: "desc",minWidth:300,  title: "流程",option:{event:"openflow",
              
                   }},
				
          {
            key:"commit",
            type:'text',
            title:"考核评分",
            sortable:false,
            width:580,
            render(h,param){
              let nodes=['n1','n2','n31','n32','n33','n4']
               let nodesName = ['自评','第一','平行','平行','平行','第二']
              let sheets = ['E0','E1','E2','E3','E4','E5']
              let options =  ['10分','9.5分','9分','8.5分','8分','7.5分','7分','6.5分','6分','5.5分','5分及以下']
              let executors =param.row.executors
              let ops = param.row.ops
                if(!(executors))
                return h('span','配置失效')
             if(Array.isArray(executors.n3)){
              executors.n31 = executors.n3[0]
              executors.n32 = executors.n3[1]
              executors.n33 = executors.n3[2]
              }
              let lineDoms = nodes.map((node,j)=>{
                if(!this.showSelf && node == 'n1'){
                  return null
                }else  if(!this.showFirst && node == 'n2')
                  return null
                else if(!this.showFirstExtra && node.includes('n3'))
                  return null
                 if(!executors[node])
                  return null
                  let op = that.users.find(v=>v.id == param.row.ops[node])
                 let score = []
                  let nodeDom = h('div',{style:`width:50px;min-width:50px;height:20px;color:#fff;background:${op?'#333':'#ddd'};text-overflow:eclipse;`},op?op.name:nodesName[j])
                for(let i=0;i<sheets.length;i++){
                 
                  let sheet = sheets[i]

                  if(Array.isArray(param.row[`${sheet}${node}`])){
                    score = param.row[`${sheet}${node}`]
                    for(let n=0;n<10;n++)
                      score[n] = score[n] || null
                    return h('div',{class:'cell-row'},[nodeDom,score.map((v,vi)=>{
                      if(vi == 0){
                          return ['合格','不合格'][v?v:0]
                      }else{
                        return (v===null || v===undefined?'无':options[v])
                      }

                    }).map((s,si)=>{
                  return h('div',{
                    style:`width:40px;min-width:40px;height:20px;color:#fff;background:${s=='无'?'#ddd':'darkgreen'};filter:hue-rotate(${score[si]?score[si]*30:0}deg);`
                    },s)
                    })
                    ])
                  }
                  
                }
                for(let n=0;n<10;n++)
                    score[n] = score[n] || null
                return h('div',{class:'cell-row'},[nodeDom,score.map((v,vi)=>{
                  if(vi == 0){
                    return ['合格','不合格'][v?v:0]
                  }else{
                    return (v===null || v===undefined?'无':options[v])
                  }

                }).map((s,si)=>{
                  return h('div',{
                    style:`width:40px;min-width:40px;height:20px;color:#fff;background:${s=='无'?'#ddd':'darkgreen'};`
                    },s)
                })])
              }).filter(s=>s)
              return h('div',{class:'cell-row-wrapper'},[lineDoms])
            }
          },
          {
            title:"调查评估",
            sortable:false,
            width:500,
            render(h,param){
              let nodes=['n1','n2','n31','n32','n33','n4']
               let nodesName = ['自评','第一','平行','平行','平行','第二']
              let sheets = ['E0','E1','E2','E3','E4','E5']
              let options =  ['10分','9.5分','9分','8.5分','8分','7.5分','7分','6.5分','6分','5.5分','5分及以下']
              let executors =param.row.executors
              let ops = param.row.ops
                if(!(executors))
                return h('span','配置失效')
             if(Array.isArray(executors.n3)){
              executors.n31 = executors.n3[0]
              executors.n32 = executors.n3[1]
              executors.n33 = executors.n3[2]
              }
              let lineDoms = nodes.map((node,j)=>{
                if(!this.showSelf && node == 'n1'){
                  return null
                }else  if(!this.showFirst && node == 'n2')
                  return null
                else if(!this.showFirstExtra && node.includes('n3'))
                  return null
                 if(!executors[node])
                  return null
                  let op = that.users.find(v=>v.id == param.row.ops[node])
                 let score = []
                  let nodeDom = h('div',{style:`width:50px;min-width:50px;height:20px;color:#fff;background:${op?'#333':'#ddd'};text-overflow:eclipse;`},op?op.name:nodesName[j])
                for(let i=0;i<sheets.length;i++){
                 
                  let sheet = sheets[i]

                  if(Array.isArray(param.row[`${sheet}${node}`])){
                    let rawscore = param.row[`${sheet}${node}`]
                    score = new Array(5)
                    for(let n=0;n<5;n++)
                      score[n] = rawscore[n] || null
                    return h('div',{class:'cell-row'},[score.map((v,vi)=>{
                     
                        return (v===null || v===undefined?'无':options[v])
                      

                    }).map((s,si)=>{
                  return h('div',{
                    style:`width:40px;min-width:40px;height:20px;color:#fff;background:${s=='无'?'#ddd':'darkgreen'};filter:hue-rotate(${score[si]?score[si]*30:0}deg);`
                    },s)
                    })
                    ])
                  }
                  
                }
                for(let n=0;n<5;n++)
                    score[n] = score[n] || null
                return h('div',{class:'cell-row'},[score.map((v,vi)=>{
                
                    return (v===null || v===undefined?'无':options[v])
                  

                }).map((s,si)=>{
                  return h('div',{
                    style:`width:40px;min-width:40px;height:20px;color:#fff;background:${s=='无'?'#ddd':'darkgreen'};`
                    },s)
                })])
              }).filter(s=>s)
              return h('div',{class:'cell-row-wrapper'},[lineDoms])
            }
          },
          {
            key:"commit",
            type:'text',
            title:"考核评优/推荐",
            sortable:false,
            width:350,
            
            render(h,param){
              let nodes=['n2','n31','n32','n33','n4']
              let executors =param.row.executors
              if(!(executors))
                return h('span','配置失效')
              if(Array.isArray(executors.n3)){
             executors.n31 = executors.n3[0]
              executors.n32 = executors.n3[1]
              executors.n33 = executors.n3[2]
              }
              let nodesName = ['第一','平行','平行','平行','第二']
              let fields = ['CommitLevel','CommitPride','Commit']
              let fieldsName = ['评优等级','评优奖项','评语']
              let lineDoms = nodes.map((node,j)=>{

                if(!this.showFirst && node == 'n2')
                  return null
                else if(!this.showFirstExtra && node.includes('n3'))
                  return null

                let scores = []
                if(!executors[node])
                  return null
                  let nodeDom = h('div',{style:'width:30px;min-width:40px;height:20px;color:#fff;background:#888;'},nodesName[j])
                for(let i=0;i<fields.length;i++){
                  let f = fields[i]
      
                  if(param.row[`${f}_${node}`]){
                    scores[i] = param.row[`${f}_${node}`]
                  }else{
                    scores[i] ='无'
                  }
                    
                }

                if(scores.length > 0)
                  return h('div',{class:'cell-row'},[
                        scores.map(v=>v===null?'无':v).map((s,si)=>{
                          if(si < 2){
                            return h('div',{style:`width:40px;min-width:40px;height:20px;color:#fff;background:${s=='无'?'#ddd':'darkgreen'};`},s)
                          }else{
                            return h('Tooltip',{props:{maxWidth:200,content:s,transfer:true}},[h('div',{style:`max-width:200px;text-overflow:ellipsis;overflow:hidden;height:20px;ecllipse;text-align:left;padding:0 5px;white-space:nowrap;line-height:25px;`},s)])
                          }
                        
                      })])
              }).filter(s=>s)

              return h('div',{class:'cell-row-wrapper',style:{alignItems:"flex-start"}},this.showSelf?[h('div',{class:'cell-row'},''),lineDoms]:[lineDoms])
            
            }
          },
           
          {
             key:"commit",
            title:"综合评分",
            width:120,
            render(h,params){
              let s = '100'
              let l = '优秀'
              let score =  h('div',{style:`width:40px;min-width:40px;height:20px;color:#fff;background:${s=='无'?'#ddd':'darkgreen'};`},s)
              let level =   h('div',{style:`width:40px;min-width:40px;height:20px;color:#fff;background:${l=='无'?'#ddd':'darkgreen'};`},l)
              let row = h('div',{class:'cell-row'},[score,level])
              return h('div',{class:'cell-row-wrapper',style:{alignItems:"flex-start"}},[row])
            }
          },
           
        
							 { type: "text", cat:"flow",key: "state", width:200,title: "当前节点",option:{align:"center"},render(h,params){
                 let activeNodes = params.row.activeNodes
                 let domActiveNodes = activeNodes.filter(v=>v.executors).map(v=>{
                   let executors = v.executors.filter(v=>v).map(e=>{
                     let user = that.users.find(u=>u.id == e)
                     if(user)
                      return user
                   }).filter(s=>s).map(user=>{
                     return h('hs-avatar',{props:{userinfo:user}})
                   })
                   let node = that.nodes.find(n=>n.key == v.key)
                   let nodeDom = h('div',{class:'cell-node'},'节点')
                   if(node)
                      nodeDom = h('div',{class:'cell-node'},node.name)
                   if(executors.length < 0)
                    return h('div',{class:'cell-row'},nodeDom)
                   else
                    return h('div',{class:'cell-row'},[nodeDom,...executors])
                 })
                 return h('div',{class:'cell-row-wrapper'},domActiveNodes)
               }},{
                type:'tool',width:200,fixed:"right",cat:"flow",title:"操作",buttons:['delete'],option:{type:'button'}
              },
          {
            title:"创建时间",
           type:'time',
            width:100,
           key:"created_at"
          },
        
			]
    },
    filteredColumns(){
     
       return this.columns.filter(v=>{
         
         if(!this.showPersonalInfo && v.cat == 'person')
          return false
           if(!this.showFlowInfo && v.cat == 'flow')
          return false

          return true
         
         })
    }
  },
  mounted(){
    this.getData()
  },
  data(){
    return {
      current_page:0,
      showSelf:false,
      showFirst:false,
      showFirstExtra:false,
      current_page_size:25,
      searchText:"",
      items:[],
      loading:false,
      nodes:[],
      showPersonalInfo:false,
      current:null,
      report:"",
      reportURL:"",
      showPreview:false,
      loadingReport:false,
      showFlowInfo:false,
    }
  },
  methods:{
    getReport(){
      if(!this.current || !this.current.id)
        return
         this.report = ""
          this.reportURL = ""
      this.loadingReport = true
      this.ENT.GET_REPORT({param:{id:this.current.id},timeout:10000}).then(res=>{
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
    onTableEvent(e){
      
     if(e.type == 'delete'){
       let id = e.data.id
       this.Confirm(`确定要删除该实例<span style="color:red">${e.data.desc}</span>的所有数据<span style="color:red">(删除后不可恢复)</span>?`,()=>{
         this.ENT.DEL_WORKFLOW({param:{id:e.data.id}}).then(res=>{
           let index = this.items.findIndex(v=>v.id == id)
           this.items.splice(index,1)
           this.Success('删除成功')
         }).catch(e=>{
           this.Error('删除失败')
         })
       })
     }
    },
    getData(){
      this.loading = true
      this.ENT.LIST_CHECKREPORTS({timeout:10000}).then(res=>{
        let items = res.data.data
        items.forEach(v=>{
          v.ops = {}
          
          if(v.historyNodes){
             v.historyNodes.forEach(n=>{
               if(n.key == 'n3' && Array.isArray(v.executors[2])){
                 let index = v.executors[2].findIndex(v=>v.op == n.op)
                 if(index != -1)
                  v.ops[n.key+(index+1)] = n.op
               }else{ 
                 v.ops[n.key] = n.op
               }


               if(n.mem_self || n.mgr_self){
                  v.QN2 = n.mem_self || n.mgr_self || []
                  v.TN2 = v.position != 0 ? QN1 : QN2
                  v.QN31 = n.mgr2mem31
                  v.QN32 = n.mgr2mem32
                  v.QN33 = n.mgr2mem33
                  v.TN31 = v.TN32 = v.TN33 = QN3

                  v.QN4 = n.dep2mgr || n.dep2mem
                  v.TN4 = v.position != 0 ? QN4 : QN5
               }
               if(n.mem_self)
                this.table = QN1
          })
          }
         
        })
        this.items = items
        
      }).catch(e=>{
        this.Error(e)
      }).finally(e=>{
        setTimeout(()=>{
          this.loading =false
        },1000)
        
      })

      this.CORE.GET_FLOW({param:{id:'4f477a00-3c1b-11eb-8b81-b551b8fbb24d',},query:{q:'node'}}).then(res=>{
        this.nodes = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hs-left{
  width:300px;
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  background:#082c49;
}
.caption{
  background:rgb(7, 86, 104);
  padding:10px 20px;
  color:#fff;
  text-align: center;
  filter:drop-shadow(1px 1px 2px #333);
}
.dep{
  height:60px;
  color:#fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  border-bottom:1px solid rgb(4, 131, 145);
  padding:20px;

  .count{
    color:yellowgreen;
    font-size:12px;
  }
}

.dep:hover{
  background:rgb(2, 161, 164);
  cursor: pointer;
}

.hs-content{
  position: absolute;
  left:0;;
  right:0;
  bottom:0;
  top:0;
}
</style>