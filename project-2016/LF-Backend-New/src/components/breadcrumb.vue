<template>
  <div class='breadcrumb'>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ data }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.data = this.$route.meta.title
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/style/mixin';
  .breadcrumb {
    @include wh(100%, 14px);
    margin-bottom: 14px;
    margin-top: -28px;
  }
</style>
