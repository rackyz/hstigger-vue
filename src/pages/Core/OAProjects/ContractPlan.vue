<template>
  <div style="height:100%;position:relative;">
    <div style='padding:10px;background:#fff;border-bottom:1px solid #dfdfdf;'>签约计划
    </div> 
    <div class="flex-wrap flex-between" style='height:calc(100% - 40px);'>
      <div style='width:200px;height:100%;;background:#fff;border-right:1px solid #dfdfdf;'>
        <hs-list :data="mock_items" style="border:none;height:100%;padding:0;" :option="{tmpl:'BaseContractPlan'}" selectable="single"></hs-list>
    </div>
    <div style='width:calc(100% - 200px);height:100%;background:#fff;border-right:1px solid #dfdfdf;'>

    </div>

      </div>  
    
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      mock_items:[{
        date:"202003"
      },{
        date:"202004"
      }]
    }
    
  },
  computed:{
    ...mapGetters('project',['project'])
  },
   metaInfo:{
    title:'项目管理',
     route:"/:id"
  },
}
</script>

<style>

</style>