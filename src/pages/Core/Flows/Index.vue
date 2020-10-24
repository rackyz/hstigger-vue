<template>
  <div style='height:100%;'>
     <div class='menu'>
       <div class='fe-title'><Icon custom='gzicon gzi-liujisuan' style='margin-right:5px' />正在编辑 - <span style='color:#368;font-weight:bold;'>通知发布 <span style='color:#aaa;font-weight:normal;'>(b51a2e20-159e-11eb-987b-0b2eb9d9fbd9)</span> </span>
       </div>
       <div class="tool">
         
       <Button type='primary' style='margin-right:5px;' size="small">保存</Button>
       <Button type='error' size="small">发布</Button>
       </div>
       
     </div>
     <div class='fe-content'>
       FLOW-EDITOR
     </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  metaInfo:{
    title:'流程编辑器',
     route:"/:id"
  },
}
</script>

<style lang="less" scoped>
.menu{
  height:30px;
  border-bottom:1px solid #dfdfdf;
  display:flex;
  align-items: center;
  padding:0 5px;
  justify-content: space-between;
}

.fe-content{
  background:#fff;
  height:calc(100% - 30px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>