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
          <div class="l-time" style="text-align:right;color:#333;font-size:10px;">
            {{getState(data.state || 0).name}}<br /> 已报名 {{data.count || 0}}
           <br />
          
        </div>
        <a class="l-hover" style="position:absolute;right:10px;bottom:80px;background:#ffffff66;color:red;padding:3px 10px;border-radius:3px;font-size:10px;" @click.stop="handleDelete(data.id)"><Icon type="md-trash" /> 删除</a>

        
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
    getState(e){
       let states = this.$store.getters["core/getTypes"]('TASK_STATE')
      let t = states.find(v=>v.value == e)
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
    },
    handleDelete(id){
      this.$emit('event','delete')
     
    }
  }
}
</script>
<style lang="less" scoped>
.l-class-item{
  width:300px;
  height:250px;
  background:#fff;
  position: relative;
  .l-info{
    position: absolute;
    left:0;
    bottom:0;
    right:0;
    padding:10px;
     .l-name{
    font-weight: bold;
    color:#333;
    font-size:16px;
    margin-bottom:3px;
  }

  .l-charger{
    color:#333;
  }

 
  }
 
  .l-time{
    color:orange;
      position: absolute;
    right:10px;
    bottom:10px;
  }
  
  img{
    position: relative;
    width:100%;
    height:calc(100% - 70px);
    filter:brightness(0.8);
  }
}

.l-class-item:hover{
  transition: all 0.3s;
  filter:brightness(1.1) drop-shadow(1px 1px 1px #aaa);;
}

</style>