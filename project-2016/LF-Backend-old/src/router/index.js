import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'
Vue.use(Router)

const pages = {
  ...routes
}

const routeTotal = []

for (const key in pages) {
  const item = pages[key]
  item.meta = {
    title: item.title,
    layout: item.layout
  }
  item.name = key
  routeTotal.push(item)
}

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/pages/login/login'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['@/pages/index/index'], resolve),
      children: [{
        path: '',
        component: resolve => require(['@/pages/organize/dealer/list'], resolve)
      },
        ...routeTotal
      ]
    }
  ]
})
