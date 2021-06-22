<template>
  <div class="news-item">
    <a style="color:#3af;" @click.prevent='onClick'> <Icon type="md-notifications" /> {{data.title}} <span class="l-hurry" v-if="data.hurry">紧急</span></a>
    <div class='date'>{{data.date}} </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  methods:{
    onClick(e){
      this.RouteTo("/public/notices/"+this.data.id,true)
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

  .l-hurry{
    padding:2px 5px;
    color:red;
    font-family: consolas;
    
  }
}
</style>