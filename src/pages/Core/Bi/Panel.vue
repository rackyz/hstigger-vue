<template>
  <div class='hs-container' >
    <div class='pm-status'>
         <div class='ei-title'>企业经营综合情况
           <div class='sub'>ENTERPRISE OPERATION STATUS</div>
         </div>
         <ButtonGroup class='ei-flat-wrap'>
           <Button @click='RouteTo("/core/bi/chart")'>图表分析</Button>
           <Button @click='RouteTo("/core/bi/dataanalysize")'>数据分析</Button>
         </ButtonGroup>
           <Row :gutter='20' style='width:1300px;margin:0 auto;z-index:100;'>
      <Col :span='4'>
        <div class='count-card' :class="{'count-card-active':currentModule==0}" @click='currentModule=0'><Icon custom='gzicon gzi-Building-'></Icon>项目 <span class='ei-count'>{{getCount(currentYear)}}<div class='unit'>个</div></span>
        
        <div class='sub'>PROJECTS</div></div>
      </Col>
      <Col :span='4'>
        <div class='count-card'  :class="{'count-card-active':currentModule==1}"  @click='currentModule=1'><Icon custom='gzicon gzi-money'></Icon>产值<div class='sub'>PRODUCTION</div> <span class='ei-count'>{{hs.formatSalary(getTransferred(currentYear))}}<div class='unit'>元</div></span>
        </div>
      </Col>
       <Col :span='4'>
        <div class='count-card'  :class="{'count-card-active':currentModule==2}"  @click='currentModule=2'><Icon custom='gzicon gzi-supervisor'></Icon>员工 <span class='ei-count'>{{getHumans(currentYear)}}<div class='unit'>人</div></span>
        <div class='sub'>EMPLOYEES</div></div>
      </Col>
       <Col :span='4'>
        <div class='count-card'  :class="{'count-card-active':currentModule==3}"  @click='currentModule=3'><Icon custom='gzicon gzi-renzhengchenggong'></Icon>开票 <span class='ei-count'>{{hs.formatSalary(getBills(currentYear))}}<div class='unit'>元</div></span>
        <div class='sub'>BILLS</div></div>
      </Col>
       <Col :span='4'>
        <div class='count-card'  :class="{'count-card-active':currentModule==4}"  @click='currentModule=4'><Icon custom='gzicon gzi-leave2'></Icon>客户 <span class='ei-count'>342<div class='unit'>家</div></span>
        <div class='sub'>CLIENTS</div></div>
      </Col>
    </Row>
     <div class='count-card' style='width:150px;padding:8px;padding-right:30px;'>当前 <span class='ei-count' style='right:58px;top:22px;'>{{currentYear}}<div class='unit'>年</div></span>
     <div class='sub'>YEAR</div><Icon custom='gzicon gzi-down' size='25' style='left:auto;right:25px;top:27px;'></Icon></div>
    </div>
    
    <div style='height:calc(100% - 120px);overflow-y:auto !important;width:100%;'>
      {{currentModule}}
        <transition name='fade'>
    <div style='margin:20px auto;width:1400px;overflow:hidden;position:relative;' v-show='currentModule==0'>
   
     <Row :gutter='20'>
      <Col :span='8'>
        <div>
          <div class='ai-title'><Icon custom='gzicon gzi-eventnote' size='22' style='margin-right:5px;'></Icon>项目动态<a href='#'>MORE >></a></div>
      
          <template v-for="pa in getActivities">
            <div :key ="pa.id" class='ai-item'>
             <span class='ai-date'>{{pa.date}}</span> <span class='ai-project'>{{pa.project_name}}</span> <span class='ai-event'>{{pa.event}}</span>
            </div>

          </template>
        </div>
      </Col>
       <Col :span='8'>
        <div>
          <div class='ai-title'><Icon custom='gzicon gzi-Filelocked'  size='22' style='margin-right:5px;'></Icon>重要事项变更<a href='#'>MORE >></a></div>
      
          <template v-for="pa in getActivities">
            <div :key ="pa.id" class='ai-item'>
             <span class='ai-date'>{{pa.date}}</span> <span class='ai-project'>{{pa.project_name}}</span> <span class='ai-event'>{{pa.event}}</span>
            </div>

          </template>
        </div>
      </Col>
       <Col :span='8'>
        <div>
          <div class='ai-title'><Icon custom='gzicon gzi-examinereport2'  size='22' style='margin-right:5px;'></Icon>重点关注项目<a href='#'>MORE >></a></div>
      
          <template v-for="pa in getActivities">
            <div :key ="pa.id" class='ai-item'>
             <span class='ai-date'>{{pa.date}}</span> <span class='ai-project'>{{pa.project_name}}</span> <span class='ai-event'>{{pa.event}}</span>
            </div>

          </template>
        </div>
      </Col>
    </Row>
    <Row :gutter='20' style='margin-top:30px'>
      <Col :span='6'>
       <div class='ai-title'><Icon custom='gzicon gzi-pm2'  size='22' style='margin-right:5px;'></Icon>
      服务类型<a href='#'>DETAIL >></a>
      </div>
        <BaseChart style='height:200px;width:100%;' />
      </Col>
      <Col :span='6'>
        <div class='ai-title'><Icon custom='gzicon gzi-pm2'  size='22' style='margin-right:5px;'></Icon>
      合同金额<a href='#'>DETAIL >></a>
      </div>
       <BaseChart style='height:200px;width:100%;' />
      </Col>
      <Col :span='6'>
      <div class='ai-title'><Icon custom='gzicon gzi-pm2'  size='22' style='margin-right:5px;'></Icon>
      建筑类型<a href='#'>DETAIL >></a>
      </div>
        <BaseChart style='height:200px;width:100%;' />
      </Col>
      <Col :span='6'>
      <div class='ai-title'><Icon custom='gzicon gzi-pm2'  size='22' style='margin-right:5px;'></Icon>
      项目地点<a href='#'>DETAIL >></a>
      </div>
        <BaseChart style='height:200px;width:100%;' />
      </Col>
    </Row>
   
    <div class='ai-title'><Icon custom='gzicon gzi-eventnote' size='22' style='margin-right:5px;'></Icon>项目排行<a href='#'>更多排行信息请前往<span style='color:darkred;margin:0 3px;'>数据分析</span>查看</a></div>
    <Row :gutter='20' style='margin-top:10px'>
      <Col :span='6'>
       金额情况 TOP10
        <Card padding="10">
         <template v-for='(item,i) in getOrderList'>
           <div class='ol-item' :key='item.id'>
              <div><span class='ol-index'>{{i+1}}</span> <span class='ol-name'>{{item.project}}</span></div> <div><span class='ol-value'>{{item.value}}</span></div>
             </div>
         </template>
        </Card>
      </Col>
      <Col :span='6'>
      人员投入[多/少]
        <Card padding="10">
           <template v-for='(item,i) in getOrderList'>
           <div class='ol-item' :key='item.id'>
              <div><span class='ol-index'>{{i+1}}</span> <span class='ol-name'>{{item.project}}</span></div> <div><span class='ol-value'>{{item.value}}</span></div>
             </div>
         </template>
        </Card>
      </Col>
      <Col :span='6'>
      收费情况[多/少]
        <Card padding="10">
           <template v-for='(item,i) in getOrderList'>
           <div class='ol-item' :key='item.id'>
              <div><span class='ol-index'>{{i+1}}</span> <span class='ol-name'>{{item.project}}</span></div> <div><span class='ol-value'>{{item.value}}</span></div>
             </div>
         </template>
        </Card>
      </Col>
      <Col :span='6'>
       人均产值[高/低]
        <Card padding="10">
          <template v-for='(item,i) in getOrderList'>
           <div class='ol-item' :key='item.id'>
              <div><span class='ol-index'>{{i+1}}</span> <span class='ol-name'>{{item.project}}</span></div> <div><span class='ol-value'>{{item.value}}</span></div>
             </div>
         </template>
        </Card>
      </Col>
    </Row>
    项目排行[年度计划]
    <Row :gutter='10' style='margin-top:10px'>
      <Col :span='6'>
       工期情况[提前/滞后]
        <Card padding="10">
          <template v-for='(item,i) in getOrderList'>
           <div class='ol-item' :key='item.id'>
              <div><span class='ol-index'>{{i+1}}</span> <span class='ol-name'>{{item.project}}</span></div> <div><span class='ol-value'>{{item.value}}</span></div>
             </div>
         </template>
        </Card>
      </Col>
      <Col :span='6'>
         人员情况[多/少]
        <Card padding="10">
        <template v-for='(item,i) in getOrderList'>
           <div class='ol-item' :key='item.id'>
              <div><span class='ol-index'>{{i+1}}</span> <span class='ol-name'>{{item.project}}</span></div> <div><span class='ol-value'>{{item.value}}</span></div>
             </div>
         </template>
        </Card>
      </Col>
      <Col :span='6'>
      收费情况[多/少]
        <Card padding="10">
           <template v-for='(item,i) in getOrderList'>
           <div class='ol-item' :key='item.id'>
              <div><span class='ol-index'>{{i+1}}</span> <span class='ol-name'>{{item.project}}</span></div> <div><span class='ol-value'>{{item.value}}</span></div>
             </div>
         </template>
        </Card>
      </Col>
      <Col :span='6'>
       人均产值[多/少]
        <Card padding="10">
          <template v-for='(item,i) in getOrderList'>
           <div class='ol-item' :key='item.id'>
              <div><span class='ol-index'>{{i+1}}</span> <span class='ol-name'>{{item.project}}</span></div> <div><span class='ol-value'>{{item.value}}</span></div>
             </div>
         </template>
        </Card>
      </Col>
    </Row>
    
  </div>
  </transition>
  <transition name='fade'>
  <div v-show='currentModule==1' style="margin:20px auto;width:1400px;overflow:hidden;position:relative;"> 
    <Row :gutter='20' style='margin-top:10px'>
      <Col :span='12'>
       <div class='ai-title'><Icon custom='gzicon gzi-pm2'  size='22' style='margin-right:5px;'></Icon>
      前后2年产值对比<a href='#'>DETAIL >></a>
      </div>
        <BaseChart style='width:100%;height:200px;' />
      </Col>
       <Col :span='12'>
       <div class='ai-title'><Icon custom='gzicon gzi-pm2'  size='22' style='margin-right:5px;'></Icon>
      服务类型产值对比<a href='#'>DETAIL >></a>
      </div>
        <BaseChart style='width:100%;height:200px;' />
      </Col>
      </Row>
      <Row :gutter='20' style='margin-top:10px'>
      <Col :span='12'>
       <div class='ai-title'><Icon custom='gzicon gzi-pm2'  size='22' style='margin-right:5px;'></Icon>
      当年各季度完成产值对比<a href='#'>DETAIL >></a>
      </div>
        <BaseChart style='width:500px;height:200px;' />
      </Col>
       <Col :span='12'>
       <div class='ai-title'><Icon custom='gzicon gzi-pm2'  size='22' style='margin-right:5px;'></Icon>
      服务类型<a href='#'>DETAIL >></a>
      </div>
        <BaseChart style='width:100%;height:200px;' />
      </Col>
      </Row>
  </div>
  </transition>
  <transition name='fade'>
  <div v-show='currentModule==2' style="margin:20px auto;width:1400px;overflow:hidden;position:relative;"> 
    EMPLOYEES
    总员工数 分类 学历 年龄 教育 岗位
    证书 
  </div>
  </transition>
  <transition name='fade'>
  <div v-show='currentModule==3' style="margin:20px auto;width:1400px;overflow:hidden;position:relative;"> 
    BILL
    已开票 计划开票 已到账 计划到账 
    年度情况
    当前情况
    最近一笔
    下一笔
  </div>
  
  </transition>  <transition name='fade'>
  <div v-show='currentModule==4' style="margin:20px auto;width:1400px;overflow:hidden;position:relative;"> 
    CLIENTS
    客户数
    项目数 金额数 区域 
  </div>
  </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
