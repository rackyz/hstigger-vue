<template>
<div>
   <div style="postion:absolute;left:0;top:0;right:0;height:200px;background:linear-gradient(to bottom,#236,#246);">
     
   </div>
  <div style="position:absolute;top:0;left:160px;right:0;">
    <div style="margin:40px auto;width:1260px;min-height:800px;background:#fff;">
      <div style="width:100%;height:200px;overflow:hidden;position:relative;color:#fff;"><img :src="project.avatar || 'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/timg.jpg'" style="width:100%;position:absolute;top:-30%;filter:brightness(0.5);">
        <div style="font-size:40px;position:relative;z-index:10;padding:10px 20px;">
          {{project.name}}
          <div style="font-size:20px;color:#3af;">
            {{project.type}} 
          </div>
        </div>
      </div>
         


    </div>
     
    </div>
   
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   computed:{
     ...mapGetters('project',['get']),
     id(){
    return this.$route.params.id
    },
    project(){
      return this.get(this.id)
    }
  },
  metaInfo:{
    title:'项目管理',
     route:"/:id"
  },
}
</script>

<style>

</style>