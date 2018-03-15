<template>
    <div class="fill-contain attach-page fade-right padding-page">
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
</template>

<script>
import labelData from '@/config/tableLabel'
import { getSubList } from '@/service/getData'
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
      const res = await getSubList(3, per, start, this.$route.params.id)
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
    this.labelData = labelData['organize.car']
    this.fetch()
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/style/mixin';
  .attach-page {
      background: #fff;
      @include sbr;
  }
</style>
