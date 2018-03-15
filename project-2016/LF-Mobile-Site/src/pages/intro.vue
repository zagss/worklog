<template>
    <div class="intro-page">
        <div class="intro-head">
            <h2 class="intro-title">拉丰汽车AI智能系统</h2>
            <p>拉风汽车专注于为银行、汽车金融、融资租赁及经销商、二手车商等公司提供一站式平台服务，依托专业的二手车评估技术、强大的风控体系、数据模型以及监控措施，提供数据体系报告、风控模型报告、征信评估报告帮助其提高效率并降低运营成本。</p>
        </div>
        <section>
            <h2 class="intro-title">业务模式</h2>
            <p class="intro-content">以AI智能系统平台为核心 , 业务范围包含服务上游资金方(银行/保险公司/融资租赁公司/汽车金融公司)，并为线下二手车运营商(4S店/二手车商/2级网点等)提供金融服务和二手车评估，同时也提供当地消费者二手车分期等相关业务。</p>
            <p class="intro-content">结合云端及大数据提高评估准确率，解决车源留存及库存融资问题，降低寻租空间及飞单问题。目前与拉风汽车合作的700余家4S店效果明显。系统可指定资金用途及还款来源，更大程度加强资金安全型并监控流向，更易获得资金方授信。</p>
            <div class="intro-wrapper"></div>
        </section>
        <section>
            <h2 class="intro-title">主营业务</h2>
            <div class="intro-business">
                <span></span>
                <h3>库存融资业务</h3>
                <p>模式多样化、利率更灵活、评估更专业精准，更好的解决车源留存及库存融资问题</p>
            </div>
            <div class="intro-business">
                <span class="business2"></span>
                <h3>消费贷分期-新车、二手车</h3>
                <p>手续更简单、风控模型更完善、审批流程更快捷、放款速度更高效<br>
                    <small>进件提报 > 风控审核 > 合同签署 > 抵押放款 > 抵押登记</small>
                </p>
            </div>
            <div class="intro-business business3">
                <span class="business3"></span>
                <h3>车辆评估业务</h3>
                <p>具有真实收售数据支持，评估定价更精准；双评定价系统分析，彻底防范道德风险；标准化评估作业，实现车辆评估数据化，提高效率与质量</p>
            </div>
            <back-top></back-top>
        </section>
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
.intro-page {
    text-align: center;
    .intro-title {
        font-size: .48rem;
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
    .intro-head {
        height: 76vw;
        background: url('../assets/imgs/img_bg_04.png') no-repeat;
        background-size: 100% 76vw;
        position: relative;
        .intro-title {
            color: #fff;
            font-size: .46rem;
            &::after {
                background: #fff;
                height: 2px;
            }
        }
        p {
            font-size: .26rem;
            color: #fff;
            padding: 0 10%;
            line-height: .4rem;
        }
    }
    .intro-content {
        text-align: left;
        font-size: .3rem;
        padding: 0 .3rem;
        line-height: .46rem;
        margin-bottom: .6rem;
    }
    .intro-wrapper {
        height: 56vw;
        background: url('../assets/imgs/business1.jpg') no-repeat;
        background-size: 100% 56vw;
    }
    .intro-business {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #999;
        padding: .3rem .77rem;
        &.business3 {
            padding: .3rem .6rem;
            margin-bottom: 1rem;
        }
        h3 {
            font-size: .34rem;
            color: #666;
            margin-bottom: .24rem;
        }
        p {
            font-size: .26rem;
            line-height: .46rem;
            small {
                color: #fdc642;
                font-size: .26rem;
            }
        }
        span {
            height: 1.4rem;
            width: 1.4rem;
            background-image: url('../assets/imgs/ic_kucunrongzi.png');
            background-repeat: no-repeat;
            background-size: 1.2rem;
            background-position: center;
            margin-bottom: .3rem;
            &.business2 {
                background-image: url('../assets/imgs/ic_xiaofeidai.png');
                background-size: 1.3rem;
            }
            &.business3 {
                background-image: url('../assets/imgs/img_cheliangpinggu.png');
            }
        }
    }
}
</style>
