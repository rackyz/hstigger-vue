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
.l-drawer{
  .ivu-drawer-mask {
    z-index: 2000 !important;
  }
  .ivu-drawer-wrap {
    z-index: 2000 !important;
  }
}

</style>
<template>
  <div class='hs-container-full hs-tigger' style='height:100%;'>
      <div class='hs-content' >
        <!-- filters -->
		<div class="filter-wrap" style="padding: 5px" @click="selected = null">
     <Button
				style="margin-right: 5px"
        type="success"
        icon='md-arrow-forward'
        v-if="editDeps && editDeps.length > 0"
				@click="showScore = true;renderEdit()"
				>事业部打分入口</Button>
      <Button
				style="margin-right: 5px"
				icon='md-refresh'
				:loading="loading"
				@click="getData()"
				>刷新</Button>
			<Input v-model="searchText" search style="width: 200px" clearable />
      <span class='filter-label'>信息筛选</span>
      <Button
				style="margin-left: 5px"
				:type="showPersonalInfo?'info':''"
				@click="showPersonalInfo = !showPersonalInfo"
				>人员信息</Button
			>
      <Button
				style="margin-left: 5px"
				:type="showFlowInfo?'info':''"
				@click="showFlowInfo = !showFlowInfo;"
				>流程信息</Button
			>

       <Button
				style="margin-left: 5px"
				:type="showDetail?'info':''"
				@click="showDetail = !showDetail;"
				>详细评分</Button
			>

      <div class="flex-wrap" v-if="!ob">
      <span class='filter-label'>评分筛选</span>
       <Button
				style="margin-left: 5px"
        v-if="showSelf || showFirstExtra || showFirst"
				@click="showSelf=showFirst=showFirstExtra=false;"
				>取消</Button
			>
      <Button
				style="margin-left: 5px"
				:type="showSelf?'info':''"
				@click="showSelf = !showSelf;"
				>自评分</Button
			>

      <Button
				style="margin-left: 5px"
				:type="showFirst?'info':''"
				@click="showFirst = !showFirst;"
				>第一责任人</Button
			>

     <Button
				style="margin-left: 5px"
				:type="showFirstExtra?'info':''"
				@click="showFirstExtra = !showFirstExtra;"
				>平行责任人</Button
			>

      <Button
				style="margin-left: 5px"
				:type="showSecond?'info':''"
				@click="showSecond = !showSecond;"
				>第二责任人</Button
			>
      </div>
        <Button
				style="float:right"
        v-if="!ob"
				@click="ExportXLSX"
				>导出EXCEL
        </Button>
		</div>
    <div class="filter-wrap" style="padding: 5px;background:#33435c;color:#fff;border-bottom:1px solid #fff;" @click="selected = null">
        
      <span class='filter-label'>部门</span>
      <Button style="margin-left: 5px" size='small'
        v-if="fdep.length > 0"
				:type="fdep && fdep.length == 0?'warning':''"
				@click="fdep=[]">取消</Button>
      <template v-for='(d,i) in deps'>
       <Button :key='i'
				style="margin-left: 5px" size='small'
				:type="fdep.includes(i)?'warning':''"
        :disabled="deps_count[i] == 0"
				@click="fdep=[i]"
				>{{d}} {{deps_count[i]}}</Button
			>

      </template>

      <span class='filter-label'>岗位</span>
      <Button style="margin-left: 5px"
        v-if="fpos.length > 0" size='small'
				:type="fpos && fpos.length == 0?'warning':''"
				@click="fpos=[]">取消</Button>
      <template v-for='(d,i) in positions'>
       <Button :key='i'
				style="margin-left: 5px" size='small'
        :disabled="pos_count[i] == 0"
				:type="fpos.includes(i)?'warning':''"
				@click="fpos=[i]"
				>{{d}} {{pos_count[i]}}</Button
			>

      </template>


     
      </div>
    <!-- table -->
		<div
			style="
				height: calc(100% - 75px);
        padding-bottom:10px;
				overflow: hidden;
				background: #ddd;
				position: relative;
			"
		>
     <!--  -->
     <transition name='fade'>
			<hs-table
        v-tableDrag
        v-show="show"
        :option="{stripe:true}"
        ref='table'
				style="height:100%;width:100%;"
				:columns="filteredColumns"
				:data="filterdData"
        :loading="loading"
				selectable="none"
        :pageSize='50'
        sortable
        :rowClassName='getRowClassName'
				full
				@event="onTableEvent"
			>
			</hs-table>
    </transition>
		</div>

	
      </div>

      <Modal title="事业部评分" footer-hide v-model="showScore" width='1300' fullscreen class='hs-tigger'    v-if="editDeps && editDeps.length > 0">
        <div style='background:rgb(51, 67, 92);position:relative;height:100%;'>
          <!-- tool -->
        <div class='flex-wrap' style='padding:10px 0;color:#fff;'>
          <span class='filter-label' style=''>搜索</span>
          	<Input v-model="searchText" search clearable size='small' style='margin-left:10px;border-radius:0;width:200px;' />
          <div >
  <span class='filter-label' style=''>部门</span>
  <ButtonGroup style='margin-left:5px;'>
      <template v-for='(d,i) in editDeps'>
       <Button :key='i'
				size='small'
				:type="fdep.includes(d)?'warning':''"
        :disabled="deps_count[d] == 0"
				@click="fdep=[d];renderEdit()"
				>{{deps[d]}} {{deps_count[d]}}</Button
			>

      </template>
</ButtonGroup>
     
          </div>
          <div class='POSITIONS'>
 <span class='filter-label'>岗位</span>
 <ButtonGroup style='margin-left:5px;'>
      <template v-for='(d,i) in positions'>
       <Button :key='i'
				 size='small'
        :disabled="pos_count[i] == 0"
				:type="fpos.includes(i)?'warning':''"
				@click="fpos=[i];renderEdit()"
				>{{d}} {{pos_count[i]}}</Button
			>

      </template></ButtonGroup>
          </div>
    
