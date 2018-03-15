// 所有权限路由，用type来区分菜单和页面

const dealer = r => require.ensure([], () => r(require('@/pages/organize/dealer')), 'dealer')
const store = r => require.ensure([], () => r(require('@/pages/organize/store')), 'store')
const car = r => require.ensure([], () => r(require('@/pages/organize/car')), 'car')
const finance = r => require.ensure([], () => r(require('@/pages/organize/finance')), 'finance')
const order = r => require.ensure([], () => r(require('@/pages/order/list')), 'order')
const user = r => require.ensure([], () => r(require('@/pages/system/user')), 'user')
const role = r => require.ensure([], () => r(require('@/pages/system/role')), 'role')
const permission = r => require.ensure([], () => r(require('@/pages/system/permission')), 'permission')
const log = r => require.ensure([], () => r(require('@/pages/system/log')), 'log')
const afterloan = r => require.ensure([], () => r(require('@/pages/afterloan/list')), 'afterloan')
const product = r => require.ensure([], () => r(require('@/pages/product/list')), 'product')
const create = r => require.ensure([], () => r(require('@/pages/create/create')), 'create')
const detail = r => require.ensure([], () => r(require('@/pages/detail/index')), 'detail')
const content = r => require.ensure([], () => r(require('@/pages/detail/detail')), 'content')
const staff = r => require.ensure([], () => r(require('@/pages/second/staff')), 'staff')
const licensee = r => require.ensure([], () => r(require('@/pages/second/licensee')), 'licensee')
const ca = r => require.ensure([], () => r(require('@/pages/second/ca')), 'ca')
const subsidiary = r => require.ensure([], () => r(require('@/pages/second/subsidiary')), 'subsidiary')
const goods = r => require.ensure([], () => r(require('@/pages/second/product')), 'goods')

export default {
  'organize.dealer': {
    title: '经销商集团管理',
    path: '/organize/dealer',
    type: 'menu',
    component: dealer
  },
  'organize.store': {
    title: '门店管理',
    path: '/organize/store',
    type: 'menu',
    component: store
  },
  'organize.car': {
    title: '中小型车商管理',
    path: '/organize/car',
    type: 'menu',
    component: car
  },
  'organize.finance': {
    title: '资金方管理',
    path: '/organize/finance',
    type: 'menu',
    component: finance
  },
  'order.list': {
    title: '订单列表',
    path: '/order/list',
    type: 'menu',
    component: order
  },
  'system.user': {
    title: '用户管理',
    path: '/system/user',
    type: 'menu',
    component: user
  },
  'system.role': {
    title: '角色管理',
    path: '/system/role',
    type: 'menu',
    component: role
  },
  'system.permission': {
    title: '权限管理',
    path: '/system/permission',
    type: 'menu',
    component: permission
  },
  'system.log': {
    title: '操作日志',
    path: '/system/log',
    type: 'menu',
    component: log
  },
  'afterloan.list': {
    title: '贷后管理列表',
    path: '/afterloan/list',
    type: 'menu',
    component: afterloan
  },
  'product.list': {
    title: '金融产品列表',
    path: '/product/list',
    type: 'menu',
    component: product
  },
  'create': {
    title: '创建页面',
    path: '/create/:from/:id',
    name: 'create',
    type: 'page',
    component: create
  },
  'detail': {
    title: '详情页面',
    path: '/detail/:from/:id',
    name: 'detail',
    type: 'page',
    component: detail,
    children: [{
      path: '',
      redirect: 'content'
    }, {
      path: 'content',
      name: 'content',
      type: 'page',
      component: content
    }, {
      path: 'staff',
      name: 'staff',
      type: 'page',
      component: staff
    }, {
      path: 'licensee',
      name: 'licensee',
      type: 'page',
      component: licensee
    }, {
      path: 'ca',
      name: 'ca',
      type: 'page',
      component: ca
    }, {
      path: 'subsidiary',
      name: 'subsidiary',
      type: 'page',
      component: subsidiary
    }, {
      path: 'goods',
      name: 'goods',
      type: 'page',
      component: goods
    }]
  }
}
