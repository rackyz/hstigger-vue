<template>
  <div style='padding-top:0;'>
         
         <div id="weather-v2-plugin-standard"></div>

        <BaseScript src="https://apip.weatherdt.com/standard/static/js/weather-standard-common.js?v=2.0"></BaseScript>
        
       </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex'
import axios from 'axios'
window.WIDGET = {ID: '123456',CONFIG: {
    "layout": 1,
    "width": "450",
    "height": "150",
    "background": 4,
    "dataColor": "FFFFFF",
    "backgroundColor": "23334C",
    "language": "zh",
    "borderRadius": 5,
    "key": "r3lHpKIlYJ"
  }}; 
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