<template>
  <ul class="sub-categories">
    <li
      v-for="cate in subcategories"
      :key="cate.id"
      is="router-link"
      :to="{name: 'list', params: {url: cate.url}}"
      tag="li"
    >
      <img :src="cate.imageUrl" />
      <span>{{ cate.title }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SubCategories',
  data() {
    return {
      // id: 0
      subcategories: []
    }
  },
  // created() {
  //   console.log(this.$route)
  //   // this.id = this.$route.params.suibianqu
  //   this.$http.getSubcategories(this.$route.params.suibianqu)
  //     .then(resData => {
  //       console.log(resData)
  //       this.subcategories = resData.categories
  //     })
  // },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$http.getSubcategories(to.params.suibianqu)
        .then(resData => {
          vm.subcategories = resData.categories
        })
    })
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('before route update')
    // console.log(to)
    // console.log(from)
    this.$http.getSubcategories(to.params.suibianqu)
      .then(resData => {
        // console.log(resData)
        this.subcategories = resData.categories
      })
    next()
  },
  beforeRouteLeave(to, from, next) {
    // console.log('before route leave')
    next()
  }
}
</script>

<style lang="scss" scoped>
  .sub-categories {
    padding: 6px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      width: 48%;
      margin-bottom: 8px;
      text-align: center;
      border: 1px solid #eee;

      img {
        background: #fff;
      }
    }
  }
</style>
