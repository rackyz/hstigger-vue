<template>
  <div class="hs-container" style="position:relative;height:100%;overflow:hidden;">
    
    <Row :gutter="1"  style=";height:calc(100%);">
      <Col :span="4" style="height:100%;border-right:1px solid #ddd;">
      
      <div class="l-panel" style="height:100%;padding:20px;">
        <h3 style="color:#346;margin:0;font-weight:bold;">任务管理</h3>
        <div class="l-filter flex-wrap flex-between" style="padding:15px 0;">
          <Input search style="width:140px;" v-model="listSearchText" clearable />
          <div class="flex-wrap">
          <Button type="primary" icon="md-add" style="width:33px;" @click="model={};showModalCreate=true"></Button>
           <Button icon="md-trash" style="width:33px;margin-left:5px;" @click="handleRemoveAppraisal" v-if="selected && selected.id"></Button>
           </div>
        </div>
        <hs-list ref="list" style="height:calc(100% - 125px);background:#eee;" :data="filteredList" selectable="single" :option="{tmpl:'HsxAppraisalPlan'}" @event="handleListEvent" />
      </div>
      </Col>
      <Col :span="20" style="height:100%;">
      <div class="l-panel" style="height:100%;overflow-y:auto;padding:15px ">
        <div class="flex-wrap ">
         <div class="number-panel " style="width:calc(100% - 270px);margin-right:10px;align-items:flex-start;padding:0 10px;border:none;color:#346;justify-content:flex-start;">
           <h3>{{selected.name || '未选择'}}</h3>
           <span>{{selected.desc || '请选择一个考核'}}</span>
           </div>
           <div class="number-panel " v-if="selected.users">
          已提交
          <div class="number">
            {{selected.users.count || 0}} / {{selected.users.count}}
          </div>
        </div>
        <div class="number-panel" style='margin-left:10px;' v-if="selected.count">
          已通过
          <div class="number">
            {{selected.passed || 0}} / {{selected.users.count}}
          </div>
        </div>
        
        </div>
        
        <hs-toolbar :data="tools" style="border:none;margin-top:10px;margin-bottom:10px;border-radius:5px;background:#eee;border:1px solid #ddd;color:#346;" @event="handleToolEvent" :disabled="disabled" />
        <div style="height:calc(100% - 150px);position:relative">
           <hs-table class="hs-table-plus" fulltable :columns="columns" style="height:100%;margin-top:5px;" :data="filteredUsers" /></hs-table>
        </div>
       
      </div>
      </Col>
     
      
    </Row>
    <hs-modal-form v-model="showModalCreate" :title="model.id?'修改考核':'新建考核'" :form="Form('appraisal_plan')" :data="model" @on-submit="handleSubmit" width="600" /> 

    <ModalProcessTask v-model="showModalTask" :task="current_task" @update="handleUpdateTask" />

    <Modal title="开始评分" v-model="modalEval" fullscreen footer-hide>
        <Layout>
          <Sider style="background:#333;width:600px;" width="300">
            <div style="padding:10px;color:yellow">
              请为本名培训成员进行评分
            </div>
            
            <div style="display:flex;width:100%;align-items:center;justify-contetn:center;padding:20px;background:#333;padding-top:0px;" >
              
              <hs-avatar :userinfo="selected_user" size="80" />
              <div style="margin-left:15px;color:#fff;height:80px;display:flex;algin-items:flex-begin;justify-content:center;flex-direction:column;">
                <div style="font-size:25px;">{{selected_user.name}}</div>
                <div style="color:#dda;">{{selected_user.phone}}</div>
              </div>
            </div>
            <div style="width:300px;padding:10px;background:#ddd;">
              <hs-form :form="Form('classeval')" editable="" :data="selected" @submit="handleSubmit" />
            </div>
            <div class="flex-wrap flex-between" style="margin-top:30px;padding:10px;">
               <Button icon="md-arrow-back" :disabled="!PrevUser || !PrevUser.id" @click="selectedUser=PrevUser">{{'前一位'}}</Button>
               <Button type="primary">上传</Button>
             <Button icon="md-arrow-forward" :disabled="!NextUser || !NextUser.id" @click="selectedUser=NextUser;">{{'后一位'}}</Button>
            </div>
            
          </Sider>
          <Content>
            <BasePreview v-if="selectedUser.file" :url="selectedUser.file" />
            <div v-else style="padding:20px;">文件未上传</div>
          </Content>
        </Layout>
    </Modal>
  </div>
</template>

