<template>
      <div class='page-model'>
        <div class='page-title'>
            <span class='title'>银行卡信息</span>
            <el-button type="danger" class="add" size="mini" @click="handleAddClick" v-show="operate">添加</el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%; margin-top: 32px">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column :prop="key" :label='val'
            v-for="(val, key) in label" :key='key'
            >
                <template scope="scope">
                    {{scope.row[key] | newVal(key)}}
                </template>
            </el-table-column>
            <el-table-column label='操作' v-if="operate">
                <template scope="scope">
                    <el-button type="text" size="small" @click='handleRemoveClick(scope)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="银行卡" v-model="dialogTableVisible" size="small" class="page-dialog"> 
            <el-form v-model="tableItem" :inline="true">
                <el-form-item label-width="120px" :label="val" v-for="(val, key) in label" :key='key'>
                    <el-select v-model="tableItem.type" placeholder="请选择类型" v-if="key === 'type'" >
                        <el-option label="对公帐号" value="1"></el-option>
                        <el-option label="个人帐号" value="2"></el-option>
                    </el-select>
                    <el-input v-else v-model="tableItem[key]"></el-input>
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
export default {
  props: ['label', 'tableData', 'operate'],
  data () {
    return {
      dialogTableVisible: false,
      tableItem: {
        type: ''
      }
    }
  },
  methods: {
    handleAddClick () {
      this.dialogTableVisible = true
    },
    handleRemoveClick (scope) {
      this.tableData.splice(scope.$index, 1)
      this.$emit('upload-bank', this.tableData)
    },
    handleSub () {
      let res = this.judge(this.tableItem)
      if (!res) return
      this.tableData.push(this.tableItem)
      this.dialogTableVisible = false
      this.$emit('upload-bank', this.tableData)
      this.clear(this.tableItem)
    },
    clear (tableItem) {
      console.log(tableItem)
      let newItem = {}
      for (let i in tableItem) { // 清空数据
        newItem[i] = ''
      }
      this.tableItem = newItem
    },
    judge (tableItem) { // 判断填写完整
      let item = {
        type: '',
        payee_name: '',
        card_number: '',
        card_bank: ''
      }
      for (let i in item) {
        if (!tableItem[i]) {
          this.$message({type: 'warning', message: '请填写完整！'})
          return false
        }
      }
      return true
    }
  },
  filters: {
    newVal (val, key) {
      if (key === 'type') {
        if ((val + '') === '1') {
          return '对公帐号'
        } else if ((val + '') === '2') {
          return '个人帐号'
        }
      } else {
        return val
      }
    }
  }
}
</script>

<style>
  
</style>
