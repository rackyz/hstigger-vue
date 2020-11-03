<template>
  <div class='hs-container hs-container-scroll'>
    
    <div class='ent-panel flex-wrap' style='margin:10px;'>
      <hs-avatar :userinfo="enterprise_info" size='80' />
      <div class='info' style='margin-left:20px;'>
        <div class='ent-name'>{{enterprise_info.name}}</div>
        <div class='ent-person'>{{enterprise_info.member_count}} 人</div>
        </div>
    </div>
    <Alert  style='margin:10px;'>本模块企业账户个性化配置。</Alert>
    <Tabs :value='tabIndex' style='margin:10px;' type='card'>
      <TabPane label='企业信息' name='0' style='background:#fff;padding:20px;'>
        联系电话

        公司地址

        公司简介

      

      </TabPane>
         <TabPane label='企业账号' name='1' style='background:#fff;padding:20px;'>
        账号名称: root
        上次登录:
        已开放模块:
        
      

      </TabPane>
         <TabPane label='企业个性化' name='2' style='background:#fff;padding:20px;'>
        系统名称
        系统图标
        主题


      

      </TabPane>
    </Tabs>
   
   

  </div>
</template>

<script>
export default {
  data(){
    return {
      tabIndex:'0',
      enterprise_info:{
        id:1034,
        name:'宁波高专建设监理有限公司',
        avatar:'https://nbgz-pmis-1257839135.cos.ap-shanghai.myqcloud.com/cloud/nbgz.png',
        frame:1,
        account:'root',
        member_count:345
      }
    }
  }
}
</script>

<style lang="less">
.ent-panel{
  background:rgb(3, 43, 86);
  
  padding:10px;
  color:#fff;
  border:5px solid #fff;
  border-radius: 10px;
}
.row-table-header{
  border-bottom:1px solid #dfdfdf;
  padding-bottom:5px;
  margin-bottom:10px;
}

.ent-name{
  font-size:20px;
}

.ent-person{
  font-size:15px;
}
</style>