<template>
  <div class="l-admin-module" :class="{'l-admin-module-disabled':data.disabled}">
    <div class="flex-wrap flex-between">
       <div class="l-module-type"> {{getTypeByValue('ModuleType',data.type).name}} {{data.type}}</div>
        <div>  <i-switch size="small" :value="!data.disabled" @change='onChangeEnabled' /></div>
    </div>
    
    <div class="l-module-name">
      {{data.name}}
      

    </div>
   
    <div class="l-module-desc">
      {{data.desc}}
    </div>
    <div class="l-module-state" :style="`color:${getTypeByValue('ModuleState',data.state).color}`">
     {{getTypeByValue('ModuleState',data.state).name}}
    </div>
     <div class="l-module-version">
      v {{data.version}} 
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props:['data'],
  computed:{
    ...mapGetters('core',['getTypeByValue'])
  },
  methods:{
    onChangeEnabled(e){
      this.data.disabled = e
    }
  }
}
</script>
<style lang="less">
.l-admin-module{
  width:220px;height:150px;border-radius:10px;padding:8px;background:#333;border:1px solid #ddd;color:#fff;flex-direction:column;

  .l-module-version{
    font-size:10px;
    background:#111;
    border-radius:3px;
    width:50px;
    text-align: center;

    position: absolute;
    right:8px;
    bottom:8px;
    color:#aaa;
  }

  .l-module-state{
     font-size:10px;
    border-radius:3px;
    padding:0 5px;
    text-align: center;

    position: absolute;
    left:8px;
    bottom:8px;
  }

  .l-module-name{
    color:#3af;
    font-size:18px;
  }

  .l-module-type{
    font-size:10px;
  }

  
.l-module-desc{
  margin-top:5px;
  max-height:80px;
  text-overflow: ellipsis;
  font-size:10px;
  color:#aaa;
 
  
}
}

.l-admin-module-disabled{
  filter:brightness(0.8) grayscale(1);
}


.l-admin-module:hover{
  background:#333;
  filter:brightness(1.2);
}


</style>