<template>
    <aside class="back-top" v-if='showBackStatus' @click="handleBackTopClick"></aside>
</template>

<script>
import { showBack } from '@/config/mutils'
export default {
  data () {
    return {
      showBackStatus: false
    }
  },
  mounted () {
    this.initStatus()
  },
  methods: {
    initStatus () {
      showBack(status => {
        this.showBackStatus = status
      })
    },
    handleBackTopClick () {
      document.getElementById('app').scrollTop = 0
    }
  }
}
</script>

<style lang='scss' scoped>
    .back-top {
        position: fixed;
        right: .22222rem;
        bottom: 1rem;
        z-index: 2;
        width: .7rem;
        height: .7rem;
        border-radius: 2px;
        background: rgba(0,0,0,.3) url('../../assets/imgs/gotop.png') no-repeat 50%;
        background-size: contain;
    }
</style>
