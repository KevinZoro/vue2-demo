import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/login',
      meta:{auth:false},
      component: Login
    },
    {
      path: '/Signup',
      meta:{auth:false},
      component: Signup
    },
    {
      path: '/Home',
      component: Home
    }
  ]
})
