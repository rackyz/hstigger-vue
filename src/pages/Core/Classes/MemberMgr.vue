<template>
  <div class="hs-container" style="position:relative;height:100%;overflow:hidden;">
   <div class="l-panel" style="height:100%;overflow-y:auto;padding:60px 100px;">
        <h3 style="color:#346;font-weight:bold;">培训管理</h3>
        
        <hs-toolbar :data="tools" style="border:none;margin-top:10px;margin-bottom:10px;border-radius:5px;background:#eee;color:#346;border:1px solid #ddd;" @event="handleToolEvent" :disabled="disabled" />
        <div class="l-filter" style="margin-bottom:10px;">
          <Input search style="width:200px" v-model='search_text' clearable /> 
        </div>
        <div style="height:calc(100% - 150px);position:relative">
           <hs-table class="hs-table-plus" fulltable :columns="columns" style="height:100%;margin-top:5px;" :data="filteredUsers" @event="handleTableEvent" />
        </div>
       
      </div>  
      <Modal v-model="showUserSelectorModal" title="添加培训人员" footer-hide>
       
        <div style="padding:20px;height:600px;overflow-y:auto">
           <Input search v-model="filterUsernameText" clearable style="margin-bottom:10px;" />
           <template v-for="u in filteredEmployees">
          <div class="l-user-item" :key="u.id">
            <Checkbox ref="checkbox" :value="selected_map[u.id]" @on-change="$set(selected_map,u.id,$event)" :disabled="u.score>0">{{u.name}}</Checkbox>
          </div>
        </template>
        
        </div>
        <div class="flex-wrap flex-between" style="border-top:1px solid #aaa;padding:10px;">
          <div class="flex-wrap">
            <Button @click="handleSelectAll">全选</Button>
            <Button @click="handleunSelectAll" style="margin-left:10px;">取消全选</Button>
          </div>
          <div class="flex-wrap">
              <span style="margin-right:20px;">已选 {{selectedCount || 0}} / {{filteredEmployees.length}}</span>
             <Button type='primary' style="margin-right:10px;" @click="handleSubmitUsers">提交</Button>
              <Button @click="showUserSelectorModal=false;">取消</Button>
              </div>
        </div>
      
      </Modal>

      <Modal title="结果评价" v-model="showModalEval" footer-hide width="800">

      </Modal>
  </div>
  
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      selected:{},
      search_text:"",
      showModalEval:false,
      filterUsernameText:"",
      selected_map:{},
      formResult:{
        layout:``,
        def:{
          comment:{
            type:"input",
            label:"考核结果和评价",
            option:{
              type:"textarea",
              height:200
            }
          },
          score:{
            type:"input",
            label:"考核评分",
            option:{
              type:'number'
            }
          },passed:{
            type:"select",
            label:"考核结果",
            option:{
              states:['合格','不合格']
            }
          }
        }
      },
      showUserSelectorModal:false,
      items:[],
      	tools: [
        
				{
					key: "add",
					name: "添加人员",
					icon: "md-add",
				},{
          key:'remove',
          name:"移除人员",
          icon:'md-remove'
          },
          {
          key:'enable_join',
          name:"开启报名",
          icon:'ios-add-circle'
        },{
          key:'disable_join',
          name:"关闭报名",
          icon:"ios-remove-circle"
        },{
            key:'eval',
          name:"结果评价",
          icon:'md-create'
            }]
    }
  },
metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
  mounted(){
    this.getData()
  },
  computed:{
    ...mapGetters('core',['employees']),
    ...mapGetters('training',['item']),
    filteredEmployees(){
        let filtered = this.employees.filter(v=>!this.items.find(u=>u.user_id == v.id) && this.item.charger != v.id)
        if(this.filterUsernameText){
          return filtered.filter(v=>v.name.includes(this.filterUsernameText))
        }else{
          return filtered
        }
      
    },
    disabled(){
      return {
         enable_join:this.item.enable_join,
         disable_join:!this.item.enable_join,
         
         remove:!this.selected.id
      }
     
    },
    id(){
      return this.$route.params.id
    },
    selectedCount(){
      return Object.keys(this.selected_map).filter(v=>this.selected_map[v]).length
    },
    filteredUsers(){
      
      if(this.search_text){
        return this.items.filter(v=>this.employees.find(u=>u.id == v.user_id).name.includes(this.search_text))
      }else{
        return this.items
      }
    },
    columns(){
      var that=  this
      return [{
        title:"序号",
        type:"index",
        width:80
      },{
        key:'user_id',
        title:"姓名",
        type:'user',
        width:100,
        option:{
          getters:"core/users"
        }
      },{
        title:"部门",
        key:'deps',
        sortable:false,
        width:'300px',
        render(h,params){
          let user_id = params.row.user_id
          let employees = that.$store.getters['core/employees']
          let deps = that.$store.getters['core/deps']
          let employee = employees.find(v=>v.id == user_id)
          if(!employee)
            return h('span','该人员非本企业人员')
          let dep_list = employee.deps
          let doms = ['-']
          if(Array.isArray(deps) && Array.isArray(dep_list) && dep_list.length > 0){
            let dep = deps.find(d=>d.id == dep_list[0])
            if(dep)
              doms[0] = dep.name
            if(dep_list.length > 1)
              doms[1] =  h('Tooltip',{style:{marginLeft:'10px'},props:{transfer:true,content:dep_list.slice(1).map(v=>{
                let dep = deps.find(d=>d.id == v)
                if(dep)
                  return dep.name
              }).filter(v=>v).join(',')
              }},` [+${dep_list.length-1}]`)
          }
            
          return h('div',{styles:{textOverflow:'ellipse'}},doms)
        }
      },
      {
         key:"joined_at",
         type:'time',
         width:250,
         title:"报名时间"
      }, {
         key:"joined_type",
         type:'type',
         width:100,
         title:"报名方式",
         option:{
           getters:"core/getTypes",
           getters_key:"TRAIN_JOIN_TYPE",
           idKey:'value',
           labelKey:'name'
         }
      },{
         key:'score',
         type:'number',
        title:"考核得分",
        width:100
      },{
         key:'result',
         type:'title',
        title:"考核结果",
        width:100
      },{
         key:'name',
         type:'text',
        title:"考核情况备注"
      },]
    }
  },
  methods:{
    handleToolEvent(e){
      if(e == 'add'){
        this.showUserSelectorModal = true
      }else if(e == 'remove'){
        this.handleRemove(this.selected)
      }else if(e == 'eval'){
        this.showModalEval = true
      }else if(e == 'enable_join'){
        this.$store.dispatch('training/enable_join',this.id).then(res=>{
           this.Success('已开启用户报名')
        })
        
      }else if(e == 'disable_join'){
       this.$store.dispatch('training/disable_join',this.id).then(res=>{
           this.Success('已关闭用户报名')
        })
      }
    },
    getData(){
      this.api.enterprise.RELATED_TRAININGS({param:{id:this.id,related:'users'}}).then(res=>{
        let items = res.data.data
        items.forEach(v=>{
          if(!v.evaluated_at){
            v.result = "未评价"
          }else{
            if(v.score < 60){
              v.result = "不合格"
            }else if(v.score < 75){
              v.result = "合格"
            }else if(v.score < 90){
              v.result = "良好"
            }else if(v.score < 100){
              v.result = "优秀"
            }
          }
        })
        this.items = items
      })
    },
    handleSubmitUsers(){
      let user_id_list = Object.keys(this.selected_map).filter(id=>this.selected_map[id])
      this.api.enterprise.PATCH_TRAININGS(user_id_list,{query:{q:'addusers'},param:{id:this.id}}).then(res=>{
         this.Success('修改成功')
         this.showUserSelectorModal = false
         this.getData()
      }).catch(e=>{
        this.Error("修改失败")
      })
     
    },
    handleSelectAll(){
      let map = {}
      this.filteredEmployees.forEach(v=>{
        this.$set(this.selected_map,v.id,true)
        map[v.id] = true
      
      })
      this.selected_map = map
    },
    handleunSelectAll(){
      this.$set(this,'selected_map',{})
    },
    handleRemove(e){
      let user = this.employees.find(v=>v.id == e.user_id) || {}
      this.Confirm(`确定删除<span style='margin:0 5px;color:red;font-weight:bold'>${user.name || '未知人员'}</span>（所有相关信息, 不可恢复)?`,s=>{
         this.api.enterprise.DELRELATED_TRAININGS({param:{id:this.id,related:'users',relatedId:e.id}}).then(res=>{
        this.Success("操作成功")
        let index = this.items.findIndex(v=>v.id == e.id)
        this.items.splice(index,1)
      })
      })
     
    },
    handleTableEvent(e){
      if(e.type == 'select'){
        let id = e.data
        this.selected = this.items.find(v=>v.id == id) || {}
      }
    }
  }
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