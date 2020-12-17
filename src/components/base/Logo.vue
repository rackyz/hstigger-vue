<template>
  <div class="l-logo flex-wrap">
    <template v-if='!ent'>
      <img src="http://www.hstigger.com/img/logo-flat.0ce4c896.png" />
      <span style='color:#fff'>个人模式</span>
      <Icon type='ios-arrow-down' style='position:relative;top:-2px;font-weight:normal;margin-left:5px;' size='12' v-show='my_enterprises.length > 0' />
    </template>
    <template v-else>
      <img :src="ent.avatar" />
      <span style='color:gold;font-size:16px;'>{{ent.shortname}}</span> <Icon type='ios-arrow-down' style='position:relative;top:-2px;font-weight:normal;' size='12' v-show='my_enterprises.length > 0' />
      
    </template>
  </div>
 
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'BaseImage',
    computed:{
      ...mapGetters('core',['my_enterprises','current_enterprise']),
      ent(){
      
        if(this.my_enterprises && this.my_enterprises.length > 0){
          if(this.current_enterprise)
           return this.my_enterprises.find(v=>v.id == this.current_enterprise)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.l-logo{
  display: flex;
  align-items: center;
  color:#fff;
  font-size:16px;
  margin-right:10px;
  padding:3px 5px;
  padding-top:2px;
  text-shadow:1px 1px 1px #333;
  border:1px solid #ffffff00;
  border-radius: 2px;
  img{
    width:23px;
    height:23px;
    margin-right:8px;
    position: relative;
    top:-1px;
    border:1px solid rgb(0, 100, 131);
    filter:drop-shadow(1px 1px 1px #333);
    box-shadow:1px 1px 2px #333;
  }


  a{
    color:#fff;filter:drop-shadow(1px 1px 2px #000)
  }

  .l-version{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size:10px;
    padding:0px 5px;
    color:#999;
    
    margin-left:3px;
    border-radius: 3px;
    text-shadow: 1px 1px 1px #333;
    
  }
  
}

.l-logo:hover{
  filter:brightness(1.2);
  background:linear-gradient(to bottom right,#ffffff55,#33333355);
  
  transition: all 1s;
  border:1px solid #333;
  cursor: pointer;
}

.l-logo:active{
  background:linear-gradient(to bottom right,#33333355,#ffffff55);
  position: relative;
  bottom:-1px;
}

</style>
