<template>
    <div class='table-chunk'>
        <div class='create' v-if='createname'><button @click='create'><i class='el-icon-plus'></i> {{createname}}</button></div>
        <div class='table-body'>
            <el-table :data='tableData' v-loading="loding">
                <el-table-column type="index" width="60"></el-table-column>
                <el-table-column v-for='(val, key) in labelData' :key='val' :prop='key' :label='val.label' :width='val.width'></el-table-column>
                <el-table-column label='操作' :width='180' v-if='operate'>
                    <template scope='scope'>
                        <el-button size="small" @click='todetail(scope)'>{{edit}}</el-button>
                        <el-button v-if='del' size="small" type="danger" @click='deleteitem(scope)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class='pagenation' v-if='page'>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import {GetUrl} from '../../config/geturl'
  import { deleteDealer } from '../../service/fetch'
  export default {
    props: {
      page: Boolean,
      createname: String,
      labelData: Object,
      tableData: Array,
      edit: String,
      del: Boolean,
      dialog: String,
      pagination: Object,
      scopeMsg: Object,
      loding: Boolean,
      tourl: String,
      operate: Boolean
    },
    data () {
      return {
        params: '',
        local: '', // 附属门店
        pid: '',
        loading: true
      }
    },
    methods: {
      create () {
        this.$router.push({
          path: '/organize/create',
          query: {
            from: this.params,
            pid: this.$route.query.pid
          }
        })
      },
      todetail (val) {
        var that = this
        this.$store.dispatch('SET_ITEM', {key: 'list', val: val.row})
        if (this.tourl) {
          this.$router.push({
            path: this.tourl,
            query: {
              from: this.params,
              pid: val.row.id
            }
          })
        } else {
          if (that.local) {
            this.$router.push({
              path: `/organize/detail/${that.local}/detail`,
              query: {
                from: this.params,
                pid: val.row.id,
                oldval: that.$route.query.pid
              }
            })
          } else {
            this.$router.push({
              path: `/organize/detail`,
              query: {
                from: this.params,
                pid: val.row.id
              }
            })
          }
        }
      },
      deleteitem (scope) {
        console.log(scope)
        const that = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let res = deleteDealer(scope.row.id)
          res.then(res => {
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: '删除成功!' })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      putScope (scope) {
        this.dialogTableVisible = true
        this.scopeMsg = scope
        console.log(scope)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.$emit('current-page', val)
      }
    },
    mounted () {
      this.params = GetUrl().host
      this.local = GetUrl().local
    }
  }
</script>

<style lang='scss'>
</style>
