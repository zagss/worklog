<template>
  <div class='fill-contain contain-padding'>
      <v-breadcrumb></v-breadcrumb>
      <div class='table-content fill-contain'>
        <div class="fade-right fill-contain padding-page">
          <v-search>
            <input type="text" placeholder='经销商集团管理'>
            <input type="text" placeholder='集团负责人姓名'>
            <input type="text" placeholder='业务员姓名（拉风）'>
            <input type="button" value='搜索' @click='searchData'>
          </v-search>
          <v-form
          :labelData = 'labelData'
          :tableData = 'tableData'
          :total = 'total'
          @size-change = 'handleSizeChange'
          @current-change = 'handleCurrentChange'
          :loading = 'loading'
          ></v-form>
        </div>
      </div>
  </div>
</template>

<script>
import labelData from '@/config/tableLabel'
import { getStoreList } from '@/service/getData'
import { setPagination, changeTableData } from '@/components/mixin'
export default {
  data () {
    return {
      labelData: {},
      tableData: [],
      total: 0,
      size: 20,
      loading: true
    }
  },
  mixins: [setPagination, changeTableData],
  methods: {
    searchData () {
      alert('!!!')
    },
    async fetch (per = 20, start = 1) {
      const res = await getStoreList(1, per, start)
      if (res.data.code === 0) {
        this.tableData = this.changeUptime(res.data.data.list)
        this.total = res.data.data.pagination.total
        this.loading = false
      } else {
        this.$message({ type: 'error', message: res.data.message })
      }
    }
  },
  created () {
    this.labelData = labelData['organize.dealer']
    this.fetch()
  }
}
</script>

<style>
  
</style>