</div>
<!-- table -->
  <div style='position:relative;height:calc(100% - 80px);'>
    <!-- header -->
     <div class='flex-wrap score-item score-item-focus' style='padding:10px;width:80px;background:#fff;display:flex;align-items:center;width:100%;font-size:12px;'>
       <div style='width:30px;text-align:center;'>置顶</div>
          <div style='width:50px;text-align:center;'>姓名</div>
          <template v-if='eQNSheet && eQNSheet.shorts'>
          <template v-for="(q,qi) in ['道德',...eQNSheet.shorts]">
            <Tooltip transfer :content="['职业道德',...eQNSheet.cats][qi]" :key='qi'>
            <div style='width:40px;text-align:center;' :key='qi'>{{q}}</div>
            </Tooltip>
          </template>
          </template>
           <div style='width:60px;text-align:center;color:darkred;'>总分</div>
          <template v-if='eQASheet && eQASheet.questions'>
          <template v-for="(q,qi) in eQASheet.questions">
            <div style='width:70px;text-align:center;' :key='qi'>{{q.title}}</div>
          </template>
          </template>
          <div style='width:70px;color:darkred;text-align:center;'>评优等级</div>
          <div style='width:70px;text-align:center;'>推荐奖项</div>
          <div style='width:200px;text-align:center;'>评语</div>
        </div>
        <!-- rows -->
        <div style="height:calc(100% - 40px);position:relative;overflow-y:auto;">
        <template v-for="u in [...filteredLocked,...filteredUnlocked]">
            <div class='flex-wrap score-item score-item-user' style='padding:10px;width:80px;background:#eee;border-bottom:1px solid #ccd;display:flex;align-items:center;width:100%;font-size:14px;' :key='u.id' :class='editingUser == u.id?"score-item-editing":""' @click="ConfirmChange(u)">
              <div style='width:30px;text-align:center;'><Button icon='md-lock' @click.stop="lock(u)" :type="u.locked?'warning':''" size='small' /></div>
              <div style='width:50px;text-align:center;'   >{{u.name}}</div>
              <!-- QN sheet -->
              <template v-if='eQNSheet &&eQNSheet.shorts'>
                <template v-for="(q,qi) in ['道德',...eQNSheet.shorts]">
                  <template v-if="editingUser != u.id">
                    <div style='width:40px;'  class='l-field' :class="CompareChange(cached[u.id],u,eQNSheet.key+'n4',qi)?'l-field-changed':''" :key='qi'>{{(cached[u.id] && cached[u.id][eQNSheet.key+'n4']? eQNSheet.options[qi][cached[u.id][eQNSheet.key+'n4'][qi]] : (u[eQNSheet.key+'n4'] ? eQNSheet.options[qi][u[eQNSheet.key+'n4'][qi]]:"")) || "-"}}</div>
                  </template>
                  <template v-else>
                  <Dropdown :key='qi' @on-click="EditQN(u,eQNSheet.key+'n4',qi,$event)" transfer>
                    <div style='width:40px;'  class='l-field l-field-select'  :class="CompareChange(model,u,eQNSheet.key+'n4',qi)?'l-field-changed':''"  :key='qi'>{{(model[eQNSheet.key+'n4']?eQNSheet.options[qi][model[eQNSheet.key+'n4'][qi]]:"") || (u[eQNSheet.key+'n4'] ? eQNSheet.options[qi][u[eQNSheet.key+'n4'][qi]]:"") || "-"}}</div>
                    <DropdownMenu slot='list'>
                      <template v-for='(o,oi) in eQNSheet.options[qi]'>
                        <DropdownItem style='font-size:12px;' :selected="oi===(model[eQNSheet.key+'n4']?model[eQNSheet.key+'n4'][qi]:(u[eQNSheet.key+'n4']?u[eQNSheet.key+'n4'][qi]:undefined))"  :key='oi' :name='oi'>{{o}}</DropdownItem>
                      </template>
                      
                    </DropdownMenu>
                  </Dropdown>
                  </template>
                </template>
              </template>
              <!-- Total -->
              <div style='width:60px;color:darkred;'  class='l-field'>{{(u.id == editingUser ? CalcScore(eQNSheet,Object.assign({},(model[eQNSheet.key+'n4']?model[eQNSheet.key+'n4']:u[eQNSheet.key+'n4']) || {})): CalcScore(eQNSheet,Object.assign({},(cached[u.id] && cached[u.id][eQNSheet.key+'n4']?cached[u.id][eQNSheet.key+'n4']:u[eQNSheet.key+'n4']) || {})))  || "-"}}</div>
              <!-- QA sheet -->
              <template v-if='eQASheet && eQASheet.questions'>
                <template v-for="(q,qi) in eQASheet.questions">
                  <template v-if="editingUser != u.id">
                    <div style='width:70px;' class='l-field' :key='qi' :class='cached[u.id] && cached[u.id][eQASheet.key] && (!u[eQASheet.key] || cached[u.id][eQASheet.key][qi] !== u[eQASheet.key][qi])?"l-field-changed":""' >{{(cached[u.id] && cached[u.id][eQASheet.key]?q.options[cached[u.id][eQASheet.key][qi]] : (u[eQASheet.key] ? q.options[u[eQASheet.key][qi]]:"-")) ||'-'}}</div>
                  </template>
                  <template v-else>
                  <Dropdown :key='qi' @on-click="EditQA(u,eQASheet.key,qi,$event)" transfer>
                    <div style='width:70px;'  class='l-field l-field-select' :class='model[eQASheet.key] && (!u[eQASheet.key] || model[eQASheet.key][qi] !== u[eQASheet.key][qi])?"l-field-changed":""' :key='qi'>{{((model[eQASheet.key]? q.options[model[eQASheet.key][qi]]:"") || (u[eQASheet.key] ? q.options[u[eQASheet.key][qi]]:'-')) || '-'}}</div>
                    <DropdownMenu slot='list'>
                      <template v-for='(o,oi) in q.options'>
                        <DropdownItem style='font-size:12px;' :selected='oi===(model[eQASheet.key]?model[eQASheet.key][qi]:(u[eQASheet.key]?u[eQASheet.key][qi]:undefined))' :key='oi' :name='oi'>{{o}}</DropdownItem>
                      </template>
                      
                    </DropdownMenu>
                  </Dropdown>
                  </template>
                </template>
              </template>
              <!-- CommitLevel_n4 -->
              <template v-if="editingUser != u.id">
                  <div style='width:70px;'  class='l-field'  :class='cached[u.id] && cached[u.id].CommitLevel_n4 !=undefined && cached[u.id].CommitLevel_n4 !== u.CommitLevel_n4?"l-field-changed":""' :key='qi'>{{(cached[u.id] && cached[u.id].CommitLevel_n4 ? model.CommitLevel_n4 :u.CommitLevel_n4) || "-"}}</div>
                </template><template v-else>
                  <Dropdown :key='qi' @on-click="$set(model,'CommitLevel_n4',$event)" transfer>
                  <div style='width:70px;'  class='l-field l-field-select' :class='model.CommitLevel_n4 !=undefined && model.CommitLevel_n4 !== u.CommitLevel_n4?"l-field-changed":""' >{{model.CommitLevel_n4 ? model.CommitLevel_n4 :u.CommitLevel_n4}}</div>
                  <DropdownMenu slot='list'>
                    <template v-for="(o) in ['优秀','称职','基本称职','不称职']">
                      <DropdownItem style='font-size:12px;' :key='o' :name='o' :selected='model && o===model.CommitLevel_n4' >{{o}}</DropdownItem>
                    </template>
                    
                  </DropdownMenu>
                </Dropdown>
                  </template>
                  <!-- CommitPride_n4 -->
              <template v-if="editingUser != u.id">
                  <div style='width:70px'  class='l-field' :key='qi' :class='cached[u.id] && cached[u.id].CommitPride_n4 !=undefined && cached[u.id].CommitPride_n4 !== u.CommitPride_n4?"l-field-changed":""'>{{(cached[u.id] && cached[u.id].CommitPride_n4? cached[u.id].CommitPride_n4 : u.CommitPride_n4 )|| "-"}}</div>
                </template><template v-else>
                  <Dropdown :key='qi' @on-click="$set(model,'CommitPride_n4',$event)" transfer>
                  <div style='width:70px;'  class='l-field l-field-select' :class='model.CommitPride_n4 !=undefined && model.CommitPride_n4 !== u.CommitPride_n4?"l-field-changed":""'>{{model.CommitPride_n4 ? model.CommitPride_n4 : u.CommitPride_n4}}</div>
                  <DropdownMenu slot='list'>
                    <template v-for="(o) in ['进步奖', '敬业奖', '贡献奖']">
                      <DropdownItem style='font-size:12px;' :selected='o===model.CommitPride_n4' :key='o' :name='o'>{{o}}</DropdownItem>
                    </template>
                      <DropdownItem style='font-size:12px;' :selected='undefined===model.CommitPride_n4' key='无' name='无'>无</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                  </template>
                    <!-- Commit_n4 -->
                  <Tooltip transfer maxWidth='300' :content="model.Commit_n4?model.Commit_n4:(u ? (u.Commit_n4 || '-') : '-')" style='height:24px;'>
              <div style='width:200px;padding:0 10px;text-align:left;' :style="`${editingUser == u.id?'border:1px solid #aaa;background:#ffd;box-shadow:1px 1px 1px 0px #aaa;cursor:pointer;':''}`" class='l-field' @click='editingUser == u.id?createEditCommit(u):""' :class='(editingUser==u.id?( model.Commit_n4 != undefined && model.Commit_n4 != u.Commit_n4) : (cached[u.id] && cached[u.id].Commit_n4 !=undefined && cached[u.id].Commit_n4 !== u.Commit_n4))?"l-field-changed":""'>
                {{(editingUser === u.id?(model.Commit_n4 || u.Commit_n4):(u.Commit_n4)) || '-'}}
                <Icon type='md-create' v-show="editingUser === u.id" size='13' style='margin-right:5px;float:right;line-height:24px;color:#aaa;' />
              </div>
              </Tooltip>
              <!-- Buttons -->
              <Button size='small' style='margin:0 20px' @click='showReport(u)'>述职报告</Button>
             
              <Button size='small' type='success' v-if='editingUser==u.id' :loading='loadingSaveScore' @click="saveScore(u)">保存并上传</Button>
              <Button size='small' v-if='editingUser==u.id' @click.stop='cancelScore(u)'>重置</Button>
            </div>
            <template v-if='editingUser == u.id'>
             
            <template v-for='node in ["n1","n2","n31","n32","n33"]'>
              
             <div :key='node+u.id' class='flex-wrap score-item score-item-focus' style='padding:5px;width:80px;background:#ddd;border-bottom:1px solid #ccd;display:flex;align-items:center;width:100%;font-size:12px;' v-if="u.opusers[node]">
                 <div style='width:20px;color:#fff;padding:1px;font-size:12px;background:#333;border-radius:2px;text-align:center;'>{{nodeNames[node]}}</div>
              <div style='width:65px;text-align:center;display:flex;align-items:center;'   ><hs-avatar :userinfo='u.opusers[node]' style='margin-right:5px;' />{{u.opusers[node].name}}</div>
              <!-- QN sheet -->
              <template v-if='eQNSheet &&eQNSheet.shorts'>
                <template v-for="(q,qi) in ['道德',...eQNSheet.shorts]">
                
                    <div style='width:40px;'  class='l-field' :key='qi'>{{ (u[eQNSheet.key+node] ? eQNSheet.options[qi][u[eQNSheet.key+node][qi]]:"") || "-"}}</div>
                
                </template>
              </template>
              <!-- Total -->
              <div style='width:60px;color:darkred;'  class='l-field'>{{CalcScore(eQNSheet,Object.assign({},u[eQNSheet.key+node] || {})) || "-"}}</div>
              <!-- QA sheet -->
              <template v-if=' eQADownSheets[node] && eQADownSheets[node].questions'>
                <template v-for="(q,qi) in  eQADownSheets[node].questions">
                
                    <div style='width:70px;' class='l-field' :key='qi'>{{(u[ eQADownSheets[node].key] ? q.options[u[ eQADownSheets[node].key][qi]]:"-")||'-'}}</div>
                 
                </template>
              </template>
              <!-- CommitLevel_n4 -->
            
                  <div style='width:70px;' v-if='node != "n1"'  class='l-field' :key='qi'>{{(u[`CommitLevel_${node}`] || "-")}}</div>
               
                  <!-- CommitPride_n4 -->
          
                  <div style='width:70px' v-if='node != "n1"'  class='l-field' :key='qi'>{{(u[`CommitPride_${node}`] || "-")}}</div>
              
                    <!-- Commit_n4 -->
                  <Tooltip transfer maxWidth='300' v-if='node != "n1"'  :content="(u[`Commit_${node}`] || '-')" style='height:24px;'>
              <div style='width:200px;background:#fff;padding:0 10px;text-align:left;' class='l-field'>
                {{ u[`Commit_${node}`] || '-'}}
              </div>
              </Tooltip>
              <!-- Buttons -->
           
            </div>
          
            </template>
            
            </template> <!-- rows-->
            </template>
             {{model}}
            </div>
            
          </div><!-- table-->
         
        </div><!-- wrap -->
      </Modal>
      <Modal title='编辑评语' v-model='showCommitEditor' footer-hide>
        <Input type='textarea' ref='comment' autofocus :rows='15' :value='model.Commit_n4'  @on-change='$set(model,"Commit_n4",$event.target.value)' />
      </Modal>
      <Drawer class='l-drawer' :title="`述职报告 ${current?' - '+current.name:''}`" transfer v-model="showPreview" width="800">
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
import { mapGetters } from "vuex";
const XLSX = require('xlsx')
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

