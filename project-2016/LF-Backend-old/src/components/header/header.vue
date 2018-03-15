<template>
    <div class='head-top'>
        <div class='username'>
            <div class='avatar'></div>
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">退出</el-dropdown-item>
                    <el-dropdown-item command="b">设置</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
  import {signOut} from '../../service/fetch'
  export default {
    data () {
      return {
        username: sessionStorage.getItem('user')
      }
    },
    methods: {
      handleCommand (command) {
        const that = this
        if (command === 'a') {
          this.$confirm('将要退出, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = signOut()
            res.then(res => {
              console.log(res.data)
              if (res.data.code === 0) {
                that.$message({ type: 'success', message: '退出成功!' })
                that.$router.push('/')
                sessionStorage.removeItem('access_token')
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
@import '../../assets/style/mixin';
    .head-top {
        @include wh(100%, 80px)
        background: #fff;
        box-shadow: 0 1px 0 0 #E6E6E6;
        position: relative;
        z-index: 9;
        .username {
            position: absolute;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            cursor: pointer;
            .avatar {
                @include wh(32px, 32px);
                background: #ddd;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
    }
    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
