import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  imgs: {} // 上传图片列表
}

export default new Vuex.Store({
  state,
  mutations
})
