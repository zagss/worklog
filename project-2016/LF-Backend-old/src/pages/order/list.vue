<template>
    <div class='box'>
        <v-breadcrumb></v-breadcrumb>
        <div class='contant'>
            <div class='fadeInRight order-list'>
                <v-search>
                    <input type="text" placeholder='请输入集团名称'>
                    <input type="text" placeholder='请输入提报人姓名'>
                    <input type="text" placeholder='请输入门店名称'>
                    <input type="text" placeholder='请输入中小型车商名称'>
                    <el-select v-model="serchval.region" placeholder="请选择订单类型">
                        <el-option label="有垫资" value="1"></el-option>
                        <el-option label="无垫资" value="2"></el-option>
                    </el-select>
                    <el-date-picker
                      v-model="serchval.date"
                      type="daterange"
                      placeholder="选择日期范围">
                    </el-date-picker>
                    <el-select v-model="serchval.region" placeholder="请选择订单状态">
                        <el-option label="部门一" value="1"></el-option>
                        <el-option label="部门二" value="2"></el-option>
                        <el-option label="部门三" value="3"></el-option>
                    </el-select>
                    <input type="button" value='搜索' @click='submit'>
                </v-search>
                <div class='table-chunk'>
                  <div class='table-body'>
                      <el-table :data='tableData' v-loading="loding">
                          <el-table-column type="index" width="60"></el-table-column>
                          <el-table-column :prop="key" :label="val.label" :width="val.width" v-for='(val, key) in labelData' :key='val'>
                          </el-table-column>
                          <el-table-column prop="is_advance" label="订单类型" width="100">
                            <template scope="scope">
                              <el-tag
                                :type="scope.row.is_advance == 0 ? 'primary' : 'success'"
                                close-transition>{{scope.row.is_advance | newName}}</el-tag>
                            </template>
                          </el-table-column>

                          <el-table-column label='操作' :width='120'>
                              <template scope='scope'>
                                  <el-button size="small" @click='toDetail(scope.row)'>查看</el-button>
                              </template>
                          </el-table-column>
                      </el-table>
                  </div>
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
        </div>
    </div>
</template>

<script>
  import labelData from '../../config/labelData'
  import { getOrders } from '../../service/fetch'
  import {GetUrl} from '../../config/geturl'
  export default {
    data () {
      return {
        labelData: {},
        tableData: [],
        serchval: {
          date: '',
          region: ''
        },
        pagination: {},
        params: '',
        loding: true
      }
    },
    filters: {
      newName (val) {
        return val === 1 ? '有垫资' : '无垫资'
      }
    },
    computed: {
    },
    methods: {
      fethData (start = 1) {
        var res = getOrders(start)
        const that = this
        res.then(res => {
          if (res.data.code === 401) {
            this.$router.push(`/`)
          }
          that.loding = false
          that.tableData = that.changeUptime(res.data.data.list)
          that.pagination = res.data.data.pagination
        })
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
          // item.creator_name = item.creator.name
          item.type_name = item.car.type_name
          item.dealer_name = item.dealer.name
          item.loan_money = item.loan_money / 10000
        })
        return array
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.fethData(val)
      },
      toDetail (row) {
        this.$router.push({
          path: '/order/detail',
          query: {
            from: this.params,
            pid: row.id
          }
        })
      }
    },
    created () {
      this.fethData()
    },
    beforeMount () {
      this.labelData = labelData['organize.order']
      this.params = GetUrl().host
    }
  }
</script>

<style lang='scss' scoped>
  .el-input, .el-select {
    margin-right: 10px;
    width: 180px
  }
</style>
