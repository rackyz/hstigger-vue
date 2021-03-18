<template>
  <span class="flex-wrap">
    <template v-if="item && item.id"><hs-avatar size='20' :userinfo="item" v-if="item.avatar" style='margin-right:5px'></hs-avatar><a :href="to+'/'+item.id" target="_blank">{{item.name}}</a>
    </template>
    <template v-else>
      无
    </template>
    </span>
</template>

<script>
export default {
  props:{
    to:{
      type:String
    },
    item:{
      type:Object,
      default:()=>{}
    }
  }
}
</script>

<style>

</style>