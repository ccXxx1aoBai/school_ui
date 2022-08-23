import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/login')
  },{
    path: '/index',
    name: 'Layout',
    component: () => import('@/pages/layout')
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to);
  next()
})

export default router