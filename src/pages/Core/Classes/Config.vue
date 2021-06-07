<template>
  <BaseConfig />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:{
     ...mapGetters('training',['item']),
    config:{

    }
  },
  metaInfo:{
   title:"培训课程", 
    route:'/:id'
  },
}
</script>

<style>

</style>