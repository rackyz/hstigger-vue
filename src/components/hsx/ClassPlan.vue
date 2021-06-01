<template>
  <div class="l-class-plan">
    <Row :gutter="20" style="width:100%;">
      <Col :span="12" style="font-size:15px;text-align:center;">
      <div class="flex-wrap">
      <div class="text-index">

        {{data.index}}
      </div>
      <div class="text-panel">
        <div class="text-title">{{data.name}}</div> 
        <div class="text-desc">{{data.desc}}</div>
      </div>
      </div>
      </Col>
      <Col :span="6" style="font-size:15px;line-height:40px;">
        {{data.started_at || '起止时间'}}
      </Col>
       <Col :span="6" style="font-size:15px;line-height:40px;">
        {{data.state || '进行中'}}
      </Col>
    </Row>

  </div>
</template>

<script>
export default {
  props:['data']
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
</style>