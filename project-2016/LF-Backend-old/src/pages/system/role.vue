<template>
    <div class='box'>
        <v-breadcrumb></v-breadcrumb>
        <div class='contant'>
            <div class='fadeInRight'>
                <v-search>
                    <input type="text" placeholder='请输入角色' />
                    <input type="text" placeholder='请输入状态' />
                    <input type="button" value='搜索' @click='submit'>
                </v-search>
                <v-form page='true' createname='新添角色' :labelData='labelData' :tableData='tableData' edit='编辑' del dialog='修改权限'>
                    <el-form :model="form" slot='dialogcontent'>
                        <el-form-item label="角色名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所属部门" :label-width="formLabelWidth">
                            <el-select v-model="form.region" placeholder="请选择所属部门">
                                <el-option label="部门一" value="1"></el-option>
                                <el-option label="部门二" value="2"></el-option>
                                <el-option label="部门三" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态" :label-width="formLabelWidth">
                            <el-switch on-text="开通" off-text="关闭" v-model="form.delivery" on-color="#13ce66" off-color="#ff4949"></el-switch>
                        </el-form-item>
                    </el-form>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
  import labelDatas from '../../config/labelData'
  export default {
    data () {
      return {
        labelData: '',
        tableDatas: '',
        form: {
          name: '',
          delivery: false
        },
        formLabelWidth: '120px'
      }
    },
    computed: {
    },
    methods: {
      submit () {
        alert('！！！')
      }
    },
    beforeMount () {
      this.labelData = labelDatas['system.role']
      this.tableData = [{
        role: '拉风业务员',
        status: '未开通',
        remarks: '你的思想很危险！'
      }, {
        role: '拉风财务',
        status: '已开通',
        remarks: '厉害了我的哥！'
      }]
    }
  }
</script>

<style lang='scss' scoped>
.el-input {
  width: 40%;
}
</style>
