<template>
  <div class='user-item' @click='$emit("event",{type:"select",param:data})'>
    <hs-avatar :userinfo='data' :size='40' />
    <div class='user-info'>
       <div class='user-dep'>
        
      </div>
      <div class='user-name'>
           {{data.name}}
      </div>
     
    </div>
   
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:{}
    }
  }
}
</script>
<style lang="less" scoped>
.user-item{
  width:150px;
 padding:5px 10px;
 border-radius: 5px;
  height:60px;
  border:1px solid #dfdffd;
  display:flex;
  align-items: center;
}

.user-info{
  padding:0 5px;
}
.user-dep{
  font-size:12px;
  color:#3af;
}
</style>