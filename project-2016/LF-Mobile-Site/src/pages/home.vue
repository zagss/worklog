<template>
    <div class='container' id='container'>
        <section class="banner-wrapper">
            <banner-wrapper></banner-wrapper>
            <span class="quick-item" @click="handleQuickAssessClick">
            <svg t="1501817435013" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3520" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs></defs><path d="M613.52579 105.902982c-168.205956 0-304.575834 136.37704-304.575834 304.575834 0 51.429323 12.865006 99.813287 35.393091 142.320403L132.567783 764.523317l0.176009 0.179079c-16.533558 16.256242-26.843368 38.811957-26.843368 63.822584 0 49.471738 40.105417 89.572038 89.577155 89.572038 25.010627 0 47.566342-10.30981 63.824631-26.839275l-0.049119-0.050142 211.697493-211.67498c42.534745 22.604834 91.01797 35.518958 142.575206 35.518958 168.195723 0 304.573787-136.376017 304.573787-304.572764C918.098553 242.278999 781.721513 105.902982 613.52579 105.902982L613.52579 105.902982zM227.601206 859.529111c-8.178263 8.450463-19.48068 13.780865-32.123628 13.780865-24.736381 0-44.786019-20.050662-44.786019-44.790112 0-12.637832 5.326309-23.941272 13.780865-32.121582l-0.226151-0.197498 204.737988-204.733894c17.892509 24.140817 39.207977 45.454238 63.301721 63.402005L227.601206 859.529111 227.601206 859.529111zM613.52579 664.285359c-140.16839 0-253.813706-113.644293-253.813706-253.806543 0-140.16839 113.645316-253.812683 253.813706-253.812683 140.167367 0 253.81166 113.644293 253.81166 253.812683C867.337449 550.641065 753.692133 664.285359 613.52579 664.285359L613.52579 664.285359zM613.52579 232.810347c-98.130971 0-177.670515 79.537498-177.670515 177.668469 0 7.013741 5.674233 12.687974 12.68695 12.687974 7.015787 0 12.694113-5.67321 12.694113-12.687974 0-84.102467 68.184939-152.287405 152.288428-152.287405 7.013741 0 12.68695-5.674233 12.68695-12.69309C626.21274 238.483556 620.538507 232.810347 613.52579 232.810347L613.52579 232.810347zM613.52579 232.810347" p-id="3521" fill="#ffffff"></path></svg>
            快速评估</span>
        </section>
        <section class="product-section">
            <h2 class="section-title">为什么选择拉风汽车</h2>
            <ul class="product-list">
                <li><p></p><p><span>更精准的<br>二手车评估能力</span></p></li>
                <li><p><span>更安全便捷的<br>风控手段</span></p><p></p></li>
                <li><p></p><p><span>更强大的<br>定制开发能力</span></p></li>
            </ul>
            <h2 class="section-title">一站式汽车金融服务平台</h2>
        </section>
        <section class="service-section">
            <div class="finance">
                <img src='../assets/imgs/finance.jpg'>
                <div class="maskdiv">
                    <span></span>
                    <h2>为金融机构提供服务</h2>
                    <p>对接大型经销商集团等优质客户<br>贷中监管、贷后催收</p>
                </div>
            </div>
            <div class="dealer">
                <img src='../assets/imgs/dealer.jpg'>
                <div class="maskdiv">
                    <span></span>
                    <h2>为经销商提供服务</h2>
                    <p>精准评估，二手车非标资产标准化<br>业务以库存金融为主，消费金融为辅</p>
                </div>
            </div>
        </section>
        <section class="assess-section" id='quick-assess'>
            <h2 class="section-title">快速评估</h2>
            <div class="assess-form">
                <car-picker @car-val='handleCarVal'></car-picker>
                <date-picker @date-val='handleDateVal'></date-picker>
                <m-input @mil-val='handleMilVal'></m-input>
                <div class="quick-search" @click="handleAssessClick">
                    <svg t="1501817435013" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3520" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs></defs><path d="M613.52579 105.902982c-168.205956 0-304.575834 136.37704-304.575834 304.575834 0 51.429323 12.865006 99.813287 35.393091 142.320403L132.567783 764.523317l0.176009 0.179079c-16.533558 16.256242-26.843368 38.811957-26.843368 63.822584 0 49.471738 40.105417 89.572038 89.577155 89.572038 25.010627 0 47.566342-10.30981 63.824631-26.839275l-0.049119-0.050142 211.697493-211.67498c42.534745 22.604834 91.01797 35.518958 142.575206 35.518958 168.195723 0 304.573787-136.376017 304.573787-304.572764C918.098553 242.278999 781.721513 105.902982 613.52579 105.902982L613.52579 105.902982zM227.601206 859.529111c-8.178263 8.450463-19.48068 13.780865-32.123628 13.780865-24.736381 0-44.786019-20.050662-44.786019-44.790112 0-12.637832 5.326309-23.941272 13.780865-32.121582l-0.226151-0.197498 204.737988-204.733894c17.892509 24.140817 39.207977 45.454238 63.301721 63.402005L227.601206 859.529111 227.601206 859.529111zM613.52579 664.285359c-140.16839 0-253.813706-113.644293-253.813706-253.806543 0-140.16839 113.645316-253.812683 253.813706-253.812683 140.167367 0 253.81166 113.644293 253.81166 253.812683C867.337449 550.641065 753.692133 664.285359 613.52579 664.285359L613.52579 664.285359zM613.52579 232.810347c-98.130971 0-177.670515 79.537498-177.670515 177.668469 0 7.013741 5.674233 12.687974 12.68695 12.687974 7.015787 0 12.694113-5.67321 12.694113-12.687974 0-84.102467 68.184939-152.287405 152.288428-152.287405 7.013741 0 12.68695-5.674233 12.68695-12.69309C626.21274 238.483556 620.538507 232.810347 613.52579 232.810347L613.52579 232.810347zM613.52579 232.810347" p-id="3521" fill="#ffffff"></path></svg>
                    <span>快速评估</span>
                </div>
                <div class="assess-result">
                    <span>初评价格</span>
                    <p>{{price}}</p>
                </div>
            </div>
        </section>
        <section class="cooperate-section">
            <h2 class="section-title">合作伙伴</h2>
            <ul class="cooperate-list">
                <li>
                    <span></span>
                    <span></span>
                </li>
                <li>
                    <span></span>
                    <span></span>
                </li>
                <li>
                    <span></span>
                    <span></span>
                </li>
                <li>
                    <span></span>
                    <span></span>
                </li>
            </ul>
        </section>
        <back-top></back-top>
    </div>
