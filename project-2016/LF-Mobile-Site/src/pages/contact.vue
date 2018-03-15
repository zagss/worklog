<template>
    <div class="contact-page">
        <div class="contact-map">
            <b-map></b-map>
        </div>
        <section>
            <div class="location">
                <h1>北京总部</h1>
                <p>北京市朝阳区慧忠里103号洛克<br>时代中心A座703室</p>
            </div>
            <div class="location">
                <h1>上海总部</h1>
                <p>上海市徐汇区田林路140号越界<br>创意园16号楼东2楼201室</p>
            </div>
            <div class="location">
                <h1>商务合作</h1>
                <p class="phone">4001-556-256(周一至周五)</p>
                <p class="mail">cooperate@la-feng.com</p>
            </div>
        </section>
    </div>
</template>

<script>
import bMap from '@/components/common/bMap'
export default {
  components: {
    bMap
  }
}
</script>

<style lang='scss' scoped>
.contact-map {
    height: 63vw;
    margin-bottom: .5rem;
}
.location {
    padding: .3rem;
    &:last-child {
        margin-bottom: .6rem;
    }
    h1 {
        font-size: .45rem;
        font-weight: 500;
        margin-bottom: .4rem;
        padding: 0 0 0 1rem;
        font-weight: normal;
    }
    p {
        font-size: .28rem;
        color: #808080;
        line-height: .5rem;
        padding: 0 0 0 1rem;
        background-image: url('../assets/imgs/ic_address.png');
        background-repeat: no-repeat;
        background-position: .5rem .06rem;
        &.phone {
            background-image: url('../assets/imgs/ic_phone.png');
        }
        &.mail {
            background-image: url('../assets/imgs/ic_mail.png');
        }
    }
}
  
</style>
