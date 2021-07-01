<template>
   <div class="flex-wrap" style="margin-top:5px;">
        <template v-for="ph in phases">
          <div  :key="ph" style="width:140px;text-align:center;background:#eee;margin:0 5px;padding:5px;border-radius:5px;" @click="RouteTo(`/core/cprojects/${project.id}/task`)">
            <div style="color:#346;font-size:10px;">{{ph}} (5/12)</div>
            <div><Progress :percent="30" /></div>
            </div>
          
        </template>
      </div>
          
</template>

<script>
export default {
  props:['project'],
  data(){
    return {
      phases:['前期准备','前期工作','设计工作','招投标','合同管理','现场管理']
    }
  },
}
</script>

<style>

</style>