<template>
  <div class="news-item">
    <a href='#' @click.prevent='onClick'>{{data.title}}</a>
    <div class='date'>{{data.date}}</div>
  </div>
</template>

<script>
export default {
  props:['data'],
  methods:{
    onClick(e){
      
    }
  }
}
</script>
<style lang="less" scoped>

.news-item{
  width:100%;
  font-size:13px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height:20px;
  overflow: hidden;
  
  .date{
    min-width:50px;
    text-align: right;
  }

  a{
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
}
</style>