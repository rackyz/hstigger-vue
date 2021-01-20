<template>
   <div class="l-type-item" :class="{'l-system':data.system}" :key="data.id">
        <Icon type="ios-pricetag" size='20' :color="data.color" style='margin-right:5px;' />
        <div class="l-name">{{data.name}}</div>
    </div>
</template>

<script>
export default {
  props:['data']
}
</script>
<style lang="less" scoped>
.l-type-item{
  padding:10px;
  border:1px solid #dfdfdf;
}



.type-item-system{
  border-color:gold;
}
</style>