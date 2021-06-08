<template>
  <div class="l-file-icon"  @click.stop="$emit('event',{type:'select'})">
    <div>
    <Icon :type="'ios-document'" color="#346" size="40">
    </Icon>
    </div>
    <div class="l-file-name">{{data.name}}
    </div>
  </div>
</template>

<script>
export default {
  props:['data']
}
</script>

<style>
.l-file-icon{
  width:80px;
  height:100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
}

.l-file-name{
  font-size:10px;
  width:70px;
    text-align:center;
    white-space: pre-wrap;
    word-break: break-all;
  height:38px;
  text-overflow: ellipsis;
  font-size:10px;
  overflow: hidden;

}
</style>