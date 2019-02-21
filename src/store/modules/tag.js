/* eslint-disable */
import axios from '@/utils/http'

export default {
  namespaced: true,
  state: {
    fetching: false,
    data: []
  },
  mutations: {
    updateFetching(state, action) {
      state.fetching = action
    },
    updateListData(state, action) {
      state.data = action.result.data
    }
  },
  actions: {
    fetchList({ commit }) {
      commit('updateFetching', true)
      return axios.get(`/tag`, { params: { cache: 1 } })
        .then(response => {
          commit('updateListData', response)
          commit('updateFetching', false)
        })
        .catch(error => {
          commit('updateFetching', false)
        })
    }
  }
}