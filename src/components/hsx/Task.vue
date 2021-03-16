<template>
  <div class="flex-wrap" style='width:100%;'>
     <div style="width:40px;height:40px;border:1px solid #dfdfdf;padding:10px;">
      {{data.index}}
    </div>
    <div style="width:80px;height:40px;border:1px solid #dfdfdf;padding:10px;margin-left:5px;">
      {{data.state}}
    </div>
     <div style="width:400px;height:40px;border:1px solid #dfdfdf;padding:10px;margin-left:5px;">
      {{data.name}} 
    </div>

     <div style="width:auto;height:40px;border:1px solid #dfdfdf;padding:10px;margin-left:5px;">
      {{data.charger || "负责人"}} 
    </div>
     <div style="width:auto;height:40px;border:1px solid #dfdfdf;padding:10px;margin-left:5px;">
      {{data.percent || "工作量"}} 
    </div>
     <div style="width:auto;height:40px;border:1px solid #dfdfdf;padding:10px;margin-left:5px;">
      {{data.planduration || "计划时间"}} 
    </div>
  </div>
</template>

<script>
export default {
  props:['data']
}
</script>

<style>

</style>