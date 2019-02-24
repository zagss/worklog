<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
    <div v-if="isLoading"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapState({
      isLoading(state) {
        let isLoading = state.weui.isLoading
        isLoading ? this.loading(true) : this.loading(false)
        return isLoading
      },
    })
  },
  methods: {
    fetch() { // 请求jsapi
      this.$store.dispatch('wxconfig/fetchConfig')
      this.$store.dispatch('user/fetchUser')
    },
    loading(isLoading) { // 切换路由加载loading
      // eslint-disable-next-line
      var loading = weui.loading('loading')
      !isLoading && loading.hide()
    }
  },
  beforeMount() {
    this.fetch()
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #282B56;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
