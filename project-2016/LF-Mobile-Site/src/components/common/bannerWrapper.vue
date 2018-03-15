<template>
    <swiper :options="swiperOption">
        <swiper-slide><img src='../../assets/imgs/banner-01@3x.jpg'></swiper-slide>
        <swiper-slide><img src='../../assets/imgs/banner-02@3x.jpg'></swiper-slide>
        <swiper-slide><img src='../../assets/imgs/banner-03@3x.jpg'></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          paginationClickable: true,
        //   spaceBetween: 30,
          loop: true,
          mousewheelControl: true
        }
      }
    }
  }
</script>

<style lang="scss">
    .swiper-container, .swiper-wrapper, .swiper-slide {
        height: 100%;
    }
    img {
        width: 100%;
    }
    .banner-wrapper .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
        background: transparent;
        border-radius: 100%;
        border: 1px solid #fff;
        opacity: .5;
    }
    .banner-wrapper .swiper-pagination-bullet-active {
        background: #fff;
    }
</style>
