<template>
    <div class="create-page fill-contain fade-right">
        <div class='page-model'>
            <div class='page-title'>
                <span class='title'>基本信息</span>
            </div>
            <el-form :inline="true" :model="formData" class="demo-form-inline" label-width='110px' label-position='left'>
                <el-form-item :label="val" v-for="(val, key) in labelData.basic.label" :key='key'>
                    <el-input v-show='key=="address"' v-model='formData.city_info_name' :disabled='true'></el-input>
                    <el-input v-model="formData[key]" :disabled='true'></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class='page-model' v-show="labelData.bank.type === 1">
            <div class='page-title'>
                <span class='title'>银行卡信息</span>
            </div>
            <el-form :inline="true" :model="cards" class="demo-form-inline" label-width='110px' label-position='left'>
                <el-form-item :label="val" v-for="(val, key) in labelData.bank.label" :key='key'>
                    <el-input v-model="cards[key]" :disabled='true'></el-input>
                </el-form-item>
            </el-form>
        </div>
        <bankTable v-show="labelData.bank.type === 2"
        :label = 'labelData.bank.label'
        :tableData = "bankTableData"
        :operate = "false"
        ></bankTable>
        <div class='page-model' v-show="labelData.photo.type">
            <div class='page-title'>
                <span class='title'>照片信息</span>
            </div>
            <div class='page-img' v-for="(val, key) in labelData.photo.label" :key='key'>
                <div class="img-title">
                    <span class='title'>{{val}}</span>
                </div>
                <div class="padding-img">
                    <imgs :id='key' :imgData='fileList[key]'></imgs>
                </div>
            </div>
        </div>
        <attachment-Table v-show="labelData.attachment.type"
        :label = 'labelData.attachment.tableLabel'
        :tableData = 'attachmentTableData'
        :operate = "false"
        ></attachment-Table>
        <productTable v-show="labelData.product.type"
        :label="labelData.product.label"
        :tableData = 'productTableData'
        title="产品信息"
        :operate = "false"
        ></productTable>
    </div>
</template>

<script>
import labelData from '@/config/labelData'
import { fetchEdit } from '@/components/mixin'
import bankTable from '@/components/bankTable'
import imgs from '@/components/imgs'
import attachmentTable from '@/components/attachmentTable'
import productTable from '@/components/productTable'
export default {
  components: {
    bankTable,
    imgs,
    attachmentTable,
    productTable
  },
  data () {
    return {
      labelData: {},
      formData: {},
      cards: {},
      bankTableData: [],
      fileList: [],
      attachmentTableData: [],
      productTableData: []
    }
  },
  mixins: [fetchEdit],
  created () {
    const from = this.$route.params.from
    this.labelData = labelData[from]
    if (this.$route.params.id) {
      this.fetchEdit(this.$route.params.id)
    }
  }
}
</script>

<style lang='scss'>
  .el-input.is-disabled .el-input__inner {
      background: #F7F8FA;
      border-color: #F7F8FA;
      color: rgba(0 ,0, 0, .8)
  }
</style>
