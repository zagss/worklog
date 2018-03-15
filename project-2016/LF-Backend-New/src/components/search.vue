<template>
  <div class='search-row'>
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
@import '../assets/style/mixin';
  .search-row {
    width: 85%;
    input[type='text'] {
        @include wh(180px, 36px);
        background: #FFFFFF;
        border: 1px solid #C6CBD0;
        border-radius: 100px;
        padding: 10px;
        margin: 4px 0;
        font-size: 14px;
        color: rgba(0,0,0,0.38);
        line-height: 14px;
        &:focus {
          border: 1px solid $red;
        }
    }
    input[type='button'] {
        @include wh(76px, 36px);
        font-size: 14px;
        color: #FF3B30;
        line-height: 14px;
        background: #FFFFFF;
        border: 1px solid #FF3B30;
        border-radius: 4px;
        cursor: pointer;
    }
    input:not(:last-child){
        margin-right: 10px;
    }
  }
</style>
