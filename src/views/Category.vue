<template>
  <div class="category">
    <ul class="left">
      <li
        v-for="category in categories"
        :key="category.id"
        is="router-link"
        :to="{ name: 'subcategory', params: {suibianqu: category.id} }"
        tag="li"
      >{{ category.name }}</li>
    </ul>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
// <!-- :to="'/category/subcategory/'+category.id" -->
// :to="{ path: '/category/subcategory', query: {subianqu: category.id, test: 'abc', username: 'test', password: 'abcdefg'} }"
export default {
  name: 'Category',
  data() {
    return {
      categories: []
    }
  },
  created() {
    this.$http.getCategories()
      .then(data => {
        // console.log(data)
        data.list.shift()
        this.categories = data.list
      })
      .then(() => {
        if (typeof this.$route.params.suibianqu === 'undefined') {
          this.$router.push({
            name: 'subcategory',
            params: {
              suibianqu: this.categories[0].id
            }
          })
        }
      })
  },
  // beforeRouteEnter() {},
  beforeRouteUpdate(to, from, next) {
    // console.log('to: ', to)
    if (to.path === '/category') {
      next(false)
    }
    next()
  }
  // beforeRouteLeave() {}
}
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
    height: 100%;
    width: 100%;
    .left {
      width: 100px;
      background: #eee;
      overflow-x: hidden;

      li {
        height: 40px;
        line-height: 28px;
        padding: 6px;
      }
    }
    .right {
      flex: 1;
      overflow-x: hidden;
    }

    .router-link-exact-active.router-link-active {
      background: #fff;
      border-left: 3px solid #666;
    }
  }
</style>
