<template>
    <div class='create-page fill-contain fade-right' ref='box'>
        <div class='page-model'>
            <div class='page-title'>
                <span class='title'>基本信息</span>
            </div>
            <el-form :inline="true" :model="formData" class="demo-form-inline" label-width='110px' label-position='left'>
                <el-form-item :label="val" v-for="(val, key) in labelData.basic.label" :key='key' v-show="key!=='available_limit'">
                    <el-cascader v-show='key=="address"' placeholder="省/市/县(区)" :options="cityOptions" filterable v-model="formData.city_id" @change="handleCityClick"></el-cascader>
                    <el-select v-model="formData[key]" filterable placeholder="请选择评估设备" v-if="key === 'incar_dealer_id'">
                        <el-option :label="item.name" :value="item.id" v-for='item in fetchData.incar' :key='item.id'>
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                        </el-option>
                    </el-select>
                    <el-select v-model="formData[key]" filterable placeholder="请选择所属集团" v-else-if="key === 'group_id'">
                        <el-option :label="item.name" :value="item.id" v-for='item in fetchData.group' :key='item.id'>
                             <span style="float: left">{{ item.name }}</span>
                             <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                        </el-option>
                    </el-select>
                    <el-input v-else v-model="formData[key]"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class='page-model' v-show="labelData.bank.type === 1">
            <div class='page-title'>
                <span class='title'>银行卡信息</span>
            </div>
            <el-form :inline="true" :model="cards" class="demo-form-inline" label-width='110px' label-position='left'>
                <el-form-item :label="val" v-for="(val, key) in labelData.bank.label" :key='key'>
                    <el-input v-model="cards[key]"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <bankTable v-show="labelData.bank.type === 2"
        :label = 'labelData.bank.label'
        @upload-bank = "handleBank"
        :tableData = "bankTableData"
        :operate = "true"
        ></bankTable>
        <div class='page-model' v-show="labelData.photo.type">
            <div class='page-title'>
                <span class='title'>照片信息</span>
            </div>
            <div class='page-img' v-for="(val, key) in labelData.photo.label" :key='key'>
                <div class="img-title">
                    <span class='title'>{{val}}</span>
                </div>
                <upload-Img :name='key' :fileList='fileList[key]'></upload-Img>
            </div>
        </div>
        <attachment-Table v-show="labelData.attachment.type"
        :label = 'labelData.attachment.tableLabel'
        :selectOptions = 'labelData.attachment.label'
        @upload-attach = 'handleAttachment'
        :tableData = 'attachmentTableData'
        :operate = "true"
        ></attachment-Table>
        <productTable v-show="labelData.product.type"
        :label="labelData.product.label"
        @upload-product = 'handleProduct'
        :tableData = 'productTableData'
        title="产品信息"
        :operate = "true"
        ></productTable>
        <div class='subForm'>
          <el-button :plain="true" type="danger" @click='handleCancelClick'>取消</el-button>
          <el-button  type="danger" @click='handleSubFormClick'>保存</el-button>
        </div>
    </div>
</template>

<script>
import labelData from '@/config/labelData'
import uploadImg from '@/components/uploadImg'
import bankTable from '@/components/bankTable'
import attachmentTable from '@/components/attachmentTable'
import productTable from '@/components/productTable'
import { btnClick, fetchEdit } from '@/components/mixin'
import { cities } from '@/config/multi'
import { mapMutations } from 'vuex'
import { getIncarList, getStoreList } from '@/service/getData'
export default {
  components: {
    uploadImg,
    attachmentTable,
    productTable,
    bankTable
  },
  data () {
    return {
      labelData: {},
      formData: {}, // 提交的表单
      cards: {}, // 银行卡信息
      bankTableData: [], // 银行卡信息
      fileList: [], // 照片信息
      attachmentTableData: [], // 附件列表
      productTableData: [], // 产品列表
      cityOptions: cities,
      fetchData: {
        incar: [],
        group: []
      }
    }
  },
  mixins: [btnClick, fetchEdit],
  methods: {
    ...mapMutations(['EMPTY_IMGS']),
    async fetch () { // 获取因车／集团 数据。
      let res = await getIncarList(99999)
      let res2 = await getStoreList(1, 99999)
      if (res.data.code === 0) {
        this.fetchData.incar = res.data.data.list
      }
      if (res2.data.code === 0) {
        this.fetchData.group = res2.data.data.list
      }
    },
    handleSubFormClick () {
      let total = Object.assign({}, this.formData, this.$store.state.imgs)
      if (this.labelData.bank.type === 1) {
        Object.assign(total, {cards: [this.cards]})
      }
      console.log(total)
    //   this.EMPTY_IMGS() // 清空store
    },
    handleCityClick (val) { // 截取city_id
      this.formData.city_id = val.slice(-1)[0]
    },
    handleAttachment (val) { // 获取附件
      Object.assign(this.formData, val)
      console.log(this.formData)
    },
    handleProduct (val) { // 获取产品
      console.log(val)
      Object.assign(this.formData, val)
    },
    handleBank (val) {
      console.log(val)
      Object.assign(this.formData, {cards: val})
    }
  },
  created () {
    const from = this.$route.params.from
    this.labelData = labelData[from]
    console.log(this.$route)
    this.fetch()
    if (Number(this.$route.params.id)) {
      this.fetchEdit(this.$route.params.id)
    }
    if (this.$route.query.group_id) { // 是否是从附属门店创建的
      this.formData.group_id = Number(this.$route.query.group_id)
    }
  }
}
</script>

<style lang='scss' scoped>
  .create-page {
    padding: 16px;
    overflow: auto;
    overflow-x: hidden;
    .subForm {
        text-align: center;
    }
  }
</style>
