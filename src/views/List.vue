<template>
  <div
    class="list"
    is="van-list"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <router-link
      tag="div"
      v-for="prod in list"
      :key="prod.id"
      :to="{name: 'detail', params: {id: prod.id}}"
      class="list-item"
    >
      <div class="image"><img :src="prod.image" /></div>
      <div class="title">{{ prod.title }}</div>
      <div class="desc">
        <span class="price">{{ prod.price | money }}</span>
        <span class="sale-num">月销量：{{ prod.saleNum }}</span>
      </div>
    </router-link>

    <BackToTop />
  </div>
</template>

<script>
import Vue from 'vue'
import { List } from 'vant'
import BackToTop from '../components/BackToTop'
Vue.use(List)

export default {
  name: 'List',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage: 1
    }
  },
  components: {
    BackToTop
  },
  // created() {
  //   // 获取当前需要显示分类的商品列表数据
  //   this.$http.getList(this.$route.params.url)
  //     .then(data => {
  //       console.log(data)
  //       this.list = data
  //     })
  // },
  methods: {
    /**
     * 加载数据
     */
    onLoad() {
      // console.log('loading...................')
      this.$http.getList(this.$route.params.url, this.currentPage)
        .then(data => {
          // console.log(data)
          this.list = [
            ...this.list,
            ...data
          ]
          if (data.length === 0) {
            this.finished = true
          }
        })
        .then(() => {
          this.currentPage += 1
          this.loading = false
        })
    }
  }
}

// var arr = [1, 3, 7, 9, 2]
// var array = [...arr, 8, 5, 6]
// var array = [1, 3, 7, 9, 2, 8, 5, 6]
</script>

<style lang="scss" scoped>
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: #eee;

    &-item {
      width: 49%;
      font-size: 12px;
      background: #fff;
      padding-bottom: 10px;
      margin-bottom: 8px;

      .image {
        width: 100%;
        height: 0;
        padding-top: 100%;
        position: relative;

        img {
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }

      .title {
        padding: 6px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .desc {
        display: flex;
        justify-content: space-between;
        padding: 6px;
      }
      .price {
        color: #f00;
      }
      .sale-num {
        color: #666;
      }
    }
  }
</style>
