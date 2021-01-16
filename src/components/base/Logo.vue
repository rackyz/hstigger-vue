<template>
  <div class="l-logo flex-wrap">
    <template v-if='!ent'>
      <img src="http://www.hstigger.com/img/logo-flat.0ce4c896.png" />
      <span style='color:#fff'>个人模式</span>
    </template>
    <template v-else>
      <img :src="ent.avatar" />
      <span style='color:gold;font-size:16px;'>{{ent.shortname}}</span> 
      
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
  cursor: pointer;
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
}


.l-logo:active{
  position: relative;
  bottom:-1px;
}

</style>
