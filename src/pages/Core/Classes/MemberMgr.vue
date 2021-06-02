<template>
  <div class="hs-container" style="position:relative;height:100%;overflow:hidden;">
   <div class="l-panel" style="height:100%;overflow-y:auto;padding:60px 100px;">
        <h3 style="color:#346;font-weight:bold;">学员管理</h3>
        
        <hs-toolbar :data="tools" style="border:none;margin-top:10px;margin-bottom:10px;border-radius:5px;background:#eee;color:#346;border:1px solid #ddd;" @event="handleToolEvent" :disabled="disabled" />
        <div class="l-filter" style="margin-bottom:10px;">
          <Input search style="width:200px" v-model='search_text' clearable /> 
        </div>
        <div style="height:calc(100% - 150px);position:relative">
           <hs-table class="hs-table-plus" fulltable :columns="columns" style="height:100%;margin-top:5px;" :data="filteredUsers" />
        </div>
       
      </div>  
      <Modal v-model="showUserSelectorModal" title="添加培训人员" footer-hide>
        <div style="padding:20px;height:600px;overflow-y:auto">
           <template v-for="u in $store.getters['core/employees']">
          <div class="l-user-item" :key="u.id">
            <Checkbox :value="selected_map[u.id]" @on-change="selected_map[u.id]=$event" :disabled="u.score>0">{{u.name}}</Checkbox>
          </div>
        </template>
        
        </div>
        <div class="flex-wrap flex-end" style="border-top:1px solid #aaa;padding:10px;">
             <Button type='primary' style="margin-right:10px;" @click="handleSubmitUsers">提交</Button>
              <Button @click="showUserSelectorModal=false;ResetUserMap(this.item)">取消</Button>
        </div>
      
      </Modal>
  </div>
  
</template>

<script>
export default {
  data(){
    return {
      search_text:"",
      selected_map:{},
      showUserSelectorModal:false,
      item:{
        users:[]
      },
      	tools: [
        
				{
					key: "add",
					name: "修改人员",
					icon: "md-person",
				},{
          key:'enable_join',
          name:"开启报名",
          icon:'md-checkmark'
        },{
          key:'disabled_join',
          name:"关闭报名",
          icon:"ios-remove-circle"
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
    disabled(){
      return {
         enable_join:!this.item.enable_join,
         disabled_join:this.item.enable_join
      }
     
    },
    id(){
      return this.$route.params.id
    },
    filteredUsers(){
      
      if(this.search_text){
        return this.item.users.filter(v=>this.users.find(u=>u.id == v.user_id).name.includes(this.search_text))
      }else{
        return this.item.users
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
      },{
         key:'score',
         type:'number',
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
      }
    },
    ResetUserMap(item){
       let selected_map = {}
       if(Array.isArray(item.users)){
          item.users.forEach(v=>{
          selected_map[v.user_id] = true
        })
       }
       
        this.$set(this,'selected_map',selected_map)
        console.log(selected_map)
    },
    getData(){
      this.api.enterprise.GET_TRAININGS({param:{id:this.id}}).then(res=>{
        let item = res.data.data
        item.plans.forEach(v=>{
          let e = this.employees.find(u=>u.id == v.user_id)
          if(e)
          {
            v.name = e.name
            v.deps = e.deps
          }
        })
        this.ResetUserMap(item)
        this.item = item

      })
    },
    handleSubmitUsers(){
      this.api.enterprise.PATCH_TRAININGS(this.selected_map,{query:{q:'joinlist'},param:{id:this.id}}).then(res=>{
        this.Success('修改成功')
         this.showUserSelectorModal = false
         this.getData()
      }).catch(e=>{
        this.Error("修改失败")
      })
     
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