</template>

<script>
import bannerWrapper from '@/components/common/bannerWrapper'
import carPicker from '@/components/common/carPicker'
import datePicker from '@/components/common/datePicker'
import mInput from '@/components/common/mInput'
import {getAssess} from '@/api/getData'
import { MessageBox } from 'mint-ui'
import backTop from '@/components/common/backTop'
export default {
  components: {
    bannerWrapper,
    carPicker,
    datePicker,
    mInput,
    backTop
  },
  data () {
    return {
      assessData: {
        category_3: '',
        date: '',
        mileage: ''
      },
      price: 0
    }
  },
  methods: {
    async handleAssessClick () {
      let isvoid = this.void()
      console.log(isvoid)
      if (isvoid) {
        let res = await getAssess(this.assessData)
        if (res.data.code === 0) {
          this.price = res.data.data.price
        } else {
          MessageBox('错误', res.data.message)
        }
      } else {
        MessageBox('提示', '请填写完整')
      }
    },
    handleCarVal (val) {
      console.log(val)
      this.assessData.category_3 = val
    },
    handleDateVal (val) {
      console.log(val)
      this.assessData.date = val
    },
    handleMilVal (val) {
      console.log(val)
      this.assessData.mileage = val
    },
    void () {
      for (let i in this.assessData) {
        if (!this.assessData[i]) return false
      }
      return true
    },
    handleQuickAssessClick () {
      document.getElementById('quick-assess').scrollIntoView()
    },
    handleBackTopClick () {
      document.getElementById('app').scrollTop = 0
    }
  }
}
</script>

