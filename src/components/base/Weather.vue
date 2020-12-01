<template>
  <div style='padding:10px;padding-top:0;'>
          早上好, <a>{{session.name || session.user}}</a>
          <h3>{{today}}</h3>
       </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters('core',['session']),
    today(){
      return moment().format('YYYY年MM月DD日')
    }
  }
}
</script>

<style>

</style>