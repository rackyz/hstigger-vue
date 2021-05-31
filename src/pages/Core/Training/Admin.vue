<template>
  <div class="hs-container" style="position:relative;height:100%;overflow-y:auto;padding:10px;">
    <div class="l-filter" style="padding:0 10px;">
      <Input search style="width:250px" />
      <Button icon="md-add" style="margin-left:10px">新增</Button>
    </div>
    <hs-list :data="items.slice(0,12)" :option="{tmpl:'HsxClass'}" style="border:none;background:none;height:calc(100% - 100px);overflow:hidden;overflow-y:auto;" />
     <div class="flex-wrap" style="justify-content:center;width:100%;margin-top:20px;">
        <Page  :total="total" :page-size="12" show-total @change="getData"/>
        </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items:[{
        id:1,
        name:"PPT基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"PPT基础培训",
        avatar:"",
        teacher:"NBGZ"
      }]
    }
  }
}
</script>

<style>

</style>