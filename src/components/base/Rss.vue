<template>
  <div class="l-admin-module" :class="{'l-admin-module-disabled':data.disabled}" @click.self="onChangeEnabled">
    <div class="flex-wrap flex-between">
       <div class="l-module-type"><Icon size="14" :custom="`gzicon gzi-${getTypeByValue('RSS_SUBJECT_TYPE',data.subject_type).icon || 'apps'}`" /> {{getTypeByValue('RSS_SUBJECT_TYPE',data.subject_type).name}}</div>
        <div>  <i-switch size="small" :value="!data.disabled" @on-change='onChangeEnabled'  /></div>
    </div>
    
    <div class="l-module-name">
      {{data.name}}
      

    </div>
   
    <div class="l-module-desc">
       {{getTypeByValue('RSS_SOURCE_TYPE',data.source_type).name}} {{getTypeByValue('RSS_MEDIA_TYPE',data.media_type).name}} <br /> <a :href="data.link" target="_blank">源站链接</a>
    </div>
    <div class="l-module-state" :style="`color:${getTypeByValue('ModuleState',data.state).color}`">
     <span style='font-size:10px'></span> {{getTypeByValue('ModuleState',data.state).name}}
    </div>
    <div></div>
    
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
    onChangeEnabled(){
      this.$emit('event',{type:'disabled',data:!this.data.disabled})
    }
  }
}
</script>
<style lang="less">
.l-admin-module{
  width:220px;height:150px;border-radius:10px;padding:8px 10px;border:1px solid #ddd;color:#fff;flex-direction:column;
  background:#fff;
  color:#333;

  .l-module-version{
    font-size:10px;
    background:#ddd;
    border-radius:3px;
    width:50px;
    text-align: center;

    position: absolute;
    right:8px;
    bottom:8px;
    color:#333;
  }

  .l-module-state{
     font-size:8px;
     font-family: '宋体';
    border-radius:3px;
    padding:0 5px;
    text-align: center;

    position: absolute;
    right:5px;
    bottom:5px;
  }

  .l-module-name{
    margin-top:5px;
    color:#2d8cf0;
    font-size:14px;
     font-weight: bold;
  }

  .l-module-type{
    font-size:10px;
    font-weight: bold;
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
  background:#dfdfdf;
  .l-module-name{
    color:#aaa;
  }
  .l-module-desc{
    color:#444;
  }

  .l-module-name{
  
     font-weight: normal;
  }

  .l-module-type{
   font-weight: normal;
  }
}


.l-admin-module:hover{
  
  filter:brightness(1.05);
}


</style>