const DEFAULT_CONFIG = {
  'deploy': {
    'token': '' // 重点0, 代码发布的token, 需要向后台索要, 如果不配置, 发布不了代码
  },
  'local': true, // 是否为本地开发模式环境
  'id': 0, // 应用ID
  'version': '',
  'publicPath': '/', // 静态资源存放路径, 开发模式不需要设置
  'api': '/api', // 重点1 . 需要向后台索要api地址
  'wx': {
    'apiList': [],
    'share': { // 默认的分享信息, 后台生成, 开发模式不需要设置
      'title': '',
      'desc': '',
      'imgUrl': '',
      'link': ''
    },
    'jsConfig': {} // 微信接口的初始化配置, 后台生成, 开发模式不需要设置
  },
  'collector': { // 数据统计配置
    'url': 'http://dev.mp.duduapp.net/mio/h5/analytics' // 默认就好 后台会自动生成
  },
  'router': { // 路由配置 默认即可
    'mode': 'history',
    'base': '/'
  },
  'user': { // 当前登录用户信息, 开发模式0即可
    'id': 0,
    'sex': 0
  },
  'transferUrl': ''
}

/* eslint-disable */

/**
 * lodash _get
 * @param {object} object 
 * @param {string/array} path ('a[0].b.c')
 * @param {string} defaultValue 
 */
function deepGet(object, path, defaultValue) {
  return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
    .reduce((o, k) => (o || {})[k], object) || defaultValue;
}

export default function appConfig(key) {
  if (!Window.AppConfig && process.env.NODE_ENV !== 'production') {
    Window.AppConfig = DEFAULT_CONFIG
  }
  return deepGet(Window.AppConfig, key)
}