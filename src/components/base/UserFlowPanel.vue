<style lang="less">
.glass-panel-wrapper{
  bottom:60px;
}
</style>
<template>
  <div class='l-list'>
        <template v-for='f in flows'>
          <div class='action-button' @click='OpenFlowCreateModal(f.id)' :key='f.id'>
            <Icon :custom='`gzicon gzi-${f.icon}`' color='#45556E' size='32' />
            <div class='ab-title'>{{f.name}}</div>
          </div>
        </template>
        <div class='action-button' style='opacity:0.5;' @click='OpenCustomSettingPanel'>
          <Icon type='md-add' color='#45556E' size='25' style="border:2px dashed #45566E;border-radius:50%;padding-left:1px;padding-top:1px;margin-top:3px;" />
          <div class='ab-title'>自定义</div>
        </div>

        <Modal title="自定义" v-model="modalCustom" footer-hide>
          <div class='l-group-wrapper'>
           <div class='l-list'>
             <template v-for="uf in user_flows_slots">
               
             <div class='l-slot' :key='uf'>
               <template v-if="get_flow(uf)">
               <div class='action-button' @click='ClearFlow(uf.id)' :key='get_flow(uf).id'>
                  <Icon :custom='`gzicon gzi-${get_flow(uf).icon}`' color='#45556E' size='32' />
                  <div class='ab-title'>{{get_flow(uf).name}}</div>
                </div>
                </template>
                <template v-else>
                  空
                </template>
             </div>
             
             </template>
           </div>
           <template v-for="g in flowGroups">
             <div class='l-group' :key='g.key'>
               <div class='l-group-title'>
                 {{g.name}}
               </div>
               <div class='l-group-content'>
                 <template v-for='f in g.flows'>
                   <div class='action-button' @click='AddFlowToCustom(uf.id)' :key='f.id'>
                      <Icon :custom='`gzicon gzi-${f.icon}`' color='#45556E' size='32' />
                      <div class='ab-title'>{{f.name}}</div>
                    </div>
                 </template>
               </div>
             </div>
           </template>
           </div>
        </Modal>

        <Modal v-model='modalFlow' footer-hide fullscreen >
        <div slot='header'><Icon custom='gzicon gzi-lianjieliu' style='margin-right:5px;'></Icon> {{'创建流程实例 '+(current ? ('/ '+get_flow(current).name):'')}}</div>
          <!-- <BaseFlow :key="current" /> -->
          <template v-if='flowDef && flowDef.nodes'>
           
          <hs-flow :loading='loading' :flow='flowDef' :history='history' @patch='Patch' @recall='Recall' @save='Save' />
          </template>
        </Modal>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import flow from '../../flows/29fe3900-3504-11eb-a58f-19892a782200.js'
export default {
  data(){
    return {
      loading:false,
      modalCustom:false,
      flowDef:{},
      modalFlow:false,
      history:[],
      current:null
    }
  },
  computed:{
    ...mapGetters('core',['flows','user_flows','getTypes']),
    userFlowItems(){
      return this.flows.filter(v=>this.user_flows.includes(v.id))
    },
    user_flows_slots(){
      let slots = new Array(14)
      this.user_flows.forEach((v,i)=>{
        slots[i] = v
      })
      return slots
    },
    
    flowGroups(){
      let types = this.getTypes('FLOW_TYPE')
      let groups = types.map(v=>({id:v.value,name:v.name,color:v.color,icon:v.icon,flows:[]}))
      this.flows.forEach(v=>{
        let index = groups.findIndex(g=>g.id == v.flow_type)
        if(index != -1)
          groups[index].flows.push(v)
      })
      return groups.filter(v=>v.flows.length > 0)
    }

  },
  methods:{
     FormatFlow (f) {
      let o = {}
      o.info = {
        id:f.id,
        name:f.name,
        desc:f.desc
      },
      o.nodes = Object.keys(f.nodes).map(v=>({key:v,...f.nodes[v]}))
      o.def = f.def
      o.actions = Object.keys(f.actions).map(v => ({
        key: v,
        ...f.actions[v]
      }))
      o.option = f.option

      return o
    
    },
    get_flow(e){
      return this.flows.find(v=>v.id == e)
    },
    AddFlowToCustom(){
      
    },
    ClearFlow(){

    },
    OpenFlowCreateModal(id){
      if(!id)
        return
      this.current = id
      try{
        this.flowDef = this.FormatFlow(flow)
        this.Install(id,this.flowDef)
        this.modalFlow = true
      }catch(e){
        this.Error(e)
      }
     
    },
    
    OpenCustomSettingPanel(){
        this.modalCustom = true
    },
    SaveCustomSetting(){
       this.modalCustom = false
    },
    Install(id,def){
      this.ADMIN.UPDATE_FLOW({define:def},{param:{id}})
    },
    Patch(e){
      this.loading = true
      
      if(!e.id){
        e.flow_id = this.flowDef.id
        e.desc = e.data.name +'-2020年终考核'
        this.ENT.POST_WORKFLOW(e).then(res=>{
        console.log(res)
        this.Success("提交完成")
      }).catch(e=>{
        this.Error(e)  
      }).finally(e=>{
        this.loading = false
      })
      }else{
        this.ENT.PATCH_WORKFLOW(e,{param:{id:e.id}}).then(res=>{
        console.log(res)
        this.Success("提交完成")
      }).catch(e=>{
        this.Error(e)  
      }).finally(e=>{
        this.loading = false
      })
      }
      
    },
    Recall(e){

    },
    Save(e){

    }
  }
}
</script>
<style lang="less" scoped>

.l-slot{
  width:60px;
  height:60px;
  border-radius: 5px;
  border:2px dashed #aaa;
  margin-right:5px;
  margin-bottom:5px;
}

.l-group-wrapper{
  padding:10px;
}
.l-list{
  padding:10px;
}
.action-button{
  display:flex;
  flex-direction: column;
  width:60px;
  height:60px;
  font-size:12px;
  align-items: center;
  justify-content: center;

  .ab-title{
    text-overflow: ellipsis;
    height:30px;
    width:100%;
    position: relative;
    overflow: hidden;
    line-height:14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

.action-button:hover{
  filter:brightness(1.5);
  cursor: pointer;
}

.action-button:active{
  position: relative;
  bottom:-1px;
  right:-1px;
}

.l-group-wrapper{
  padding:20px;
  .l-gruop{
    .l-group-title{
      
      margin-bottom:10px;
    }
  }
}
</style>