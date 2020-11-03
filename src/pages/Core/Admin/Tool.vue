<template>
  <div class='hs-container hs-container-scroll'>
    <Alert  style='margin:10px;'>为了兼容企业原有系统的使用，本模块主要用于企业老系统的对接工作，可针对不同的旧版系统做实时对接或彻底的数据迁移工作。<b>数据迁移</b>是将从数据库级对老系统的数据进行梳理和重构，拷贝至新数据库中供以后使用, 无法做到数据的实时性更新。<b>数据链接</b>是通过服务器级的服务，从老系统实时查询数据，可以做到实时动态数据，但缺点是查询速度较慢，容易卡顿。改写数据库容易产生安全问题，所以暂不考虑对旧系统数据进行<span style='color:red'>写入</span>和<span style='color:red'>修改</span>操作。</Alert>
    <Tabs :value='tabIndex' style='margin:10px;background:#fff;' type='card'>
      <TabPane label='钉钉' name='0' style='background:#fff;padding:20px;'>
      
         <Row :gutter='10' class-name='row-table-header'>
          <Col :span='4'>
          数据模块
          </Col>
           <Col :span='4'>大小</Col>
          <Col :span='12'>
          上次迁移日期
          </Col>
          <Col :span='4'>操作</Col>
        </Row>
        <Row :gutter='10'>
          <Col :span='4'>
          用户数据
          </Col>
           <Col :span='4'>32KB</Col>
          <Col :span='12'>
          12-03-12
          </Col>
          <Col :span='4'><Button type='primary'>迁移</Button></Col>
        </Row>
      

      </TabPane>
      <TabPane label='OA合约成本系统' name='1'  style='background:#fff;padding:20px;'>
          <Row :gutter='10' class-name='row-table-header'>
          <Col :span='4'>
          数据模块
          </Col>
          
          <Col :span='16'>
          上次迁移日期
          </Col>
          <Col :span='4'>操作</Col>
        </Row>
        <Row :gutter='10'>
          <Col :span='4'>
          用户数据
          </Col>
          <Col :span='16'>
          12-03-12
          </Col>
          <Col :span='4'><Button type='primary'>迁移</Button></Col>
        </Row>
      </TabPane>
      <TabPane label='高专项目管理平台' name='2'  style='background:#fff;padding:20px;'>
         <Row :gutter='10' class-name='row-table-header'>
          <Col :span='4'>
          数据模块
          </Col>
          <Col :span='16'>
          上次迁移日期
          </Col>
          <Col :span='4'>操作</Col>
        </Row>
        <Row :gutter='10'>
          <Col :span='4'>
          用户数据
          </Col>
          <Col :span='16'>
          12-03-12
          </Col>
          <Col :span='4'><Button type='primary'>迁移</Button></Col>
        </Row>
      </TabPane>
    </Tabs>
    <Card style='margin:10px;'>
     <div class='row-table-header'>操作记录</div> 
    </Card>
   

   

  </div>
</template>

<script>
export default {
  data(){
    return {
      tabIndex:'0'
    }
  }
}
</script>

<style lang="less">
.row-table-header{
  border-bottom:1px solid #dfdfdf;
  padding-bottom:5px;
  margin-bottom:10px;
}
</style>