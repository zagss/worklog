import Vue from 'vue'
import Vuex from 'vuex'

import weui from './modules/weui'
import user from './modules/user'
import wxconfig from './modules/wxconfig'

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    weui,
    user,
    wxconfig,
  },
  plugins: []
})

export default store