<style lang='scss' scoped>
    .container {
        text-align: center;
        .section-title {
            font-size: .48rem;
            color: #ff3b30;
            font-weight: 500;
            height: 50vw;
            line-height: 50vw;
            position: relative;
            &::after {
                content: '';
                display: block;
                width: 1.6rem;
                height: 2px;
                background: #ff3b30;
                position: absolute;
                top: 63%;
                left: 50%;
                margin-left: -.8rem;
            }
        }
        .banner-wrapper {
            height: 147vw;
            background-color: #efefef;
            position: relative;
            .quick-item {
                display: block;
                position: absolute;
                width: 2rem;
                height: .9rem;
                font-size: .32rem;
                background: #ff3b30;
                color: #fff;
                line-height: .9rem;
                bottom: .5rem;
                right: 0;
                z-index: 1;
                border-radius: 1rem 0 0 1rem;
                svg {
                    width: .5rem;
                    height: .5rem;
                    transform: translateY(25%);
                    margin-right: -5px;
                }
            }
        }
        .product-section {
            .product-list {
                li {
                    height: 50vw;
                    display: flex;
                    p {
                        width: 50%;
                        height: 100%;
                        font-size: .36rem;
                        line-height: .52rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 25vw;
                    }
                    &:nth-child(1) p:nth-child(1){
                        background-image: url('../assets/imgs/assicon.png');
                    }
                    &:nth-child(1) p:nth-child(2){
                        background-color: #f0f0f0;
                    }
                    &:nth-child(2) p:nth-child(2){
                        background-image: url('../assets/imgs/controlicon.png');
                    }
                    &:nth-child(2) p:nth-child(1){
                        background-color: #f0f0f0;
                    }
                    &:nth-child(3) p:nth-child(1){
                        background-image: url('../assets/imgs/customicon.png');
                    }
                    &:nth-child(3) p:nth-child(2){
                        background-color: #f0f0f0;
                    }
                }
            }
        }
        .service-section {
            div {
                height: 72vw;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                }
                .maskdiv {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    // height: 100%;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    h2 {
                        font-size: .36rem;
                        font-weight: 500;
                        margin: .05rem 0 .2rem;
                        line-height: 1;
                    }
                    p {
                        font-size: .26rem;
                    }
                    span {
                        width: 1.2rem;
                        height: 1.2rem;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 1.2rem;
                    }
                }
                &.finance {
                    .maskdiv span{
                        background-image: url('../assets/imgs/ic_sp.png');
                    }
                }
                &.dealer {
                    .maskdiv span{
                        background-image: url('../assets/imgs/ic_dealer.png');
                    }
                }
            }
        }
        .assess-section {
            .assess-form {
                div {
                    width: 90%;
                    height: .92rem;
                    margin: 0 auto;
                    margin-bottom: .5rem;
                    font-size: .24rem;
                }
                .quick-search {
                    background: #ff3b30;
                    color: #fff;
                    font-size: .4rem;
                    line-height: .92rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:active {
                        background: #ff6d6d;
                    }
                    span {
                        padding-left: .25rem;
                    }
                    svg {
                        width: .6rem;
                        height: .6rem;
                    }
                }
                .assess-result {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: .36rem;
                    p {
                        flex: 1;
                        border-bottom: 2px solid #ff3b30;
                        // height: .5rem;
                        margin-left: .26rem;
                        position: relative;
                        &::after {
                            content: '元';
                            position: absolute;
                            right: 0;
                            top: 0
                        }
                    }
                }
            }
        }
        .cooperate-section {
            margin-bottom: 1rem;
            .cooperate-list {
                li {
                    height: 22vw;
                    display: flex;
                    justify-content: space-between;
                    padding: .16rem .4rem;
                    span {
                        width: 47.5%;
                        border: 1px solid #d6d6d6;
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 85%;
                    }
                    &:nth-child(1) {
                        span:nth-child(1) {
                            background-image: url('../assets/imgs/zhaoshang-1.png');
                        }
                        span:nth-child(2) {
                            background-image: url('../assets/imgs/youli-1.png');
                        }
                    }
                    &:nth-child(2) {
                        span:nth-child(1) {
                            background-image: url('../assets/imgs/anbang-1.png');
                        }
                        span:nth-child(2) {
                            background-image: url('../assets/imgs/beiqi-1.png');
                        }
                    }
                    &:nth-child(3) {
                        span:nth-child(1) {
                            background-image: url('../assets/imgs/futian-1.png');
                        }
                        span:nth-child(2) {
                            background-image: url('../assets/imgs/rundong-1.png');
                            background-size: 1.2rem;
                        }
                    }
                    &:nth-child(4) {
                        span:nth-child(1) {
                            background-image: url('../assets/imgs/wzqc-01.png');
                        }
                        span:nth-child(2) {
                            background-image: url('../assets/imgs/jyg-01.png');
                        }
                    }
                }
            }
        }
    }
    .back-top {
        position: fixed;
        right: .22222rem;
        bottom: 1.88889rem;
        z-index: 2;
        width: .7rem;
        height: .7rem;
        border-radius: 2px;
        background: rgba(0,0,0,.3) url(https://mall.res.meizu.com/index/img/gotop-b3409.png) no-repeat 50%;
        background-size: contain;
    }
</style>
