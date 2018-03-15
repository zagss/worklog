import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const index = r => require.ensure([], () => r(require('@/pages/index/index')), 'index')
const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')

const pages = {
  ...routes
}
const routeTotal = []
for (const key in pages) {
  const item = pages[key]
  item.meta = {
    title: item.title
  }
  routeTotal.push(item)
}

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [{
        path: '',
        component: home
      },
        ...routeTotal
      ]
    }
  ]
})
