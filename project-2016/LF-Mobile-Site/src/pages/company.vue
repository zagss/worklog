<template>
    <div class="company-page">
        <div class="company-head">
            <h1 class="company-title-top">绿气科技有限公司</h1>
        </div>
        <section>
            <h2 class="company-title">公司介绍</h2>
            <p class="company-content">北京绿汽科技有限公司有着丰富的汽车 、互联网及金融行业经验团队，在围绕着汽车产业开展业务的过程中推出了汽车金融类产品，迅速打开局面获取营业数据、专业、强大的执行团队的基础上，做出了更具前瞻性的汽车金融类产品。而北京绿汽科技有限公司拥有独立研发并拥有独立知识产权系统及风险控制体系AI智能系统，目前已合作润东、维辰、金阳光、远通等经销商集团共700余家4S店，利用本系统可完全解决经销商集团4S店开展二手车业务的痛点，迅速占领市场并与同业展开紧密优质的合作。</p>
            <div class="company-wrapper">
                <span>查估设备</span>
            </div>
            <div class="company-wrapper w1">
                <span>查估作业</span>
            </div>
            <div class="company-wrapper w2">
                <span>门店展示</span>
            </div>
            <p class="company-content">线下店面<br>截至2016年，已发展9家线下直营门店与6家加盟店，包含：直营门店（徐州、南通、临沂、湖州、嘉兴、淮安、淄博、威海、泰安）。加盟店（济南、阜阳、西安、济宁、瑞安、盐城）。自2015年4Q至今，评估超过6万余台实车，均为完整车况（影像、结构、OBD等）及从收购到交易全过程掌握最高价值数据，远程查估服务已遍及700家以上4S店、金融机构及半数以上第三方平台。同时也积极拓展全国各省份SP代理及直营/加盟店。</p>
        </section>
        <back-top></back-top>
    </div>
</template>

<script>
import backTop from '@/components/common/backTop'
export default {
  components: {
    backTop
  }
}
</script>

<style lang='scss' scoped>
.company-page {
    text-align: center;
    .company-title {
        font-size: .46rem;
        color: #ff3b30;
        font-weight: 500;
        height: 30vw;
        line-height: 30vw;
        position: relative;
        &::after {
            content: '';
            display: block;
            width: 1.6rem;
            height: 2px;
            background: #ff3b30;
            position: absolute;
            top: 73%;
            left: 50%;
            margin-left: -.8rem;
        }
    }
    .company-head {
        height: 76vw;
        background: url('../assets/imgs/img_bg_03.png') no-repeat;
        background-size: 100% 76vw;
        position: relative;
        .company-title-top {
            color: #fff;
            font-size: .5rem;
            line-height: 70vw;
        }
        p {
            font-size: .26rem;
            color: #fff;
            padding: 0 10%;
            line-height: .4rem;
        }
    }
    .company-content {
        text-align: left;
        font-size: .3rem;
        padding: 0 .3rem;
        line-height: .46rem;
        margin-bottom: .6rem;
    }
    .company-wrapper {
        height: 51vw;
        width: 80%;
        margin: 0 auto;
        background-image: url('../assets/imgs/image-1.jpg');
        background-repeat: no-repeat;
        background-size: 100% 51vw;
        margin-bottom: .7rem;
        position: relative;
        &.w1 {
            background-image: url('../assets/imgs/image-2.jpg');
        }
        &.w2 {
            background-image: url('../assets/imgs/image-3.png');
        }
        span {
            color: #fff;
            font-size: .3rem;
            display: block;
            width: 100%;
            background: rgba(0, 0, 0, .5);
            padding: .16rem .5rem;
            text-align: left;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
}
</style>
