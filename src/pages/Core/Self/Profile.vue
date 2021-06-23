<template>
  <div>
    <Button icon="md-create" type="primary" @click="modalProfile=true">修改</Button>
    <hs-modal-form v-model="modalProfile" :data="session" :form="Form('employee')" title="修改档案" @submit="handleUpdateProfile" width="800" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      modalProfile:false
    }
  },
  computed:{
  ...mapGetters('core',['session']),
  },
  methods:{
    handleUpdateProfile(e){

    }
  }
}
</script>

<style>

</style>