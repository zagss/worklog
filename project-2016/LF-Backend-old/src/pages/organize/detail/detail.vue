<template>
    <div class='box'>
      <v-brand :title='tab.tab1' :address='brandData.address' :credit='formData.basicData.credit_line' :rest='formData.basicData.available_limit' v-if='brand'></v-brand>
        <el-tabs v-model="activeName" class='page-tabs' @tab-click='onTabClick'>
          <el-tab-pane :label="tab.tab1" :name="tab.tab1name">
            <div class='detail-page'>
                <div class='fadeInRight'>
                    <v-infobasic title='基本信息' v-if='labelData.basic.type'>
                      <span class='modify' slot='modify' @click='toCreat()'>修改</span>
                      <el-form :label-position="labelPosition" label-width="110px" :model="formData.basicData" class='bodybottom'>
                      <div :class="{'detail-page-input': true, 'address':key=='address'}" v-for="(item, key) in labelData.basic.label" :key='key'>
                        <el-form-item :label="item">
                          <el-cascader v-if='key=="address"' placeholder="省/市/县(区)" :options="addressoptions" filterable :disabled='true' v-model='formData.basicData.city_id'></el-cascader>
                          <el-input v-model="formData.basicData[key]" :disabled='true'></el-input>
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
          </el-tab-pane>
          <el-tab-pane :label="tab.tab2" :name="tab.tab2name" v-if='tab.tab2'>
            <div class='attachment'>
              <router-view></router-view>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="tab.tab3" :name="tab.tab3name" v-if='tab.tab3'>
            <div class='attachment'>
              <router-view></router-view>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="tab.tab4" :name="tab.tab4name" v-if='tab.tab4'>
            <div class='attachment'>
              <router-view></router-view>
            </div>
          </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import allData from '../../../config/onetoone'
  import { getDealerDetail } from '../../../service/fetch'
  import { newCityArray, newArray } from '../../../config/chageCityOptions'
  export default {
    props: {
      title: String
    },
    data () {
      return {
        params: '',
        labelData: '',
        brand: false, // 是否显示brand
        brandData: {
          address: '' // address
        },
        tab: {
          tab1: '企业门店名称',
          tab2: true,
          tab3: false,
          tab4: false,
          tab1name: 'group',
          tab2name: '',
          tab3name: '',
          tab4name: ''
        }, // 是否显示三级tab
        addressoptions: newArray,
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
          attachmentData: []
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
      onTabClick (e) {
        var url
        switch (e.name) {
          case 'attachment':
            url = '/attachment'
            break
          case 'staff':
            url = '/staff'
            break
          case 'licensee':
            url = '/licensee'
            break
          case 'carstaff':
            url = '/carstaff'
            break
          case 'carlicensee':
            url = '/carlicensee'
            break
          case 'finance':
            url = '/finance'
            break
          case 'financestaff':
            url = '/financestaff'
            break
          case 'authenticate':
            url = '/authenticate'
            break
          default:
            url = ''
        }
        if (this.$route.query.oldval) {
          this.$router.push({
            path: `/organize/detail${url}`,
            query: {
              from: this.$route.query.from,
              pid: this.$route.query.oldval
            }
          })
        } else {
          this.$router.push({
            path: `/organize/detail${url}`,
            query: {
              from: this.$route.query.from,
              pid: this.$route.query.pid
            }
          })
        }
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
      },
      downloadAttach (scope) {
        window.open(scope.row.urls.original)
      }
    },
    created () {
      const that = this
      let JudgeMent
      if (this.$route.query.from === 'organize.detail.staff') {
        JudgeMent = false
      } else if (this.$route.query.from === 'organize.detail.attachment') {
        JudgeMent = false
      } else {
        JudgeMent = true
      }
      var res = getDealerDetail(this.$route.query.pid)
      res.then(res => {
        that.formData.basicData = res.data.data
        that.tab.tab1 = res.data.data.name
        that.brandData.credit_line = res.data.data.credit_line // 广告牌
        that.brandData.address = res.data.data.city_info.province_name + res.data.data.city_info.city_name + res.data.data.city_info.area_name + res.data.data.address // 广告牌addres
        that.formData.basicData.city_id = newCityArray(res.data.data.city_id) // 修改city_id
        that.formData.basicData.business_name = res.data.data.owner_name
        that.formData.basicData.business_contact = res.data.data.owner_contact
        that.formData.basicData.credit_line = res.data.data.credit_line / 10000
        that.formData.basicData.car_loan_limit = res.data.data.car_loan_limit / 10000
        that.formData.basicData.available_limit = res.data.data.available_limit / 10000
        that.formData.basicData.registered_capital = res.data.data.registered_capital / 10000
        that.formData.bankTableData = res.data.data.cards
        that.getAttachment(res.data.data)
        that.formData.financeProductsTableData = res.data.data.products ? res.data.data.products : []
        if (JudgeMent) {
          that.formData.bankData = res.data.data.cards[0] || {}
        } else {
          that.formData.bankTableData = res.data.data.cards || []
        }
        that.formData.basicData.incar_dealer_id = res.data.data.incar_dealer.name ? res.data.data.incar_dealer.name : ''
        that.formData.basicData.group_id = res.data.data.group ? res.data.data.group.name : ''
      })
    },
    beforeMount () {
      let hostName = this.$route.query.from
      this.labelData = allData[hostName]
      switch (hostName) {
        case 'organize.dealer':
          this.brand = true
          this.tab.tab2 = '附属门店'
          this.tab.tab1name = 'group'
          this.tab.tab2name = 'attachment'
          break
        case 'organize.store':
          this.tab.tab2 = '员工管理'
          this.tab.tab3 = '持牌人管理'
          this.tab.tab4 = 'CA认证'
          this.tab.tab1name = 'group'
          this.tab.tab2name = 'staff'
          this.tab.tab3name = 'licensee'
          this.tab.tab4name = 'authenticate'
          break
        case 'organize.car':
          this.tab.tab2 = '员工管理'
          this.tab.tab3 = '持牌人管理'
          this.tab.tab4 = 'CA认证'
          this.tab.tab1name = 'group'
          this.tab.tab2name = 'carstaff'
          this.tab.tab3name = 'carlicensee'
          this.tab.tab4name = 'authenticate'
          break
        case 'organize.staff':
          this.tab.tab2 = '金融产品管理'
          this.tab.tab3 = '员工管理'
          this.tab.tab1name = 'group'
          this.tab.tab2name = 'finance'
          this.tab.tab3name = 'financestaff'
          break
      }
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
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 50px;
    background: #fff;
    .box {
      position: static;
    }
  }

</style>
