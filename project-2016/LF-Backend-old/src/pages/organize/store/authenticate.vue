<template>
    <div class='fadeInRight'>
        <div class="container" v-show='CAbefore'>
            <div class='cabox'>
                <div class='calogo'>
                    <p>请登录法大大后台申请CA认证！</p>
                </div>
                <div class='calogin'>
                    <h2 @click='openCA'>进入法大大官网</h2>
                    <p>客户来源唯一标识为：<span>{{cacode}}</span></p>
                </div>
            </div>
        </div>
        <v-infobasic title='CA认证结果' v-show='CAResult'>
            <span class='status' slot='status' :style="styleObject">{{status}}</span>
            <span class='modify' slot='modify' @click='openCA'>进入法大大官网查看</span>
            <el-form label-width="110px" :model="formData" class='bodybottom'>
            <div class='detail-page-input' v-for='(item,key) in labelData.basic.label' :key='key'>
                <el-form-item :label="item">
                    <el-input v-model="formData[key]" :disabled='true'></el-input>
                </el-form-item>
            </div>
            </el-form>
        </v-infobasic>
    </div>
</template>

<script>
import allData from '../../../config/onetoone'
import { getDealerDetail } from '../../../service/fetch'
export default {
  data () {
    return {
      labelData: {},
      formData: {},
      CAbefore: true,
      CAResult: false,
      cacode: '',
      styleObject: {
        background: '#13CE66'
      },
      status: ''
    }
  },
  methods: {
    fetch () {
      const that = this
      let res = getDealerDetail(this.$route.query.pid)
      res.then(res => {
        if (!res.data.data.ca.customer_id) {
          that.CAbefore = true
          that.CAResult = false
        } else {
          that.CAbefore = false
          that.CAResult = true
          that.formData = res.data.data.ca
          that.formData.create_time = new Date(res.data.data.ca.create_time * 1000).toLocaleString('chinese', {hour12: false})
          if (res.data.data.ca.status === 1) {
            that.status = '审核通过'
            that.styleObject.background = '#13CE66'
          } else {
            that.status = '审核未通过'
            that.styleObject.background = '#FF4949'
          }
          that.formData.business_name = res.data.data.name
        }
        that.cacode = res.data.data.ca.platform_id
      })
    },
    openCA () {
      window.open('http://sztest.fabigbig.com/')
    }
  },
  created () {
    this.fetch()
  },
  beforeMount () {
    this.labelData = allData['CA']
  }
}
</script>

<style lang='scss' scoped>
.status {
    color: #fff;
    border-radius: 20px;
    padding: 2px 6px;
}
.container {
    height: 560px;
    margin: 0 auto;
    background: #fff;
    display: flex;
    align-items: center;
    .cabox {
        width: 350px;
        height: 403px;
        margin: 0 auto;
        background: #fff;
        color: #5F7891;
        .calogo {
            width: 100%;
            height: 202px;
            background: url('../../../assets/images/CA.png') no-repeat top center;
            background-size: 148px;
            text-align: center;;
            padding-top: 170px;
            font-size: 24px;
        }
        .calogin {
            width: 90%;
            margin: 0 auto;
            h2 {
                font-weight: 400;
                font-size: 24px;
                color: #fff;
                background: #FF3B30;
                text-align: center;
                line-height: 2.6;
                border-radius: 120px;
                margin-top: 86px;
                cursor: pointer;
                &:active {
                    color: #f5f5f5;
                }
            }
            p {
                text-align: center;
                margin-top: 20px;
                span {
                    color: #FF3B30;
                 }
            }
        }
    }
}
</style>
