export default {
  loginAsync({ commit, state }, values) {
    console.log('action login')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.username === 'xiaoming' && values.password === 'abcdefg') { // 登录成功
          commit('changeLoginStatus', { status: true }) // 在 action 中 commit mutation 来更新状态
          // 继续向来登录页面前的页面跳转
          // this.$router.push(this.$route.params.to)
        } else { // 登录失败
          commit('changeLoginStatus', { status: false })
        }
        resolve(state.isLogin)
      }, 2000)
    })
  }
}
