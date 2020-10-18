export default { // 更改 state 的方法
  /**
   * 加入购物车
   * 当购物车中存在已选购的某件商品时，加入购物车时仅叠加数量即可
   * @param state 状态
   * @param payload 载荷，外部提交mutation时所传递的数据
   */
  addToCart(state, payload) {
    // 判断购物车中是否已存在 payload 载荷中的商品
    const has = state.cart.some(item => item.id === payload.id)
    if (has) { // 存在 payload 中选购的商品，叠加选购数量
      state.cart = state.cart.map(item => {
        if (item.id === payload.id) {
          item.amount += payload.amount
        }
        return item
      })
    } else { // 不存在，将 payload 中的商品对象添加到 cart 数组末尾
      state.cart = [
        ...state.cart,
        {
          ...payload,
          isChecked: false
        }
      ]
    }
  },
  /**
   * 删除购物车中选购的某件商品
   */
  removeFromCart(state, { id }) {
    state.cart = state.cart.filter(item => item.id !== id)
  },
  /**
   * 全选
   */
  checkAll(state, { checked }) {
    state.cart = state.cart.map(item => {
      item.isChecked = checked
      return item
    })
  },
  /**
   * 修改选中状态
   */
  changeCheckedStatus(state, { id }) {
    state.cart = state.cart.map(item => {
      if (item.id === id) {
        item.isChecked = !item.isChecked
      }
      return item
    })
  },
  /**
   * 修改数量
   */
  modifyCartNum(state, { id, num }) {
    state.cart = state.cart.map(item => {
      if (item.id === id) {
        item.amount = num
      }
      return item
    })
  },

  /**
   * 修改登录成功状态
   */
  changeLoginStatus(state, { status }) {
    state.isLogin = status
  }
}
