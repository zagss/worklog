<template>
  <div id="app">
    <header-menu></header-menu>
    <router-view></router-view>
    <foot-menu></foot-menu>
  </div>
</template>

<script>
import headerMenu from '@/components/header/headerMenu'
import footMenu from '@/components/footer/footMenu'
export default {
  components: {
    headerMenu,
    footMenu
  },
  data () {
    return {}
  }
}
</script>

<style lang='scss'>
  @import './assets/style/common';
  #app {
    height: 100%;
    width: 100%;
    overflow: auto;
    &.lock {
      overflow: hidden;
      position: fixed;
    }
  }
</style>
