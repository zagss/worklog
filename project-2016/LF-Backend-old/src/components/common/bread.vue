<template>
    <div class='breadcrumb'>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/organize/dealer' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{data}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
  import routes from '../../router/routes'
  export default {
    data () {
      return {
        data: '',
        route: routes
      }
    },
    watch: {
      '$route': 'fetchlocal'
    },
    methods: {
      fetchlocal () {
        console.log(location.hash)
      },
      compare (routes, hash) { // 匹配路由title
        for (var i in routes) {
          var item = routes[i]
          if (item.path === hash) {
            this.data = item.title
          }
        }
      }
    },
    beforeMount () {
      var hash = (location.hash).slice(1)
      this.compare(this.route, hash)
    }
  }
</script>

<style lang='scss' scoped>
    .breadcrumb {
        position: absolute;
        top: 17px;
        left: 16px;
    }
</style>
