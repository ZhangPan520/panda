<template>
  <div class="cart">
    <!-- <van-swipe-cell>
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        class="goods-card"
        thumb="https://img.yzcdn.cn/vant/cat.jpeg"
      >
        <template #thumb>
          <van-checkbox />
          <div class="van-image" style="width: 100%; height: 100%;">
            <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img" style="object-fit: cover;">
          </div>
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell> -->
    <van-swipe-cell
      v-for="item in cart"
      :key="item.id"
    >
      <van-card
        desc="描述信息"
        class="goods-card"
        :price="item.price | money"
        :title="item.title"
      >
        <template #thumb>
          <van-checkbox :value="item.isChecked" @click="changeCheckedStatus({id: item.id})" />
          <div class="van-image" style="width: 100%; height: 100%;">
            <img :src="item.image" class="van-image__img" style="object-fit: cover;">
          </div>
        </template>
        <template #num>
          <van-stepper
            theme="round"
            button-size="22"
            :default-value="item.amount"
            :integer="true"
            @change="modifyCartNum({num: $event, id: item.id})"
          />
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="removeFromCart({id: item.id})" />
      </template>
    </van-swipe-cell>

    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="linkToOrderConfirm">
      <van-checkbox
        v-model="checked"
        @click="checkAll({checked: checked})"
      >全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Card, SwipeCell, Button, SubmitBar, Checkbox, Stepper } from 'vant'
import { mapMutations, mapState, mapGetters } from 'vuex'

Vue.use(SubmitBar)
Vue.use(SwipeCell)
Vue.use(Card)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Stepper)

export default {
  name: 'Cart',
  data() {
    return {
      checked: false
    }
  },
  created() {
    this.checked = this.isAllChecked
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['totalPrice', 'isAllChecked'])
    // cart() {
    //   return this.$store.state.cart
    // }
  },
  methods: {
    ...mapMutations([
      'removeFromCart',
      'checkAll',
      'changeCheckedStatus',
      'modifyCartNum'
    ]),
    linkToOrderConfirm() {
      this.$router.push('/order-confirm')
    }
    // deleteCartItemHandler(id) {
    //   this.$store.commit('removeFromCart', { id })
    // },
    // checkAllHandler() {
    //   this.$store.commit('checkAll', { checked: this.checked })
    // }
  },
  watch: { // 侦听器
    isAllChecked(val) {
      this.checked = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }

  .van-card__thumb {
    display: flex;
    width: 120px;

    .van-checkbox {
      width: 30px;
    }

    .van-image {
      margin-left: 8px;
    }
  }
</style>
