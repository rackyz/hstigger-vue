<template>
<Layout style='width:100%;overflow:hidden;position:relative;height:100%;'>
<template v-for='(r,i) in rows'>
 
  <Row :key='i' :gutter="8"  style='height:100%;'>
    <template v-for='(c,j) in cols'>
       <transition name='fade' :key='j'>
      <Col :key='j'  :span='2' style='margin-bottom:8px;min-width:100px;' v-show='isConfiguring'>
        <div :key='j' class="block" style='background:#dfdfdf;height:100px;'>
           {{r}},{{c}}
        </div>
       
      </Col>
      </transition>
    </template>
  </Row>
    </template>
     <div class="panel" style="width:calc(8.3333% * 2 - 8px);height:calc(110px * 2 - 10px);left:0px;top:0;background:#fff;color:#333;margin:2px;">
       <BaseLogo class='d-none d-sm-block' style="padding:10px;width:100%;"></BaseLogo>
       <div style='padding:10px;padding-top:0;'>
         天气/当日信息
      早上好,胡佳翰
       </div>
       <a class="text-button" @click='isConfiguring=!isConfiguring'><Icon type='ios-cog'></Icon></a>
      
    </div>
    <!-- <div class="panel" style="  width:calc(8.3333% * 7 - 2px);height:calc(110px * 6 - 20px);left:calc(8.3333% * 2 );top:2px;background:rgba(200,200,200,0.7);filter:drop-shadow(1px 1px 2px #333) brightness(1.1);padding:20px;">
      日历
    </div>
    <div class="panel" style="  width:calc(8.3333% * 3 - 8px);height:calc(110px * 6 - 20px);left:calc(8.3333% * 9 + 4px);top:2px;background:#333;color:#fff;padding:20px;">
      待办任务
    </div> -->
    </Layout>
</template>

<script>
export default {
  data(){
    return {
      isConfiguring:false
    }
  },
  computed:{
    rows(){
      return [0,1,2,3,4,5,6,7,8]
    },
    cols(){
      let a = []
        for(let col=0;col<12;col++){
          a.push(col)
        }

      return a
        
    } 
  },
  metaInfo:{
    title:'工作台'
  }
}
</script>

<style lang="less" scoped>
.panel{
  background:#fff;
  position: absolute;
  top:0px;
  border:1px solid #aaa;
  margin:2px;
  z-index: 10;
}
</style>