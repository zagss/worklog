export default {
  'organize.dealer.attachment': {
    title: '附属门店',
    path: 'attachment',
    type: 'page',
    component: resolve => require(['@/pages/organize/dealer/attachment.vue'], resolve)
  },
  'organize.dealer.attachment.detail': {
    title: '附属门店',
    path: 'attachment/detail',
    type: 'page',
    component: resolve => require(['@/pages/organize/detail/attachment.vue'], resolve)
  },
  'organize.store.staff': { // 门店管理 --- 员工管理
    title: '员工管理',
    path: 'staff',
    type: 'page',
    component: resolve => require(['@/pages/organize/store/staff.vue'], resolve)
  },
  'organize.store.licensee': { // 门店管理 --- 持牌人管理
    title: '持牌人',
    path: 'licensee',
    type: 'page',
    component: resolve => require(['@/pages/organize/store/licensee.vue'], resolve)
  },
  'organize.store.licensee.detail': {
    title: '持牌人',
    path: 'licensee/detail',
    type: 'page',
    component: resolve => require(['@/pages/organize/detail/attachment.vue'], resolve)
  },
  'organize.car.carstaff': { // 车商管理 --- 员工管理
    title: '员工管理',
    path: 'carstaff',
    type: 'page',
    component: resolve => require(['@/pages/organize/car/carstaff.vue'], resolve)
  },
  'organize.car.carlicensee': { // 车商管理 --- 持牌人
    title: '持牌人',
    path: 'carlicensee',
    type: 'page',
    component: resolve => require(['@/pages/organize/car/carlicensee.vue'], resolve)
  },
  'organize.car.carlicensee.detail': {
    title: '持牌人详情',
    path: 'carlicensee/detail',
    type: 'page',
    component: resolve => require(['@/pages/organize/detail/attachment.vue'], resolve)
  },
  'organize.staff.finance': {
    title: '金融产品',
    path: 'finance',
    type: 'page',
    component: resolve => require(['@/pages/organize/staff/finance.vue'], resolve)
  },
  'organize.detail.finance': {
    title: '金融产品详情',
    path: 'finance/detail',
    type: 'page',
    component: resolve => require(['@/pages/organize/detail/attachment.vue'], resolve)
  },
  'organize.staff.financestaff': { // 资金方 --- 员工管理
    title: '员工管理',
    path: 'financestaff',
    type: 'page',
    component: resolve => require(['@/pages/organize/staff/financestaff.vue'], resolve)
  },
  'organize.store.authenticate': { // CA认证 --- 门店
    title: 'CA认证',
    path: 'authenticate',
    type: 'page',
    component: resolve => require(['@/pages/organize/store/authenticate.vue'], resolve)
  }
}
