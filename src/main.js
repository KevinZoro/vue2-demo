import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router'
import store from './vuex/store';

Vue.use(ElementUI)
Vue.use(router);
router.beforeEach(({meta, path}, from, next) => {
    let { auth = true } = meta
    let isLogin = Boolean(window.localStorage.getItem("token") && window.localStorage.getItem("token_expired")>new Date().getTime()) //true用户已登录， false用户未登录
    if (auth && !isLogin && path !== '/login') {
        window.localStorage.clear();
        return next({ path: '/login' })
    }
    next()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})