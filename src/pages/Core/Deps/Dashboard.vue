<template>
  <div class="hs-container" style="padding:20px;">
    
    <hs-list :data="dep_users" :option="{tmpl:'HsxEmployee'}" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
   metaInfo:{
    title:'部门',
     route:"/:id"
  },
  computed:{
    ...mapGetters('core',['employees']),
    ...mapGetters('dep',['dep']),
    dep_users(){
      return this.dep.users?this.dep.users.map(v=>this.employees.find(e=>e.id == v)).filter(v=>v) : []
    }
  }
}
</script>

<style>

</style>