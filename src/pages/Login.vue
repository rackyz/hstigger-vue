
<template>
   <div class="page page-debug" style='height:100%;position:relative;width:100%;'>
    
       <Carousel v-model="value1" autoplay :autoplay-speed="8000" radius-dot loop style='position:absolute;left:0;top:0;bottom:0;right:0;overflow:hidden;'> 
        <CarouselItem v-for="p in projects" :key='p.name' style='background:#333;'>
            <div :style='`background:no-repeat url(${p.image}) !important;background-size:100% 100%;width:100%;height:1000px;display:flex;align-items:flex-start;padding:20px;font-size:20px;color:#fff;text-shadow:1px 1px 1px #aaa;`'></div>
        </CarouselItem>
    </Carousel>
     
      <div class="login" style='width:100%;padding:0;margin:0;'>
         
         <div class='flex-wrap login-wrap'>
            
            
    
    <div>  <BaseLoginHeader />
          <BaseLogin style="margin-top:20px;width:380px;" :routeTo="'/core'" />  </div>
         </div>
        
       
      </div>
      <div class='footer' style='flex-direction:column;margin-bottom:20px;width:1000px;'>
         <div>
      
         <div style='color:#aaa;margin:0 auto;'><div style='color:#dfdfdf;font-size:14px;font-weight:bold;'>宁波高专建设监理有限公司</div>创建于1993年，原属宁波高等专科学校（现宁波工程学院）,系宁波市首批监理企业之一。经过二十余年的发展，宁波高专现具有建设监理、招标代理、造价咨询、工程咨询等多项工程咨询类甲级资质。公司一直奉行“方法科学、作风严谨、顾客至上、持续改进”的质量方针，把“顾客满意率、服务优良率”作为质量目标，坚持以专业化的服务为工程建设提供高附加值的咨询成果为发展方向，现已发展成为以提供全过程工程咨询服务为核心业务的综合性工程咨询企业。</div>
        <div>Copyright © 2019-2021  <Icon custom='gzicon gzi-nbgz' /> 宁波高专建设监理有限公司</div></div>
        <div><a href="https://beian.miit.gov.cn/" style='color:#ddd;'>浙ICP备18011212号-3</a></div>
      </div>
   </div>
</template>
<script>
export default {
   metaInfo: { title: '用户登录' },
   data(){
      return {
         value1:0,
         projects:[{
            name:'慈溪文化工件群',
            image:'https://0.rc.xiniu.com/g2/M00/69/6E/CgAGe1qyZlmASLyrAAGyA_2qGhI991.jpg'
         },{
            name:'环球航运中心',
            image:'https://0.rc.xiniu.com/g2/M00/74/66/CgAGfFqybHSASqOJAAG0X-7T_CE140.jpg'
         },{
            name:'宁波航运国际中心',
            image:'https://0.rc.xiniu.com/g2/M00/74/66/CgAGfFqybmKAbbjbAAIU5dmkL2Q999.jpg'
         },{
            name:'罗蒙环球城',
            image:'https://0.rc.xiniu.com/g2/M00/74/67/CgAGfFqycBCAU_jIAADq26QFyfA452.jpg'
         },{
            name:'机场路北延',
            image:'https://0.rc.xiniu.com/g2/M00/74/6E/CgAGfFqy-USALTiwAAFLju9reN4177.jpg'
         },{
            name:'北外环',
            image:'https://0.rc.xiniu.com/g2/M00/74/6E/CgAGfFqy-lqAKVk5AARabS29hqw136.jpg'
         },{
            name:'环城南路',
            image:'https://0.rc.xiniu.com/g2/M00/74/6E/CgAGfFqy-3GAZDPsAALcYj4xSQ8618.jpg'
         },{
            name:'北仑港口博物馆',
            image:'https://0.rc.xiniu.com/g2/M00/74/6F/CgAGfFqy_HmAXd6OAAHVsN5ras8815.jpg'
         }]
      }
   }
}
</script>
<style lang="less" scoped>
.login{
   backdrop-filter:blur(15px) brightness(0.4);
   width:100%;
   height:calc(100%);
   
   margin:0 !important;
   max-width: 100% !important;
   padding:0 !important;
   padding-bottom:150px;
   
}
</style>