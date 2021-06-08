<template>
  <div class="l-class-plan" :class="isFinished?'l-finished':''"  @click.stop="$emit('event',{type:'select'})">
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
      <Col :span="6" style="font-size:15px;text-align:center;">
        <div style="font-size:10px;text-align:left;">培训地点</div>
        <div style="color:#3af;text-align:left;">{{data.address || item.address}}</div>
      </Col>
      <Col :span="3" style="font-size:15px;">
        {{data.started_at?(moment(data.started_at).format("L , ")+(data.duration?data.duration+'小时':'')):'时间未设置'}}
        <div style="color:#aaa;font-size:10px;">{{data.started_at?moment(data.started_at).fromNow():''}}</div>
      </Col>
       <Col :span="3" style="font-size:15px;line-height:40px;" >
       <div style="text-align:right;">
        <div class="l-time" style="flex-direction:column;line-height:25px;"  :style="`color:${getState(data).color || '#333'}`">
          {{getState(data).name || '准备中'}}
           <div style="font-size:10px;line-height:15px;color:#3af;" v-if="data.video_url" @click="$emit('event','video')">
            <Icon type="md-videocam" /> 视频回放
          </div>
          <div style="font-size:10px;line-height:15px;color:red;" v-else>
            未上传回放视频
          </div>
          </div>
         
          </div>
      </Col>
    </Row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('training',['item']),
    isFinished(){
      return this.data.started_at && moment().subtract('day',1).isAfter(moment(this.data.started_at))
    }
  },
  methods:{
    getState(e){
      return e.state ? this.$store.getters['core/getTypeByValue']("TASK_STATE",e.state) : {name:e.stateText,color:e.stateColor}
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
      text-align: left;
    }
    .text-desc{
      margin-top:2px;
      color:#666;
      height:20px;
      font-size:10px;
      text-align: left;
      max-width: 300px;
      white-space: nowrap;
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