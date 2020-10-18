<template>
  <div class="panda-header">
    <!-- <div class="back" @click="back">&lt;</div> -->
    <div class="back" @click="$router.back()">&lt;</div>
    <div class="title">{{ $route.meta.title }}</div>
    <div class="more" @click="show = true">...</div>

    <van-overlay :show="show" @click="show = false" class-name="mark">
      <div class="wrapper" @click.stop>
        <ul class="menu">
          <li @click="link('/home')">首页</li>
          <li @click="link('/cart')">购物车</li>
          <li @click="link('/mine')">个人中心</li>
        </ul>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import { Overlay } from 'vant'

Vue.use(Overlay)

export default {
  name: 'PandaHeader',
  data() {
    return {
      show: false
    }
  },
  created() {
    // console.log(this)
  },
  methods: {
    link(href) {
      this.show = false
      // if (this.$route.path === href) {
      //   return
      // }
      this.$router.push(href)
    }
    // back() {
    //   this.$router.back()
    // }
  }
}
</script>

<style lang="scss" scoped>
  .panda-header {
    display: flex;
    height: 40px;

    .back, .more {
      width: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      font-weight: 700;
    }

    .title {
      flex: 1;
      text-align: center;
      line-height: 40px;
    }

    .menu {
      position: fixed;
      top: 45px;
      right: 6px;
      background: #111;
      font-size: 12px;
      color: #eee;
      padding: 12px;

      li {
        height: 30px;
        width: 100%;
        line-height: 30px;
      }
    }

    .mark {
      background: transparent;
      z-index: 999;
    }
  }
</style>
