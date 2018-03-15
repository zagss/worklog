import routes from '@/router/routes'

export default {
  groups: {
    '机构管理': {
      page: [
        'organize.dealer',
        'organize.store',
        'organize.car',
        'organize.finance'
      ],
      icon: 'el-icon-setting'
    },
    '订单管理': {
      page: [
        'order.list'
      ],
      icon: 'el-icon-date'
    },
    '系统管理': {
      page: [
        'system.user',
        // 'system.role',
        // 'system.permission',
        'system.log'
      ],
      icon: 'el-icon-document'
    }
    // '贷后管理': {
    //   page: [
    //     'afterloan.list'
    //   ],
    //   icon: 'el-icon-menu'
    // },
    // '金融产品管理': {
    //   page: [
    //     'product.list'
    //   ],
    //   icon: 'el-icon-star-on'
    // }
  },
  routes: {
    ...routes
  }
}
