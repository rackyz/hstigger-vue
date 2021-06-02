<template>
  <div class="l-class-plan" :class="isFinished?'l-finished':''">
    <Row :gutter="20" style="width:100%;">
      <Col :span="12" style="font-size:15px;text-align:center;">
      <div class="flex-wrap">
      <div class="text-index">

        {{('00' + data.index).slice(-2)}}
      </div>
      <div class="text-panel">
        <div class="text-title">{{data.name}}</div> 
        <div class="text-desc">{{data.desc}}</div>
      </div>
      </div>
      </Col>
      <Col :span="6" style="font-size:15px;line-height:40px;">
        {{data.started_at?(moment(data.started_at).format("L , ")+(data.duration?data.duration+'小时':'')):'时间未设置'}}
      </Col>
       <Col :span="6" style="font-size:15px;line-height:40px;" :style="{color:getState(data.state).color}">
        {{getState(data.state).name}}
      </Col>
    </Row>

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
  height:55px;
  background:#fff;
  color:#333;
  position: relative;
  padding:5px;
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