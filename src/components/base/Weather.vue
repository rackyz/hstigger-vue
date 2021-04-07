<template>
  <div style='padding-top:0;'>
         
         <div id="tp-weather-widget"></div>

      
        
       </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
  computed:{
    ...mapGetters('core',['session']),
    today(){
      return moment().format('YYYY年MM月DD日')
    },
  }
}
</script>
<style lang="less">
#weather-v2-plugin-standard{
  width:100% !important;
  overflow:hidden;
}
</style>