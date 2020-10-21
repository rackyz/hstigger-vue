<template>
  <div class="hs-container hs-container-scroll" style='height:100%;position:relative;background:#eee;'>
    
     <div style="position:absolute;right:0;bottom:0;top:0;left:0px;padding:10px;">
        基础信息
        <hs-form :form='form' :formData='project' style='width:700px' editable />
     </div>
  </div>
</template>

<script>
import projectForm from '@/forms/project'
export default {
  data(){
    return {

    }
  },
metaInfo:{
    title:'项目配置',
     route:"/:id"
  },
  computed:{
    form(){
      return projectForm
    }
  }
}
</script>

<style lang="less" scoped>
.l-card{
  height:60px;
  border-bottom:1px solid #333;
  background:#369;
  padding:20px;
  color:#fff;
}
</style>