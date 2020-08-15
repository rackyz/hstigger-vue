import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
Vue.use(Router);
Vue.use(iView);


// Read apps
// Automatically loads and bootstraps files
// in the "./src/components/base" folder.
import {APP_ROUTES} from './plugins/apps'

let router = new Router({

  mode: 'history',
  routes: [{
      path: '/',
      component: resolve => require(['@pages/Login.vue'], resolve),
    },
    {
      path: '/dashboard',
      component: resolve => require(['@pages/Index.vue'], resolve),
      children: [...APP_ROUTES]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish()
  if (route.path != '/')
    localStorage.setItem('last-route-path', route.path)
});

export default router