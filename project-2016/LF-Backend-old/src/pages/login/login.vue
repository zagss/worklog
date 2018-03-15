<template>
    <div class='login-page fillcontain'>
        <div class='bgLogin'>
            <div class='logo'></div>
            <div class='loginmain'>
                <div class='loginimg'></div>
                <div class='loginbox'>
                    <div class='logininput'>
                        <p>SaaS人工智能评估系统</p>
                        <div class=''>
                            <el-form :model='loginForm' :rules='login' ref='loginForm'>
                                <div class='loginLabel'><span>用户名</span><small>忘记用户名</small></div>
                                <el-form-item prop='account'>
                                    <el-input v-model="loginForm.account" size="large"></el-input>
                                </el-form-item>
                                <div class='loginLabel'><span>密码</span><small>忘记密码</small></div>
                                <el-form-item prop='password'>
                                    <el-input v-model="loginForm.password" type='password' size="large"></el-input>
                                </el-form-item>
                            </el-form>
                            <div>
                                <span class='loginsave' @click='subLogin'><i v-if='isLoding' class="el-icon-loading"></i> 登录</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagefooter">
            <div class='footer_intro'>
                <div class='adress'>
                    <ul>
                        <li>
                            <a target='_blank' href='http://www.la-feng.com/#/home'>首页</a>
                            <a target='_blank' href='http://www.la-feng.com/#/business'>业务介绍</a>
                            <a target='_blank' href='http://www.la-feng.com/#/intro'>公司介绍</a>
                            <a target='_blank' href='http://www.la-feng.com/#/news'>新闻动态</a>
                            <a target='_blank' href='https://www.lagou.com/gongsi/103241.html'>招贤纳士</a>
                            <a target='_blank' href='http://www.la-feng.com/#/contact'>联系我们</a>
                        </li>
                        <li>公司地址 北京市朝阳区慧忠里103号洛克时代中心A座703</li>
                        <li><small>京ICP备15053121号-1 京ICP证160142号 Copyright&copy;2015LuxuryKingDom保留所有版权</small></li>
                    </ul>
                </div>
                <div>
                    <div class='qrd'>
                        <img src="../../assets/images/qrd.png" alt="">
                        <div>
                            <p>400-1556-256</p>
                            <span>扫码关注「拉风汽车公众号」</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import config from '@/config/config'
  import { login, signOut } from '../../service/fetch'
  import { encrypt } from '../../config/pubkey.js'
  import { mapActions } from 'vuex'
  import { SET_ITEM } from '../../store/veriable'
  export default {
    data () {
      return {
        loginForm: {
          account: '',
          password: ''
        },
        login: {
          account: [
            { required: true, message: '请输入用户名' }
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        },
        isLoding: false
      }
    },
    mounted () {
      console.log(config)
      if (sessionStorage.getItem('access_token')) {
        this.$router.push('/organize/dealer')
      }
    },
    methods: {
      ...mapActions([SET_ITEM]),
      subLogin () {
        var that = this
        that.$refs['loginForm'].validate((valid) => {
          if (valid) {
            that.isLoding = true
            var encrypted = encrypt(that.loginForm.password)
            var res = login({ account: that.loginForm.account, password: encrypted })
            res.then(result => {
              if (result.data.code === 403) {
                signOut()
                this.subLogin()
              }
              console.log(result.data)
              if (result.data.code === 0 && result.data.message === '操作成功') {
                that.isLoding = false
                that.$router.push('/organize/dealer')
                that.$message({ type: 'success', message: '登录成功' })
                that.SET_ITEM({key: 'adminInfo', val: result.data.data})
                sessionStorage.setItem('access_token', result.data.data.access_token)
                sessionStorage.setItem('user', that.loginForm.account)
              } else {
                that.$message({ type: 'error', message: result.data.message })
                that.isLoding = false
              }
            })
            // that.$router.push('/organize/dealer')
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
    @import '../../assets/style/common';
    @import '../../assets/style/mixin';

    .bgLogin {
        @include bis('../../assets/images/login_bg.jpg');
        @include allcover;
        width: 100%;
        bottom: 189px;
        overflow: hidden;
        box-sizing: border-box;
    }
    .logo {
        height:80px;
        padding:40px 0 0 40px;
        background:url('../../assets/images/logo.png') no-repeat 40px;
        background-size:264px 61px;
    }
    .loginmain {
        overflow:hidden;
        margin:0 auto;
        @include fj();
        @include wh(75%, 85%);
        align-items: center;
        .loginimg {
            @include wh(49%, 100%);
            display:inline-block;
            background:url('../../assets/images/login_01.png') no-repeat left;
            background-size:100%;
        }
        .loginbox {
            width: 40%;
            @include fj();
            display:inline-block;
            float:right;
            flex-direction: row-reverse;
            align-items: center;
        }
    }
    .logininput {
        padding:4%;
        max-width: 471px;
        width: 100%;
        max-height: 90%;
        float:right;
        vertical-align: middle;
        background: rgba(255, 255, 255, 0.05);
        p {
            @include sc(28px, #fff);
            margin-bottom: 6vh;
        }
        .loginLabel {
            margin: 2vh 0;
            @include fj();
            span {
                @include sc(18px, #fff);
            }
            small {
                @include sc(12px, rgba(255, 255, 255, 0.54));
                padding-top: 6px;
            }
        }
        .loginsave {
            display: inline-block;
            @include wh(160px, 56px);
            background: #ff3b30;
            border-radius: 28px;
            text-align: center;
            @include font(18px, 52px);
            color: rgba(255,255,255,0.8);
            margin-top: 6vh;
            cursor: pointer;
            border: 2px solid rgba(255,255,255,0.5);
            &:focus, &:active, &:visited {
                color: rgba(255,255,255,1);
                border: 2px solid rgba(255,255,255,0);
                outline: none;
            }
        }
    }
    .pagefooter {
        text-align: left;
        background: #202d3d;
        @include sc(14px, #fff);
        @include wh(100%, 189px);
        position: absolute;
        bottom: 0;
        .footer_intro{
            width: 75%;
            padding: 50px 0;
            margin: 0 auto;
            @include fj();
        }
    }
    .adress {
        width: 50%;
        li {
            margin-bottom: 16px;
            color: rgba(255,255,255,0.38);
            &:last-child {
                margin-bottom: 0;
            }
            a {
                padding:0 10px;
                cursor:pointer;
                color:rgba(255,255,255,0.38);
                border-left:1px solid rgba(255,255,255,0.38);
                &:hover {
                    color:rgba(255,255,255,1);
                }
                &:first-child {
                    border-left: none;
                    padding-left: 0;
                }
            }
        }
    }
    .qrd {
        @include fj();
        div {
            padding-top: 10px;
            p {
                padding-left: 32px;
                background: url('../../assets/images/phone.png') no-repeat left;
                @include font(20px, 24px);
                margin-bottom: 20px;
            }
        }
        img {
            @include wh(88px, 88px);
            margin-right:12px;
        }
    }
</style>
