<template>
    <div class='fadeInRight'>
        <v-search>
            <input type="text" placeholder='经销商集团管理'>
            <input type="text" placeholder='集团负责人姓名'>
            <input type="text" placeholder='业务员姓名（拉风）'>
            <input type="button" value='搜索' @click='submit'>
        </v-search>
        <div class='table-chunk'>
          <div class='create'><button @click='create'><i class='el-icon-plus'></i>添加员工</button></div>
          <div class='table-body'>
              <el-table :data='tableData' v-loading="loading">
                  <el-table-column type="index" width="60"></el-table-column>
                  <el-table-column prop="user.name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="id_number" label="身份证" width="180"></el-table-column>
                  <el-table-column prop="user.mobile" label="联系电话" width="150"></el-table-column>
                  <el-table-column prop="user.username" label="账号" width="180"></el-table-column>
                  <el-table-column prop="user.role_id" label="角色" width="120">
                    <template scope="scope">
                      <el-tag
                        :type="scope.$index % 2 == 1 ? 'primary' : 'success'"
                        close-transition>{{scope.row.user.role_name}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="录入日期">
                    <template scope="scope">
                      {{scope.row.user.create_time | newDate}}
                    </template>
                  </el-table-column>

                  <el-table-column label='操作' width='180'>
                      <template scope='scope'>
                          <el-button size="small" @click='toModify(scope.row)'>修改</el-button>
                          <el-button size="small" type="danger" @click='deleteitem(scope)'>删除</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
          <el-dialog title="员工详情" v-model="dialogTableVisible">
              <el-form :model="form" :inline="true">
                <el-form-item v-for="(val, key) in labelData.user" :key='key' :label="val.label" label-width="120px" v-show='key !== "is_push"'>
                   <el-select v-if="key === 'role_id'" v-model="form.role_id" placeholder="请选择">
                      <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.id">
                      </el-option>
                    </el-select>
                  <el-input v-else v-model="form[key]" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogTableVisible = false">取 消</el-button>
                  <el-button type="danger" @click="upDateStaff">确 定</el-button>
              </div>
          </el-dialog>
          <el-dialog title="员工详情" v-model="dialogCreateVisiable">
              <el-form :model="newForm" :inline="true">
                <el-form-item v-for="(val, key) in labelData.user" :key='key' :label="val.label" label-width="120px">
                   <el-select v-if="key === 'role_id'" v-model="newForm.role_id" placeholder="请选择">
                      <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.id">
                      </el-option>
                    </el-select>
                    <el-radio-group v-model="newForm.is_push" v-else-if="key === 'is_push'">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  <el-input v-else v-model="newForm[key]" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogCreateVisiable = false">取 消</el-button>
                  <el-button type="danger" @click="createStaff">确 定</el-button>
              </div>
          </el-dialog>
          <div class='pagenation'>
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
    </div>
</template>

<script>
  import labelDatas from '../../../config/labelData'
  import { getStaff, putStaffDetail, postStaff, deleteStaff } from '../../../service/fetch'
  import { financeStaffRole } from '../../../config/role'
  export default {
    data () {
      return {
        scope: {},
        labelData: {},
        tableData: [],
        pagination: {},
        dialogTableVisible: false, // 更新员工
        dialogCreateVisiable: false, // 创建员工
        roleOptions: financeStaffRole,
        loading: true,
        form: {
        },
        newForm: {
          role_id: '',
          is_push: 0
        } // chuan jian yuan gong form
      }
    },
    computed: {
    },
    methods: {
      fetchData () {
        var res = getStaff(this.$route.query.pid)
        const that = this
        res.then(res => {
          that.loading = false
          that.tableData = res.data.data.list
          that.pagination = res.data.data.pagination
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      submit () {
        alert('！！！')
      },
      create () {
        this.newForm = {
          role_id: '',
          is_push: 0
        }
        this.dialogCreateVisiable = true
      },
      createStaff () {
        const that = this
        let totalData = Object.assign({}, this.newForm)
        let res = postStaff(totalData, this.$route.query.pid)
        res.then(res => {
          if (res.data.code === 0) {
            that.$message({ type: 'success', message: res.data.message })
            that.dialogCreateVisiable = false
            that.fetchData()
          } else {
            that.$message({ type: 'error', message: res.data.message })
          }
        })
      },
      toModify (row) {
        this.dialogTableVisible = true
        var newRow = Object.assign({}, row.user, row)
        this.form = newRow
      },
      upDateStaff () {
        const that = this
        let totalData = Object.assign({}, {name: this.form.name, id_number: this.form.id_number, mobile: this.form.mobile, role_id: this.form.role_id})
        let res = putStaffDetail(totalData, this.form.dealer_id, this.form.id)
        res.then(res => {
          if (res.data.code === 0) {
            that.$message({ type: 'success', message: res.data.message })
            that.fetchData()
            that.dialogTableVisible = false
          } else {
            that.$message({ type: 'error', message: res.data.message })
          }
        })
      },
      handleDeleteStaff (oldid, id) {
        let res = deleteStaff(oldid, id)
        res.then(res => {
          if (res.data.code === 0) {
            this.$message({ type: 'success', message: res.data.message })
            this.fetchData()
          } else {
            this.$message({ type: 'error', message: res.data.message })
          }
        })
      },
      deleteitem (scope) {
        const that = this
        this.$confirm('删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.handleDeleteStaff(scope.row.dealer_id, scope.row.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    filters: {
      newDate (val) {
        let unixT = new Date(val * 1000)
        return unixT.toLocaleString('chinese', {hour12: false})
      }
    },
    created () {
      this.fetchData()
    },
    beforeMount () {
      this.labelData = labelDatas['organize.store.staff']
    }
  }
</script>

<style lang='scss' scoped>
.el-input, .el-select {
  width: 180px;
}
</style>
