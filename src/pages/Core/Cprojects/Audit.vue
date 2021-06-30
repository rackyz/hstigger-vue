<template>
  <div
    class='full-container'
    style='height:calc(100% - 50px);overflow-y:auto;'
  >
    <Card
      title="项目概况"
      style='margin:10px;'
    >
      <div
        slot='extra'
        class='link-button'
        @click='showBaseEditor=true'
      >
        <Icon type="md-create" /> 录入
      </div>
      <Row :gutter="20">
        <Col :span='6'>
        <div class='seg'><span class='seg-label'>服务开始时间</span><span class='seg-value'>{{project_audit_data.service_started_at?moment(project_audit_data.service_started_at).format('L'):'-'}}</span></div>
        <div class='seg'><span class='seg-label'>服务结束时间</span><span class='seg-value'>{{project_audit_data.service_finished_at?moment(project_audit_data.service_finished_at).format('L'):'-'}}</span></div>
        <div class='seg'><span class='seg-label'>总包开始时间</span><span class='seg-value'>{{project_audit_data.main_contractor_started_at?moment(project_audit_data.main_contractor_started_at).format('L'):'-'}}</span></div>
        <div class='seg'><span class='seg-label'>总包竣工时间</span><span class='seg-value'>{{project_audit_data.main_contractor_finished_at?moment(project_audit_data.main_contractor_finished_at).format('L'):'-'}} </span> </div>
             <div
              class="seg-attach"
             
            >
              竣工验收报告 <Icon
                type='md-attach'
              />
              <span class="seg-download"  v-if="project_audit_data.main_contract_attached"
              @click='Download(project_audit_data.main_contract_attached)'>
              下载
              </span>
              <span v-else class="seg-empty">未上传</span>
            </div>
        </Col>
        <Col :span='6'>
        <div class='seg'><span class='seg-label'>立项总投资</span><span class='seg-value'>{{project_audit_data.create_full_investment_salary?hs.formatSalary(project_audit_data.create_full_investment_salary):'-'}}</span></div>
        <div class='seg'><span class='seg-label'>概算总投资</span><span class='seg-value'>{{project_audit_data.about_full_investment_salary?hs.formatSalary(project_audit_data.about_full_investment_salary):'-'}}</span></div>
        <div class='seg'><span class='seg-label'>结算送审金额</span><span class='seg-value'>{{project_audit_data.settlement_audit_salary?hs.formatSalary(project_audit_data.settlement_audit_salary):'-'}} </span></div>
             <div
              class="seg-attach"
             
            >
              结算送审表 <Icon
                type='md-attach'
              />
              <span class="seg-download"  v-if="project_audit_data.settlement_audit_summary_attached"
              @click='Download(project_audit_data.settlement_audit_summary_attached)'>
              下载
              </span>
              <span v-else class="seg-empty">未上传</span>
            </div>
        <div class='seg'><span class='seg-label'>结(决)算审定总投资</span><span class='seg-value'>{{project_audit_data.settlement_audit_full_investment_salary?hs.formatSalary(project_audit_data.settlement_audit_full_investment_salary):'-'}}</span></div>
            <div
              class="seg-attach"
             
            >
              结/决算汇总表 <Icon
                type='md-attach'
              />
              <span class="seg-download"  v-if="project_audit_data.settlement_audit_full_investment_attached"
              @click='Download(project_audit_data.settlement_audit_full_investment_attached)'>
              下载
              </span>
              <span v-else class="seg-empty">未上传</span>
            </div>
        <div class='seg'><span class='seg-label'>建安造价审定</span><span class='seg-value'>{{project_audit_data.contruction_project_cost_audit?hs.formatSalary(project_audit_data.contruction_project_cost_audit):'-'}}</span></div>
            <div
              class="seg-attach"
             
            >
              建安造价汇总表 <Icon
                type='md-attach'
              />
              <span class="seg-download"  v-if="project_audit_data.contruction_project_cost_audit_attached"
              @click='Download(project_audit_data.contruction_project_cost_audit_attached)'>
              下载
              </span>
              <span v-else class="seg-empty">未上传</span>
            </div>
        </Col>
        <Col :span='6'>
        <div class='seg'><span class='seg-label'>审计送审时间</span><span class='seg-value'>{{project_audit_data.audit_send_time?moment(project_audit_data.audit_send_time).format('L'):'-'}} </span></div>
        <div
              class="seg-attach"
             
            >
              移交清单 <Icon
                type='md-attach'
              />
              <span class="seg-download"  v-if="project_audit_data.audit_send_time_attached"
              @click='Download(project_audit_data.audit_send_time_attached)'>
              下载
              </span>
              <span v-else class="seg-empty">未上传</span>
            </div>
        <div class='seg'><span class='seg-label'>一审开始/结束时间</span><span class='seg-value'>{{project_audit_data.first_audit_started_at?moment(project_audit_data.first_audit_started_at).format('L'):'-'}} / {{project_audit_data.first_audit_finished_at?moment(project_audit_data.first_audit_finished_at).format('L'):'-'}}</span></div>
            <div
              class="seg-attach"
             
            >
              一审审定单（汇总表) <Icon
                type='md-attach'
              />
              <span class="seg-download"  v-if="project_audit_data.contruction_project_cost_audit_attached"
              @click='Download(project_audit_data.contruction_project_cost_audit_attached)'>
              下载
              </span>
              <span v-else class="seg-empty">未上传</span>
            </div>
        <div class='seg'><span class='seg-label'>二审开始/结束时间</span><span class='seg-value'>{{project_audit_data.second_audit_started_at?moment(project_audit_data.second_audit_started_at).format('L'):'-'}} / {{project_audit_data.second_audit_finished_at?moment(project_audit_data.second_audit_finished_at).format('L'):'-'}}</span> </div>
        </Col>
        <Col :span='6'>
       
        </Col>
      </Row>
      <div class="seg-dataset">
        <div class="seg-label">
          分包开竣工时间
        </div>
        <div class="seg-table">
          <Row class="seg-header">
            <Col :span="9">
            分包名称
            </Col>
            <Col :span="7">
            分包公司
            </Col>
            <Col :span="4">
            开工时间
            </Col>
            <Col :span="4">
            竣工时间
            </Col>

          </Row>
          <template v-for="d in project_audit_data.split_contractor_durations">
           <Row :key='d.id' class='seg-body'>
            <Col :span="9">
            {{d.name || '-'}}
            </Col>
            <Col :span="7">
            {{d.unit || '-'}}
            </Col>
            <Col :span="4">
            {{d.from?moment(d.from).format("L"):'-'}}
            </Col>
            <Col :span="4">
            {{d.to?moment(d.to).format("L"):'-'}}
            </Col>

          </Row>
          </template>
            <template v-if="!project_audit_data.split_contractor_durations || project_audit_data.split_contractor_durations.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
        </div>
      </div>
      <div class="seg-dataset">
        <div class="seg-label">
          协审单位信息
        </div>
        <div class="seg-table">
          <Row class="seg-header">
            <Col :span="12">
            协审单位
            </Col>
            <Col :span="6">
            负责人
            </Col>
            <Col :span="6">
            电话
            </Col>

          </Row>

          <template v-for="d in project_audit_data.help_audit_units">
           <Row :key='d.id' class='seg-body'>
          
            <Col :span="12">
            {{d.name || '-'}}
            </Col>
            <Col :span="6">
            {{d.charger || '-'}}
            </Col>
            <Col :span="6">
            {{d.phone || '-'}}
            </Col>

          </Row>
          </template>
          <template v-if="!project_audit_data.help_audit_units || project_audit_data.help_audit_units.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
        </div>
      </div>

      <div class="seg-dataset">
        <div class="seg-label">
          审计机关信息
        </div>
        <div class="seg-table">
          <Row class="seg-header">
            <Col :span="8">
            审计机关
            </Col>
            <Col :span="8">
            主办人
            </Col>
            <Col :span="8">
            电话
            </Col>

          </Row>
           <template v-for="d in project_audit_data.audit_units">
           <Row :key='d.id' class='seg-body'>
          
            <Col :span="12">
            {{d.name || '-'}}
            </Col>
            <Col :span="6">
            {{d.charger || '-'}}
            </Col>
            <Col :span="6">
            {{d.phone || '-'}}
            </Col>

          </Row>
          </template>
          <template v-if="!project_audit_data.audit_units || project_audit_data.audit_units.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
        </div>
      </div>
    </Card>

    <Card
      title="合同服务费结算"
      style='margin:10px;'
    >
      <div
        slot='extra'
        class='link-button'
        @click='showCalcEditor=true'
      >
        <Icon type="md-create" /> 录入
      </div>
      <Row :gutter="10">
        <Col :span='12'>
        <div class='seg'><span class='seg-label'>合同形式</span><span class='seg-value'>{{project_audit_data.contract_calc_mode != undefined?['单价包干','文件下浮','单价','下浮率'][project_audit_data.contract_calc_mode]:'-'}}</span></div>
        <div class='seg'><span class='seg-label'>合同结算办法</span><span class='seg-value'>{{project_audit_data.contract_calc_method || '-'}}</span></div>
        <div class='seg'><span class='seg-label'>合同金额</span><span class='seg-value'>{{project_audit_data.amount?hs.formatSalary(project_audit_data.amount):'-'}}</span></div>

        <div class="seg-dataset">
          <div class="seg-label">
            合同分项金额
          </div>
          <div class="seg-table">
            <Row class="seg-header">
              <Col :span="10">
              分项名称
              </Col>
              <Col :span="6">
              分项金额
              </Col>
              <Col :span="8">
              备注
              </Col>

            </Row>
             <template v-for="d in project_audit_data.contract_split_amounts">
           <Row :key='d.id' class='seg-body'>
          
            <Col :span="10">
            {{d.name || '-'}}
            </Col>
            <Col :span="6">
            {{d.amount || '-'}}
            </Col>
            <Col :span="8">
            {{d.note || '-'}}
            </Col>

          </Row>
          </template>
          <template v-if="!project_audit_data.contract_split_amounts || project_audit_data.contract_split_amounts.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
          </div>
        </div>

        <div class='seg'><span class='seg-label'>合同金额计算公式</span><span class='seg-value'>{{project_audit_data.contract_calc_fomula || '-'}} </span> </div>

        <div class='seg'><span class='seg-label'>增加金额</span><span class='seg-value'>{{project_audit_data.contract_adjust_amount?hs.formatSalary(project_audit_data.contract_adjust_amount) :'-'}} </span> </div>
        <div class="seg-dataset">
          <div class="seg-label">
            增减原因
          </div>
          <div class="seg-table">
            <Row class="seg-header">
               <Col :span="4">
              日期
              </Col>
              <Col :span="8">
              原因
              </Col>
              <Col :span="4">
              金额
              </Col>
              <Col :span="8">
              备注
              </Col>

            </Row>
             <template v-for="d in project_audit_data.contract_adjust_records">
           <Row :key='d.id' class='seg-body'>
          
            <Col :span="4">
            {{d.time?moment(d.time).format("L"):'-'}}
            </Col>
            <Col :span="8">
            {{d.name || '-'}}
            </Col>
            <Col :span="4">
            {{d.amount?hs.formatSalary(d.amount):'-'}}
            </Col>
            <Col :span="8">
            {{d.note || '-'}}
            </Col>
          </Row>
          </template>
          <template v-if="!project_audit_data.contract_adjust_records || project_audit_data.contract_adjust_records.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
          </div>
        </div>

        <div class="seg-dataset">
          <div class="seg-label">
            补充合同主要内容摘录
          </div>
          <div class="seg-table">
            <Row class="seg-header">
              <Col :span="4">
              日期
              </Col>
              <Col :span="12">
              内容
              </Col>
              <Col :span="8">
              备注
              </Col>

            </Row>
             <template v-for="d in project_audit_data.contract_addition_records">
           <Row :key='d.id' class='seg-body'>
          
            <Col :span="4">
            {{d.time?moment(d.time).format("L"):'-'}}
            </Col>
            <Col :span="12">
            {{d.content || '-'}}
            </Col>
            <Col :span="8">
            {{d.note || '-'}}
            </Col>
          </Row>
          </template>
          <template v-if="!project_audit_data.contract_addition_records || project_audit_data.contract_addition_records.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
          </div>
        </div>
        </Col>
      </Row>
    </Card>

    <Card
      title="审计取证及回复(施工期间/审计期间)"
      style='margin:10px;'
    >
    <div
        slot='extra'
        class='link-button'
        @click='showAuditQA=true'
      >
        <Icon type="md-create" /> 录入
      </div>
      <Row :gutter="30">
        <Col :span='8'>
        <div class='seg-header' style='text-align:center;border-bottom:1px solid #dfdfdf;'>
        问题披露
        </div>
        <template v-for="q in audit_questions">
        <Row :gutter='10' :key='q.id'>
          <Col :span='16'>
          {{q.name || '-'}}
          </Col>
          <Col :span='4'>
          {{q.inputor || '-'}}
          </Col>
          <Col :span='4'>
          {{q.time?moment(q.time).format("L"):'-'}}
          </Col>
        </Row>
        </template>
         <template v-if="!audit_questions || audit_questions.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
        </Col>
        <Col :span='8'>
        <div style='text-align:center;border-bottom:1px solid #dfdfdf;'>问题反馈</div>
        <template v-for="q in audit_replys">
        <Row :gutter='10' :key='q.id'>
          <Col :span='16'>
          {{q.name || '-'}}
          </Col>
          <Col :span='4'>
          {{q.inputor || '-'}}
          </Col>
          <Col :span='4'>
          {{q.time?moment(q.time).format("L"):'-'}}
          </Col>
        </Row>
        </template>
         <template v-if="!audit_replys || audit_replys.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
        </Col>
        <Col :span='8'>
        <div style='text-align:center;border-bottom:1px solid #dfdfdf;'>审计问题经验总结</div>
        <template v-for="q in audit_exps">
        <Row :gutter='10' :key='q.id'>
          <Col :span='16'>
          {{q.name || '-'}}
          </Col>
          <Col :span='4'>
          {{q.inputor || '-'}}
          </Col>
          <Col :span='4'>
          {{q.time?moment(q.time).format("L"):'-'}}
          </Col>
        </Row>
        </template>
         <template v-if="!audit_exps || audit_exps.length == 0">
            <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
          </template>
        </Col>

      </Row>
    </Card>

    <Card
      title="审计跟踪"
      style='margin:10px;'
    >
    <div
        slot='extra'
        class='link-button'
        @click='showAuditQA=true'
      >
        <Icon type="md-create" /> 新增工作
      </div>
     <div style='height:20px;text-align:center;margin-top:10px;'>无内容</div>
    </Card>

    <hs-modal-form
      v-model='showBaseEditor'
      :title="`项目概况 (${project.name})`"
      :form="Form('audit_project')"
      :data="project_audit_data"
      @on-submit="handleSubmitBaseInfo"
      width="800"
    />

     <hs-modal-form
      v-model='showCalcEditor'
      :title="`项目概况 (${project.name})`"
      :form="Form('audit_project_calc')"
      :data="project_audit_data"
      @on-submit="handleSubmitBaseInfo"
      width="800"
    />

    <Modal footer-hide v-model="showAuditQA" title="审计取证回复" width="400">
      <div class="flex-wrap flex-between" style='margin:20px;'>
        <Button icon="md-add" class="seg-big-btn" @click='showCreateQuestion=true;showAuditQA=false'>
          录入问题
        </Button>
        <Button class="seg-big-btn" icon="md-add" @click="showCreateReply=true;showAuditQA=false">
          录入回复
        </Button>
        <Button class="seg-big-btn" icon="md-add" @click="showCreateExp=true;showAuditQA=false">
          经验总结
        </Button>
      </div>

    </Modal>

     <hs-modal-form
      v-model='showCreateQuestion'
      :title="`审计问题录入 (${project.name})`"
      :form="Form('audit_question')"
      @on-submit="handleSubmitAuditQuestions"
      width="800"
    />

    <hs-modal-form
      v-model='showCreateReply'
      :title="`审计回复录入 (${project.name})`"
      :form="Form('audit_reply')"
      @on-submit="handleSubmitAuditReplys"
      width="800"
    />

    <hs-modal-form
      v-model='showCreateExp'
      :title="`审计经验总结 (${project.name})`"
      :form="Form('audit_exp')"
      @on-submit="handleSubmitAuditExps"
      width="800"
    />

  </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tabIndex: 0,
      project_audit_data: {},
      showBaseEditor: false,
      showCalcEditor:false,
      showAuditQA:false,
      showCreateQuestion:false,
      showCreateReply:false,
      showCreateExp:false,
      audit_questions:[],
      audit_replys:[],
      audit_exps:[],
      mock_items: [{
        date: "202003"
      }, {
        date: "202004"
      }]
    }

  },
  computed: {
    ...mapGetters('project', ['project'])
  },
  metaInfo: {
    title: '项目管理',
    route: "/:id"
  },
  methods: {
    handleSubmitBaseInfo(e) {
      Object.assign(this.project_audit_data,e)
      this.Success('OK')
      this.showBaseEditor = false
       this.showCalcEditor = false
    },
    handleSubmitAuditQuestions(e){
      this.audit_questions.push(e)
      this.Success("OK")
      this.showCreateQuestion = false
    },
    handleSubmitAuditReplys(e){
      this.audit_replys.push(e)
      this.Success("OK")
      this.showCreateReply = false
    },
    handleSubmitAuditExps(e){
      this.audit_exps.push(e)
      this.Success("OK")
      this.showCreateExp= false
    },

  }
}
</script>

<style lang="less" scoped>
.seg {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  .seg-label {
    display: inline-block;
    width: 120px;
    color: #aaa;
  }

  .seg-value {
    display: inline-block;
    color: rgb(33, 129, 255);

    text-align: right;
    min-width: 100px;
  }
}

.seg-dataset {
  font-size: 10px;
  color: #aaa;
  max-width: 1200px;
  margin: 10px 0;
  .seg-label {
  }
  .seg-table {
    border: 1px solid #dfdfdf;
    padding: 10px;
    .seg-header {
      margin: 5px;
      text-align: center;
      color: #888;
      border-bottom: 1px solid #dfdfdf;
    }
    .seg-body{
      text-align:center;
      color:#3af;
    }
  }
}
.link-button {
  cursor: pointer;
}

.seg-attach{
  margin-left:20px;
  font-size:10px;
  color:#333;

  .seg-download{
    cursor: pointer;
    color:#3af;
  }

  .seg-download:hover{
    filter:brightness(1.1);
  }

  .seg-empty{
    color:#aaa;
  }
}

.seg-big-btn{
  width:30%;
  height:80px;
}
</style>