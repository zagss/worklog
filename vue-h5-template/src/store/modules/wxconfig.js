/* eslint-disable */
import axios from '@/utils/http'

export default {
  namespaced: true,
  state: {
    fetching: false,
    data: null,
  },
  mutations: {
    updateFetching(state, action) {
      state.fetching = action
    },
    updateConfigData(state, action) {
      state.data = action.wxConfig
    }
  },
  actions: {
    fetchConfig({ commit }) {
      commit('updateFetching', true)
      return axios.get(`/wxconfig`)
        .then(({data}) => {
          commit('updateConfigData', data)
          commit('updateFetching', false)
        })
        .catch(error => {
          commit('updateFetching', false)
        })
    }
  }
}