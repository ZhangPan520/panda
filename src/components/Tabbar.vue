<template>
  <div class="tabbar">
    <router-link
      tag="div"
      v-for="nav in navs"
      :key="nav.path"
      :to="nav.path"
    >
      <i class="iconfont" v-html="nav.meta.icon"></i>
      <span>{{ nav.meta.title }}</span>
    </router-link>
  </div>
</template>

<script>
import routes from '@/router/routes.js'

export default {
  name: 'Tabbar',
  computed: {
    navs() {
      return routes.filter(route => route.meta.isNav)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabbar {
    height: 50px;
    display: flex;
    align-items: center;

    & > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .router-link-exact-active, .router-link-active {
      background: #eee;
    }
  }
</style>
