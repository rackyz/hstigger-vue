<template>
  <div class="hs-container hs-container-scroll" style='height:100%;position:relative;background:#eee;'>
    
     <Card style="margin:10px;">
       <Tabs value="name1">
        <TabPane label="基础信息" name="name1"><hs-form :form='form' :formData='project' style='width:700px;margin:10px;' editable /></TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
        
        
     </Card>
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