<script>
import Preview from '../../../components/base/Preview.vue'
export default {
  components: { Preview },
  data(){
    return {
      listSearchText:"",
      userSearchText:"",
      showModalTask:false,
      modalEval:false,
      selectedUser:{},
      current_task:null,
      showModalCreate:false,
      model:{},
      selected:{},
      items:[],
      tools: [
        
      {
        key: 'config',
        name: "配置",
        icon: "md-settings",
      },
      {
        key: "refresh",
        name: "刷新",
        icon: "md-refresh",
      },
      // {
      //   key: "add",
      //   name: "新增",
      //   icon: "md-add",
      // },
      // {
      //   key: "delete",
      //   name: "移除",
      //   icon: "md-remove",
      // },
      {
        key: "export",
        name: "导出",
        icon: "md-download",
      }]
    }
  },
  metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
  computed:{
    selected_user(){
      if(!this.selectedUser || !this.selectedUser.id)
        return {}
      return this.$store.getters['core/employees'].find(v=>v.id == this.selectedUser.user_id) || {}
    },
    id(){
      return this.$route.params.id
    },
    filteredList(){
      if(this.listSearchText)
        return this.items.filter(v=>v.name.includes(this.listSearchText))
      else
        return this.items
    },
    filteredUsers(){
      if(!this.selected || !this.selected.users)
        return []
      if(this.userSearchText)
        return this.selected.users.filter(v=>v.name.includes(this.listSearchText))
      else
        return this.selected.users
      
    },
    disabled(){
      return {
        refresh:!this.selected || !this.selected.id
      }
    },
    PrevUser(){
        if(!this.selected || !this.selected.users)
        return {}
      let index =  this.selected.users.findIndex(v=>v.id == this.selectedUser.id)
      if(index != 0 || index != -1)
        return this.selected.users[index-1]
      else
        return {}
    },
    NextUser(){
      if(!this.selected|| !this.selected.users)
        return {}
  let index =  this.selected.users.findIndex(v=>v.id == this.selectedUser.id)
      if(index != this.selected.users.length-1 || index != -1)
        return this.selected.users[index+1]
      else
        return {}
    },
    columns(){
      var that= this
      return [{
        title:"序号",
        type:"index",
        width:80
      },{
        key:'user_id',
        type:'user',
        title:"姓名",
        width:120,
        option:{
          getters:"core/users",
          labelKey:'name',
          idKey:'id'
        }
      },{
         key:"file",
        title:"文件",
        width:120,
        render(h,param){
          if(param.row.file){
            let user =that.$store.getters["core/users"].find(v=>v.id == param.row.user_id)
            return h('Button',{props:{size:'small'},on:{click:()=>{
            that.DownloadWithName(param.row.file,user?user.name:'作业')
            }}},'下载')
          }
          else 
            return h("span",{style:{color:"red"}},"还未上传")
        }
      },{
         key:'result',
        title:"考核结果",
        width:120,
         render(h,param){
          if(param.row.result == null){
            return h('Button',{props:{size:'small'},on:{click:()=>{
            that.selectedUser = param.row
            that.modalEval = true
            }}},'评分')
            }else{
              return h('span',['不合格','合格','良好','优秀'][param.row.result])
            }
          }
        
      },{
         key:'score',
        title:"考核得分",
        width:120,
        render(h,param){
          return h('span',{},param.row.score || '-')
        }
      },
      {
         key:'comment',
        title:"考核备注",
        minWidth:200
      },{
        key:"state",
        title:"状态",
        width:120,
        type:'state',
        option:{
          states:['未开始','进行中','已提交','已完成']
        }
      },{
         key:"evaluted_at",
         width:200,
         title:"考评时间",
         type:'time'
      },]
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    showTask(item){
     
      this.api.enterprise.GET_TASKS({param:{id:item.task_id}}).then(res=>{
        this.current_task = res.data.data
        this.showModalTask = true
      })
    },
    getData(){
      this.api.enterprise.RELATED_TRAININGS({param:{id:this.id,related:'appraisals'}}).then(res=>{
        let items = res.data.data
         this.items = items
        if(Array.isArray(items) && items.length > 0){
          this.$refs.list.onSelect(items[0])
        }
       
       
      })
    },
    getAppraisalData(item = {}){
      if(item.id)
        this.api.enterprise.GET_APPRAISALS({param:{id:item.id}}).then(res=>{
          this.$set(this,'selected',res.data.data)
        })
    },
    handleUpdateTask(e){
      // updatae task
    },
    handleSubmit(e){
      if(e.id){
        this.api.enterprise.PATCHRELATED_TRAININGS(e,{param:{id:this.id,related:'appraisals',relatedId:e.id}}).then(res=>{
        this.Success("修改成功")
        this.getData()
        this.showModalCreate = false
      }).catch(e=>{
        this.Error("错误:"+e)
      })

      }else{
        this.api.enterprise.ADDRELATED_TRAININGS(e,{param:{id:this.id,related:'appraisals'}}).then(res=>{
        this.Success("创建完成")
        this.getData()
        this.showModalCreate = false
      }).catch(e=>{
        this.Error("错误:"+e)
      })
      }
      
    },
    handleDelete(e){
      this.Confirm("确定删除该考核（包括所有的考核信息，无法恢复）？",d=>{
          this.api.enterprise.DELRELATED_TRAININGS(e,{param:{id:this.id,related:'appraisals',relatedId:e.id}}).then(res=>{
          this.Success("删除完成")
          this.selected = {}
          this.getData()
          }).catch(e=>{
            this.Error("错误"+e)
          })
      })
      
    },
    handleToolEvent(e){
     if(e == 'config'){
        
        this.model = this.selected
        this.showModalCreate =  true
      }else if(e == 'delete'){
        this.handleDelete(e)
      }else if(e == 'member'){
        
      }else if(e == 'export'){

      }else if(e =='refresh'){
        if(this.selected && this.selected.id)
          this.getAppraisalData(this.selected)
      }
    },
     handleListEvent(e){
       if(e.type == 'select'){
         this.selected = this.items.find(v=>v.id == e.param)
         this.getAppraisalData(this.selected)
       }
    },
    handleTableEvent(e){
      
    },
    handleRemoveAppraisal(){
      let id = this.selected.id
      this.Confirm(`确定删除考核 <span style='margin:0 5px;color:red;'>${this.selected.name}</span> 及其所有的数据?`,e=>{
        this.api.enterprise.DELETE_APPRAISALS({param:{id}}).then(res=>{
          this.Success("操作成功")
          let index = this.items.findIndex(v=>v.id == id)
          if(index != -1)
            this.items.splice(index,1)
        })
      })
    }
  },
 
}
</script>

<style lang="less">
.l-caption{
  font-weight: bold;
}
.l-panel{
  margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;
}

.number-panel{
  width:120px;
  height:70px;
  border:1px solid #eee;
  display:flex;
  justify-content: center;
  flex-direction: column;
  padding:10px 0;
  align-items: center;
}
</style>