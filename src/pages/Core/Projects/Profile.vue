<template>
  <div class='hs-container hs-container-scroll' style='padding:20px;height:calc(100% - 40px);overflow-y:auto;'>
    <Row :gutter='20'>
      <Col :span='6'> <Card style='height:600px;'>

      </Card></Col>
      <Col :span='18'><Row :gutter="20">
     
      <Col :span='12'>
      <Card style='height:200px;'></Card>
      </Col>
      <Col :span='12'>
      <Card style='height:200px;'></Card>
      </Col>
    </Row>
     <Row :gutter="20" style='margin-top:20px;'>
      <Col :span='24'>
      <Card style='height:200px;'></Card>
      </Col>
    </Row>
    <Row :gutter="20" style='margin-top:20px;margin-bottom:20px;'>
      <Col :span='6'>
      <Card style='height:300px;'></Card>
      </Col>
      <Col :span='6'>
      <Card style='height:300px;'></Card>
      </Col>
       <Col :span='6'>
      <Card style='height:300px;'></Card>
      </Col>
      <Col :span='6'>
      <Card style='height:300px;'></Card>
      </Col>
    </Row></Col>
    </Row>
    
  </div>
</template>

<script>
export default {
metaInfo:{
    title:'项目概况',
     route:"/:id"
  },

}
</script>

<style>

</style>