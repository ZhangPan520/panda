<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="banner in banners"
          :key="banner.id"
        >
          <img :src="banner.imageUrl" alt="">
        </div>
        <!-- <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div> -->
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
  name: 'Home',
  data() {
    return {
      banners: []
    }
  },
  created() {
    this.$http.getYiguo().then(data => console.log('yiguo: ', data))
    this.$http.getMaoyan().then(data => console.log('maoyan: ', data))
    // console.log('组件：', this)
    // 异步请求轮播图数据
    this.$http.getBanner()
      .then(resData => {
        // console.log(resData)
        // resData.data
        this.banners = resData.banners
      })
      .then(() => {
        this.$nextTick(() => { // 当页面下次DOM更新后执行
          /* eslint-disable no-new */
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      })
  }
  // mounted() {
  //   /* eslint-disable no-new */
  //   new Swiper('.swiper-container', {
  //     loop: true, // 循环模式选项

  //     // 如果需要分页器
  //     pagination: {
  //       el: '.swiper-pagination'
  //     }
  //   })
  // }
}
</script>

<style lang="scss" scoped>
  .swiper-container {
    width: 100%;
    height: 0;
    padding-top: calc(100% * 378 / 1008);

    .swiper-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
