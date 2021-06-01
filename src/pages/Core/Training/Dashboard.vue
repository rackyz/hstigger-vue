<template>
  <div style="width:1200px;margin:10px auto;position:relative;height:100%;">
    <div class="filter" style="padding:0 10px;">
       <Input search style="width:200px" />
    </div>
    <div class="tabs"  style="padding:0 10px;margin-top:10px;">
        当前课程 | 已结束
    </div>
  
    <hs-list :data="items.slice(0,12)" :option="{tmpl:'HsxClass'}" style="border:none;background:none;height:calc(100% - 180px);overflow:hidden;overflow-y:auto;" />
     <div class="flex-wrap" style="justify-content:center;width:100%;margin-top:20px;">
        <Page  :total="total" :page-size="12" show-total @change="getData(page)"/>
        </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      total:14,
      items:[]
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(page = 1){
      this.api.enterprise.LIST_TRAININGS({query:{page}}).then(res=>{
        let items = res.data.data
        this.items = items
      })
    }
  }
}
</script>

<style>

</style>