export default {
  data(){
    return {
      currentModule:0,
      currentYear:moment().year()
    }
  },
  metaInfo:{
    title:'企业经营管理'
  },
  computed:{
    ...mapGetters('project',['getCount','getAmount','getHumans','getBills','getTransferred','getActivities','getOrderList']),

  }
}
</script>

<style lang="less" scoped>
.hs-container{
  background:#fff;
  height:100%;
  position: relative;
}
.pm-status{
  height:80px;
  width:100%;
  background:#fff;
  filter:drop-shadow(1px 1px 3px #aaa);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0 20px;
  position: relative;
  z-index: 100;
}


.count-card{
  height:50px;
  font-weight: bold;
  font-size:16px;
 
 
  color:#333;
  padding:8px;
  line-height:18px;
  padding-left:50px;
  cursor:pointer;
  i{
    position: absolute;
    left:18px;
    top:8px;
    font-size:35px;
    color:#777;
  }
  .sub{
    font-size:12px;
  }

  .ei-count{
    position:absolute;
    right:18px;
    top:8px;
    color:rgb(249, 78, 75);
    font-size:15px;
    font-weight: bold;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    .unit{
      font-size:12px;
      text-align: right;
      color:#333;
    }

    text-shadow: none;
  }
}

.count-card:hover,.count-card-active{
  transition:all 0.3s;
  background: #373B44;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #4286f4, #09b1f9);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #4286f4, #0cdefe); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
color:#fff;
text-shadow: 1px 1px 1px #333;

i{
  color:#fff;
}
}

.ei-title{
  font-size:20px;
  color:#000;
  .sub{
    font-size:12px;
  }
}

.ei-ad{
  height:200px;
  overflow: hidden;
  border:2px solid #fff;

  img{
    width:100%;
    height:100%;
  }
}

.ai-item{
  margin-top:3px;
  
  position: relative;
  .ai-date{
    font-size:12px;
    background:#368;
    color:#fff;
    padding:2px 5px;
    border-radius: 5px;
  }

  .ai-project{
    width:240px;
    font-size:14px;
    margin-left:10px;
    border-radius: 5px;
    color:rgb(7, 134, 218);
  }

  .ai-event{
    font-size:14px;
  }
}

.ai-item:hover{
  cursor: pointer;
  color:#3af;
}

.ai-title{
  color: #666;
  
  line-height: 18px;
  font-weight: bold;
  font-size:16px;
  margin-bottom:10px;
  border-bottom:2px solid rgb(154, 154, 154);

  padding-bottom:5px;

  a{
    float:right;font-size:14px;
    color:#358;
  }
}
.ol-item{
  margin-bottom:5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ol-index{
  width:24px;
  border-radius: 3px;
  background:#358;
  color:#fff;
  display: inline-block;
  text-align: center;
}

.ol-value{
  color:rgb(10, 121, 29);
  font-weight: bold;
}

.ei-flat-wrap{
  position: absolute;
  top:65px;
  left:50px;
  z-index: 1000;
}

</style>