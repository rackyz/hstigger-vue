<template>
  <div class='hsx-attr'>
    <template v-for="a in items">
      <div class='hsx-attr-item flex-wrap' :class="selected==a?'hsx-attr-item-selected':''" :key='a.key'>
        <div class='key'>{{a.key}}</div>
        <div class='value' @click="handleSelect(a)">
          <template v-if="a.value.length > 60 && typeof(a.value) != 'object'">
          <Tooltip transfer theme="light"  max-width='300' :content="a.value">{{a.value.slice(0,60)}} ...</Tooltip>
          </template>
          <template v-else>
            {{a.value}}
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    },
    selected:{
      type:Object,
      default:null
    }
   
  },
  computed:{
    keys(){
      if(this.data && typeof this.data == 'object')
        return Object.keys(this.data)
      else
        return []
    },
    items(){
      return this.keys.map(v=>({key:v,value:this.data[v]}))
    }
  },methods:{
    handleSelect(a){
      this.$emit('select',a)
    }
  }
}
</script>

<style lang="less" scoped>
.hsx-attr{
    font-size:10px;
  .hsx-attr-item{
    padding:0;
    .key{
      background:#666;
      border-bottom:1px solid #555;
      color:#fff;
      width:100px;
      overflow: hidden;
      white-space: nowrap;
      padding:0 5px;
      text-overflow: ellipsis;
    }
    .value{
      overflow: hidden;
      width:400px;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding:0 5px;
      border-bottom:1px solid #ccc; 
      border-right:1px solid #ccc;
    }
  }

  .hsx-attr-item:first-child{
    .key{
      border-top:1px solid #555;
    }
    .value{
      border-top:1px solid #ccc;
    } 
    
  }

  .hsx-attr-item-selected{
    .key{
       filter:brightness(1.1);
    }
   
    .value{
      background:#ffe;
    }
  }
}
</style>