import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})

router.beforeEach(function (to, from, next) {
  store.commit('weui/updateLoadingStatus', {isLoading: true})
  next()
})
// eslint-disable-next-line
router.afterEach((to, from) => {
  store.commit('weui/updateLoadingStatus', {isLoading: false})
  // 统计应用pv
})

export default router