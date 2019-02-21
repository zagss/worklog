import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import sdkPlugin from './sdk'

import '@/assets/scss/app.scss';

Vue.use(sdkPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
