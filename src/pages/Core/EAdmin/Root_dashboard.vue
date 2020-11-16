<template>
  <div>平台总览
{{data}}

  </div>
</template>

<script>
export default {
  data(){
    return {
      data:{}
    }
  },
  mounted(){
    this.CORE.GET_EIP_STATUS().then(res=>{
      this.data = res.data.data
    })
  }
}
</script>

<style>

</style>