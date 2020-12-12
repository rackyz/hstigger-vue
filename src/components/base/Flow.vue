<template>
   <Modal v-model='value' footer-hide fullscreen @on-visible-change='handleClose'>
    <div slot='header'><Icon custom='gzicon gzi-lianjieliu' style='margin-right:5px;'></Icon> {{'创建流程实例 '+(id ? ('/ '+get_flow(id).name):'')}}</div>
      <!-- <BaseFlow :key="current" /> -->
      <Spin fullscreen v-if="loading" />
      <template v-if='!loading && flowDef && flowDef.nodes'>
        
      <hs-flow :flow='flowDef' :history='history' @patch='Patch' @recall='Recall' @save='Save' />
      </template>
    </Modal>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  props:["id","value"],
  data(){
    return {
      loading:true,
      flowDef:{},
      history:[],
    }
  },
  mounted(){
    this.getData()
  },
  computed:{
    ...mapGetters('core',['flows']),
  },
  watch:{
    id:{
      handler(v){
        this.getData(v)
      },
      immediate:true
    }
  },
  methods:{
    get_flow(e){
      return this.flows.find(v=>v.id == e)
    },
    handleClose(){
      this.$emit('input',this.value)
    },
    getData(){
      if(!this.id){
        this.value = false
        return
      }

      this.loading = true
      this.CORE.GET_FLOW({param:{id:this.id}}).then(res=>{
        this.flowDef = res.data.data
        this.value = true
      }).finally(e=>{
        this.loading = false
    
      })
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

<style>

</style>