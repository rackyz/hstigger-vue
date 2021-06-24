<style lang="less">

.statistic{
    .filter-box{
        position: absolute;
        top:10px;
        bottom:10px;
        left:10px;
        right:10px;
        font-size:15px;
        .filter-line{
            display:flex;
            padding:3px;

            .label {
                color: #aaa;
                margin-right:10px;
                white-space: nowrap;
            }

            .option-list{
                display: flex;
                flex-wrap: wrap;

            }
            .option {
                color:#888;
                cursor:pointer;
                margin-left:10px;
                
            }

            .option:hover{
                filter:brightness(1.2);
            }

            .option-active{
                color:rgb(34, 143, 239);
            }
        }
        
    }
    .table-wrap{
        position: relative;
    }
}

.project-tools{
    >*{
        margin-right:10px;
    }
    .ivu-btn,.ivu-input{
        border-radius: 0;
        background:none;
        border-color:#777;
        color:#777;
        outline:none;
        box-shadow: none;
    }

    .ivu-btn:hover{
        filter:brightness(1.2);
    }
}
</style>
<template>
  <div class="container-page statistic" style="padding:5px;height:100%;overflow:hidden;background:#346;">
      <div class="filter-box" style="margin-bottom:20px;position:relative;">
        
        <div class='flex-wrap project-tools' style="margin-bottom:10px;">
            <Input search v-model="searchText" style="width:300px;" placeholder="项目编号/项目名称" clearable  />
            <Button  style="background:#fff" @click="getData()" :loading="loading">
                <Icon type="ios-refresh" v-if="!loading" size="16" style="margin-right:5px" />刷新
            </Button>
            <Dropdown placement="bottom-start">
            <Button :style="hasFilter(filter)?'background:yellowgreen;color:#fff;':'background:#fff;'">
                <Icon type="ios-funnel" size="16" style="margin-right:5px"  /> 筛选
            </Button>
            <DropdownMenu slot="list" style="padding:10px;">
                <template v-for="f in filters">
              <div :key='f.key' class="filter-line">
                    <div class='label'>
                      {{f.label}}
                    </div>
                    <div class="option-list">
                        
                             <div :key="o" class="option" @click="onSelectFilter(f.key,f.options)">
                               全选
                            </div>
                            <div :key="o" class="option" :class="!filter[f.key] || filter[f.key].length == 0?'option-active':''" @click="onSelectFilter(f.key)">
                               取消
                            </div>
                        <template v-for="(o,i) in f.options">
                            <div :key="o" class="option" :class="filter[f.key] && filter[f.key].includes(i)?'option-active':''" @click="onSelectFilter(f.key,i)">
                                {{o}}
                            </div>
                        </template>
                    </div>
              </div>
          </template>
            </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start">
            <Button style="background:#fff">
                <Icon type="ios-color-wand" size="16" style="margin-right:5px"  />列选择 <Icon type="ios-arrow-down" size="16" /> 
            </Button>
            <DropdownMenu slot="list" style="padding:10px;">
                
                <template v-for="f in columnSelector">
              <div :key='f.key' class="filter-line">
                    <div class='label'>
                      {{f.label}}
                    </div>
                    <div class="option-list">
                        <template v-for="o in f.options">
                            <div :key="o" class="option" :class="selectedColumns.includes(o.key)?'option-active':''" @click="onSelectColumn(o.key)">
                                {{o.label}}
                            </div>
                        </template>
                    </div>
              </div>
          </template>
            </DropdownMenu>
            </Dropdown>
            <Button  style="background:#fff" @click="exportCSV">
                <Icon type="ios-document" size="16" style="margin-right:5px" />导出Excel
            </Button>
        </div>
        <div class="user-templates">
            <div class="filter-line">
                    <div class='label'>
                      预设模板
                    </div>
                    <div class="option-list">
                        <template v-for="o in columnTemplates">
                             <Button :type="(o.type || 'primary')"
                             :class="selectedTemplate==o?'option-selected':''"
                              size="small" :key="o" style="margin-left:5px" @click="onSelectColumnTemplate(o)">
                                {{o.label}}
                            </Button>
                        </template>
                    </div>
                </div>
             <div class="filter-line">
                    <div class='label'>
                      自定模板
                    </div>
                    <div class="option-list">
                        
                         <template v-for="o in myTemplates">
                             <Button :type="deletingTemplate?'':(o.type || 'primary')"
                             :class="selectedTemplate==o?'option-selected':'' +' '+ deletingTemplate?'option-deleting':''"
                              size="small" :key="o.id" style="margin-left:5px;margin-bottom:5px;" @click="deletingTemplate?onDeleteColumnTempalte(o.id)
                              :onSelectTemplate(o)"
                              
                              :icon="deletingTemplate?'md-close':''" >
                                {{o.name}} 
                            </Button>
                        </template>
                        
                          <Button 
                            
                              size="small" :key="o" style="margin-left:5px" 
                              icon="md-add" @click="onSaveUserTemplate">
                                保存为模板...
                            </Button>
                            <Button type="error"
                            
                              size="small" :key="o" style="margin-left:5px" 
                              icon="md-create" @click="deletingTemplate=!deletingTemplate">
                                {{deletingTemplate?'保存':'编辑'}}
                            </Button>
                    </div>
            </div>
        </div>
        </div>
          <div class="table-wrap" style="height:calc(100% - 100px);padding-bottom:10px;margin:10px;position:relative;background:#346;color:#fff;	overflow: hidden;">
          <gzTable ref="table" :columns="columns" :data="FilterData(contracts)" :option="options" :pageSize="100" :onEvent="onEvent" style="color:#333;" />
          </div></div>
    </div>
