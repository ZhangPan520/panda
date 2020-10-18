<template>
  <div
    class="back-to-top"
    v-show="isShow"
    @click="back"
    v-back-to-top="toggle"
  >
    返回
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      isShow: false
    }
  },
  directives: {
    backToTop: {
      inserted(el, binding) {
        console.log('this: ', this)
        document.querySelector('main').addEventListener('scroll', (e) => {
          console.log('scroll', e.target.scrollTop)
          // this.isShow = e.target.scrollTop > 900
          console.log(binding.value)
          binding.value(e.target.scrollTop > 900)
        }, false)
      }
    }
  },
  // mounted() {
  //   console.log('back mounted')
  //   document.querySelector('main').addEventListener('scroll', (e) => {
  //     console.log('scroll', e.target.scrollTop)
  //     this.isShow = e.target.scrollTop > 900
  //   }, false)
  // },
  methods: {
    back() {
      document.querySelector('main').scrollTop = 0
    },
    toggle(show) {
      this.isShow = show
    }
  }
}
</script>

<style lang="scss" scoped>
  .back-to-top {
    position: fixed;
    bottom: 50px;
    right: 10px;
    background: #06f;
    color: #fff;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border-radius: 30px;
  }
</style>
