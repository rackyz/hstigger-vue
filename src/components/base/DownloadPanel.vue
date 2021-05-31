
<template>
  <Card class="panel" padding='0' style='margin-top:10px;'>
       <div class='card-title'><Icon type='md-folder-open' size='19' /> 常用软件  {{loading?' - 读取中...':''}} <span style='float:right;' class='card-more'></span></div>
      
   
      <div class="content">
            <template v-for="l in links">
            <div :key="l.id" class="link-item">
               <div class='flex-wrap'>
                 <div class='icon-wrap' style=' background:#fff;'>
                   <img v-if='l.avatar' :src='l.avatar' style='width:90%;height:90%;' />
                 <Icon :custom='`gzicon gzi-${l.icon}`' :color="l.color || '#fff'" size="35" v-if="!l.avatar" />
                 </div>
                 
                 
                  <div class="title">{{l.title}}</div>
                  
                  </div>
            <div class='flex-wrap l-enter' style='color:#359;' @click='RouteTo(l.url,true)'>下载<Icon type="ios-arrow-forward" style='margin-left:2px;'></Icon></div>
            </div>
          </template>
          <BaseEmpty v-if='links.length == 0' />
        </div>
    </Card>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      loading:false,
      links:[{
        id:1,
        title:"Google Chrome 浏览器 v13.0.4",
        avatar:'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/system/chrome.jpg',
        url:'http://zzlatm.gicp.net:10000/public/upload/20190916/20190916_5d7f2f83da6e8.exe',

        icon:'nbgz',
        color:"#1E9FFF"
      }]
    }
  },
  mounted(){
    this.getData()
  },
   methods:{
     getData(){
     
     },
   }
}
</script>
<style lang="less" scoped>
.content{
  padding:5px 10px;
  

}

.link-item{
  height:25px;
  padding:0px;
  margin:2px 0;
  color:#333;
  display: flex;
  align-items: center;
  font-size:14px;
  justify-content: space-between;
  width: 100%;

  .icon-wrap{
     background:rgb(33, 50, 77);
    height:25px;
    width:25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right:5px;
   
  }


}

.l-enter:hover{
  cursor: pointer;
  transition: all 0.5s;
  filter:brightness(1.2);
}
</style>