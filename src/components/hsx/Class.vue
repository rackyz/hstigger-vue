<template>
   <div class="l-class-item" :key="data.id" @click="RouteTo(`/core/training/${data.id}/detail`)">
      <img :src="data.avatar || 'https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/assets/misc/px.jpg'" class="l-bg" />
        
       <div class="l-info">

      
        <div class='l-name'>  {{data.name}}
        </div>
        <div class='l-charger flex-wrap'>
         <hs-avatar :userinfo="getUser(data.charger)" size="18" style="margin-right:5px;background:#fff;"/> {{getUser(data.charger).name}}
        </div>
       
         </div>
          <div class="l-time" :style="`color:${data.stateColor}`">
          {{data.stateText}}
        </div>
          <span style="position:absolute;left:10px;top:10px;color:#fff;font-size:12px;">{{data.started_at?'开始于 '+smartTime(data.started_at):""}}</span>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('core',['getUser','getTypeByValue'])
  },
  methods:{
    getType(e){
      let types = this.$store.getters["core/getTypes"]('MESSAGE_TYPE')
      let t = types.find(v=>v.value == e)
      return t || {}
    },
    onCreate(e){
      this.$emit('event','create')
    },
    smartTime(e){
      if(moment(e).isAfter(moment().subtract(7,'day'))){
        return moment(e).fromNow()
      }else{
        return moment(e).format('YYYY-MM-DD')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.l-class-item{
  width:24%;
  height:200px;
  .l-info{
    position: absolute;
    left:0;
    bottom:0;
    right:0;
    padding:10px;
     .l-name{
    font-weight: bold;
    color:#fff;
    font-size:16px;
    margin-bottom:3px;
  }

  .l-charger{
    color:#eee;
  }

 
  }
 
  .l-time{
    color:rgb(243, 215, 0);
      position: absolute;
    right:10px;
    top:10px;
    font-size:10px;
    font-weight: bold;
  }
  
  img{
    position: relative;
    width:100%;
    height:100%;
    filter:brightness(0.6);
  }
}

.l-class-item:hover{
  transition: all 0.3s;
  filter:brightness(1.2) drop-shadow(2px 2px 3px #333);;
}

</style>