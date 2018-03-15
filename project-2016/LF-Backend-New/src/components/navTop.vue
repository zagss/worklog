<template>
  <div class='page-nav'>
      <el-menu :default-active="defaultActive" router mode="horizontal">
          <el-menu-item index="content">{{title}}</el-menu-item>
          <el-menu-item :index="key" v-for="(val, key) in label" :key='key'>{{val}}</el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  props: ['label', 'title'],
  computed: {
    defaultActive () {
      return this.$route.name
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '../assets/style/mixin';
  .page-nav {
      padding: 0 32px;
      background: #fff;
      .el-menu {
          background: #fff;
          .el-menu-item {
              font-size: 18px;
              height: 48px;
              line-height: 48px;
              border-bottom: 4px solid transparent
          }
          .el-menu-item:hover {
              border-bottom: transparent;
          }
          .el-menu-item.is-active {
              color: $red;
              border-bottom: 4px solid $red;
              &:hover {
                  border-bottom: 4px solid $red;
              }
          }
      }
  }
</style>
