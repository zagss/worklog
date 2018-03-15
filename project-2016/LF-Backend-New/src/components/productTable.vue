<template>
      <div class='page-model'>
        <div class='page-title'>
            <span class='title'>{{title}}</span>
            <el-button type="danger" class="add" size="mini" @click="handleAddClick" v-show="operate">添加</el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%; margin-top: 32px">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column :prop="key" :label='val'
            v-for="(val, key) in label" :key='key'
            ></el-table-column>
            <el-table-column label='操作' v-if="operate">
                <template scope="scope">
                    <el-button type="text" size="small" @click='handleRemoveClick(scope)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="附件" v-model="dialogTableVisible" size="small" class="page-dialog"> 
            <el-form v-model="formData" :inline="true">
                <el-form-item label="资金方名称" label-width="120px">
                    <el-select ref='dealer' v-model="selected.dealer" placeholder="请选择类型" @change='handleChangeDealerClick'>
                        <el-option :label="item.name" :value="item.id" v-for='item in selectOptions.dealer' :key='item'>
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金融产品" label-width="120px">
                    <el-select ref='product' v-model="selected.product" placeholder="请选择类型" @change='handleChangeProductClick'>
                        <el-option :label="item.name" :value="item.id" v-for='item in selectOptions.product' :key='item'>
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" :plain="true" @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="danger"  @click="handleSub">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getStoreList, getProduct } from '@/service/getData'
export default {
  props: ['label', 'title', 'tableData', 'operate'],
  data () {
    return {
      dialogTableVisible: false,
      tableItem: {},
      formData: [],
      selectOptions: {
        dealer: [],
        product: []
      },
      selected: {
        dealer: '',
        product: ''
      }
    }
  },
  methods: {
    async fetch () {
      let res = await getStoreList(4, 99999, 1)
      if (res.data.code === 0) {
        this.selectOptions.dealer = res.data.data.list
      }
    },
    handleAddClick () {
      this.dialogTableVisible = true
    },
    handleChangeDealerClick (val) { // 选择资金方
      if (val) {
        this.selected.product = ''
        this.tableItem.dealer_name = this.$refs.dealer.selectedLabel
        let res = getProduct(val, 99999, 1)
        res.then(item => {
          if (item.data.code === 0) {
            this.selectOptions.product = item.data.data.list
          } else {
            this.$message({ type: 'error', message: item.data.message })
          }
        })
      }
    },
    handleChangeProductClick (val) { // 选择产品
      if (val) {
        this.tableItem.product_name = this.$refs.product.selectedLabel
        this.tableItem.product_ids = val
      }
    },
    handleSub () {
      if (this.selected.product) {
        if (this.checkrepeat(this.tableData, this.tableItem)) {
          this.tableData.push(this.tableItem)
          this.uploadData(this.tableData)
          this.dialogTableVisible = false
          // 清空数据
          this.tableItem = {}
          this.selected = {
            dealer: '',
            product: ''
          }
          this.selectOptions.product = []
        } else {
          this.$message({ type: 'warning', message: '该产品已选择' })
        }
      } else {
        this.$message({ type: 'warning', message: '请选择金融产品' })
      }
    },
    handleRemoveClick (scope) {
      this.tableData.splice(scope.$index, 1)
      this.uploadData(this.tableData)
    },
    uploadData (tableData) {
      let products = []
      tableData.forEach(item => {
        products.push(item.product_ids)
      })
      this.$emit('upload-product', {product_ids: products})
    },
    checkrepeat (tableData, tableItem) {
      let products = []
      tableData.forEach(item => {
        products.push(item.product_ids)
      })
      if (products.indexOf(tableItem.product_ids) === -1) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang='scss'>
.page-dialog {
    .el-select, .el-input {
        width: 190px
    }
}
</style>
