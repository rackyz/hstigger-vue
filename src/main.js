import Vue from 'vue';
import App from './App';
import router from './router.js';
import store from './store'
import './plugins'


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
