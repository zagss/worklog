<template>
  <div class='fill-contain index-content'>
      <sidemenu></sidemenu>
      <section>
          <head-top></head-top>
          <router-view></router-view>
      </section>
  </div>
</template>

<script>
import sidemenu from '@/components/sidemenu'
import headTop from '@/components/headTop'
export default {
  components: {
    sidemenu,
    headTop
  }
}
</script>

<style lang='scss' scoped>
  @import '../../assets/style/mixin';
  .index-content {
      padding-left: 210px;
      &::after {
        @include cf;
      }
  }
  section {
      @include wh(100%, 100%);
      background: $bgc;
      padding-top: 80px;
      overflow: hidden;
  }
</style>
