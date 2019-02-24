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
    updateUserData(state, action) {
      state.data = action.user
    },
    updateUserError(state, action) {
      state.error = action.data
    }
  },
  actions: {
    fetchUser ({ commit }) {
      commit('updateFetching', true)
      return axios.get(`/user`)
        .then(({data}) => {
          commit('updateUserData', data)
          commit('updateFetching', false)
        })
        .catch(error => {
          commit('updateFetching', false)
          commit('updateUserError', error)
        })
    }
  }
}