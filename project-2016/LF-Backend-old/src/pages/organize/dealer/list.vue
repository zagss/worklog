<template>
    <div class='box'>
        <v-breadcrumb></v-breadcrumb>
        <div class='contant'>
            <div class='fadeInRight'>
                <v-search>
                    <input type="text" placeholder='经销商集团管理'>
                    <input type="text" placeholder='集团负责人姓名'>
                    <input type="text" placeholder='业务员姓名（拉风）'>
                    <input type="button" value='搜索' @click='submit'>
                </v-search>
                <v-form :page='true' createname='创建集团' :labelData='labelData'
                 :tableData='tableData' :pagination='pagination' edit='编辑' del
                 :loding='ifloding'
                 @current-page="changeCurrentPage"
                 :operate='true'
                 ></v-form>
            </div>
        </div>
    </div>
</template>

<script>
  import labelDatas from '../../../config/labelData'
  import { getStoreList } from '../../../service/fetch'
  export default {
    data () {
      return {
        labelData: '', // 表格项
        tableData: [], // 表格数据
        pagination: {}, // 分页数据
        ifloding: true
      }
    },
    computed: {
    },
    methods: {
      fetchData (start = 1) {
        var res = getStoreList(1, start)
        const that = this
        res.then(res => {
          if (res.data.code === 401) {
            this.$router.push(`/`)
          }
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
      this.labelData = labelDatas['organize.dealer']
    }
  }
</script>

<style lang='scss' scoped>
</style>
