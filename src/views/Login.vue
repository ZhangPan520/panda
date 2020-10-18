<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field } from 'vant'
import { mapMutations, mapActions } from 'vuex'

Vue.use(Form)
Vue.use(Field)

export default {
  name: 'Login',
  data() {
    return {
      username: 'xiaoming',
      password: 'abcdefg'
    }
  },
  created() {
    console.log('login: ', this.$route)
  },
  methods: {
    ...mapMutations(['changeLoginStatus']),
    ...mapActions(['loginAsync']),
    onSubmit(values) {
      console.log('submit', values)
      this.loginAsync(values)
        .then(isLogin => {
          if (isLogin) {
            this.$router.push(this.$route.params.to)
          }
        })
      // this.$store.dispatch('action')
      // this.$store.commit('mutation')
      // if (values.username === 'xiaoming' && values.password === 'abcdefg') { // 登录成功
      //   this.changeLoginStatus({ status: true })
      //   // 继续向来登录页面前的页面跳转
      //   this.$router.push(this.$route.params.to)
      // } else { // 登录失败
      //   this.changeLoginStatus({ status: false })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
