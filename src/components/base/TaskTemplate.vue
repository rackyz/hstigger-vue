<template>
   <div class="l-task-tmpl-item" :key="data.id">
       
        <div class="l-name flex-wrap"> <Icon type="ios-list" size='15' :color="data.color" style='margin-right:5px;' /> {{data.name}}</div>
        <div class='l-desc'>{{data.desc}}</div>
        <Button type="primary" class='l-right' @click="onCreate">
         创建
        </Button>
    </div>
</template>

<script>
export default {
  props:['data'],
  methods:{
    onCreate(e){
      this.$emit('event',{type:'create',data:e})
    }
  }
}
</script>
<style lang="less" scoped>
.l-task-tmpl-item{
  padding:10px;
  padding-right:60px;
  width:100%;
  height:60px;
  border:1px solid #dfdfdf;
  display: flex;
  flex-direction: column;
  .l-name{
    font-weight: bold;
    color:#333;
  }

  .l-desc{
    font-size:12px;
    color:#aaa;
  }

  .l-right{
    position: absolute;
    right:0;
    top:0;
    bottom:0;
    width:60px;
    margin:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:15px;
    line-height:20px;
  }
  
}



</style>