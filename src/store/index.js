import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// 本地保存购物车数据时的数据结构
// const cart = [
//   {
//     id: 1,
//     title: 'xxxxx',
//     image: '',
//     desc: 'xxxxxx',
//     price: 99,
//     amount: 4,
//     isChecked: false
//   }
// ]
// console.log(cart)

/**
 * 用于实现本地存储（localStorage）业务的插件
 * @param {*} store
 */
const storagePlugin = store => {
  store.subscribe((mutation, state) => {
    // console.log('in plugin', mutation, state)
    // 将 state 中 cart 数组的值保存到 localStorage 中
    localStorage.setItem('cart', JSON.stringify(state.cart))
    // localStorage.cart = JSON.stringify(state.cart)
  })
}

const store = new Vuex.Store({
  strict: true,
  plugins: [storagePlugin],
  state: {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    isLogin: false // 用户是否已登录
  },
  getters: { // 相当于是计算属性
    totalPrice(state) {
      return state.cart.reduce((sum, item) => {
        if (item.isChecked) {
          sum += item.price * item.amount
        }
        return sum
      }, 0) * 100
    },
    isAllChecked(state) {
      if (state.cart.length === 0) {
        return false
      }
      return state.cart.every(item => item.isChecked)
    }
  },
  mutations,
  actions
})

export default store
