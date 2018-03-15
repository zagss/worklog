<template>
    <div class='fadeInRight'>
        <v-search>
            <input type="text" placeholder='经销商集团管理'>
            <input type="text" placeholder='集团负责人姓名'>
            <input type="text" placeholder='业务员姓名（拉风）'>
            <input type="button" value='搜索' @click='submit'>
        </v-search>
        <v-form :page='true' createname='创建附属门店' :labelData='labelData'
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
  import { getAttachmentStoreList } from '../../../service/fetch'
  export default {
    data () {
      return {
        labelData: '',
        tableData: [],
        pagination: {},
        ifloding: true
      }
    },
    methods: {
      fetchData (start = 1) {
        var res = getAttachmentStoreList(3, this.$route.query.pid, start)
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
          item.credit_line = (item.credit_line / 10000) + ' / ' + (item.available_limit / 10000)
        })
        return array
      }
    },
    created () {
      this.fetchData()
    },
    beforeMount () {
      this.labelData = labelDatas['organize.dealer.attachment']
    }
  }
</script>

<style lang='scss' scoped>
</style>
