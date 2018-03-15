<template>
  <div class='head-top'>

  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
@import '../assets/style/mixin';
.head-top {
    @include wh(100%, 80px);
    background: #fff;
    margin-top: -80px;
    border-bottom: 1px solid #f7f7f7;
    position: relative;
    z-index: 2;
}
</style>
