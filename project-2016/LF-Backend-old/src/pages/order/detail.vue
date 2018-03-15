<template>
    <div class='box'>
        <div class='detail-page'>
            <div class='fadeInRight'>
                <v-infobasic title='基本信息' v-if='labelData.basic.type'>
                  <el-form label-position="left" label-width="110px" :model="formData.basicData" class='bodybottom'>
                    <div :class="{'detail-page-input': true}" v-for="(val, key) in labelData.basic.label" :key='key'>
                        <el-form-item :label="val">
                          <el-input v-model="formData.basicData[key]" :disabled="true"></el-input>
                        </el-form-item >
                    </div>
                  </el-form>
                </v-infobasic>
                <v-infobasic title='车辆信息' v-if='labelData.car.type'>
                  <el-form label-position="left" label-width="110px" :model="formData.carData" class='bodybottom'>
                    <div :class="{'detail-page-input': true}" v-for="(val, key) in labelData.car.label" :key='key'>
                        <el-form-item :label="val">
                          <el-cascader v-if='key=="address"' placeholder="省/市/县(区)" :options="addressoptions" :disabled='true' v-model='formData.carData.address'></el-cascader>
                          <el-input v-else v-model="formData.carData[key]" :disabled="true"></el-input>
                        </el-form-item >
                    </div>
                  </el-form>
                </v-infobasic>
                <v-infobasic title='贷款信息' v-if='labelData.loan.type'>
                  <el-form label-position="left" label-width="110px" :model="formData.basicData" class='bodybottom'>
                    <div :class="{'detail-page-input': true}" v-for="(val, key) in labelData.loan.label" :key='key'>
                        <el-form-item :label="val">
                          <el-input v-model="formData.basicData[key]" :disabled="true"></el-input>
                        </el-form-item >
                    </div>
                  </el-form>
                </v-infobasic>
                <v-infobasic title='贷款资料' v-if='labelData.photo.type'>
                    <v-infoitem :title='val' v-for='(val, keys) in labelData.photo.label' :key='keys'>
                        <!--<li v-for='item in formData.basicData[keys]' class='imgbox' :key='item.id'>
                          <img :src='item.urls.original' @load='imgview($event)'>
                        </li>-->
                        <v-imgs :imgData='formData.basicData[keys]' :id='keys'></v-imgs>
                    </v-infoitem>
                </v-infobasic>
                <v-infobasic title='合同信息'>
                    <div class='contracts'>
                        <p>借款协议 <a @click="orderContracts1"> 查看</a></p>
                        <p>融资项目确认单 <a @click="orderContracts2"> 查看</a></p>
                    </div>
                </v-infobasic>
                <v-infobasic title='打款凭证'>
                    <v-infoitem title='资方放款凭证'>
                        <v-imgs :imgData='formData.basicData.advance_voucher_files' id='advance_voucher_files'></v-imgs>
                    </v-infoitem>
                    <v-infoitem title='门店还款凭证'>
                        <v-imgs :imgData='formData.basicData.repayment_voucher_files' id='repayment_voucher_files'></v-imgs>
                    </v-infoitem>
                </v-infobasic>
                <v-infobasic title='持牌人匹配' v-show="is_examine">
                    <el-form label-position="left" label-width="110px" :model="formData.basicData" class='bodybottom'>
                      <div :class="{'detail-page-input': true}">
                          <el-form-item label="选择持牌人">
                            <el-select v-model="formData.licensee_id" placeholder="请选择" @change="handleLicenseeChange">
                              <el-option v-for="item in licenseeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                          </el-form-item >
                      </div>
                      <div>
                        <span class="wrapper">
                          <el-button type="success" @click="handleResolveClick" :disabled="isAccess">通过</el-button>
                          <el-button type="danger" @click='handleRejectClick' :disabled="isReject">驳回</el-button>
                        </span>
                        <el-dialog title="驳回理由" v-model="dialogTableVisible">
                          <el-form>
                            <el-form-item>
                                <el-input type="textarea" v-model="formData.postData.refusal_reason" placeholder="请填写驳回理由。。"></el-input>
                            </el-form-item>
                          </el-form>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogTableVisible = false">取 消</el-button>
                            <el-button type="primary" @click="rejectClick">确 定</el-button>
                          </div>
                        </el-dialog>
                      </div>
                  </el-form>
                </v-infobasic>
                <v-infobasic title='审核记录'>
                  <el-table :data="formData.operData" style="width: 100%" class='bodybottom' :fit='true'>
                    <el-table-column prop="operator.name" label="操作人" >
                    </el-table-column>
                    <el-table-column prop="operator.role_name" label="角色" >
                    </el-table-column>
                    <el-table-column prop="action" label="操作" >
                    </el-table-column>
                    <el-table-column prop="content" label="内容" >
                    </el-table-column>
                    <el-table-column prop="create_time" label="时间" >
                    </el-table-column>
                  </el-table>
                </v-infobasic>
            </div>
        </div>
    </div>
</template>

