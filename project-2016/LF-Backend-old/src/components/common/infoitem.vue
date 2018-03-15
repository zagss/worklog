<template>
    <div class='info-item'>
        <div class='title' v-if='title'>{{title}}</div>
        <div class='content'>
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>

<style lang='scss' scoped>
.info-item {
    margin: 32px 16px 0;
    border-bottom: 1px solid #E6E6E6;
    .title {
        font-size: 16px;
        color: rgba(0,0,0,0.80);
        letter-spacing: 0;
    }
    .content {
        padding: 32px 64px;
    }
}

</style>
