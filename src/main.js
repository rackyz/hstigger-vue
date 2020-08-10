import Vue from 'vue';
import App from './App';
import router from './router.js';
import store from './store'
import './plugins'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted(){
    console.log("APP startup")
    console.error(this.$api)
  }
}).$mount('#app')
