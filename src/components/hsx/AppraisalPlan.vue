<template>
  <div class="l-class-plan" :class="isFinished?'l-finished':''"  @click.stop="$emit('event',{type:'select'})">
    
      <div class="text-panel">
        <div class="text-title">{{data.name}}</div> 
        <div class="text-desc">{{data.desc}}</div>
      </div>
      <div>
        {{data.started_at?moment(data.started_at).format("L"):"-"}} -- {{data.deadline?moment(data.deadline).format("L"):"-"}}
     </div>
     <div :style="{color:getState(data.state).color}">
        {{getState(data.state).name}}
     </div>

     <div>
       人数 {{data.count || 0}} 提交 {{data.submitted || 0}} 通过 {{data.passed || 0}}
     </div>

  </div>
</template>

<script>
export default {
  props:['data'],
  computed:{
    isFinished(){
      return this.data.started_at && moment().subtract('day',1).isAfter(moment(this.data.started_at))
    }
  },
  methods:{
    getState(e){
      return this.$store.getters['core/getTypeByValue']("TASK_STATE",e) || {}
    }
  }
}
</script>
<style lang="less" scoped>


.l-class-plan{
  width:100%;
  
  height:120px;
  background:#fff;
  position: relative;
  color:#333;
  position: relative;
  padding:10px;
  margin:0 !important;
  margin-bottom:5px !important;
  border:1px solid #ddd;
  flex-direction: column;
 .text-index{
      background:#346;
      color:#aaa;
      width:40px;
      height:40px;
      margin:0 5px;
      margin-right:20px;
  font-weight: bold;
  line-height:40px;
}

  .text-panel{
    
    .text-title{
      font-size:15px;
      font-weight: bold;
      color:#333;
    }
    .text-desc{
      margin-top:2px;
      color:#666;
      height:20px;
      font-size:10px;
      text-align: left;
      max-width: 300px;
      overflow:hidden;
      text-overflow: ellipsis;
    }
  }
}


.l-finished{
  background:#dfdfdf;
  filter:grayscale(1);
}
</style>