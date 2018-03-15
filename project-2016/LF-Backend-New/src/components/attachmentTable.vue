<template>
    <div class='page-model'>
        <div class='page-title'>
            <span class='title'>附件信息</span>
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
        <el-dialog title="附件" v-model="dialogTableVisible" size="tiny"> 
            <el-upload ref='upload' :action='host' :on-success='handleSuccess' :headers='headers' multiple>
                <el-select ref='attachments' v-model="attachment" placeholder="请选择附件类型" class="left" @change="handleSelectChange">
                    <el-option v-for="(val, key) in selectOptions" :key='key' :label="val" :value="key">
                    </el-option>
                </el-select>
                <el-button slot='trigger' type="danger" class="right adjunct" :disabled="disabled">选取文件</el-button>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" :plain="true" @click="handleCancelClick">取 消</el-button>
                <el-button type="danger"  @click="handleSub">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { baseUrl } from '@/config/env'
export default {
  props: {
    label: Object,
    selectOptions: Object,
    tableData: Array,
    operate: Boolean
  },
  data () {
    return {
      host: `${baseUrl}/files`,
      headers: { 'X-Access-Token': localStorage.getItem('access_token') },
      dialogTableVisible: false,
      disabled: true,
      // tableData: [], // total
      tableItem: [], // 每次选择上传的文件数组对象
      attachment: '', // select value
      attachIds: {
        credit_inv_file_ids: [],
        agreement_file_ids: [],
        debt_file_ids: [],
        licensees_file_ids: []
      }
    }
  },
  methods: {
    handleAddClick () {
      if (this.attachment) {
        this.disabled = false
      } else {
        this.disabled = true
      }
      this.dialogTableVisible = true
    },
    handleSelectChange (val) {
      this.disabled = false
      this.$refs.upload.clearFiles()
    },
    handleSuccess (res, file, fileList) {
      if (res.code === 0) {
        this.tableItem = fileList
      } else {
        let i
        fileList.forEach((item, index) => {
          if (item.uid === file.uid) {
            i = index
          }
        })
        fileList.splice(i, 1)
        console.log(fileList)
        this.$message({ type: 'error', message: res.message })
      }
    },
    handleSub () {
      if (this.attachment) {
        if (this.tableItem.length > 0) {
          this.addAttr(this.tableItem)
          this.tableData.push.apply(this.tableData, this.tableItem)
          this.getIds(this.tableData)
          this.$refs.upload.clearFiles() // 清空文件列表
          this.disabled = true // 禁用上传文件按钮（但仍可上传文件，待做bug）
          this.attachment = '' // 清空select value
          this.tableItem = [] // 清空上传的文件数组
          this.dialogTableVisible = false
        } else {
          this.$message({ type: 'warning', message: '请添加文件' })
        }
      } else {
        this.$message({ type: 'warning', message: '请选择附件类型' })
      }
    },
    handleCancelClick () {
      this.dialogTableVisible = false
      this.$refs.upload.clearFiles()
      this.attachment = ''
    },
    handleRemoveClick (scope) {
      this.tableData.splice(scope.$index, 1)
      this.getIds(this.tableData)
    },
    addAttr (tableItem) {
      tableItem.forEach(item => {
        item.type = item.raw.type
        item.type_name = this.$refs.attachments.selectedLabel
        item.ids = this.attachment
      })
    },
    getIds (tableData) {
      let obj = {}
      for (let i in this.attachIds) { // 滞空数组
        this.attachIds[i] = []
      }
      tableData.forEach(item => {
        if (item.id) {
          this.attachIds[item.ids].push(item.id)
        } else if (item.response) {
          this.attachIds[item.ids].push(item.response.data.id)
        }
      })
      for (let i in this.attachIds) {
        Array.from(new Set(this.attachIds[i])) // 数组去重
        obj[i] = this.attachIds[i].toString()
      }
      this.$emit('upload-attach', obj)
      console.log(obj)
    }
  }
}
</script>

<style lang='scss' scoped>
.adjunct {
    margin-left: 16px;
}
</style>
