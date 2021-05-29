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
        <Page  :total="total" :page-size="12" show-total @change="getData"/>
        </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      total:14,
      items:[{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      },{
        id:1,
        name:"PPT基础培训",
        avatar:"https://img2.baidu.com/it/u=2464969734,440435060&fm=26&fmt=auto&gp=0.jpg",
        teacher:"NBGZ"
      },{
        id:1,
        name:"CAD基础培训",
        avatar:"",
        teacher:"NBGZ"
      }]
    }
  }
}
</script>

<style>

</style>