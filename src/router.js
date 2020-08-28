
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import iView from 'view-design'
import {
  APP_ROUTES,
  APP_PUBLIC_ROUTES
} from './plugins/route'
Vue.use(Vuex)
Vue.use(Router);
Vue.use(iView);

// Read apps
// Automatically loads and bootstraps files
// in the "./src/components/base" folder.

let router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect:'/login'
    },
    ...APP_ROUTES,
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