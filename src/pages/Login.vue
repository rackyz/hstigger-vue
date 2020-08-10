
<template>
   <Layout class="login-page">
      <Content class="login-container">
           <BaseLogin class="login-wrap" />
           <div class="copyright">
             <div class="company">
                <img src="@assets/logo.png"> 
                宁波江北开发投资集团有限公司
            </div>
            <span class='sub'>联系地址: 宁波市江北区慈城镇保黎北路55号 </span>
            </div>
        </div>
      </Content>
   </Layout>
</template>
<style lang="less">
.login-page{
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), radial-gradient(at top center, rgba(255, 255, 255, 0.40) 0%, rgba(0, 0, 0, 0.40) 120%) #989898;
  background-blend-mode: multiply,multiply;
  position: relative;
  width:100%;
  height:100%;

}
.login-container{
  height:calc(100%-100px);
  
  background:#ccc;
}

.login-wrap{
  margin:100px auto;
  margin-bottom:20px;
}

.copyright{
  width:100%;
  text-align: center;
  font-size:20px;
  .company{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img{
    width:25px;
    height:25px;
    margin-right:10px;
  }

  .sub{
    font-size:16px;
  }
}
</style>

