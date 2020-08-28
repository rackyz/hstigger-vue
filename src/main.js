import Vue from 'vue';
import App from './App';

import router from './router.js';
import store from './store'
import './plugins'

process.env.VUE_APP_MOCK && require('../mock/index.js')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
