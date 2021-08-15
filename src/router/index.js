import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/index.vue'
import Register from '../components/registration.vue'
import Login from '../components/login.vue'
import Biometrics from '../components/biometrics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/reg',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/bio',
    name: 'biometrics',
    component: Biometrics
  }
]

const router = new VueRouter({
  routes
})

export default router
