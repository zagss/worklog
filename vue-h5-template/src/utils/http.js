/* eslint-disable */
import axios from 'axios'
import appConfig from './config'
import router from '@/router'
import store from '@/store'

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? appConfig('api') : '',
  timeout: 10000,
})

const tip = msg => {
  weui.alert(msg)
}

/**
* 跳转登录页
* 携带当前页面路由，以期在登录页面完成登录后返回当前页面
*/
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      // store.commit('loginSuccess', null)
      // setTimeout(() => {
      //   toLogin()
      // }, 1000)
      toLogin()
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

// 请求拦截器 每次请求前，如果存在token则在请求头中携带token
axios.interceptors.request.use(config => {
  // const token = store.state.token
  // token && (config.headers.Authorization = token)
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    console.log('res:all === ', res)
    if (res.status === 200 && res.data && res.data.code == 'SUCCESS') {
      return Promise.resolve(res)
    }
    return Promise.reject(res)
  },
  // 请求失败
  error => {
    const { response } = error
    console.log('error: all ===', error)
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      store.commit('changeNetwork', false)
    }
  })

export default instance