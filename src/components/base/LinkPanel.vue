
<template>
  <Card class="panel" padding='0' style='margin-top:10px;'>
       <div class='card-title'><Icon type='md-folder-open' size='19' /> 常用网站  {{loading?' - 读取中...':''}} <span style='float:right;' class='card-more' @click='RouteTo("/core/self/file")'>MORE</span></div>
      
     <div class="content">
            <template v-for="l in links">
            <div :key="l.id" class="link-item"  @click='RouteTo(l.url,true)'>
               <div class='flex-wrap'>
                 <div class='icon-wrap'>
                 <Icon :custom='`gzicon gzi-${l.icon}`' :color="l.color || '#fff'" size="35"  />
                 </div>
                 
                 
                  <div class="title">{{l.title}} <br /><span class='desc'>{{l.url}}</span></div>
                  </div>

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
        title:"高专项目管理平台",
        url:'http://zzlatm.gicp.net:10000',

        icon:'nbgz',
        color:"#fff"
      },{
        id:2,
        title:"高专监理信息平台",
        url:'http://zzlatm.gicp.net:10020',
        icon:'nbgz',
        color:"#fff"
      },{
        id:3,
        title:"高专合约系统",
        url:'http://oa.nbgzpmis.xyz',
        icon:'nbgz',
        color:"#fff"
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
  height:60px;
  padding:0px;
  margin:2px 0;
  background:rgb(38, 61, 96);
  color:#fff;
  display: flex;
  align-items: center;
  text-shadow: 1px 1px 1px rgb(75, 101, 114);
  font-size:16px;

  .icon-wrap{
     background:rgb(33, 50, 77);
    border-right:2px solid #fff;
    height:60px;
    width:60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right:10px;
  }

  .desc{
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size:13px;
    color:#aaa;
    text-shadow: none;
  }

}

.link-item:hover{
  cursor: pointer;
  transition: all 0.5s;
  filter:brightness(1.2);
}
</style>