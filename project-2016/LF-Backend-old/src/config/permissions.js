import routes from '../router/routes'

export default {
  groups: {
    '机构管理': {
      page: [
        'organize.dealer',
        'organize.store',
        'organize.car',
        'organize.staff'
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
        'system.role',
        'system.permission',
        'system.log'
      ],
      icon: 'el-icon-picture'
    }
    // '贷后管理': {
    //   page: [
    //     'afterloan.list'
    //   ],
    //   icon: 'el-icon-menu'
    // },
    // '金融产品管理': {
    //   page: [
    //     'finance.list'
    //   ],
    //   icon: 'el-icon-delete2'
    // }
  },
  routes: {
    ...routes
  }
}
