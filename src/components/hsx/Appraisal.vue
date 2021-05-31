<template>
   <div class="l-class-item" :key="data.id" @click="RouteTo(`/core/training/${data.id}/detail`)">
      <img :src="data.avatar || 'https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/assets/misc/px.jpg'" class="l-bg" />
        
       <div class="l-info">

      
        <div class='l-name'>  {{data.name}}
        </div>
        <div class='l-teacher flex-wrap'>
         <hs-avatar :userinfo="getUser(data.teacher)" size="18" style="margin-right:5px;background:#fff;"/> {{getUser(data.teacher).name}}
        </div>
       
         </div>
          <div class="l-time">
          进行中
        </div>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('core',['getUser'])
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

  .l-teacher{
    color:#eee;
  }

 
  }
 
  .l-time{
    color:rgb(175, 255, 144);
      position: absolute;
    right:10px;
    top:10px;
  }
  
  img{
    position: relative;
    width:100%;
    height:100%;
    filter:brightness(0.8);
  }
}

.l-class-item:hover{
  transition: all 0.3s;
  filter:brightness(1.2) drop-shadow(2px 2px 3px #333);;
}

</style>