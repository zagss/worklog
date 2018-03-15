<template>
    <aside class='side-menu'>
        <div class='logo'>
            <img :src='logo'>
        </div>
        <div class='sideList'>
            <el-col :span="24">
                <el-menu mode="vertical" router
                :default-active="defaultActive"
                class="el-menu-vertical-demo" theme="dark">
                    <el-submenu v-for="(item,key) in store['groups']"
                        :key='key'
                        :index="key">
                        <template slot="title"><i :class="`${item.icon}`"></i><a>{{ key }}</a></template>
                        <el-menu-item
                            v-for="k in item.page"
                            :key='k'
                            :index="store['routes'][k]['path']"
                            :route="store['routes'][k]"
                            >
                        {{ store['routes'][k]['meta']['title'] }}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </div>
    </aside>
</template>

<script>
  import stores from '../../config/permissions'
  import logo from '../../assets/images/home_logo_right.png'
  export default {
    data () {
      return {
        store: {},
        logo: logo
      }
    },
    computed: {
      defaultActive () {
        console.log(this.$route)
        let path = ''

        if (!this.$route.query.from) {
          path = this.$route.path
        } else {
          if (this.$route.query.from === 'organize.detail.attachment') {
            path = '/organize/dealer'
          } else if (this.$route.query.from === 'organize.detail.licensee') {
            path = '/organize/store'
          } else if (this.$route.query.from === 'organize.detail.carlicensee') {
            path = '/organize/car'
          } else if (this.$route.query.from === 'organize.detail.finance') {
            path = '/organize/staff'
          } else {
            path = '/' + this.$route.query.from.split('.').join('/')
          }
        }
        return path
      }
    },
    methods: {
      fetch () {
        this.store = stores
        console.log(this.store)
      }
    },
    beforeMount () {
      this.fetch()
    }
  }
</script>

<style lang='scss' scoped>
    @import '../../assets/style/mixin';
    .side-menu {
        width: 210px;
        background: linear-gradient(0deg, #485173 0%, #24283E 100%);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 9;
        .sideList {
            position: absolute;
            top: 80px;
            left: 0;
            bottom: 0;
            right: 0;
            overflow: auto;
        }
        .logo {
            @include wh(100%, 80px);
            background: #FF3B30;
            text-align: center;
            line-height: 96px;
            img {
                width: 85%;
            }
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
