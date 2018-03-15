<template>
  <div class='fill-contain detail-page'>
     <div :class='classObj' @scroll="handleScroll" :style="styleObj">
      <div class='header-top' :style="{height: styleObj.paddingTop}">
        <brand v-show="$route.params.from==='dealer'?true:false" :address='address' :title='title' ></brand>
        <nav-top :label='labelData.nav' :title="title"></nav-top>
      </div>
      <div class='page-detail fill-contain'>
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import labelData from '@/config/labelData'
import brand from '@/components/brand'
import navTop from '@/components/navTop'
import { getStoreDetail } from '@/service/getData'
export default {
  components: {
    brand,
    navTop
  },
  data () {
    return {
      labelData: {},
      styleObj: {
        paddingTop: ''
      },
      classObj: {
        'fixed-box': true,
        'fill-contain': true,
        'fix-head': false
      },
      address: '',
      title: '门店名称'
    }
  },
  methods: {
    async fetch () {
      let res = await getStoreDetail(this.$route.params.id)
      if (res.data.code === 0) {
        if (res.data.data.city_info) {
          let city = res.data.data.city_info
          city.province_name = city.province_name ? city.province_name : ''
          city.city_name = city.city_name ? city.city_name : ''
          city.area_name = city.area_name ? city.area_name : ''
          city.address = city.address ? city.address : ''
          this.title = res.data.data.name
          this.address = city.province_name + city.city_name + city.area_name + city.address
        }
      }
    },
    handleScroll (e) {
      if (this.$route.params.from !== 'dealer') return
      // console.log(e.target.scrollTop)
      if (e.target.scrollTop > 50) {
        this.classObj['fix-head'] = true
        this.styleObj.paddingTop = '48px'
      } else {
        this.classObj['fix-head'] = false
        this.styleObj.paddingTop = '176px'
      }
    },
    calcTop () {
      let from = this.$route.params.from
      this.labelData = labelData[from]
      this.fetch()
      this.styleObj.paddingTop = this.$route.params.from === 'dealer' ? '176px' : '48px'
    }
  },
  created () {
    this.calcTop()
  },
  watch: {
    '$route': function (n, o) {
      if (o.params.from !== n.params.from) {
        this.calcTop()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '../../assets/style/mixin';
   .detail-page {
       position: relative;
       @include sb;
       .fixed-box {
          overflow-y: auto;
          overflow-x: hidden;
          transition: padding-top .3s ease;
          &.fix-head {
            .brand-item {
              height: 0;
              padding: 0 32px;
            }
            .header-top {
              height: 48px;
            }
          }
       }
       .header-top {
           position: absolute;
           top: 0;
           width: 100%;
           z-index: 1;
           transition: height .3s ease;
           box-shadow: -1px 0 8px #d3d4d6;
       }
       .page-detail {
           padding: 16px;
       }
   }
</style>
