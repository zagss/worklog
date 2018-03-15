<template>
    <div class='box'>
        <v-breadcrumb></v-breadcrumb>
        <div class='contant'>
            <div class='fadeInRight'>
                    <v-search>
                        <input type="text" placeholder='关键词'>
                        <input type="button" value='搜索' @click='submit'>
                    </v-search>
                    <div class='table-chunk'>
                    <div class='create'><button @click='create'><i class='el-icon-plus'></i>添加用户</button></div>
                    <div class='table-body'>
                        <el-table :data='tableData' v-loading="loading">
                            <el-table-column type="index" width="60"></el-table-column>
                            <el-table-column :prop="key" :label="val.label" :width="val.width"
                                v-for="(val, key) in labelData" :key='key'
                            ></el-table-column>

                            <el-table-column label='操作' :width='180'>
                                <template scope='scope'>
                                    <el-button size="small" @click='toModify(scope.row)'>修改</el-button>
                                    <el-button size="small" type="danger" @click='deleteitem(scope.row)'>删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-dialog title="员工详情" v-model="dialogTableVisible">
                        <el-form :model="form" :inline="true">
                            <el-form-item label="用户名" label-width="120px">
                                <el-input  v-model="form.username" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="真实姓名" label-width="120px">
                                <el-input  v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" label-width="120px">
                                <el-input  v-model="form.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" label-width="120px">
                                <el-input  v-model="form.mobile" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" label-width="120px">
                                <el-input  v-model="form.email" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="角色" label-width="120px">
                                <el-select v-model="form.role_id" placeholder="请选择">
                                    <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogTableVisible = false">取 消</el-button>
                            <el-button type="danger" @click="upDateStaff">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog title="员工详情" v-model="dialogCreateVisiable">
                        <el-form :model="newForm" :inline="true">
                            <el-form-item label="用户名" label-width="120px">
                                <el-input  v-model="newForm.username" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="真实姓名" label-width="120px">
                                <el-input  v-model="newForm.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" label-width="120px">
                                <el-input  v-model="newForm.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" label-width="120px">
                                <el-input  v-model="newForm.mobile" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" label-width="120px">
                                <el-input  v-model="newForm.email" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="角色" label-width="120px">
                                <el-select v-model="newForm.role_id" placeholder="请选择">
                                    <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.id">
                                    </el-option>
                                </el-select>
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
                        :current-page="curPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pagination.total">
                        </el-pagination>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
  import { encrypt } from '../../config/pubkey.js'
  import labelDatas from '../../config/labelData'
  import { getUserLists, putUser, postUser, deleteUser } from '../../service/fetch'
  import { userRole } from '../../config/role'
  export default {
    data () {
      return {
        scope: {},
        labelData: {},
        tableData: [],
        pagination: {},
        dialogTableVisible: false, // 更新员工
        dialogCreateVisiable: false, // 创建员工
        roleOptions: userRole,
        loading: true,
        curPage: 1, // 当前页
        form: {
        },
        newForm: {
          role_id: ''
        } // chuan jian yuan gong form
      }
    },
    computed: {
    },
    methods: {
      fetchData (page = 1) {
        var res = getUserLists(page)
        const that = this
        res.then(res => {
          if (res.data.code === 401) {
            this.$router.push(`/`)
          }
          that.loading = false
          that.tableData = that.changeUptime(res.data.data.list)
          that.pagination = res.data.data.pagination
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.fetchData(val)
        this.curPage = val
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
          item.logged_time = this.newDate(item.logged_time)
        })
        return array
      },
      create () {
        this.dialogCreateVisiable = true
      },
      createStaff () {
        const that = this
        let encryPass = encrypt(this.newForm.password)
        let totalData = Object.assign({}, this.newForm, {password: encryPass})
        console.log(totalData)
        let res = postUser(totalData)
        res.then(res => {
          if (res.data.code === 0) {
            that.$message({ type: 'success', message: res.data.message })
            that.dialogCreateVisiable = false
            console.log(that.curPage)
            that.fetchData()
          } else {
            that.$message({ type: 'error', message: res.data.message })
          }
        })
      },
      toModify (row) {
        this.dialogTableVisible = true
        console.log(row)
        this.form = Object.assign({}, row)
      },
      upDateStaff () {
        const that = this
        let encryPass = encrypt(this.form.password)
        let totalData = Object.assign({}, {password: encryPass, username: this.form.username, name: this.form.name, mobile: this.form.mobile, role_id: this.form.role_id, email: this.form.email})
        console.log(totalData)
        let res = putUser(totalData, this.form.id)
        res.then(res => {
          if (res.data.code === 0) {
            that.$message({ type: 'success', message: res.data.message })
            that.dialogTableVisible = false
            that.fetchData(that.curPage)
          } else {
            that.$message({ type: 'error', message: res.data.message })
          }
        })
      },
      deleteitem (row) {
        const that = this
        this.$confirm('删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let res = deleteUser(row.id)
          res.then(res => {
            if (res.data.code === 0) {
              that.$message({ type: 'success', message: res.data.message })
              that.fetchData(that.curPage)
            } else {
              that.$message({ type: 'error', message: res.data.message })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    created () {
      this.fetchData()
    },
    beforeMount () {
      this.labelData = labelDatas['system.user']
    }
  }
</script>

<style lang='scss' scoped>
.el-input, .el-select {
  width: 180px;
}
</style>

