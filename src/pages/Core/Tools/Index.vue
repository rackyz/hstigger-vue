<template>
  <div style="padding:20px;overflow-y:auto;position:relative;height:100%;">
    <Button @click="patchEntEmployeeInfo">自动同步企业用户信息</Button>
    <Button @click="patchEntAccountInfo" style="margin:0 10px;">自动同步账号信息</Button>
    <pre style="padding:20px">{{result || '结果'}}</pre>
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
    },
    patchEntAccountInfo(){
      this.api.entadmin.POSTACTION_TOOLS({},{param:{action:"sychronize_account"}}).then(res=>{
        this.result = res.data.data
      })
    }
  }
}
</script>

<style>

</style>