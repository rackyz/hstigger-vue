<template>
  <div class="flex-wrap flex-between l-article-list-item">
    <div class="flex-wrap">
      <div class="l-date-block">
        {{moment(data.created_at).format("MM/DD")}}
      </div>
      
      <div class="l-art-title" @click="RouteTo(`/public/notices/${data.id}`)">{{data.title}}
        </div>
        <div class="flex-wrap" v-if="data.files" style='margin-left:5px;padding:5px;border:1px solid #dfdfdf;font-size:12px;border-radius:3px;color:#333;'> <Icon type="md-attach"  style='' />附件 </div>
     
        
    </div>
    <div class="flex-wrap">
   
      <div class="flex-wrap" style='margin-left:5px;padding:5px;border:1px solid #dfdfdf;font-size:12px;border-radius:3px;color:#333;'>
        created by 
        <hs-avatar :userinfo="getUser(data.created_by)" size="20" style="margin:0 5px" /> {{getUser(data.created_by).name}}
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters('core',['getUser','session'])
  },
  props:['data']
}
</script>
<style lang="less" scoped>
.l-article-list-item{
  width:100%;
  padding:10px;
  margin:0;
  background:#fff;
}
.l-article-list-item:last-child{
  border:none;
}

.l-art-title{
  font-size:14px;
  margin-left:10px;
  color:rgb(47, 101, 182);
}

.l-date-block{
  background:#36a;
  padding: 10px;
  font-size:15px;
  margin-right:10px;
  color:#fff;
  font-family: 微软雅黑;

}
</style>