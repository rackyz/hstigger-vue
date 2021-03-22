<template>
  <div class="hs-container" style="padding:20px">
    <Button @click="handleExtract">导入所有项目到企业项目库</Button>
    <hs-list :data="items" style="margin-top:10px;height:calc(100% - 30px);overlfow-y:auto;" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[]
    }
  },
  methods:{
    handleExtract(e){
      this.api.enterprise.PATCH_OA({param:{id:'project'}}).then(res=>{
        let items = res.data.data
        this.items = items
        this.Success('OK')
      }).catch(e=>{
        this.Error(e)
      })
    }
  }
}
</script>

<style>

</style>