export const SET_ITEM = 'SET_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

export default {
  state: {
    list: {},
    tabName: '',
    adminInfo: {}
  },
  mutations: {
    [SET_ITEM] (state, obj) {
      state[obj.key] = obj.val
    },
    [DELETE_ITEM] (state, obj) {
      state[obj.key].splice(obj.index, 1)
    }
  },
  actions: {
    [SET_ITEM] ({commit}, obj) {
      commit(SET_ITEM, obj)
    },
    [DELETE_ITEM] ({commit}, obj) {
      commit(DELETE_ITEM, obj)
    }
  }
}
