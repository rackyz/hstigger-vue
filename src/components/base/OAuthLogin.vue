<style lang='less'>

.oauth-icon:hover{
    color:yellowgreen !important;
    transition: all 0.5s;
    cursor: pointer;
}
</style>
<template>
  <div class='oauth-wrap' style='margin-top:20px;' >
        <div><Icon custom='gzicon gzi-huowudui' size='19' style='margin-right:10px' color='rgb(35, 240, 255)' />其他登录方式</div>
        <div class='flex-wrap'>
        <template v-for='oi in oauthItems'>
            <Icon :custom='`gzicon gzi-${oi.icon}`' :size='oi.size || 17' color='rgba(200,200,200,0.5)' :key='oi.icon' style='margin:0 5px;' class='oauth-icon' />
        </template>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      oauthItems:[{
                icon:'qq',
                title:"QQ登录"
            },{
                icon:'wechat',
                title:"微信登录",
                size:21
            },{
                icon:'dingding-o',
                title:"钉钉登录"
            },{
                icon:'QR-code',
                title:'手机扫码',
                size:16
            }],
    }
  }
}
</script>

<style lang="less" scoped>
.oauth-wrap{
  background:rgba(255,255,255,0.1);
  line-height:50px;
  width:100%;
  height:50px;
  color:#aaa;
  text-align: center;
   display: flex;
    justify-content: space-between;
    padding:0 20px;
}

</style>