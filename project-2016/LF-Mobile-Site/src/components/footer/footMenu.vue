<template>
    <footer class="foot-site">
        <ul class="abstract">
            <li><a @click="handleRouteClick('intro')">业务介绍</a></li>
            <li><a @click="handleRouteClick('company')">公司介绍</a></li>
            <li><a @click="handleRouteClick('contact')">联系我们</a></li>
        </ul>
        <div class="contact">
            <span @click="popupVisible = true"></span>
            <span @click="popupVisible1 = true"></span>
            <span @click="popupVisible2 = true"></span>
            <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="pupup-1">
                <p>请拨打 400-1556-256 免费咨询服务热线</p>
            </mt-popup>
            <mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="pupup-1 v2">
                <p>请拨打 400-1556-256 免费咨询服务热线</p>
            </mt-popup>
            <mt-popup v-model="popupVisible2" popup-transition="popup-fade" class="pupup-1 v3">
                <img src='../../assets/imgs/qrd.png'>
            </mt-popup>
        </div>
        <div class="address">
            <h2>公司地址</h2>
            <h3>北京市朝阳区慧忠里103号洛克时代中心A座703</h3>
            <p>Copyright©2015LuxuryKingDom 保留所有版权</p>
        </div>
    </footer>
</template>

<script>
import { Popup } from 'mint-ui'
export default {
  data () {
    return {
      popupVisible: false,
      popupVisible1: false,
      popupVisible2: false
    }
  },
  components: {
    'mt-popup': Popup
  },
  methods: {
    handleRouteClick (val) {
      this.$router.push(`/${val}`)
      document.getElementById('app').scrollTop = 0
    }
  }
}
</script>

<style lang='scss' scoped>
    .foot-site {
        height: 6rem;
        background: url('../../assets/imgs/bg_footer@3x.jpg') no-repeat center;
        background-size: 100% 6rem;
        color: #a5adba;
        font-size: .32rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: .5rem 0;
        .abstract {
            li {
                font-size: .3rem;
                &:not(:last-child) {
                    margin-bottom: .3rem;
                }
                a {
                    color: #a5adba;
                }
            }
        }
        .contact {
            display: flex;
            justify-content: center;
            position: relative;
            span {
                width: .9rem;
                height: .9rem;
                border-radius: 50%;
                background-color: rgba(62, 73, 86, .6);
                margin: 0 .3rem;
                background-repeat: no-repeat;
                background-position: center;
                background-size: .65rem;
                &:nth-child(1) {
                    background-image: url('../../assets/imgs/iphone.png');
                }
                &:nth-child(2) {
                    background-image: url('../../assets/imgs/android.png');
                }
                &:nth-child(3) {
                    background-image: url('../../assets/imgs/weixin.png');
                }
            }
        }
        .address {
            h2 {
               font-weight: 500;
               font-size: .3rem; 
            }
            h3 {
                font-weight: 500;
                font-size: .26rem;
                line-height: 2;
            }
            p {
                font-size: .2rem;
            }
        }
    }
    .pupup-1 {
      width: 3rem;
      font-size: .26rem;
      padding: .2rem .1rem;
      border-radius: .1rem;
      transform: translate(-50%, 0);
      position: absolute;
      top: -1.3rem;
      left: 2.5rem;
      &::before {
        display: inline-block;
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 10px;
        border-top-color: #fff;
        content: "";
        position: absolute;
        top: 1rem;
        right: 2.1rem;
      }
      &.v2::before {
          right: .6rem;
      }
      &.v3 {
          width: 2.6rem;
          height: 2.6rem;
          padding: .1rem;
          top: -2.8rem;
          left: 4rem;
          img {
              width: 100%;
              height: 100%;
          }
      }
      &.v3::before {
          right: .4rem;
          top: 2.6rem;
      }
    }
</style>

