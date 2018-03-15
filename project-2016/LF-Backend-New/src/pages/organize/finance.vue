<template>
  <div class='fill-contain contain-padding'>
      <v-breadcrumb></v-breadcrumb>
      <div class='table-content fill-contain'>
        <div class="fade-right fill-contain padding-page">
            <v-search>
                <input type="text" placeholder='请输入名称'>
                <input type="text" placeholder='请输入负责人姓名'>
                <input type="text" placeholder='业务员姓名（拉风）'>
                <input type="button" value='搜索'>
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
import { setPagination } from '@/components/mixin'
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
  mixins: [setPagination],
  methods: {
    searchData () {
      alert('!!!')
    },
    async fetch (per = 20, start = 1) {
      const res = await getStoreList(4, per, start)
      if (res.data.code === 0) {
        this.tableData = res.data.data.list
        this.total = res.data.data.pagination.total
        this.loading = false
      } else {
        this.$message({ type: 'error', message: res.data.message })
      }
    }
  },
  created () {
    this.labelData = labelData['organize.finance']
    this.fetch()
  }
}
</script>

<style>
  
</style>
