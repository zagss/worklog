import { UPLOAD_IMGS, EMPTY_IMGS } from './mutation-types'

export default {
  [UPLOAD_IMGS] (state, obj) {
    Object.assign(state.imgs, obj)
  },
  [EMPTY_IMGS] (state) {
    state.imgs = {}
  }
}
