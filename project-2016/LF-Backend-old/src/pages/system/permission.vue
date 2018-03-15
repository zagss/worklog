<template>
    <div class='box'>
        <v-breadcrumb></v-breadcrumb>
        <div class='contant'>
            <div class='fadeInRight'>
                <v-search>
                    <input type="text" placeholder='经销商集团管理' />
                    <input type="text" placeholder='集团负责人姓名' />
                    <input type="text" placeholder='业务员姓名（拉风）' />
                    <input type="button" value='搜索' @click='submit'>
                </v-search>
                <v-form page='true' createname='创建集团' :labelData='labelData' :tableData='tableData' edit='编辑' del></v-form>
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
        tableDatas: ''
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
      this.labelData = labelDatas['organize.dealer']
      this.tableData = [{
        date: '2016-05-02 10:22:08',
        name: '王小虎',
        group: '轩宇集团',
        phone: 13838870666,
        credit: '2323 / 33'
      }, {
        date: '2016-02-03 12:22:02',
        name: '王小虎2',
        group: '劳斯集团',
        credit: '3333 / 222',
        phone: 13856574586
      }]
    }
  }
</script>

<style lang='scss' scoped>
</style>
