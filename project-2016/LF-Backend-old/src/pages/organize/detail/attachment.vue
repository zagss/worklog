<template>
    <div class='box'>
        <div class='detail-page'>
            <div class='fadeInRight'>
                <v-infobasic title='基本信息' v-if='labelData.basic.type'>
                  <span class='modify' slot='modify' @click='toCreat()'>修改</span>
                  <el-form :label-position="labelPosition" label-width="110px" :model="formData.basicData" class='bodybottom'>
                  <div :class="{'detail-page-input': true, 'address':key=='address'}" v-for="(item, key) in labelData.basic.label" :key='key' v-if="key !== 'financeProductInInterest'">
                    <el-form-item :label="item">
                      <el-cascader v-if='key=="address"' placeholder="省/市/县(区)" :options="addressoptions" filterable :disabled='true' v-model='formData.basicData.city_id'></el-cascader>
                      <template v-else-if='key === "is_advance"'>
                        <el-radio-group v-model="formData.basicData.is_advance" :disabled='true'>
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                      </template>
                      <el-select v-model="formData.basicData.repayment_type" :disabled='true' placeholder="请选择还款方式" v-else-if="key === 'repayment_type'">
                        <el-option label="一次性还款" :value="1"></el-option>
                        <el-option label="先息后本" :value="2"></el-option>
                      </el-select>
                      <el-input v-else v-model="formData.basicData[key]" :disabled='true'></el-input>
                      <el-input v-model="formData.basicData[key]" :disabled='true' v-show="key==='address'"></el-input>
                    </el-form-item>
                  </div>
                  <div class='address create-page-input' v-show='labelData.basic.label.financeProductInInterest'>
                    <el-form-item label='借款利率'>
                      <el-cascader :options="financeProductOptions" v-model="formData.selectedLoanOptions" :disabled="true"></el-cascader>
                      <el-input v-model="formData.basicData.loan_interest" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class='address create-page-input' v-show='labelData.basic.label.financeProductInInterest'>
                    <el-form-item label='逾期利率'>
                      <el-cascader :options="financeProductOptions" v-model="formData.selectedOverdueOptions" :disabled="true"></el-cascader>
                      <el-input v-model="formData.basicData.overdue_interest" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class='address create-page-input' v-show='labelData.basic.label.financeProductInInterest'>
                    <el-form-item label='垫资利率'>
                      <el-cascader :options="financeProductOptions" v-model="formData.selectedAdvanceOptions" :disabled="true"></el-cascader>
                      <el-input v-model="formData.basicData.advance_interest" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  
                  </el-form>
                </v-infobasic>
                <v-infobasic title='银行卡信息' v-if='labelData.bank.type === 1'>
                  <span class='modify' slot='modify' @click='toCreat()'>修改</span>
                  <el-form :label-position="labelPosition" label-width="110px" :model="formData.bankData" class='bodybottom'>
                    <div class='detail-page-input' v-for='(item, key) in labelData.bank.label' :key='key'>
                      <el-form-item :label="item">
                        <el-input v-model="formData.bankData[key]" :disabled='true'></el-input>
                      </el-form-item>
                    </div>
                  </el-form>
                </v-infobasic>
                <v-infobasic title='银行卡信息' v-else-if='labelData.bank.type === 2'>
                    <span class='modify' slot='modify' @click='toCreat'>修改</span>
                    <el-table :data='formData.bankTableData' class='bodybottom'>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop='type' label='银行卡类型'>
                          <template scope='scope'>
                                {{scope.row.type | newTypeName}}
                          </template>
                        </el-table-column>
                        <el-table-column v-if='key!=="type"' v-for='(val, key) in labelData.bank.label' :key='key' :prop='key' :label='val'>
                        </el-table-column>
                    </el-table>
                </v-infobasic>
                <v-infobasic title='照片信息' v-if='labelData.photo.type'>
                  <span class='modify' slot='modify' @click='toCreat()'>修改</span>
                    <v-infoitem :title='val' v-for='(val, keys) in labelData.photo.label' :key='keys'>
                      <v-imgs :imgData='formData.basicData[keys]' :id='keys'></v-imgs>
                    </v-infoitem>
                </v-infobasic>
                <v-infobasic title='附件信息' v-if='labelData.attachment.type'>
                  <span class='modify' slot='modify' @click='toCreat()'>上传附件</span>
                  <div class='adjunct-padding'>
                    <el-table :data='formData.attachmentData' :fit='true'>
                      <el-table-column type="index" width="50"></el-table-column>
                      <el-table-column prop='type_name' label='附件类型'></el-table-column>
                      <el-table-column prop='name' label='附件名称'></el-table-column>
                      <el-table-column prop='type' label='格式'></el-table-column>
                      <el-table-column label='操作'>
                        <template scope="scope">
                          <el-button type="text" size="small" @click='downloadAttach(scope)'>下载</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </v-infobasic>
                <v-infobasic title='产品信息' v-if='labelData.product.type'>
                  <span class='modify' slot='modify' @click='toCreat'>添加产品</span>
                    <el-table :data='formData.financeProductsTableData' class='bodybottom'>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop='dealer.name' label='资金方名称'></el-table-column>
                        <el-table-column prop='name' label='金融产品'></el-table-column>
                    </el-table>
                </v-infobasic>
            </div>
        </div>
    </div>
