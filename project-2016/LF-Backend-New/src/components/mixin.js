import { getStoreDetail } from '@/service/getData'
import { newCityArray } from '@/config/multi'

export const setPagination = { // 分页设置
  methods: {
    handleSizeChange (val) { // 每页几条
      this.loading = true
      this.fetch(val, 1)
      this.size = val
    },
    handleCurrentChange (val) { // 当前页
      this.loading = true
      this.fetch(this.size, val)
    }
  }
}

export const changeTableData = { // 修改 Table 数据
  methods: {
    newDate (val) {
      let unixT = new Date(val * 1000)
      return unixT.toLocaleString('chinese', {hour12: false})
    },
    changeUptime (array) { // 修改时间戳微正常时间
      array.forEach(item => {
        item.create_time = this.newDate(item.create_time)
        item.credit_line = (item.credit_line / 10000) + ' / ' + (item.available_limit / 10000)
      })
      return array
    }
  }
}
// 按钮点击操作。取消／
export const btnClick = {
  methods: {
    handleCancelClick () {
      this.$confirm('取消中, 是否继续?', '提示', { confirmButtonText: '确定', confirmButtonClass: 'el-button--danger', cancelButtonText: '取消', cancelButtonClass: 'el-button--danger is-plain', type: 'warning' }).then(() => {
        window.history.go(-1)
        this.EMPTY_IMGS()
        this.$message({ type: 'success', message: '已取消!' })
      }).catch(() => { this.$message({ type: 'info', message: '已取消' }) })
    }
  }
}

export const fetchEdit = {
  methods: {
    async fetchEdit (id) {
      let res = await getStoreDetail(id)
      if (res.data.code === 0) {
        this.convert(res.data.data)
        this.formData = res.data.data
        this.formData.city_id = newCityArray(res.data.data.city_id)
        if (res.data.data.city_info) {
          let city = res.data.data.city_info
          this.formData.city_info_name = city.province_name + ' / ' + city.city_name + ' / ' + city.area_name
        }
        if (res.data.data.cards && (res.data.data.cards.length > 0)) {
          this.cards = res.data.data.cards[0]
          this.bankTableData = res.data.data.cards
        }
        if (this.$route.name === 'content') { // 判断是否是detail page
          this.formData.group_id = res.data.data.group ? res.data.data.group.name : ''
          this.formData.incar_dealer_id = res.data.data.incar_dealer ? res.data.data.incar_dealer.name : ''
        }
        this.photoList(res.data.data)
      } else {
        this.$message({ type: 'error', message: res.data.message })
      }
    },
    convert (data) {
      if (data.credit_line) {
        data.credit_line = data.credit_line / 10000
      }
      if (data.car_loan_limit) {
        data.car_loan_limit = data.car_loan_limit / 10000
      }
      if (data.registered_capital) {
        data.registered_capital = data.registered_capital / 10000
      }
      if (data.available_limit) {
        data.available_limit = data.available_limit / 10000
      }
    },
    photoList (data) {
      for (let i in this.labelData.photo.label) {
        let picList = []
        for (let j in data[i]) {
          let pic = Object.assign({}, {url: data[i][j].urls.original, response: {data: data[i][j]}})
          picList.push(pic)
        }
        this.fileList[i] = picList
      }
      let attachList = []
      for (let i in this.labelData.attachment.label) { // 处理附件数据
        let j = i.slice(0, -4) + 's'
        // console.log(data[j])
        if (data[j]) {
          for (let n in data[j]) {
            data[j][n].ids = i
            data[j][n].type_name = this.changeName(i)
          }
          attachList = attachList.concat(data[j])
        }
      }
      this.attachmentTableData = attachList
      if (data.products.length > 0) { // 产品数据处理
        for (let i in data.products) {
          data.products[i].dealer_name = data.products[i].dealer ? data.products[i].dealer.name : ''
          data.products[i].product_name = data.products[i].name
          data.products[i].product_ids = data.products[i].id
        }
        this.productTableData = data.products
      }
    },
    changeName (i) {
      let name
      switch (i) {
        case 'credit_inv_file_ids':
          name = '征信信息'
          break
        case 'agreement_file_ids':
          name = '合作协议'
          break
        case 'debt_file_ids':
          name = '资产负债'
          break
        case 'licensees_file_ids':
          name = '门店 / 持牌人清单'
          break
      }
      return name
    }
  }
}
// create detail 动效
export const appearDiv = {
  methods: {
    handleScroll () {
      let div = document.getElementsByClassName('page-model')
      let box = document.getElementsByClassName('create-page')
      for (let i = 0; i < div.length; i++) {
        if (div[i].getBoundingClientRect().top < box[0].clientHeight && !div[i].isLoad) {
          div[i].isLoad = true
          div[i].className += ' appear-right'
        }
      }
    },
    calc () { // 计算页面高度赋值table高度
      let div = document.getElementsByClassName('page-model')
      this.$nextTick(() => {
        let boxHeight = this.$refs.box.clientHeight
        for (let i = 0; i < div.length; i++) {
          this.time(i, div, boxHeight)
        }
      })
    },
    time (i, div, boxHeight) {
      setTimeout(() => {
        if (div[i].getBoundingClientRect().top < boxHeight && !div[i].isLoad) {
          div[i].isLoad = true
          div[i].className += ' appear-right'
        }
      }, i * 150)
    }
  }
}

