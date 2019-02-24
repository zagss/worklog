/* eslint-disable */
import wechat from './wechat'
import collector from './collector'
import appConfig from '@/utils/config'

// 生产环境动态替换cdn地址
if (process.env.NODE_ENV === 'production') {
  __webpack_public_path__ = appConfig('publicPath')
}

console.log('process.env === ', process.env)

export default {
  install(Vue, options) {
    Vue.prototype.wechat = wechat
    Vue.prototype.collector = collector
    Vue.prototype.appConfig = appConfig

    // 微信SDK配置
    wechat.setConfig(appConfig('wx.jsConfig'))
    // 基本分享设置
    wechat.setShare(appConfig('wx.share'))
  }
}