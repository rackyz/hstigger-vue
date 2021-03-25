<template>
  <div class="l-permission">
    <div class='l-perm-info'>
      <div class='l-perm-info-name'>
        {{data.name}}
      </div>
       <div class='l-perm-info-desc'>
         {{data.desc}}
        </div>
    </div>
    <div class="l-perm-value">
      <i-switch v-model="data.value" />
    </div>
  </div>
</template>

<script>
export default {
  props:['data']
}
</script>

<style lang="less">
  .l-permission{
    width:100%;
    height:50px;
    border:1px solid #dfdfdf;
    padding:10px;
    border-radius:10px;
    display:flex;
    align-items: center;
    justify-content: space-between;

    .l-perm-info-name{
      font-size:14px;
      color:#08a4f7;
      font-weight: bold;
    }

    .l-perm-info-desc{
      font-size:10px;
      color:#aaa;
    }

  }
</style>