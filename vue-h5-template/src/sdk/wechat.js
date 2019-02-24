/* eslint-disable */
import collector from './collector'
import appConfig from '@/utils/config'

export const setConfig = config => wx.config(config)
export const ready = () => {
  return new Promise((resolve, reject) => {
    wx.ready(resolve)
    wx.error(reject)
  })
}

function transferPath (path) {
  return `${appConfig('transferUrl')}?id=${appConfig('id')}&path=${encodeURIComponent(path)}&uid=${appConfig('user.id')}`
}

/**
 * @Name 分享接口
*/
export const setShare = (config) => {
  let link, success, path

  if (config.link) {
    throw new Error('请使用path替代link')
  }

  if (config.path) {
    path = config.path
    link = transferPath(config.path)
  } else {
    link = location.href
    path = link
  }

  if (config.success) {
    success = () => {
      config.success()
      collector.share(path)
    }
  } else {
    success = () => {
      collector.share(path)
    }
  }

  const params = {
    title: config.title || '',
    desc: config.desc || '',
    imgUrl: config.imgUrl || '',
    link: link,
    success: success
  }
  return ready().then(() => {
    wx.onMenuShareAppMessage(params) // 分享给朋友
    // wx.onMenuShareQQ(params) // 分享到QQ
    // wx.onMenuShareWeibo(params) // 分享到腾讯微博
    // wx.onMenuShareQZone(params) // 分享到QQ空间
    wx.onMenuShareTimeline(params) // 分享到朋友圈
  }, err => {
    console.log(err)
    // location.reload()
  })
}

/**
 * @Name 预览图片接口
*/
export const previewImage = (thumb, list) => {
  if (appConfig('local')) {
    console.log('wx.previewImage')
    return
  }
  wx.previewImage({
    current: thumb, // 当前显示图片的http链接
    urls: list // 需要预览的图片http链接列表
  })
}

/**
 * @Name 获取地理位置接口
*/
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (appConfig('local')) {
      console.log('wx.getLocation')
      resolve({
        latitude: 36, // 纬度，浮点数，范围为90 ~ -90
        longitude: 116, // 经度，浮点数，范围为180 ~ -180。
        speed: 2, // 速度，以米/每秒计
        accuracy: 0.5 // 位置精度
      })
      return
    }

    wx.ready(() => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: resolve,
        error: reject
      })
    })
  })
}

/**
 * @Name 使用微信内置地图查看位置接口
*/
export const openLocation = (params) => {
  if (appConfig('local')) {
    console.log('wx.openLocation')
    return
  }

  wx.openLocation({
    latitude: parseFloat(params.lat), // 纬度，浮点数，范围为90 ~ -90
    longitude: parseFloat(params.lng), // 经度，浮点数，范围为180 ~ -180。
    name: params.title || '', // 位置名
    address: params.desc || '', // 地址详情说明
    scale: params.scale || 13, // 地图缩放级别,整形值,范围从1~28。默认为最大
    infoUrl: params.link || '' // 在查看位置界面底部显示的超链接,可点击跳转
  })
}

/**
 * @Name 调起微信扫一扫接口
*/
export const scanQRCode = (params = {}) => {
  return new Promise((resolve, reject) => {
    if (appConfig('local')) {
      console.log('wx.scanQRCode')
      resolve({
        resultStr: 'resultStr'
      })
      return
    }

    wx.scanQRCode({
      needResult: params.needResult || 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: params.scanType || ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: resolve,
      error: reject
    })
  })
}

/**
 * @Name 拍照或从手机相册中选图接口
*/
export const chooseImage = (params = {}) => {
  return new Promise((resolve, reject) => {
    if (appConfig('local')) {
      console.log('wx.chooseImage')
      resolve({
        localIds: [
          'localId',
          'localId',
          'localId',
          'localId',
          'localId',
          'localId',
          'localId',
          'localId',
          'localId']
      })
      return
    }

    wx.chooseImage({
      count: params.count || 1,
      sizeType: params.sizeType || ['original', 'compressed'],
      sourceType: params.sourceType || ['album', 'camera'],
      success: resolve,
      error: reject
    })
  })
}

/**
 * @Name 上传图片接口
*/
export const uploadImage = (params) => {
  return new Promise((resolve, reject) => {
    if (appConfig('local')) {
      let serverId = params.devServerId || 'dev_serverId'
      console.log('当前上传serverId为:' + serverId)
      resolve({
        serverId: serverId
      })
      return
    }
    wx.uploadImage({
      localId: params.localId,
      isShowProgressTips: params.isShowProgressTips || 0,
      success: resolve,
      error: reject
    })
  })
}

export const _uploadImages = (params, serverIds, resolve) => {
  const localId = params.localIds.shift()
  wx.uploadImage({
    localId: localId,
    isShowProgressTips: params.isShowProgressTips || 1,
    success: f => {
      serverIds.push(f.serverId)
      if (params.localIds.length > 0) {
        _uploadImages(params, serverIds, resolve)
      } else {
        resolve({serverIds: serverIds})
      }
    }
  })
}

export const uploadImages = (params = {}) => {
  return new Promise((resolve, reject) => {
    if (params.localIds.length === 0) {
      resolve({serverIds: []})
    } else {
      _uploadImages(params, [], resolve)
    }
  })
}

/**
 * @Name 获取本地图片接口
*/
export const getLocalImgData = (localIds) => {
  if (window.__wxjs_is_wkwebview) {
    return Promise.all(localIds.map(n => new Promise((resolve, reject) => {
      wx.getLocalImgData({
        localId: n,
        success: res => {
          resolve(res.localData)
        }
      })
    })))
  } else {
    return Promise.resolve(localIds)
  }
}

export default {
  setConfig,
  ready,
  setShare,
  previewImage,
  getLocation,
  openLocation,
  scanQRCode,
  chooseImage,
  uploadImage,
  uploadImages,
  getLocalImgData
}