export default {
  computed:{
    ...mapGetters('core',['users','session']),
    editingUserItem(){
      return this.items.find(v=>v.id == this.editingUser)
    },
    deps(){
      return ['行政','房建','市政','管理','装修', '造价', 'BIM']
    }, 
    editDeps(){
      let id = this.session.user_id
      console.log('id:',this.session.user_id)
      if(id == 'ed49e690-3b83-11eb-8e1e-c15d5c7db744'){
        return [0,6]
      }else if(id == 'ed4a8300-3b83-11eb-8e1e-c15d5c7db744' || id == 'ed4a34b4-3b83-11eb-8e1e-c15d5c7db744' || id == 'b8cabcb0-4014-11eb-813c-c1c9b9ee54e7'){
        return [1]
      }else if(id == 'ed4a5be7-3b83-11eb-8e1e-c15d5c7db744' || id == 'ed4a5c0b-3b83-11eb-8e1e-c15d5c7db744' || id ==  'ed4a82f9-3b83-11eb-8e1e-c15d5c7db744'){
        return [2]
      }else if(id == 'ed49e6d0-3b83-11eb-8e1e-c15d5c7db744' || id == 'ed4a34be-3b83-11eb-8e1e-c15d5c7db744' || id == 'ed4a5bf7-3b83-11eb-8e1e-c15d5c7db744'){
        return [3]
      }else if(id == 'ed4a82fb-3b83-11eb-8e1e-c15d5c7db744'){
        return [4]
      }else if(id == 'ed4a8301-3b83-11eb-8e1e-c15d5c7db744'){
        return [5]
      }

      return null
    },
    deps_count(){
      return [0,1,2,3,4,5,6,7].map(d=>this.items.filter(v=>v.dep == d).length)
    },
    positions(){
      return  ['经理/总监(含副)', '经理助理/总代', '工程师级','助理级/员级']
    } ,
    pos_count(){
      return [0,1,2,3].map(d=>this.filterdDataByDep.filter(v=>v.position == d).length)
    },
    filterdDataByDep(){
       return this.items.filter(v=>{
        if(this.searchText && (!v.name || !v.name.includes(this.searchText)))
          return false
        if(this.fdep && this.fdep.length > 0 && !this.fdep.includes(v.dep)){
          return false
        }
        return true
       })
    },
    filterdData(){
      return this.filterdDataByDep.filter(v=>{
         if(this.fpos && this.fpos.length > 0 && !this.fpos.includes(v.position)){
          return false
        }
        return true
      })
    },
    pagedData(){
      return this.filterdData.slice(this.current_page*this.current_page_size,(1+this.current_page)*this.current_page_size)
    },
    columns(){
      var that=this
      return [
        {type:"index",title:"序号",fixed:'left'},
         { type: "text", key: "name", width:50,title: "标记",sortable:false,option:{align:"left"},fixed:"left",render(h,param){
         return h('Button',{props:{size:'small',type:param.row.readed?'success':''},on:{click:()=>{
           that.$set(param.row,'readed',!param.row.readed);
           that.saveReadState(param.row.id,param.row.readed)
         }}},param.row.readed?'已阅':'待阅')
       }},
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
                  if(param.row.report && !param.row.report.html)
                    return h('a',{on:{click(){that.Download(param.row.report.url)}}},'下载')
                  return h('Button',{domProps:{href:'#'},style:{marginLeft:"10px"},on:{click(){
                    that.showPreview=true;
                  that.current=param.row;that.getReport()}}},'预览')
                 }},

                 	{ type: "text",cat:'flow', key: "desc",minWidth:220, linkEvent:true, title: "流程",option:{
              
                   }},
                   
           
        
							 { type: "text", cat:"flow",key: "state", width:280,title: "当前节点",option:{align:"center"},render(h,params){
                 let activeNodes = params.row.activeNodes
                 let domActiveNodes = activeNodes.filter(v=>v.executors).map(v=>{
                   let executors = v.executors.filter(v=>v).map(e=>{
                     let user = that.users.find(u=>u.id == e)
                     if(user)
                      return user
                   }).filter(s=>s).map(user=>{
                     return h('div',{class:'flex-wrap'},[h('hs-avatar',{style:{marginRight:'3px'},props:{userinfo:user}}),user.name])
                    })
                   let node = that.nodes.find(n=>n.key == v.key)
                   let nodeDom = h('div',{class:'cell-node'},'节点')
                   if(node)
                      nodeDom = h('div',{class:'cell-node'},node.name.slice(0,2))
                   if(executors.length < 0)
                    return h('div',{class:'cell-row'},nodeDom)
                   else
                    return h('div',{class:'cell-row'},[nodeDom,...executors])
                 })
                 return h('div',{class:'cell-row-wrapper'},domActiveNodes)
               }},{
                type:'tool',width:200,fixed:"right",cat:"flow",title:"操作",buttons:['delete'],option:{type:'button'},
                op:true
              },
        
          {
            key:"commit",
            type:'text',
            title:"考核评分",
            sortable:false,
            cat:"detail",
            width:560,
            renderHeader(h,param){
              let titles = ['道德','Q2','Q3','Q4','Q5','Q6','Q7','Q8','Q9','总分']
               let dep = that.fdep.length == 1?that.fdep[0]:undefined
               let pos = that.fpos.length == 1?that.fpos[0]:undefined
               
                let sheet = getQASheet(dep,pos)
                console.log('SHEET:',sheet)
                if(sheet)
                  sheet.shorts.forEach((v,i)=>{
                    titles[i+1] = sheet.shorts[i]
                  })
                
              titles = titles.map((v,i)=>i<9?(h('Tooltip',{props:{transfer:true,content:i==0?'职业道德':(sheet?sheet.cats[i-1]:v)}},v)):v)

              let nodeDom = h('div',{style:`width:50px;min-width:50px;height:20px;color:#333;text-overflow:eclipse;`},'负责人')
              let  colDoms = [0,1,2,3,4,5,6,7,8,9].map((v,i)=>h('div',{
                    style:`width:40px;min-width:40px;height:20px;color:#666;`
                    },[titles[i]]))
              return  h('div',{class:'cell-row'},[nodeDom,...colDoms])
            },
            render(h,param){
             
              let nodes=['n1','n2','n31','n32','n33','n4']
               let nodesName = ['自评','第一','平行','平行','平行','第二']
              let sheets = ['E0','E1','E2','E3','E4','E5']
              let options =  ['10','9.5','9','8.5','8','7.5','7','6.5','6','5.5','5↓']
              let values = [10,9.5,9,8.5,8,7.5,7,6.5,6,5.5,5]
              let executors =param.row.executors
              let sheetObj = getQASheet(param.row.dep,param.row.position)
              function mapColor(option,index){

              }
             
                if(!(executors))
                return h('span','配置失效')
             if(Array.isArray(executors.n3)){
              executors.n31 = executors.n3[0]
              executors.n32 = executors.n3[1]
              executors.n33 = executors.n3[2]
              }
              let lineDoms = nodes.map((node,j)=>{
                if(!that.showSelf && node == 'n1'){
                  return null
                }else  if(!that.showFirst && node == 'n2')
                  return null
                else if(!that.showFirstExtra && node.includes('n3'))
                  return null
                 else if(!that.showSecond && node == 'n4')
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
                    let sum = 0
                    score.forEach((v,i)=>{
                      if(i==0){
                        if(v)
                          sum = -50
                        else
                          sum = 0
                      }else{
                        sum += (values[v] || 0) * ((sheetObj.heavy[i-1] || 0) / 10)
                      }
                    })
                    score[10] = parseInt(sum)
                    return h('div',{class:'cell-row'},[nodeDom,score.map((v,vi)=>{
                      if(vi == 0){
                          return v===undefined?'无':(['合格','不合格'][v?v:0])
                      }else if(vi==10){
                        return v===undefined?'无':v
                      }else{
                        return (v===undefined?'无':options[v || 0])
                      }

                    }).map((s,si)=>{
                  return h('div',{
                    style:`width:40px;min-width:40px;height:20px;color:#fff;background:${s=='无'?'#ddd':'#5a6'};filter:hue-rotate(${si<9?(score[si]?score[si]*30:0):((100-score[si])*8)}deg);`
                    },s)
                    })
                    ])
                  }
                  
                }
                for(let n=0;n<10;n++)
                    score[n] = score[n] || null
                return h('div',{class:'cell-row'},[nodeDom,score.map((v,vi)=>{
                  if(vi == 0){
                    return '无'
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
            cat:"detail",
            width:720,
             renderHeader(h,param){
              let titles=['饱满度','Q2','Q3','Q4','Q5','Q6','Q7','Q8']
              let pos = that.fpos.length == 1 ?that.fpos[0]:undefined
              let node = that.showSelf?'n1':(that.showFirst?'n2':'n4')
              let sheet = getEVSheet(pos,node)
              if(sheet){
                sheet.questions.forEach((v,i)=>{
                  titles[i] = sheet.questions[i].title
                })
                
              }
              let nodeDom = h('div',{style:`width:50px;min-width:50px;height:20px;color:#666;text-overflow:eclipse;`},'负责人')
              let  colDoms = titles.map((v,i)=>h('div',{
                    style:`width:80px;min-width:80px;height:20px;color:#333;`
                    },[titles[i]]))
              return  h('div',{class:'cell-row'},[...colDoms])
            },
            render(h,param){
              let nodes=['n1','n2','n31','n32','n33','n4']
               let nodesName = ['自评','第一','平行','平行','平行','第二']
              let sheets = getEVSheets(param.row,nodes)
            
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
                if(!that.showSelf && node == 'n1'){
                  return null
                }else  if(!that.showFirst && node == 'n2')
                  return null
                else if(!that.showFirstExtra && node.includes('n3'))
                  return null
                 else if(!that.showSecond && node == 'n4')
                  return null
                 if(!executors[node])
                  return null
                  let op = that.users.find(v=>v.id == param.row.ops[node])
                 let score = []
                  let nodeDom = h('div',{style:`width:80px;min-width:80px;height:20px;color:#fff;background:${op?'#333':'#dfdfdf'};text-overflow:eclipse;`},op?op.name:nodesName[j])
               
                  let sheet = sheets[j]
                  var sheetKey = (j>1 && j<5)?(sheet.key+(j-1)):sheet.key
                    
                  if(Array.isArray(param.row[sheetKey]) && op){
                    let rawscore = param.row[sheetKey]

                    
                    score = new Array(sheet.questions.length)
                    for(let n=0;n<score.length;n++)
                      score[n] = rawscore[n] || null
                      
                    return h('div',{class:'cell-row'},[score.map((v,vi)=>{
                     
                        return (typeof v != 'number'?'无':sheet.questions[vi].options[v || 0])
                      

                    }).map((s,si)=>{
                  return h('div',{
                    style:`width:80px;min-width:80px;height:20px;color:#fff;background:${s=='无'?'#dfdfdf':'#5a6'};filter:hue-rotate(${score[si]?score[si]*(300/sheet.questions[si].options.length):0}deg);`
                    },s)
                    })
                    ])
                  
                  
                }
                for(let n=0;n<8;n++)
                    score[n] = score[n] || null
                return h('div',{class:'cell-row'},[score.map((v,vi)=>{
                
                    return (v===null || v===undefined?'无':options[v])
                  

                }).map((s,si)=>{
                  return h('div',{
                    style:`width:80px;min-width:80px;height:20px;color:#fff;background:${s=='无'?'#ddd':'darkgreen'};`
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
            width:450,
             renderHeader(h,param){
              
              let titles = ['评级','推荐','评语']
              let  colDoms = [0,1,2].map((v,i)=>h('div',{
                    style:`width:60px;min-width:60px;height:20px;color:#333;`
                    },[titles[i]]))
              return  h('div',{class:'cell-row'},[...colDoms])
            },
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

                if(!that.showFirst && node == 'n2')
                  return null
                else if(!that.showFirstExtra && node.includes('n3'))
                  return null
                else if(!that.showSecond && node == 'n4')
                  return null

                let scores = []
                if(!executors[node])
                  return null
                  let nodeDom = h('div',{style:'width:60px;min-width:60px;height:20px;color:#fff;background:#888;'},nodesName[j])
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
                            return h('div',{style:`width:60px;min-width:60px;height:20px;color:#fff;background:${s=='无'?'#ddd':that.mapColor(s[0])}`},s)
                          }else{
                            return h('Tooltip',{props:{maxWidth:400,content:s,transfer:true}},[h('div',{style:`max-width:200px;text-overflow:ellipsis;overflow:hidden;height:20px;ecllipse;text-align:left;padding:0 5px;white-space:nowrap;line-height:25px;`},s)])
                          }
                        
                      })])
              }).filter(s=>s)

              return h('div',{class:'cell-row-wrapper',style:{alignItems:"flex-start"}},that.showSelf?[h('div',{class:'cell-row'},''),lineDoms]:[lineDoms])
            
            }
          },
           
          {
            title:"创建时间",
           type:'time',
           cat:'flow',
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
          if(!this.showDetail && v.cat == 'detail')
            return false

          if(this.fdep.length == 1 && v.key == 'dep')
            return false
          if(this.fpos.length == 1 && v.key == 'position')
            return false

          if(this.ob && v.op)
            return false

          return true
         
         })
    },
    filteredLocked(){
      return this.filterdData.filter(v=>v.locked)
    },
    filteredUnlocked(){
      return this.filterdData.filter(v=>!v.locked)
    },
    canSubmitScore(){
      return Object.keys(this.model).length
    },
    ob(){
      return this.session.id == "ed49e6a9-3b83-11eb-8e1e-c15d5c7db744"
    }
  },
  mounted(){
    this.getData()
  },
  data(){
    return {
      current_page:0,
      showCommitEditor:false,
      showSelf:true,
      showScore:false,
      showFirst:true,
      showDetail:true,
      showFirstExtra:true,
      showSecond:true,
      current_page_size:25,
      fpos:[],
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
      fdep:[],
      eQVSheet:{},
      eQNSheet:{},
      editingUser:null,
      model:{},
      show:true,
      readed:{},
      loadingSaveScore:false,
      eQADownSheets:{},
      nodeNames:{
        n1:"自",n2:"一",n31:"平",n32:"平",n33:"平"
      },
      cached:{}
    }
  },
  methods:{
    showReport(u){
      this.showPreview=true;
      this.current=u
      this.getReport()
    },
    ConfirmChange(u){
    if(!u || !u.id || this.loadingSaveScore)
        return
    if( u.id == this.editingUser)
     return

    if(this.editingUser)
      this.$set(this,'cached',Object.assign({},this.cached,{[this.editingUser]:{...this.model}}))
     this.$set(this,'model',this.cached[u.id] || {})
     this.editingUser = u.id
     
      this.$forceUpdate()
    },
    lock(u){
       if(this.canSubmitScore){
        this.Confirm('您的评分还未保存,是否继续?',()=>{
          this.model = {}
          this.editingUser = undefined
        })
      }else{
         this.model = {}
          this.editingUser = undefined
      }

      this.$set(u,'locked',!u.locked)
    },
    saveScore(u){
      if(!u || !u.id)
        return
      let index = this.items.findIndex(v=>v.id == u.id)
    
     
      
      //validation
      if(!this.model || Object.keys(this.model).length == 0){
        this.Error("请修改后再提交上传")
        return
      }

       this.loadingSaveScore = true
      this.ENT.SAVE_SCORE(this.model,{param:{id:u.id}}).then(res=>{
        this.Success("保存成功")
        this.items.splice(index,1,Object.assign(this.items[index],this.model))
             //patch e4 store submit
             //patch e4 store rewrite
           
        this.cancelScore()
       
      }).finally(e=>{
         this.loadingSaveScore = false
      })
    },
    cancelScore(u){
      this.editingUser=undefined
      delete this.cached[u]
      this.$set(this,'model',{})
    },
    getRowClassName(row,index){
      if(row.readed)
        return 'hs-row-readed'
      else
        return 'hs-row'
    },
    saveReadState(id,state){
      this.readed[id] = state
      this.items.find(v=>v.id == id).readed = state
     localStorage.setItem('appraisal_state',JSON.stringify(this.readed))
    },
    CalcScore(sheet,value = []){
      const values = [10,9.5,9,8.5,8,7.5,7,6.5,6,5.5,5]
      if(sheet && sheet.heavy){
      let s = 0
      
      if(value[0] == 1)
        s = -50
      sheet.heavy.forEach((v,i)=>{
        s += (values[value[i+1]] || 0) * v / 10
        console.log('s=',s)
      })
      return s
      }
    },
    EditQA(u,key,index,value){
       if(!this.model[key])
       {
         if(u[key])
            this.model[key] = [...u[key]]
         else
          this.model[key] = []
       }
      this.model[key][index] = value
      this.$set(this,'model',Object.assign({},this.model))
    },
    EditQN(u,key,index,value){
    if(!this.model[key])
       {
         if(u[key])
            this.model[key] = [...u[key]]
         else
          this.model[key] = []
       }
       this.model[key][index] = value
      this.$set(this,'model',Object.assign({},this.model))
    },
    createEditCommit(u){
      this.showCommitEditor = true
      this.model.Commit_n4 = u.Commit_n4 || ""
      this.$nextTick(e=>{
        this.$refs.comment.focus()
      })
      
    },
    CompareChange(model,u = {},key,index){
      if(model)
        return model[key] && (!u[key] || model[key][index] !== u[key][index])
    },
    renderEdit(){
      this.$nextTick(e=>{
        if(this.editDeps && this.editDeps.length > 0)
        {
      
          if(this.fdep.length != 1)
            this.fdep = [this.editDeps[0]] || []
          
          if(this.fpos.length != 1){
            for(let i=0;i<this.positions.length;i++){
              if(!this.pos_count[i]){
                continue
              }

              this.fpos= [i] || []
              break  
            }
            
          }
          this.eQADownSheets = {
             n1:getEVSheet(this.fpos[0],'n1'),
             n2:getEVSheet(this.fpos[0],'n2'),
             n31:getEVSheet(this.fpos[0],'n3'),
             n32:getEVSheet(this.fpos[0],'n3'),
             n33:getEVSheet(this.fpos[0],'n3')
          }
          this.eQASheet = getEVSheet(this.fpos[0],'n4')
          this.eQNSheet = getQASheet(this.fdep[0],this.fpos[0])
          this.model = {}
        }
      })
      
    },
    mapColor(ch){
      return this.hs.mapColor(ch)
    },
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
    Switch(func){
      this.show = false
      setTimeout(()=>{
        this.show = true
      },1000)
      if(typeof func == 'function')
        this.func()
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
    ExportXLSX(){
      const filename = '2020年终考核分类汇总表.xlsx';
      
      const workbook = XLSX.utils.book_new()
      this.deps_count.forEach((v,i)=>{
        let dep_name = this.deps[i]
        if(v > 0){
          let depusers = this.items.filter(v=>v.dep == i)
          let title = ['序号','姓名','职务','所在项目','职称','岗位证书','学历','入职时间']
          this.positions.forEach((p,pi)=>{
            let pos_name = this.positions[pi]
            let users = depusers.filter(v=>v.position == pi)
            if(users.length <= 0)
              return
            let scoreTitle = ['职业道德',...getQASheet(i,pi).cats,"总分"]
            let qaTitle = getEVSheet(p,'n4').questions.map(v=>v.title)
            let cmtTitle = ['评级','推荐','评语']
            let SheetTitle = [...title,...scoreTitle,...qaTitle,...cmtTitle]
            let data = users.map((v,i)=>[i+1,v.name,this.positions[v.position],v.project,v.rank,v.cerificate,v.education,moment(v.hire_date).format('YYYY-MM'),...v.scoresDesc,v.totalScore,...v.evDesc,v.CommitLevel_n4,v.CommitPride_n4,v.Commit_n4])
            console.log(dep_name,pos_name,data)
            let Caption = [`2020年终考核汇总表(${dep_name+'-'+pos_name})`]
            let worksheet = XLSX.utils.aoa_to_sheet([Caption,SheetTitle,...data])
            pos_name = pos_name.replace('/','-')
            console.log(worksheet)
            worksheet["!merges"]=[{s:{
              c:0,r:0
            },e:{
              c:28,r:0
            }}]
            worksheet["A1"].s = {
              font:{sz:24,bold:true},
              alignment:{horizontal:"center",vertical:"center",wrap_text:true}

            }
             let borderStyle = {
                top: {
                    style: "thin",
                    color: { rgb: "000000" }
                },
                bottom: {
                    style: "thin",
                    color: { rgb: "000000" }
                },
                left: {
                    style: "thin",
                    color: { rgb: "000000" }
                },
                right: {
                    style: "thin",
                    color: { rgb: "000000" }
                }
            };
            const cols = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC']
            for(let i=0;i<28;i++){
              worksheet[cols[i]+2].s = {
                fill: {
                                fgColor: {
                                    rgb: "eeeeee"
                                }
                            },
                font: {
                  name: '宋体',
                  sz: 14,
                  color: {rgb: "#FFFF0000"},
                  bold: true,
                  italic: false,
                  underline: false
                },
                alignment: {
                  horizontal: "center" ,
                  vertical: "center"
                },
                 border: borderStyle
              }
            }

            XLSX.utils.book_append_sheet(workbook, worksheet, dep_name+'-'+pos_name);
          })
         
        }
      })
     

     const wbout = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
      const blob = new Blob([wbout], {type: 'application/octet-stream'});
      // save file
      let link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      setTimeout(function() {
          // 延时释放掉obj
          URL.revokeObjectURL(link.href);
          link.remove();
      }, 500);
    },
    ExportCSV(){
      let users = this.users.map(v=>({...v}))
      users.forEach(v=>{
        let record = this.items.find(r=>r.name == v.name)
        if(record){
          Object.assign(v,record)
        }
      })

      this.$refs.table.exportCsv({
        filename:'2020年终考核汇总',
        original:false,
        columns:[{
          key:'name',
          title:"姓名"
        },{
          key:'depName',
          title:"部门"
        },{
          key:"posName",
          title:"职务"
        },{
          key:'opn1',
          title:'自评'
        },{
          key:'opn2',
          title:"第一"
        },{
          key:"opn31",
          title:"平行"
        },{
          key:"opn32",
          title:"平行"
        },{
          key:"opn33",
          title:"平行"
        },{
          key:"opn4",
          title:"第二"
        }],
        data:users
      })
    },
    getData(){
      this.loading = true
      let readed = localStorage.getItem('appraisal_state')
      try{
      readed = JSON.parse(readed) || {}
      }catch(e){
        readed = {}
      }
      this.readed = readed
      this.ENT.LIST_CHECKREPORTS({timeout:10000}).then(res=>{
        let items = res.data.data
        items.forEach(v=>{
          v.ops = {}
          v.opusers = {}
          v.depName = ['行政综合','房建监理','市政监理','建设管理','装修管理', '造价咨询', 'BIM咨询'][v.dep]
          v.posName = ['经理/总监(含副)', '经理助理/总代', '工程师级','助理级/员级'][v.position]
         
          if(v.historyNodes){
             v.historyNodes.forEach(n=>{
               console.log(n.key,v.executors.n3)
               if(n.key == 'n3' && v.executors && Array.isArray(v.executors.n3)){
                 let index = v.executors.n3.findIndex(v=>v == n.op)
                 console.log("n3:",index)
                 if(index != -1){
                   
                  if(!n.op)
                    return
                  v.ops[n.key+(index+1)] = n.op
                  let exec = this.users.find(u=>u.id == n.op)
                  if(exec){
                    v.opusers[n.key+(index+1)] =exec
                    v['op'+n.key+(index+1)] =  exec.name
                  }else{
                    console.log('notfound:',n.op)
                  }
                 }
               }else{ 
                 v.ops[n.key] = n.op
                 v.opusers[n.key] = this.users.find(u=>u.id == n.op)
                 if(v.opusers[n.key])
                    v['op'+n.key] =  v.opusers[n.key] .name
                
               }




                if(n.key == 'n4'){

                }
              v.readed = readed[v.id]
              let qasheet = getQASheet(v.dep,v.position)
              v.scores = v[qasheet.key+'n4'] || new Array(9)
              v.totalScore = this.CalcScore(qasheet,v.scores) || '-'
              const scores = [10,9.5,9,8.5,8,7.5,7,6.5,6,5.5,5]
              v.scoresDesc = v.scores.map(v=>typeof v=='number'?scores[v]:'-')
              v.scoresDesc[0] = v.scoresDesc == 9.5?'不合格':'合格'
               if(v.mem_self || v.mgr_self){
                  v.QN2 = v.mem_self || v.mgr_self || []
                  v.TN2 = v.position != 0 ? QN0 : QN1
                  v.QN31 = v.mgr2mem31
                  v.QN32 = v.mgr2mem32
                  v.QN33 = v.mgr2mem33
                  v.TN31 = v.TN32 = v.TN33 = QN2

               
                  v.TN4 = v.position != 0 ? QN3: QN4
               }
               v.QN4 = new Array(8)
               if(v.dep2mgr || v.dep2mem)
                Object.assign(v.QN4,v.dep2mgr || v.dep2mem) 
               let evsheet = getEVSheet(v,'n4')
               v.evDesc = v.QN4.map((q,i)=>typeof q=='number'?evsheet.questions[i].options[q]:'-')
              
               if(n.mem_self)
                this.table = QN1
          })
          }
          console.log(v.opusers)
          v.opn1 = "已录"

         
        })
        items = items.sort((a,b)=>{moment(a.created_at).isBefore(moment(b.created_at)?1:-1)})
        this.items = items
        if(this.ob){
          this.showFirst=this.showFirstExtra=this.showSecond=false;
          this.showSelf = true
        }
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

.filter-label{
  margin:0 5px;
  margin-left:13px;
}

.score-item{
  >*{
    margin-right:5px;
  }
  
  cursor: pointer;
}

.score-item-user:hover{
  filter:brightness(1.1);
}

.l-field{
  text-align:center;background:#fff;line-height:24px;
  border:1px solid #ccc;
  text-overflow: ellipsis;
  overflow: hidden;
  height:24px;
  white-space: nowrap;
}

.l-field-select{
  border:1px solid #aaa;
  padding:0 5px;
}

.score-item-focus{
  filter:brightness(1);
}


.score-item-editing{
 
  filter:brightness(1);
  .l-field-select{
    background:#ffd;
    box-shadow:1px 1px 1px 0px #aaa;
    cursor:pointer;
  }
  .l-field-changed{
    background:#fdd;
  }
 
}

.l-field-changed{
    background:#fdd;
  }


</style>