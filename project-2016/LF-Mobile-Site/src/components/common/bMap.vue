<template>
  <baidu-map class="map" ak="rE3HEyQWVYIPxqQGIbctfHzRkVG7f9ZK" :center="{lng: 120.384423, lat: 36.105253}" :zoom="5" :dragging='false' :double-click-zoom='false'>
    <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="false" :icon="iconObj">
      <bm-label content="北京总部" :labelStyle="{color: '#000', fontSize : '12px', border: '1px solid #cae5f6', padding: '0 5px'}" :offset="{width: 21, height: 0}"/>
    </bm-marker>
    <bm-marker :position="{lng: 121.41192200, lat: 31.17057600}" :dragging="false" :icon="iconObj">
      <bm-label content="上海分部" :labelStyle="{color: '#000', fontSize : '12px', border: '1px solid #cae5f6', padding: '0 5px'}" :offset="{width: -20, height: -25}"/>
    </bm-marker>
  </baidu-map>
</template>

<script>
import {BaiduMap, BmMarker, BmLabel} from 'vue-baidu-map' // https://dafrok.github.io/vue-baidu-map/#/zh/index
import logo from '@/assets/imgs/ic_address.png'
export default {
  components: {
    BaiduMap,
    BmMarker,
    BmLabel
  },
  data () {
    return {
      iconObj: {
        url: logo,
        size: {
          width: 20,
          height: 45
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
