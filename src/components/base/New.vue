<template>
  <div class="news-item">
    <a :href="data.link" target='_blank'>{{data.title}}</a>
    <div class='date'>{{data.date}}</div>
  </div>
</template>

<script>
export default {
  props:['data']
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
    min-width:100px;
    text-align: right;
  }

  a{
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
}
</style>