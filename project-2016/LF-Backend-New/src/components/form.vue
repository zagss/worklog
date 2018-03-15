<template>
  <div class="table-chunk" ref='tableChunk'>
    <div class="table-create"><el-button type="danger" icon="plus" @click="handlePlusClick">添加</el-button></div>
    <el-table :data='tableData' border v-loading="loading" highlight-current-row :max-height="maxHeight">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column v-for='(val, key) in labelData' :key='val' :prop='key' :label='val.label' :width='val.width' min-width='150px' :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label='操作' width='200' fixed="right">
            <template scope='scope'>
                <el-button size="small" :plain="true" type="danger" @click='todetail(scope)'>查看</el-button>
                <el-button size="small" type="primary" @click='toCreate(scope)'>编辑</el-button>
                <el-button size="small" type="danger" @click='deleteitem(scope)'>删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    labelData: Object,
    tableData: Array,
    total: Number,
    loading: Boolean
  },
  data () {
    return {
      maxHeight: '', // （流体）表格最大高度
      size: 20
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('size-change', val)
      this.size = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('current-change', val)
    },
    handlePlusClick () { // To Create Page
      if (this.$route.name === 'subsidiary') {
        this.$router.push({ path: '/create/store/0', query: {group_id: this.$route.params.id} })
      } else {
        let id = 0
        let from = this.$route.path.split('/').slice(-1)[0]
        this.$router.push({ name: 'create', params: { from: from, id: id } })
      }
    },
    calc () { // 计算页面高度赋值table高度
      this.$nextTick(() => {
        this.maxHeight = this.$refs.tableChunk.offsetHeight - 50
      })
    },
    toCreate (scope) { // 进入编辑界面
      let id = scope.row.id
      if (this.$route.name === 'subsidiary') {
        this.$router.push(`/create/store/${id}`)
      } else {
        let from = this.$route.path.split('/').slice(-1)[0]
        this.$router.push({ name: 'create', params: { from: from, id: id } })
      }
    },
    todetail (scope) {
      let id = scope.row.id
      if (this.$route.name === 'subsidiary') {
        this.$router.push(`/detail/store/${id}/content`)
      } else {
        let from = this.$route.path.split('/').slice(-1)[0]
        this.$router.push({ name: 'detail', params: { from: from, id: id } })
      }
    }
  },
  mounted () {
    this.calc()
  }
}
</script>

<style lang='scss' scoped>
  .table-chunk {
      height: 90%;
  }
  .table-create {
      text-align: right;
      margin-top: -40px;
      margin-bottom: 16px;
  }
</style>
