<template>
    <div class='brand-item'>
        <div class='left'>
            <div class='logo'>
                <img :src='logo'>
            </div>
            <div class='info'>
                <h3>{{title}}</h3>
                <p>公司地址：<span>{{address}}</span></p>
            </div>
        </div>
        <div class='right'>
            <!--<div class='credit'>
                <p class='title'>授信额度(万元)</p>
                <p class='money'>¥<span>{{credit}}</span></p>
            </div>
            <div class='rest'>
                <p class='title'>剩余额度(万元)</p>
                <p class='money'>¥<span>{{rest}}</span></p>
            </div>-->
            <div class='icon'></div>
        </div>
    </div>
</template>

<script>
  import logo from '../../assets/images/rundong.png'
  export default {
    props: {
      title: String, // 公司名称
      address: String, // 公司地址
      credit: Number, // 授信额度
      rest: Number // 剩余额度
    },
    data () {
      return {
        logo: logo
      }
    }
  }
</script>

<style lang='scss' scoped>
@import '../../assets/style/mixin.scss';
    .brand-item {
        @include wh(100%, 128px);
        background: linear-gradient(90deg, #3A415E 0%, rgba(253,59,48,0.8) 100%);
        @include fj;
        align-items: center;
        color: #fff;
        padding: 16px 31px;
        .left {
            display: flex;
            align-items: center;
            .logo {
                @include wh(80px, 80px);
                background-color: #fff;
                border-radius: 50%;
                margin-right: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 68px;
                }
            }
            .info {
                h3 {
                    font-size: 20px;
                    font-weight: 500;
                    line-height: 20px;
                    margin-bottom: 6px;
                }
                p {
                    font-size: 12px;
                    line-height: 12px;
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
            .title {
                font-size: 14px;
                line-height: 14px;
                margin-bottom: 11px;
            }
            .money {
                font-size: 35px;
                line-height: 35px;
            }
            .credit {
                margin-right: 66px;
                position: relative;
                &:before {
                    content: '';
                    display: inline-block;
                    @include wh(2px, 45px);
                    background: #fff;
                    opacity: .27;
                    position: absolute;
                    right: -31px;
                    top: 10px;
                }
            }
            .icon {
                margin-left: 66px;
                @include wh(88px, 96px);
                background: url('../../assets/images/xiangqingye_ic_office.png') no-repeat;
                background-size: contain;
            }
        }
    }
</style>
