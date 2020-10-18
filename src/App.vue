<template>
  <div id="app">
    <header>
      <router-view name="appHeader" />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <router-view name="appFooter" />
    </footer>
  </div>
</template>

<script>
import './_reset.scss'

export default {
  name: 'App'
}
</script>

<style>
  html, body {
    height: 100%;
  }

  @font-face {
    font-family: 'iconfont';  /* project id 1852840 */
    src: url('//at.alicdn.com/t/font_1852840_y4cr6ao5ses.eot');
    src: url('//at.alicdn.com/t/font_1852840_y4cr6ao5ses.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1852840_y4cr6ao5ses.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1852840_y4cr6ao5ses.woff') format('woff'),
    url('//at.alicdn.com/t/font_1852840_y4cr6ao5ses.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1852840_y4cr6ao5ses.svg#iconfont') format('svg');
  }

  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

<style lang="scss" scoped>
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;

    main {
      flex: 1;
      overflow-x: hidden;
    }
  }
</style>