</template>

<script>
import util from '@/plugins/old/util.js'
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
            filter:{},
            selectedColumns:[],
            groups:[],
            selectedTemplate:null,
            columns:[],
            searchText:"",
            deletingTemplate:false,
            filtered:[],
            options:{
                summary:true
            }
        }
    },
    watch:{
        selectedColumns:{
            handler(val){
                  var that = this
            const defaultColumns =  [{
                type:'index',
                key:"index",
                width:'40',
                title:"序号",
                 c:"basic",
                align:"center"
            },{
                type:"text",
                key:"code",
                width:"80",
                title:"编号",
                 c:"basic",
                align:"center"
            },{
                type:"link",
                title:"名称",
                key:"name",
                linkTo:"projects",
                 c:"basic",
                event:"open",
                width:250
            },{type:"state",
            title:"所属部门",
            key:"depmapped",
            width:100,
            c:"basic",
            option:{
                states:['项目管理','造价咨询','BIM咨询','装修工程','市政监理','房建监理','对外合作','其他']
            }},{
                type:"text",
                title:"负责人",
                width:100,
                 c:"basic",
                key:"charger",
                option:{
                    editable:true,
                align:"center"
                }
            },{
                type:"ding",
                title:"钉钉",
                width:80,
                 c:"basic",
                key:"ding_id",
                option:{
                    editable:true,
                align:"center"
                }
            },{
                type:"sms",
                title:"短信",
                width:80,
                 c:"basic",
                key:"ding_id",
                option:{
                    options:[{
                        name:"收款计划提醒",
                        event:"smsplan",
                        enable_key:'nextPayDetail'
                    },{
                        name:"未到账金额提醒",
                        event:"smsbill",
                        enable_key:'hasBill'
                    }],
                    editable:true,
                align:"center"
                }
            },{
                type:'time',
                title:"上次提醒",
                width:120,
                c:"basic",
                key:'ding_time'
                },{type:"state",
            title:"管理类型",
            key:"manageType",
            width:100,
             c:"basic",
            option:{
                states:['未设置','全过程咨询', '房建监理', 'BIM咨询', '造价咨询', '招标代理', '项目管理', '市政监理', '其他服务']
            }},{type:"state",
            title:"履约状态",
            key:"state",
            width:80,
             c:"basic",
            option:{
                editable:true,
                states:["前期","在建","竣工","结束","中止","待定"]
            }},{type:"time",
            key:"effectiveDate",
             c:"basic",
            title:"中标日期",option:{
                type:"date"
            }},{
                type:"time",
                key:"registerDate",
                 c:"basic",
                title:"签约日期",
                option:{
                    type:"date"
                }
            },{
                type:'number',
                key:"amount",
                 c:"basic",
                title:"合约金额",
                option:{
                    
                    type:'fullAmount',
                    sumable:true,
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v)
                }
            },{
                type:"text",
                title:"业主单位",
                 c:"basic",
                key:"partA"
                
            },{
                type:'number',
                key:"amount_adjust",
                 c:"basic",
                title:"调整金额",
                option:{
                    
                    type:'fullAmount',
                    sumable:true,
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v),
                     hideZero:true
                }
            },{
                type:'number',
                key:"amount_adjusted",
                 c:"basic",
                title:"合约金额(调整后)",
                option:{
                    
                    type:'fullAmount',
                    sumable:true,
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v)
                }
            },
            {
                type:"time",
                title:"开始时间",
                 c:"project",
                key:"startTime",
                option:{
                    type:"date"
                }
            },
            {
                type:"time",
                title:"竣工时间",
                 c:"project",
                key:"completeTime",
                option:{
                    type:"date"
                }
            },
             {
                   type:"text",
                key:"buildingCategory",
                c:"project",
                title:"建筑类型",
                option:{
                    
                    hideZero:true
                }
            },
            {
                type:"text",
                key:"buildingAddress",
                 c:"project",
                title:"建筑地点",
                option:{
                    
                    hideZero:true
                }
            },
            {
                type:"number",
                key:"buildingArea",
                 c:"project",
                title:"建筑面积",
                option:{
                    formatter:(v)=>util.formatSalary(v)+" 平米",
                    hideZero:true
                }
            },
            {
                 type:"number",
                key:"buildingHeight",
                 c:"project",
                title:"建筑高度",
                option:{
                    formatter:(v)=>v+" m",
                    hideZero:true
                }
            },
            {
                   type:"number",
                key:"basementLevels",
                 c:"project",
                title:"地下室层数",
                option:{
                    formatter:(v)=>v+" 层",
                    hideZero:true
                }
            },
             {
                   type:"number",
                key:"buildingCount",
                 c:"project",
                title:"单体数量",
                option:{
                    formatter:(v)=>v+" 幢",
                    hideZero:true
                }
            },
            
            {
                type:'number',
                key:'billedAmount',
                title:'已开票',
                  c:"bill",
                option:{
                    
                    type:'fullAmount',
                    sumable:true,
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v),
                    hideZero:true
                }
            },{
                type:"number",
                key:"billedPercent",
                title:"已开票比例",
                width:120,
                 c:"bill",
                option:{
                    type:"percent"
                }
            },{
                type:"number",
                key:"remainedAmount",
                title:"未开票",
                 c:"bill",
                option:{
                    type:'fullAmount',
                   
                    sumable:true,
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v),
                    hideZero:true
                }
            },{
                type:"number",
                key:"transferredAmount",
                title:"已到账",
                 c:"bill",
                option:{
                    type:'fullAmount',
                    sumable:true,
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v),
                    hideZero:true
                }
            },{
                type:"number",
                key:"transPercent",
                title:"已到账比例",
                width:120,
                 c:"bill",
                option:{
                    type:"percent"
                }
            },{
                type:"number",
                key:"unTransferredAmount",
                title:"未到账",
                 c:"bill",
                option:{
                    type:'fullAmount',
                    
                    sumable:true,
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v),
                    hideZero:true
                }
            },{
                type:"number",
                key:"thisYearPlanPayed",
                title:"今年计划收款",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"thisYearBilled",
                title:"今年已开票",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"thisYearBilledPercent",
                title:"年度开票完成比例",
                width:120,
                 c:"bill",
                option:{
                    type:"percent"
                }
            },{
                type:"number",
                key:"thisYearLatest",
                title:"今年尚可收款",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"thisYearTransferred",
                title:"今年已到账",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"thisYearUnTransferred",
                title:"今年未到账",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"text",
                key:"NextYearPayPlansDetail",
                title:"下一年年计划收款",
                width:200,
                 c:"bill"
            },{
                type:"text",
                key:"NextYearPayPlanNodes",
                title:"下一年年计划收款节点",
                width:200,
                 c:"bill"
            },{
                type:"number",
                key:"yearsPlaned1",
                title:"2021年计划收款",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"yearsPlaned2",
                title:"2022年计划收款",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"yearsPlaned3",
                title:"2023年计划收款",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"yearsPlaned4",
                title:"2024年计划收款",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"yearsPlaned5",
                title:"2025年计划收款",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                 type:"text",
                key:"lastBillDetail",
                title:"上一笔开票",
                 c:"bill",
                width:200,
                option:{
                    
                     hideZero:true
                }
            },{
                 type:"text",
                key:"lastBillNodeDetail",
                title:"上一笔节点",
                width:200,
                 c:"bill"
            },{
                 type:"number",
                key:"lastBillAmount",
                title:"金额(上一笔)",
                 c:"bill",
                
                option:{
                    type:'fullAmount',
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v),
                     hideZero:true
                }
            },{
                 type:"time",
                key:"lastBillDate",
                title:"日期(上一笔)",
                 c:"bill",
                
                option:{
                    type:'date',
                     hideZero:true
                }
            },{
                 type:"number",
                key:"lastBillTransferred",
                title:"已到账(上一笔)",
                 c:"bill",
                
                option:{
                     hideZero:true
                }
            },{
                 type:"number",
                key:"lastBillPercent",
                title:"到账比例(上一笔)",
                 c:"bill",
                
                option:{
                    type:'percent',
                     hideZero:true
                }
            },{
                type:"text",
                key:"nextPayDetail",
                width:200,
                 c:"bill",
                title:"下一笔开票"
            },{
                 type:"number",
                key:"nextPayAmount",
                 c:"bill",
                title:"金额(下一笔)",
                
                option:{
                    type:'fullAmount',
                    formatter:(v)=>'¥ '+util.formatSalarySemicolon(v),
                     hideZero:true
                }
            },{
                 type:"time",
                key:"nextPayDate",
                title:"日期(下一笔)",
                 c:"bill",
                
                option:{
                    type:'date',
                     hideZero:true
                }
            },{
                type:"number",
                key:"seasons0",
                 c:"bill",
                title:"本年1季度",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                 key:"seasons1",
                  c:"bill",
                title:"本年2季度",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                key:"seasons2",
                 c:"bill",
                title:"本年3季度",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
               key:"seasons3",
                title:"本年4季度",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },
            {
                type:"number",
                key:"month0",
                 c:"bill",
                title:"本年1月",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
               key:"month1",
                c:"bill",
                title:"本年2月",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                 c:"bill",
            key:"month2",
                title:"本年3月",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
            key:"month3",
                title:"本年4月",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
            key:"month4",
                title:"本年5月",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
            key:"month5",
                title:"本年6月",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
            key:"month6",
             c:"bill",
                title:"本年7月",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
                 c:"bill",
            key:"month7",
                title:"本年8月",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
            key:"month8",
             c:"bill",
                title:"本年9月",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
            key:"month9",
             c:"bill",
                title:"本年10月",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
            key:"month10",
                title:"本年11月",
                 c:"bill",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },{
                type:"number",
            key:"month11",
             c:"bill",
                title:"本年12月",
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },
             { 
                type:"number",
                c:"bill",
                key:"fromStartYearBill",
                title:'9月31前开票',
                option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },
            {
              type:"number",
              c:"bill",
              key:"toEndYearBill",
              title:'12月31日前可开票',
               option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },
           
            {
               type:"number",
              c:"bill",
              key:"toNewYearBill",
              title:'元旦-春节可开票',
               option:{
                    type:"fullAmount",
                    sumable:true,
                    formatter:v=>util.formatSalary(v),
                    hizeZero:true
                }
            },
            {
                  type:"list",
                title:"项目管理",
                 c:"humans",
                key:"employeesA",
                option:{
                    colors:['red'],
                    type:'employee',
                     hideZero:true
                }
            },{
                   type:"list",
                title:"监理岗位",
                key:"employeesB",
                 c:"humans",
                option:{
                     colors:['red'],
                    type:'employee',
                     hideZero:true
                }
            },{
                   type:"list",
                title:"其他岗位",
                key:"employeesC",
                 c:"humans",
                option:{
                     colors:['red'],
                    type:'employee',
                     hideZero:true
                }
            },{
                type:"time",
                title:"服务开始时间",
                key:"proStartDate",
                 c:"progress",
                option:{
                    type:'date'
                }
            },{
                type:"time",
                title:"竣工时间",
                key:"proFinishedDate",
                  c:"progress",
                option:{
                    type:'date',
                    editable:true
                }
            },{
                type:"number",
                title:"已完成进度",
                  c:"progress",
                key:"percent",
                width:100,
                option:{
                    type:'percent',
                    align:'center'
                }
            },{
                  type:"text",
                title:"当前进度节点",
                  c:"progress",
                width:150,
                key:"currentNodeDetail",
            },
            {
                type:'text',
                title:"进度描述",
                  c:"progress",
                width:200,
                key:"progressDetail",
                option:{
                    editable:true,
                    options:['方案扩初','施工图','桩基','地下室','主体','二次结构','精装修','幕墙','室外附属','竣工验收','审计','10%','30%','50%','70%','90%','100%']
                }
            },

            {
                type:"number",
                title:"计划总工期(月)",
                  c:"progress",
                key:"rplan_duration",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 月',
                     hideZero:true
                }
            },{
                type:"number",
                title:"计划工作量(总)",
                  c:"progress",
                key:"planWorkLoad",
                width:100,
                option:{
                    type:'percent',
                    align:'center'
                }
            },{
                type:"number",
                title:"已完成工作量(总)",
                  c:"progress",
                key:"actualWorkLoad",
                width:100,
                option:{
                    type:'percent',
                    align:'center'
                }
            },{
                type:"number",
                title:"当年完成工作量",
                  c:"progress",
                key:"thisYearWorkLoad",
                width:100,
                option:{
                    type:'percent',
                    align:'center'
                }
            },{
                type:"number",
                title:"当年计划工作量",
                  c:"progress",
                key:"thisYearPlanedWorkLoad",
                width:100,
                option:{
                    type:'percent',
                    align:'center'
                }
            },{
                type:"number",
                title:"已完成产值",
                  c:"progress",
                key:"Production",
                width:100,
                option:{
                    type:'amount',formatter:v=>util.formatSalary(v),
                    sumable:true
                }
            },{
                type:"number",
                title:"当年完成产值",
                  c:"progress",
                key:"ThisYearProduction",
                width:100,
                option:{
                    type:'amount',formatter:v=>util.formatSalary(v),
                    sumable:true
                }
            },{
                type:"number",
                title:"当年计划产值",
                  c:"progress",
                key:"ThisYearPlanProduction",
                width:100,
                option:{
                    type:'amount',formatter:v=>util.formatSalary(v),
                    sumable:true
                }
            },{
                  type:"text",
                  c:"hr",
                title:"是否启用计划模块",
                key:"signPlanText",
                width:200
            },{
                  type:"number",
                  c:"hr",
                title:"总体计划人力",
                key:"rplan_human",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 人月',
                     hideZero:true
                }
            },{
                  type:"number",
                  c:"hr",
                title:"签约计划人力投入",
                key:"TotalPlanHR",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 人月',
                     hideZero:true
                }
            },{
                  type:"number",
                title:"当前计划人力",
                key:"plan_human_complete",
                  c:"hr",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 人月',
                     hideZero:true
                }
            },{
                  type:"number",
                title:"签约当前人力",
                key:"PlanHR",
                  c:"hr",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 人月',
                     hideZero:true
                }
            },{
                   type:"number",
                     c:"hr",
                title:"签约投入占比",
                key:"PlanHRPercent",
                option:{
                     type:'percent',
                     hideZero:true
                }
            },{
                type:"number",
                title:"计划人均产值",
                key:"rplan_production",
                  c:"hr",
                 
                option:{
                    type:'amount',
                    formatter:(v)=>'¥ '+util.formatSalary(v),
                     hideZero:true
                }
            },{
                   type:"number",
                     c:"hr",
                title:"调整当前人力",
                key:"TotalActualPlanHR",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 人月',
                     hideZero:true
                }
            },{
                type:"number",
                title:"当前实际人力",  c:"hr",
                key:"ActualPlanHR",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 人月',
                     hideZero:true
                }
            },{
                type:"number",
                title:"当前实际人力",  c:"hr",
                key:"ActualHR2",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 人月',
                     hideZero:true
                }
            },{
                   type:"number",
                     c:"hr",
                title:"实际投入占比",
                key:"ActualHRPercent",
                option:{
                     type:'percent',
                     hideZero:true
                }
            },{
                type:"number",
                title:"签约总工期(月)",
                  c:"hr",
                key:'planDuration',
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 月',
                     hideZero:true
                }
            },{
                type:"number",
                title:"计划总工期(月)",
                  c:"hr",
                key:'duration',
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 月',
                     hideZero:true
                }
            },{
                   type:"number",
                     c:"hr",
                title:"总体实际人力",
                key:"actual_human",
                option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 人月',
                     hideZero:true
                }
            },{
              type:'number',
              title:"已完成工期",
              c:"hr",
              key:'current_actual_duration',
              option:{
                     formatter:(v = 0)=>v.toFixed(2) + ' 月',
                     hideZero:true
                }
              },{
                type:"number",
                  c:"hr",
                title:"平均人数",
                key:"AverageHR",
                 
                option:{
                     hideZero:true,
                     formatter:(v=0)=>v.toFixed(2)+" 人"
                }
            },{
                type:"number",
                  c:"hr",
                title:"人均产值",
                key:"HumanProduction",
                 
                option:{
                    type:'amount',
                    formatter:(v = 0)=>'¥ '+util.formatSalary(v),
                     hideZero:true
                }
            },{
                type:"number",
                  c:"hr",
                title:"人均收费",
                key:"HumanBill",
                 
                option:{
                    type:'amount',
                    formatter:(v = 0)=>'¥ '+util.formatSalary(v),
                     hideZero:true
                }
            },
            {
                type:"state",
                title:"标记",
                  c:"system",
                key:"focused",
                width:60,
                option:{
                    editable:true,
                    states:['重点关注','一般关注','正常'].reverse(),
                    colors:['red','orange','green'].reverse(),
                    type:"star"
                }

            },
            {
                type:"text",
                title:"标记原因",
                 c:"system",
                key:"focusReason",
                width:200,
                option:{
                    editable:true
                }
            },
            {
                type:"text",
                title:"创建人",
                key:"inputor",
                width:100,
                 c:"system",
                option:{
                    align:'center'
                }
            },{
                type:"time",
                title:"创建时间",
                 c:"system",
                key:"inputTime",
                option:{
                    type:"date"
                }
            },{
                type:"text",
                 c:"system",
                title:"最后编辑",
                key:"updator",
                width:100,
                option:{
                    align:'center'
                }
            },{
                type:"time",
                title:"编辑时间",
                key:"updateTime",
                 c:"system",
                option:{
                    type:"date"
                }
            },{
                type:"bool",
                title:"收费条款",
                 c:"system",
                key:"payconditionsTextString",
                width:80,
                option:{
                    tooltipTo:"payconditionsText"
                }
            },{
                type:"bool",
                title:"签约计划",
                 c:"system",
                key:"rplan",
                width:80,
                option:{
                    tooltipTo:"rplanText"
                }
            },{
                type:"bool",
                 c:"system",
                title:"收费计划",
                key:"payplansTextString",
                width:80,
                option:{
                    tooltipTo:"payplansText"
                }
            },{
                type:"bool",
                 c:"system",
                title:"逾期未完成收费计划",
                key:"overdatePlansTextString",
                width:120,
                option:{
                    tooltipTo:"overdatePlansText"
                }
            },{
                type:"bool",
                width:80,
                 c:"system",
                title:"人事信息",
                key:"hasHumanPlan"
            },
            {
                type:"tool",
                minWidth:200,
                 c:"system",
                title:"操作工具",
                key:"systemTool",
                 buttons:[{
                        event:'fixAdjust',
                        label:"修正调整金额",
                        CheckDisabled:item=>(Math.abs(item.remainedAmount) < 0.01 )
                    }],
                option:{
                   
                }
            }]

            let cols = []
            const groups = [{key:'basic',label:"合约信息"},{
                key:"project",label:"项目信息"},{key:"bill",label:"开票信息"},{key:"humans",label:"人员信息"},{key:"progress",label:"进度信息"},{key:"hr",label:"人力成本"},{key:"system",label:'系统管理'}]


            defaultColumns.forEach(v=>{
                if(this.selectedColumns.includes(v.key)){
                    cols.push(v)
                }

                let g = groups.find(p=>p.key == v.c)
                if(g){
                    if(g.options){
                        g.options.push({label:v.title,key:v.key})
                    }else{
                        g.options = [{label:v.title,key:v.key}]
                    }
                }
            })

            this.groups = groups
            console.log(groups)
            
            this.columns = cols
            },
            deep:true,
            immediate:true
        }
    },
    methods:{
        onEvent(event,param,key){
            var that = this
            if(event == 'change-state'){
                console.log("change-state")
                this.$store.dispatch('oa/changeState',param).then(res=>{
                    
                    that.$Notice.success({
                        title:"操作完成",
                        desc:"状态修改成功"
                    })
                    that.$forceUpdate()
                }).catch(e=>{
                    console.error(e)
                    that.$Notice.error({
                        title:"修改失败",
                         desc:e
                    })
                })
            }else if(event == "edit-text"){
                console.log("key:",key)
                let inputValue = param[key]
                let keyName = that.columns.find(v=>v.key == key).title
                this.$Modal.confirm({
                    title:keyName+" / "+param.name,
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: inputValue,
                                autofocus: true,
                                placeholder: '编辑文字'
                            },
                            on: {
                                input: (val) => {
                                    inputValue = val;
                                }
                            }
                        })
                    },
                    onOk(){
                        that.$store.dispatch('oa/changeState',{id:param.id,[key]:inputValue}).then(res=>{
                            
                            that.$Notice.success({
                                title:"操作完成",
                                desc:"状态修改成功"
                            })
                            that.$forceUpdate()
                        }).catch(e=>{
                            console.error(e)
                            that.$Notice.error({
                                title:"修改失败",
                                desc:e
                            })
                        })
                    }
                })
            }else if(event == 'edit-bool'){
                that.$store.dispatch('oa/changeState',{id:param.id,[key]:!param[key]}).then(res=>{
                            
                            that.$Notice.success({
                                title:"操作完成",
                                desc:"状态修改成功"
                            })
                            that.$forceUpdate()
                        }).catch(e=>{
                            console.error(e)
                            that.$Notice.error({
                                title:"修改失败",
                                desc:e
                            })
                     })
                
            }else if(event == 'fixAdjust'){
                let amount = util.formatSalarySemicolon(param.remainedAmount)
                this.$Modal.confirm({
                    title:param.name,
                    content:`确定要修正未开票金额 <span style="color:red">¥${amount}</span> 作为调整金额吗?`,
                    onOk(){
                         that.$store.dispatch('oa/changeState',{id:param.id,amount_adjust:param.amount_adjust- param.remainedAmount}).then(res=>{
                            
                            that.$Notice.success({
                                title:"操作完成",
                                desc:"调整金额已修改成功"
                            })
                            that.$forceUpdate()
                        }).catch(e=>{
                            console.error(e)
                            that.$Notice.error({
                                title:"修改失败",
                                desc:e
                            })
                     })
                    }
                })
            }else if(event == 'open'){
                 this.openProject(param.id)
            }else if(event=='ding'){
                let inputValue = param.name + ':'+(param.focuseReason || '请及时关注')
                this.$Modal.confirm({
                    title:'发送钉钉消息',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: inputValue,
                                autofocus: true,
                                placeholder: '发送钉钉消息'
                            },
                            on: {
                                input: (val) => {
                                    inputValue = val;
                                }
                            }
                        })
                    },
                    onOk(){
                        that.$store.dispatch('oa/sendDingMessage',{ding_id:param.ding_id,msg:inputValue}).then(res=>{
                            that.$Notice.success({
                                title:"操作完成",
                                desc:"发送成功"
                            })
                            that.$forceUpdate()
                        }).catch(e=>{
                            console.error(e)
                            that.$Notice.error({
                                title:"发送失败",
                                desc:e
                            })
                        })
                    }
                })
            }else if(event=='smsplan'){
                this.$store.dispatch('oa/sendSMSMessage',param).then(res=>{
                    this.$Notice.success({
                        title:"操作成功",
                        desc:"短信已发送"
                    })
                }).catch(e=>{
                     this.$Modal.error({
                        title:"操作失败",
                        content:"短信发送失败:"+e
                    })
                })
                
                
            }else if(event == 'smsbill'){
               this.$store.dispatch('oa/sendSMSMessage2',param).then(res=>{
                    this.$Notice.success({
                        title:"操作成功",
                        desc:"短信已发送"
                    })
                }).catch(e=>{
                     this.$Modal.error({
                        title:"操作失败",
                        content:"短信发送失败:"+e
                    })
                })
            }
               
        },
         openProject(id) {
       this.RouteTo(`/core/cm/${id}/dashboard`)
    },
        exportCSV(){
            const FixData = v=>{
                let res = {...v}
                this.columns.filter(v=>!v.unexport).forEach(c=>{
                    if(c.type == 'state'){
                        if(c.option && c.option.states){
                            res[c.key] = c.option.states[res[c.key]]
                        }
                    }else if(c.type == 'number' && c.option && c.option.type == 'percent'){
                        res[c.key] = res[c.key]+'%'
                    }else if(c.type =='time'){
                      if(res[c.key] && !res[c.key].includes('1900'))
                        res[c.key] = moment(res[c.key]).format('YYYY/MM/DD')
                      else
                        res[c.key] = ""
                    }
                })

                return res
            }
            this.$refs.table.exportCsv({
                filename: '合约汇总明细表' + this.$moment().format('YYYYMMDD') + '.csv',
                columns:this.columns.filter(v=>!v.unexport),
                data:this.FilterData(this.contracts).map((v,i)=>{
                    v.index = i+1
                    
                    return FixData(v)
                })
            })
        },
        onDeleteColumnTempalte(tid){
            var that = this
            this.$store.dispatch('oa/delTemplate',tid).then(()=>{
                  that.$Notice.success({
                                title:"操作完成",
                                desc:"模板删除成功"
                            })
                            that.$forceUpdate()
                        }).catch(e=>{
                            console.error(e)
                            that.$Notice.error({
                                title:"删除失败",
                                desc:e
                            })
                     })
        },
        onSelectFilter(key,value){
            if(value === undefined){
                delete this.filter[key] 
            
            }else if(typeof value == 'object'){
                this.filter[key] = value.map((v,i)=>i)
            }else if(this.filter[key]){
                let index = this.filter[key].findIndex(v=>v == value)
                if(index != -1)
                    this.filter[key].splice(index,1)
                else
                    this.filter[key].splice(0,0,value)
                if(this.filter[key].length == 0)
                     delete this.filter[key] 
            }else{
                this.filter[key] = [value]
            }
            this.$forceUpdate()
             this.saveState()
             this.selectedTemplate = null
        },
        onSelectColumn(key){
            let index = this.selectedColumns.findIndex(v=>v == key)
            if(index == -1)
                this.selectedColumns.splice(this.selectedColumns.length-1,0,key)
            else
                this.selectedColumns.splice(index,1)
            
             this.saveState()
               this.selectedTemplate = null
        },
        onSaveUserTemplate(){
            var that = this
            let inputValue = "新模板"
            let state = {
                filter:this.filter,
                selectedColumns:this.selectedColumns
            }

             this.$Modal.confirm({
                    title:'新建模板',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: inputValue,
                                autofocus: true,
                                placeholder: '输入模板名称'
                            },
                            on: {
                                input: (val) => {
                                    inputValue = val;
                                }
                            }
                        })
                    },
                    onOk(){
                        that.$store.dispatch('oa/addTemplate',{name:inputValue,data:JSON.stringify(state)}).then(res=>{
                            that.$Notice.success({
                                title:"操作完成",
                                desc:"状态修改成功"
                            })
                            that.$forceUpdate()
                        }).catch(e=>{
                            console.error(e)
                            that.$Notice.error({
                                title:"修改失败",
                                desc:e
                            })
                        })
                    }
                })
        },
        onSelectColumnTemplate(o){
            this.selectedTemplate = o
            if(o.value == "all"){
                let cols = []
                this.columnSelector.forEach(v=>{
                    if(v.options){
                        v.options.forEach(o=>{
                            cols.push(o.key)
                        })
                    }
                })

                this.selectedColumns =  cols
                return   
            }
            this.selectedColumns = o.value

            this.saveState()
           
        },
        saveState(){
            let state = {
                filter:this.filter,
                selectedColumns:this.selectedColumns
            }
             localStorage.setItem("columnstate",JSON.stringify(state))
            
        },
        LoadState(){
            let stateString = localStorage.getItem("columnstate")
            if(stateString){
                try{
                let state = JSON.parse(stateString)
                console.log("STATE:",state)
                this.filter = state.filter
                this.selectedColumns = state.selectedColumns
                 return true
                }catch(e){
                    console.log("NoCached State:",e)
                }
            }

            return false
           
        },
        FilterData(contracts = []){
            
            let items = contracts.filter(item=>{
                  for(let i=0;i<this.filters.length;i++){
                let v = this.filters[i]
                if(v.array == true && this.filter[v.key]){
                    for(let j=0;j<this.filter[v.key].length;j++){
                        let fv = this.filter[v.key][j]
                        if(item[v.key][fv] == 1)
                            return true
                    }
                    return false
                }else if(this.filter[v.key] !==undefined && !this.filter[v.key].includes(item[v.key])){
                    console.log("item:",item.focused)
                    return false
                }
            }
                return true
            })

             if(this.searchText){
                return items.filter(item=>{
                     if(item.name && item.name.includes(this.searchText) || item.code && item.code.includes(this.searchText))
                    return true
                else
                    return false
                 })
                
            }else{
                return items
            }
        },
        getData(){
           this.$store.dispatch('oa/query')
        },
        hasFilter(filter){
            return Object.keys(filter).length
        },
        onSelectTemplate(o){
            this.selectedTemplate = o
            this.filter = o.data.filter
            this.selectedColumns = o.data.selectedColumns
        }
    },
    mounted(){
        
        if(this.LoadState() == false){
            this.onSelectColumnTemplate(this.columnTemplates[3])
        }
        if(this.contract.length == 0)
            this.$store.dispatch('oa/query')
        this.$nextTick(()=>{
          this.$refs.table.calcTableHeight()
        })
    },
    computed:{
        ...mapGetters('oa',['contracts','templates','loading']),
        myTemplates(){
            return this.templates.map(v=>({
                id:v.id,
                name:v.name,
                data:JSON.parse(v.data)
            }))
        },
        columnTemplates(){
            return [{
                label:"全选",
                value:"all",
                type:"warning"
            },{
                label:"全部取消",
                value:["index","code","name"],
                type:"warning"
            },{
                label:"合同信息",
                value:["index","code","name","manageType","registerDate","effectiveDate","depmapped","charger","amount","partA"]
            },{
                label:"项目信息",
                value:["index","code","name","charger","state","startTime","completeTime","currentNodeDetail","buildingCategory","buildingAddress","buildingArea","buildingHeight","basementLevels","buildingCount","employeesA","employeesB","employeesC"]
                },{
                label:"开票信息",
                value:["index","code","name","amount","amount_adjust","amount_adjusted","billedAmount","remainedAmount","transferredAmount","unTransferredAmount","lastBillDetail","thisYearPlanPayed","nextPayDetail","thisYearBilled"]
            },{
                label:"进度及成本",
                value:["index","code","name","proStartDate","proFinishedDate","currentNodeDetail","progressDetail","percent","rplan_duration","rplan_human","plan_human_complete","actual_duration","actual_human","actual_human_complete","rplan_production","actual_human_production"]
            },{
                label:"系统录入情况",
                value:["index","code","name","charger","focused","focusReason","updator","updateTime","payConditionsTextString","payplansTextString","rplan","hasHumanPlan","systemTool"]
            }]
        },
        filters(){
        return [{
            key:"depmapped",
            label:"所属部门",
            options:['项目管理事业部','造价咨询事业部','BIM咨询事业部','装修工程事业部','市政监理事业部','房建监理事业部','对外合作','其他']

        },{
            key:'manageType',
            label:"项目类型",
            options:['无类别','全过程咨询', '房建监理', 'BIM咨询', '造价咨询', '招标代理', '项目管理', '市政监理', '其他服务']
        },{
            key:"state",
            label:"项目状态",
             options:["前期","在建","竣工","结束","中止","待定"]
        },{
            key:"startYear",
            label:"项目年份",
            options:["更早","2012","2013","2014","2015","2016","2017","2018","2019","2020"]
        },{
            key:"finishYear",
            label:"竣工年份",
            options:["更早","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","更晚"]
        },{
            key:"contractScale",
            label:"项目规模",
            options:["10万以下","10万","50万","100万","300万","600万","1000万"]
        },{
            key:"focused",
            label:"关注程度",
            options:["正常","一般关注","重点关注"]
        },
        {
            key:"yearhasplan",
            label:"收费计划",
            options:["2020无计划","2020今年","2021","2022","2023","2024","2025"],
            array:true
        }]
        },
        columnSelector(){
            return this.groups
        }
    }
}
</script>

<style lang="less" scoped>

</style>

