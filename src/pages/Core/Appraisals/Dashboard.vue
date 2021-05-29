<template>
  <div style="margin:20px auto;width:1200px;">
    <Row :gutter="20">
      <Col :span='8'>
      <Card title="我的课程详情"> 
        
      </Card>
      <Card title="最新资料"  style="margin-top:20px;"> 
        
      </Card>
      </Col>
      <Col :span='16'>
      <Card title="课程">

      </Card>
      <Card title="作业及评分" style="margin-top:20px;"> 
         <a slot="extra">MORE</a> 
      </Card>
      
       <Row :gutter="20" style="margin-top:20px;">
      <Col>
        <Card title="培训风采"></Card>
      </Col>
    </Row>

       <Card title="最新讨论" style="margin-top:20px;">
         <a slot="extra">MORE</a> 
        
      </Card>

      </Col>
      

    </Row>
   

  </div>
</template>

<script>
export default {
metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
}
</script>

<style>

</style>