</template>

<script>
  import allData from '../../../config/onetoone'
  import { getLicenseesDetail, getProductsDetail, getDealerDetail } from '../../../service/fetch'
  import { newCityArray, newArray } from '../../../config/chageCityOptions'
  import { financeInterest } from '../../../config/role'
  export default {
    props: {
      title: String
    },
    data () {
      return {
        params: '',
        labelData: '',
        addressoptions: newArray,
        financeProductOptions: financeInterest,
        activeName: 'group',
        labelPosition: 'left',
        bankform: {
          name: '',
          region: 'public',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formData: {
          basicData: {},
          bankData: {},
          bankTableData: [],
          selectedLoanOptions: [],
          selectedOverdueOptions: [],
          selectedAdvanceOptions: [],
          attachmentData: [] // 附件
        }
      }
    },
    filters: {
      newTypeName (val) {
        return val === 1 ? '对公账号' : '个人账号'
      }
    },
    methods: {
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
      downloadAttach (scope) {
        window.open(scope.row.urls.original)
      },
      toCreat () {
        this.$router.push({
          path: '/organize/create',
          query: {
            from: this.$route.query.from,
            pid: this.$route.query.pid,
            modify: this.$route.query.pid
          }
        })
      },
      getAttachment (res) {
        if (res.credit_inv_files) {
          res.credit_inv_files.forEach(item => {
            item.type_name = '征信信息'
          })
          this.formData.attachmentData = this.formData.attachmentData.concat(res.credit_inv_files)
        }
        if (res.agreement_files) {
          res.agreement_files.forEach(item => {
            item.type_name = '合作协议'
          })
          this.formData.attachmentData = this.formData.attachmentData.concat(res.agreement_files)
        }
        if (res.debt_files) {
          res.debt_files.forEach(item => {
            item.type_name = '资产负债'
          })
          this.formData.attachmentData = this.formData.attachmentData.concat(res.debt_files)
        }
        if (res.licensees_files) {
          res.licensees_files.forEach(item => {
            item.type_name = '门店／持牌人清单'
          })
          this.formData.attachmentData = this.formData.attachmentData.concat(res.licensees_files)
        }
        console.log(this.formData.attachmentData)
      }
    },
    created () {
      const that = this
      if (this.$route.query.from === 'organize.detail.finance') {
        let res = getProductsDetail(this.$route.query.pid)
        res.then(res => {
          that.formData.basicData = res.data.data
          that.formData.basicData.min_limit = res.data.data.min_limit / 10000
          that.formData.basicData.max_limit = res.data.data.max_limit / 10000
          that.formData.basicData.open_time = new Date(res.data.data.open_time * 1000).toLocaleString('chinese', {hour12: false})
          that.formData.selectedLoanOptions = [res.data.data.loan_interest_type + '', res.data.data.loan_interest_days_year_id + '']
          that.formData.selectedOverdueOptions = [res.data.data.overdue_interest_type + '', res.data.data.overdue_interest_days_year_id + '']
          that.formData.selectedAdvanceOptions = [res.data.data.advance_interest_type + '', res.data.data.advance_interest_days_year_id + '']
        })
      } else if (this.$route.query.from === 'organize.detail.carlicensee' || this.$route.query.from === 'organize.detail.licensee') {
        let res = getLicenseesDetail(this.$route.query.oldval, this.$route.query.pid)
        res.then(res => {
          that.formData.basicData = res.data.data
        })
      } else if (this.$route.query.from === 'organize.detail.attachment') {
        var res = getDealerDetail(this.$route.query.pid)
        res.then(res => {
          that.formData.basicData = res.data.data
          that.formData.basicData.credit_line = res.data.data.credit_line / 10000
          that.formData.basicData.car_loan_limit = res.data.data.car_loan_limit / 10000
          that.formData.basicData.available_limit = res.data.data.available_limit / 10000
          that.formData.bankTableData = res.data.data.cards
          that.formData.basicData.city_id = newCityArray(res.data.data.city_id) // 修改city_id
          that.formData.financeProductsTableData = res.data.data.products ? res.data.data.products : []
          that.getAttachment(res.data.data)
          that.formData.basicData.incar_dealer_id = res.data.data.incar_dealer.name ? res.data.data.incar_dealer.name : ''
        })
      }
    },
    beforeMount () {
      let hostName = this.$route.query.from
      this.labelData = allData[hostName]
    }
  }
</script>

<style lang='scss' scoped>
  @import '../../../assets/style/mixin.scss';
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

</style>
