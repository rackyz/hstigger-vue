<template>
  <div style="height:100%;overflow-y:auto;position:relative;padding-bottom:800px;">
    <Row :gutter="20" style="margin:20px 20px;;height:calc(100% - 100px);">
      <Col :span='6'>
      <img :src="item.avatar || 'https://nbgzfiles-1257839135.cos.ap-shanghai.myqcloud.com/assets/misc/px.jpg'" style="width:100%;height:210px;border:1px solid #aaa;border-bottom:none;" />
      <div style="background:rgb(40, 55, 80);color:#fff;border:none;padding:10px;"> 
        {{item.name}}
      </div>
      <div style="margin-bottom:10px;background:rgb(40, 55, 80);color:#dfdfdf;border:none;padding:20px;padding-top:0;font-size:12px;"> 
        {{item.desc}}

        <div style="margin-top:10px">
          培训地址 {{item.address || '未指定'}}
        </div>
      </div>
      
      
      <div class="l-caption" style="margin-top:10px;">
            讲义课件
          </div>
      <div title="培训资料"  style="background:#fff;padding:10px;border:1px solid #eee;margin-top:10px;"> 
        2020/12/2 讲义课件
      </div>
      </Col>
      <Col :span='12'>
      <Row :gutter="20"  v-if='false'  >
          <Col :span='12'>
          <div    class="l-caption">
            通知
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>
          </Col>
          <Col :span='12'>
           <div class="l-caption">
            动态
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>
          </Col>
      </Row>
      <Row :gutter="20">
          <Col :span='12'>
         
          </Col>
          <Col :span='12'>
           <div class="l-caption">
            培训风采
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>
          </Col>
      </Row>
      
       
      
       <div class="l-caption" style="margin-top:10px;">
            讨论区
          </div>
          
             <div style="margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;"> 
               
      </div>

      
      </Col>
      <Col :span='6'>
      <div class="l-caption" style="margin-top:10px;">
            课程安排
          </div>
      <div  style="border-left:1px solid #eee;border-top:1px solid #eee;border-right:1px solid #eee;width:100%;">
        <template v-for="(p,i) in item.plans">
          <div class="flex-wrap flex-between" :key="i" style="background:#fff;border-bottom:1px solid #eee;display:flex;align-items:center;padding:0px 10px;">
            <div class="flex-wrap flex-between">
            <div style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:1px solid #dfdfdf;border-radius:3px;color:#aaa;font-weight:bold;">
              {{i+1}} 
            </div>
           <div style="padding:10px">
             <div style="font-size:14px;font-weight:bold;"> {{p.name}}</div>
             <div style="font-size:10px;color:#aaa;">{{moment(p.started_at).format('LL')}}, {{p.duration}} h</div>
           </div>
           </div>
           <div :style="{color:getState(p.state).color}">
             {{getState(p.state).name}}
           </div>
        </div>
      </template>
      </div>
      </Col>

    </Row>
   

  </div>
</template>

<script>
export default {
  data(){
    return {
      item:{
      },
    }
  },
  mounted(){
    this.getData()
  },
  computed:{
    id(){
      return this.$route.params.id
    }
  },  
metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
methods:{
   getData(){
      this.api.enterprise.GET_TRAININGS({param:{id:this.id}}).then(res=>{
        let item = res.data.data
        this.item = item
      })
    }, getState(e){
      return this.$store.getters['core/getTypeByValue']("TASK_STATE",e) || {}
    }
}
}
</script>
<style lang="less">
.l-caption{
  margin:5px 0;
  font-weight: bold;
}

.l-panel{
  margin-bottom:10px;background:#fff;color:#aaa;border:none;padding:15px;padding-top:0;height:200px;font-size:12px;
}
</style>