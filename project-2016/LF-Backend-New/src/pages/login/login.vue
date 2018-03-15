<template>
  <div class="fill-contain animate">
    <div class='head-logo'></div>
    <div class='form-content'>
      <transition name='form-fade' mode='in-out'>
        <div class='form-list' v-show='showLogin'>
          <h2>SaaS人工智能评估系统</h2>
          <el-form :model='loginForm' :rules='rules' ref='loginForm'>
              <div class='loginLabel'><span>用户名</span><small>忘记用户名</small></div>
              <el-form-item prop='account'>
                  <el-input v-model="loginForm.account" size="large"></el-input>
              </el-form-item>
              <div class='loginLabel'><span>密码</span><small>忘记密码</small></div>
              <el-form-item prop='password'>
                  <el-input v-model="loginForm.password" type='password' size="large"></el-input>
              </el-form-item>
          </el-form>
          <el-button :loading='isloading' type='danger' class='signin-btn' @click='signIn'>登 陆</el-button>
        </div>
      </transition>
    </div>
    <div class='foot-info'>
      <div class='foot-left'>
        <ul>
          <li class='left' v-for='(val, key) in list' :key='key'><a target="_blank" :href='val'>{{key}}</a></li>
        </ul>
        <p>公司地址 北京市朝阳区慧忠里103号洛克时代中心A座703</p>
        <p><small>京ICP备15053121号-1 京ICP证160142号 Copyright&copy;2015LuxuryKingDom 保留所有版权</small></p>
      </div>
      <div class='foot-right'></div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/service/getData'
  import { encrypt } from '@/config/pubkey'
  export default {
    data () {
      return {
        showLogin: false,
        isloading: false,
        list: {
          '首页': 'http://www.la-feng.com/#/home',
          '业务介绍': 'http://www.la-feng.com/#/business',
          '公司介绍': 'http://www.la-feng.com/#/aboutUs/intro',
          '新闻动态': 'http://www.la-feng.com/#/aboutUs/news',
          '招贤纳士': 'https://www.lagou.com/gongsi/103241.html',
          '联系我们': 'http://www.la-feng.com/#/aboutUs/contact'
        },
        loginForm: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入用户名' }
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        }
      }
    },
    methods: {
      async signIn () {
        this.isloading = true
        this.$refs['loginForm'].validate(async (valid) => {
          if (valid) {
            let encrypted = encrypt(this.loginForm.password)
            const res = await login({ account: this.loginForm.account, password: encrypted })
            if (res.data.code === 0) {
              this.$message({ type: 'success', message: res.data.message })
              this.$router.push('index')
              localStorage.setItem('access_token', res.data.data.access_token)
              this.isloading = false
            } else {
              this.$message({ type: 'error', message: res.data.message })
              this.isloading = false
            }
          } else {
            this.$notify.error({ title: '错误', message: '请输入正确的用户名和密码', offset: 100 })
            this.isloading = false
            return false
          }
        })
      }
    },
    mounted () {
      this.showLogin = true
      if (localStorage.getItem('access_token')) { // 判断是否登陆。
        this.$router.push('index')
      }
    }
  }
</script>

<style lang='scss' scoped>
@import '../../assets/style/mixin';
  .fill-contain {
    @include bgi('../../assets/img/login_bg.jpg');
    position: relative;
    color: #fff;
    .head-logo {
      @include wh(100%, 11vh);
      @include bgi('../../assets/img/logo.png');
      background-size: 14vw;
      background-position: 2vw center;
    }
    .foot-info {
      position: absolute;
      bottom: 0;
      @include wh(100%, 17vh);
      padding: 4.26vh 12.5vw;
      background: #202d3d;
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.3vh;
      .foot-left {
        height: 100%;
        @include fc();
      }
      li {
        padding-right: 20px;
        position: relative;
        &:not(:last-child) {
          &::after {
            content: '';
            display: inline-block;
            @include wh(1px, 12px);
            background: rgba(255, 255, 255, 0.5);
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      a {
        color: rgba(255, 255, 255, 0.5);
        &:hover {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .form-content {
      position: relative;
      @include wh(auto, 72vh);
      margin: 0 12.5vw;
      @include bgi('../../assets/img/login_01.png');
      background-size: 37vw;
      background-position: left center;
      .form-list {
        @include wh(24.53vw, 42.22vh);
        background: rgba(255, 255, 255, 0.05);
        @include cty(42.22vh);
        right: 0;
        padding: 2vw;
        @include fc();
        h2 {
          font-weight: 400;
          font-size: 1.5vw;
        }
        .loginLabel {
          font-size: 1.67vh;
          line-height: 1.5;
          small {
            font-size: 1.1vh;
            opacity: .54;
            float: right;
          }
        }
        .signin-btn {
          border-radius: 100px;
          @include wh(8.33vw, 5.2vh);
          font-size: 1.8vh;
        }
      }
    }
    .form-fade-enter-active, .form-fade-leave-active {
      transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
      transform: translate3d(0, -60px, 0);
      opacity: 0;
    }
  }
</style>
