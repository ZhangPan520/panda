<template>
  <div class="detail">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in detail.photo" :key="image.id">
        <img v-lazy="image.url" />
      </van-swipe-item>
    </van-swipe>

    <div class="title">{{ detail.title }}</div>
    <div class="desc">
      <span class="price">{{ detail.price ? detail.price.toFixed(2) : 0 }}</span>
      <span class="sale-num">月销售量：{{ detail.saleNum }}</span>
    </div>

    <van-divider>商品图文详情</van-divider>
    <img
      v-for="desc in detail.descContentList"
      :key="desc.image.id"
      :src="desc.image.url"
      alt=""
      class="desc-image"
    >

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" @click="linkToCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCartHandler" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Divider,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant'

Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Divider)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)

export default {
  name: 'Detail',
  data() {
    return {
      detail: {}
    }
  },
  created() {
    this.$http.getDetail(this.$route.params.id)
      .then(data => {
        data.detail.descContentList = data.detail.descContentList.filter(item => item.image)
        this.detail = data.detail
        // console.log(this.detail)
      })
  },
  methods: {
    linkToCart() {
      this.$router.push({
        name: 'cart'
      })
    },
    addToCartHandler() {
      // {
      //   id: 1,
      //   title: 'xxxxx',
      //   desc: 'xxxxxx',
      //   price: 99,
      //   amount: 4,
      //   isChecked: false
      // }
      // 加入购物车
      // this.$store.state.cart.push({
      //   id: 1,
      //   title: 'test',
      //   price: 99,
      //   amount: 1
      // })
      // 构建当前选购商品的对象
      const { id, title, price, image } = this.detail
      const currentProduct = {
        id,
        title,
        price,
        image,
        amount: 1
      }
      // 提交 mutation，添加购物车
      this.$store.commit('addToCart', currentProduct)

      // console.log(this)
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail {
    .title {
      padding: 6px;
      font-size: 16px;
      font-weight: 700;
    }
    .desc {
      padding: 6px;
      display: flex;
      justify-content: space-between;
    }

    .price {
      font-size: 18px;
      color: #f00;
      font-weight: 700;
    }

    .desc-image {
      width: 100%;
      display: block;
    }
  }
</style>
