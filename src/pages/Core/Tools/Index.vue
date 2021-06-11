<template>
  <div style="padding:20px;">
    <Button @click="patchEntEmployeeInfo">自动同步企业用户信息</Button>
    <div style="padding:20px">
      {{result || '结果'}}
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      result:""
    }
  },
  methods:{
    patchEntEmployeeInfo(){
      this.api.entadmin.POSTACTION_TOOLS({},{param:{action:"synchronize_employee"}}).then(res=>{
        this.result = res.data.data
      })
    }
  }
}
</script>

<style>

</style>