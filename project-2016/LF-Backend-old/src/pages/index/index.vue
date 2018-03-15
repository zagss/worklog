<template>
    <div class='index-page'>
        <v-sidemenu></v-sidemenu>
        <section class='section'>
            <v-header></v-header>
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
</script>

<style lang='scss' scoped>
@import '../../assets/style/mixin';
    .index-page {
        @include wh(100%, 100%)
    }
    .section {
        position: absolute;
        left: 210px;
        right: 0;
        bottom: 0;
        top: 0;
        background: #F7F8FA;
    }
</style>
