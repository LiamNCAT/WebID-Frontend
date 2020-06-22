import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Register from '@/components/registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/reg',
      name: 'Register',
      component: Register
    }
  ]
})
