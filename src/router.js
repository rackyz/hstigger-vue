import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview'
Vue.use(Router);
Vue.use(iView);


// Read apps
// Automatically loads and bootstraps files
// in the "./src/components/base" folder.
import {
  APP_ROUTES,
  APP_PUBLIC_ROUTES
} from './plugins/route'

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