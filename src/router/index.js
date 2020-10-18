import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from '../store'

/* 处理编程式导航调用 .push() 仅传递 location 地址信息后还需要调用 catch() 处理异常的问题 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 需要用户登录权限的页面列表
 */
const list = [
  'mine',
  'orderconfirm'
]

// const isLogin = false

/**
 * 全局前置守卫，判断权限
 */
router.beforeEach((to, from, next) => {
  if (list.includes(to.name)) { // 访问的页面需要权限认证
    if (store.state.isLogin) { // 用户已登录，则继续访问
      next()
    } else { // 用户未登录，跳转到登录页面
      next({
        name: 'login',
        params: { // 携带真实要跳转到的页面路径，以便在登录成功后继续向真实页面跳转
          to
        }
      })
    }
  } else { // 不需要权限的页面
    next()
  }
})

export default router
