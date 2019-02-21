/* eslint-disable */
import axios from 'axios'
import appConfig from '@/utils/config'

const request = (params) => {
  if (!appConfig('collector')) {
    console.log('appConfig.collector未配置')
    return
  }
  // let url = appConfig.collector.url
  let url = appConfig('collector.url')
  return axios({
    url,
    method: 'get',
    params
  })
}

export default {
  pv(path) {
    try {
      request({
        action: 'pv',
        id: appConfig('id'),
        uid: appConfig('user.id'),
        sex: appConfig('user.sex'),
        url: path
      })
    } catch (e) {

    }
  },
  share(url) {
    try {
      request({
        id: appConfig('id'),
        uid: appConfig('user.id'),
        sex: appConfig('user.sex'),
        url: url
      })
    } catch (e) {

    }
  },
  go() {
    try {
      let url = location.href + location.hash

      request({
        action: 'go',
        id: appConfig('id'),
        uid: appConfig('user.id'),
        sex: appConfig('user.sex'),
        url: url
      })
    } catch (e) {

    }
  }
}