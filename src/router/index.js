import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
import register from '../components/registration.vue'
import login from '../components/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/reg',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
