<template>
  <div>
   
    <template v-for="p in typedProjects">
      <div :key="p.id"  class="flex-wrap" style="padding:10px;border-bottom:1px solid #ddd;margin-bottom:1px;">
         <div style='width:200px;margin-right:10px;'>
      <img :src="p.avatar || 'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/timg.jpg'" style='width:100%;height:180px;' />
      </div>
      <div style="width:calc(100% - 210px)">
        <div class="flex-wrap" style="padding:0 10px;">
            <div style='font-weight:bold;'>{{p.name}}</div>
            <div class="flex-wrap" style='margin-left:20px;font-size:10px;color:green;'><hs-avatar :userinfo="getUser(p.charger)" size="15" style='margin-right:5px;' /> {{getUser(p.charger).name}}</div>
        </div>
        <div class="flex-wrap flex-between;" style="padding:0 10px;">
              <Progress style="width:80%;" :percent="getPercent(p.tasks.filter(v=>v.state >= 2).length,p.tasks.length)" /> 
              <div style="background:#38f;color:#fff;padding:3px 10px;font-size:12px;">{{p.tasks.filter(v=>v.state >= 2).length}} / {{p.tasks.length}}</div>
        </div>
    
      <div class="flex-wrap" style="margin-top:5px;">
        <template v-for="ph in p.types">
          <div  :key="ph" style="width:140px;text-align:center;background:#eee;margin:0 5px;padding:5px;border-radius:5px;margin-top:5px;cursor:pointer;" :style="ph.finished_count > 0?'background:#fff;border:1px solid #ddd;':''" @click="RouteTo(`/core/cprojects/${p.id}/task`)">
            <div style="color:#346;font-size:10px;">{{ph.name}} ({{ph.finished_count}}/{{ph.task_count}})</div>
            <div><Progress :percent="getPercent(ph.finished_count,ph.task_count)" /></div>
            </div>
            
     
        </template>
      </div> </div>
     </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
    }
  },
  methods:{
    getPercent(a,b){
      if(b > 1){
        return Math.round(a * 100 /b)
      }else
        return 0
    }
  },
  computed:{
    ...mapGetters('core',['projects','getUser']),
  items(){
    return this.projects || []
  },
  typedProjects(){
      let types = this.$store.getters['core/getTypes']('ARCHIVE_WORKTYPE')
      return this.projects.map(p=>{
        let rp = {...p}
          let t = types.map(v=>{
            let s = {...v}
            rp.tasks = rp.tasks || []
            s.tasks = rp.tasks.filter(t=>t.business_type == v.value) || []
            s.finished = s.tasks.filter(t=>t.state == 2) || []
            s.task_count = s.tasks.length || 0
            s.finished_count = s.finished.length || 0
            return s
          })
          rp.types = t
        return rp
      })
    }
  }
  
}
</script>

<style>

</style>