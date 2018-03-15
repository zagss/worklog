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
                :tableData='tableData'
                :pagination='pagination'
                :loding='ifloding'
                @current-page="changeCurrentPage"
                :operate='false'
                ></v-form>
            </div>
        </div>
    </div>
</template>

<script>
  import labelDatas from '../../config/labelData'
  import { getLog } from '../../service/fetch'
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
        let res = getLog(start)
        res.then(res => {
          if (res.data.code === 401) {
            this.$router.push(`/`)
          }
          this.ifloding = false
          this.tableData = this.changeUptime(res.data.data.list)
          this.pagination = res.data.data.pagination
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
          item.name = item.operator.name
          item.role_name = item.operator.role_name
        })
        return array
      }
    },
    created () {
      this.fetchData()
    },
    beforeMount () {
      this.labelData = labelDatas['system.log']
    }
  }
</script>

<style lang='scss' scoped>
</style>
