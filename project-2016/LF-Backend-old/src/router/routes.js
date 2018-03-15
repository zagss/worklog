import attachment from './attachment'

const pages = {
  ...attachment
}

const routeTotal = []

for (const key in pages) {
  const item = pages[key]
  routeTotal.push(item)
}

export default {
  'organize.dealer': {
    title: '经销商集团管理',
    path: '/organize/dealer',
    type: 'menu',
    component: resolve => require(['@/pages/organize/dealer/list.vue'], resolve)
  },
  'organize.create': {
    title: '创建经销商集团',
    path: '/organize/create',
    type: 'page',
    component: resolve => require(['@/pages/organize/create/create.vue'], resolve)
  },
  'organize.detail': {
    title: '创建经销商集团',
    path: '/organize/detail',
    type: 'page',
    component: resolve => require(['@/pages/organize/detail/detail.vue'], resolve),
    children: [
      ...routeTotal
    ]
  },
  'organize.store': {
    title: '门店管理',
    path: '/organize/store',
    type: 'menu',
    component: resolve => require(['@/pages/organize/store/list.vue'], resolve)
  },
  'organize.car': {
    title: '中小型车商管理',
    path: '/organize/car',
    type: 'menu',
    component: resolve => require(['@/pages/organize/car/list.vue'], resolve)
  },
  'organize.staff': {
    title: '资金方管理',
    path: '/organize/staff',
    type: 'menu',
    component: resolve => require(['@/pages/organize/staff/list.vue'], resolve)
  },
  'order.list': {
    title: '订单列表',
    path: '/order/list',
    type: 'menu',
    component: resolve => require(['@/pages/order/list.vue'], resolve)
  },
  'order.detail': {
    title: '订单详情',
    path: '/order/detail',
    type: 'menu',
    component: resolve => require(['@/pages/order/detail.vue'], resolve)
  },
  'system.user': {
    title: '用户管理',
    path: '/system/user',
    type: 'menu',
    component: resolve => require(['@/pages/system/user.vue'], resolve)
  },
  'system.role': {
    title: '角色管理',
    path: '/system/role',
    type: 'menu',
    component: resolve => require(['@/pages/system/role.vue'], resolve)
  },
  'system.permission': {
    title: '权限管理',
    path: '/system/permission',
    type: 'menu',
    component: resolve => require(['@/pages/system/permission.vue'], resolve)
  },
  'system.log': {
    title: '操作日志',
    path: '/system/log',
    type: 'menu',
    component: resolve => require(['@/pages/system/log.vue'], resolve)
  },
  'afterloan.list': {
    title: '贷后管理列表',
    path: '/afterloan/list',
    type: 'menu',
    component: resolve => require(['@/pages/afterloan/list.vue'], resolve)
  },
  'finance.list': {
    title: '金融产品列表',
    path: '/finance/list',
    type: 'menu',
    component: resolve => require(['@/pages/finance/list.vue'], resolve)
  }
}
