<template>
  <div class="side-menu left">
    <div class='logo'>
        <img :src='logo'>
    </div>
    <el-col :span="24" class='menu'>
        <el-menu mode="vertical" router :default-active="defaultActive" class="el-menu-vertical-demo" theme="dark">
            <el-submenu v-for="(item,key) in menu['groups']"
                :key='key'
                :index="key">
                <template slot="title"><i :class="`${item.icon}`"></i><a>{{ key }}</a></template>
                <el-menu-item
                    v-for="k in item.page"
                    :key='k'
                    :index="menu['routes'][k]['path']"
                    :route="menu['routes'][k]"
                    >
                {{ menu['routes'][k]['meta']['title'] }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
  </div>
</template>

<script>
import menus from '@/config/permission'
import logo from '@/assets/img/home_logo_right.png'
export default {
  data () {
    return {
      menu: menus,
      logo: logo
    }
  },
  computed: {
    defaultActive () {
      if (this.$route.params.from) {
        let menuPath
        switch (this.$route.params.from) {
          case 'dealer':
            menuPath = '/organize/dealer'
            break
          case 'store':
            menuPath = '/organize/store'
            break
          case 'car':
            menuPath = '/organize/car'
            break
          case 'finance':
            menuPath = '/organize/finance'
            break
        }
        return menuPath
      } else {
        return this.$route.path
      }
    }
  },
  watch: {
    '$route': (n, o) => {
      console.log(n)
      console.log(o)
    }
  },
  mounted () {
    this.menu = menus
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/style/mixin';
  .side-menu {
    @include sb();
    @include wh(210px, 100%);
    margin-left: -210px;
    background: linear-gradient(0deg, #485173 0%, #24283E 100%);
    padding-top: 80px;
    .logo {
        @include wh(100%, 80px);
        margin-top: -80px;
        background: $red;
        text-align: center;
        line-height: 96px;
        img {
            width: 85%;
        }
    }
    .menu {
      height: 100%;
      overflow: auto;
    }
    .el-submenu .el-menu-item {
        border-left: 4px solid transparent;
        padding-left: 36px;
    }
    .el-menu-item.is-active {
        color: #fff;
        border-left: 4px solid #FF3B30;
        padding-left: 36px;
        background: linear-gradient(90deg, #3E4D6B 0%, rgba(255,255,255,0.00) 92%);
    }
  }
</style>
