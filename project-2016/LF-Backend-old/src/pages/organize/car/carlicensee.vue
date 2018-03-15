<template>
    <div class='fadeInRight'>
        <v-search>
            <input type="text" placeholder='经销商集团管理'>
            <input type="text" placeholder='集团负责人姓名'>
            <input type="text" placeholder='业务员姓名（拉风）'>
            <input type="button" value='搜索' @click='submit'>
        </v-search>
        <v-form :page='true' createname='创建持牌人' :labelData='labelData'
         :pagination='pagination'
        :tableData='tableData' edit='编辑' del
        :loding='ifloding'
        @current-page="changeCurrentPage"
        :operate='true'
        ></v-form>
    </div>
</template>

<script>
  import labelDatas from '../../../config/labelData'
  import { getLicensees } from '../../../service/fetch'
  export default {
    data () {
      return {
        labelData: {},
        tableData: [],
        pagination: {},
        ifloding: true
      }
    },
    computed: {
    },
    methods: {
      fetchData (start = 1) {
        var res = getLicensees(this.$route.query.pid, start)
        const that = this
        res.then(res => {
          that.ifloding = false
          that.tableData = that.changeUptime(res.data.data.list)
          that.pagination = res.data.data.pagination
        })
      },
      changeCurrentPage (val) {
        this.fetchData(val)
      },
      submit () {
        alert('！！！')
      },
      newDate (val) {
        let unixT = new Date(val * 1000)
        return unixT.toLocaleString('chinese', {hour12: false})
      },
      changeUptime (array) { // 修改时间戳微正常时间
        array.forEach(item => {
          item.create_time = this.newDate(item.create_time)
        })
        return array
      }
    },
    created () {
      this.fetchData()
    },
    beforeMount () {
      this.labelData = labelDatas['organize.car.carlicensee']
    }
  }
</script>

<style lang='scss' scoped>
</style>