<script>
import allData from '../../config/onetoone'
import config from '../../config/config'
import { newCityArray, newArray } from '../../config/chageCityOptions'
import { getOrderDetail, putOrders, getLicensees, getOperatorLog, getProductsDetail } from '../../service/fetch'
export default {
  data () {
    return {
      labelData: {},
      dialogTableVisible: false, // 驳回理由
      isAccess: true, // 禁用通过，选完持牌人后启用。
      isReject: true, // 有垫资禁用
      is_examine: true, // 是否可审核
      addressoptions: newArray,
      imgURL: '',
      formData: {
        basicData: {},
        carData: {},
        contracts: {
          loan: '', // 借款协议
          financing: '' // 融资确认单
        },
        postData: {
        },
        licensee_id: '',
        contractData: [],
        operData: []
      },
      licenseeOptions: [] // 持牌人列表
    }
  },
  methods: {
    fetchProduct (id) {
      let res = getProductsDetail(id)
      res.then(res => {
        console.log(res.data.data.name)
        this.formData.basicData.product_id = res.data.data.name
      })
    },
    fetchData () {
      const that = this
      let res = getOrderDetail(this.$route.query.pid)
      res.then(res => {
        that.formData.basicData = res.data.data
        if (res.data.data.creator) {
          that.formData.basicData.create_name = res.data.data.creator.name
          that.formData.basicData.create_contact = res.data.data.creator.mobile
        }
        that.formData.basicData.create_time = this.newDate(res.data.data.create_time)
        that.formData.basicData.expire_time = res.data.data.expire_time === 0 ? 0 : this.newDate(res.data.data.expire_time)
        that.formData.basicData.repayment_time = res.data.data.repayment_time === 0 ? 0 : this.newDate(res.data.data.repayment_time)
        that.formData.basicData.loan_time = res.data.data.loan_time === 0 ? 0 : this.newDate(res.data.data.loan_time)
        if (res.data.data.is_advance === 1) {
          that.isAccess = false
          that.isReject = true
          if (res.data.data.status === 6 && res.data.data.status_name === '待复审') { // 待复审有驳回
            that.isReject = false
          }
        } else if (res.data.data.is_advance === 0) {
          that.isAccess = true
          that.isReject = false
        }
        this.examine(res.data.data)
        this.fetchProduct(res.data.data.product_id)
        that.formData.carData = res.data.data.car
        that.formData.carData.address = newCityArray(res.data.data.dealer.city_id)
        that.formData.carData.total_price = res.data.data.car.total_price / 10000
        that.formData.carData.dealer_name = res.data.data.dealer.name
        that.contracts(res.data.data.contracts)
        that.formData.carData.assess_price_time = this.newDate(res.data.data.car.assess_price_time)
        that.fetchLicenseesData(res.data.data.dealer_id)
        that.fetchOperatorLog(res.data.data.id)
        that.formData.carData.licensee_id = res.data.data.licensee.name
      })
    },
    examine (data) { // 检查是否可审核
      let isExamine = data.status === 1 || data.status === 6 || data.status === 7
      if (!isExamine) {
        this.is_examine = false
      }
    },
    fetchOperatorLog (id) {
      const that = this
      let res = getOperatorLog(id)
      res.then(res => {
        that.formData.operData = res.data.data.list
      })
    },
    newDate (val) {
      let unixT = new Date(val * 1000)
      return unixT.toLocaleString('chinese', {hour12: false})
    },
    contracts (arr) {
      const that = this
      arr.forEach(item => {
        if (item.type_name === '借款协议') {
          that.formData.contracts.loan = item
        } else {
          that.formData.contracts.financing = item
        }
      })
    },
    fetchLicenseesData (id) {
      const that = this
      let res = getLicensees(id)
      res.then(res => {
        that.licenseeOptions = res.data.data.list
      })
    },
    postData (action) {
      let totalData = Object.assign({}, this.formData.postData, {action: action})
      console.log(totalData)
      let res = putOrders(totalData, this.$route.query.pid)
      res.then(res => {
        if (res.data.code === 0) {
          this.$message({type: 'success', message: res.data.message})
        } else {
          this.$message({type: 'error', message: res.data.message})
        }
      })
    },
    handleResolveClick () {
      const that = this
      this.$confirm('确认通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.postData('pass')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleRejectClick () {
      this.dialogTableVisible = true
    },
    rejectClick () {
      this.postData('reject')
    },
    handleLicenseeChange (val) {
      this.isAccess = false
      this.formData.postData.licensee_id = val
      console.log(this.formData.postData)
    },
    imgview (e) {
      let imgw = e.currentTarget.width
      let imgh = e.currentTarget.height
      if (imgw > imgh) {
        e.currentTarget.style.height = '100%'
        e.currentTarget.style.marginLeft = (100 - e.currentTarget.width / 2) + 'px'
      } else {
        e.currentTarget.style.width = '100%'
        e.currentTarget.style.marginTop = (100 - e.currentTarget.height / 2) + 'px'
      }
    },
    orderContracts1 () {
      window.open(`${config.host}/orders/contracts/${this.formData.contracts.loan.contract_id}/display?access_token=${sessionStorage.getItem('access_token')}`)
    },
    orderContracts2 () {
      window.open(`${config.host}/orders/contracts/${this.formData.contracts.financing.contract_id}/display?access_token=${sessionStorage.getItem('access_token')}`)
    }
  },
  created () {
    this.fetchData()
  },
  beforeMount () {
    let hostName = this.$route.query.from
    this.labelData = allData[hostName]
  }
}
</script>

<style lang='scss' scoped>
  @import '../../assets/style/mixin.scss';
  .imgbox {
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 16px;
    @include wh(200px, 200px);
    box-sizing: border-box;
    overflow: hidden;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .attachment {
    margin: 16px;
    padding: 16px;
    background: #fff;
    .box {
      position: static;
    }
  }
  .contracts {
    padding: 20px;
    a {
      color: blue;
      cursor: pointer
    }
  }
  #viewer {
    li {
      cursor: pointer
    }
  }
</style>

