import Vue from 'vue'
import Vuex from 'vuex'
import veriable from './veriable'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // 再生产环境下，使用严格模式
  modules: {
    veriable
  }
})
