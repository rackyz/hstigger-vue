<template>
  <div class="hs-container hs-container-scroll" style='padding:20px;'>
    <UserView :id="uid" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
let UserView = require('../Users/Index')
export default {
  components:{
    UserView
  },
  computed:{
    ...mapGetters('core',['uid'])
  }
}
</script>

<style>

</style>