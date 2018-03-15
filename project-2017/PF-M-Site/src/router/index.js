import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/components/Home/Home')
const ErrorPage = () => import('@/components/Error/Error')

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Home',
      component: Home
    },
    {
      path: '/404',
      name: '404',
      component: ErrorPage
    }
  ]
})
