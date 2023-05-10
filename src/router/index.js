import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import AesUtils from '@/utils/AesUtils'

Vue.use(Router)

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
 
// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
};
 
//replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/login'
  },{
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login')
  },{
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/student/register')
  },{
    path: '/index',
    name: 'Layout',
    component: () => import('@/pages/layout'),
    children: []
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if(to.path != '/' && to.path != '/login' && to.path != '/register') {
    if(!localStorage.getItem('token')) {
      localStorage.clear()
      next({path: '/login'})
    }else {
      if(sessionStorage.getItem('sign') && AesUtils.decrypt(sessionStorage.getItem('sign')) == store.getters.uid) {
        if(router.getRoutes().length < 5) {
          store.dispatch("getRoutes", store.getters.uid).then(routeList => {
            routeList.forEach(route => {
              router.addRoute('Layout', route)
            })
            // hack方法 确保addRoutes已完成
            // 解决页面刷新路由丢失
            next({...to, replace: true})
          })
        }else {
          if(to.path == '/index') {
            next(store.getters.routes[0].path)
          }else {
            next()
          }
        }
      }else {
        next('/login')
      }
    }
  }else {
    next()
  }
  // if(to.path == '/login') {
  //   next()
  // }
})

router.afterEach((to, form) => {
  NProgress.done()
})

export default router