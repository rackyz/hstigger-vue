
<style lang="less">
.selectable-tree-node{
  display: flex;
  align-items: center;
  margin:0;

  .ivu-checkbox{
     .ivu-checkbox-inner{
      background:#eee;
      
    }
    .ivu-checkbox-inner:after{
      color:#333;
    }
  }

  .ivu-checkbox-checked{
    .ivu-checkbox-inner{
      background:#2d8cf0;
    }
  }
 
}

</style>
<template>
  <hs-tree class="transparent" :data="data"  @on-select='onSelect' :nodeRenderer="nodeRenderer"  />
</template>

<script>
export default {
  props:{
    'data':{
      type:Array,
      default:[]
    },
    value:{
    type:Array,
    default:[]
    }
  },
  methods:{
    onSelect(e){
      if(this.value.includes(e)){
        let index = this.value.findIndex(v=>v==e)
        this.value.splice(index,1)
      }else{
        this.value.push(e)
      }
      this.$emit('input',this.value)
    },
    nodeRenderer(h,param){
      return h('Checkbox',{
        class:"selectable-tree-node",
        props:{
          value:this.value.includes(param.id)
        },
        on:{
          input:e=>{
            this.onSelect(param.id)
          }
        }
      },param.name)
    }
  }
}
</script>
