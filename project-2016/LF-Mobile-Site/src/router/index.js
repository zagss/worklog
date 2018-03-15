import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('@/pages/home.vue')
const Intro = () => import('@/pages/intro.vue')
const Company = () => import('@/pages/company.vue')
const Contact = () => import('@/pages/contact.vue')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/intro',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
