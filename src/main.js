import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 将 '@/requests/index.js' 下所有 export 的方法都导入，放到 $http 对象中
import * as $http from '@/requests/index.js'

Vue.config.productionTip = false

// 向 Vue 的原型中添加一个自定义的 $http 属性
Vue.prototype.$http = $http

/**
 * 商品价格过滤器
 */
Vue.filter('money', val => {
  return Number(val).toFixed(2)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
