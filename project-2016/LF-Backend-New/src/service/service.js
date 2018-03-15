import { baseUrl } from '@/config/env'

const URL = `${baseUrl}/`
const axios = require('axios').create({
  baseURL: URL,
  timeout: 10000,
  // withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  transformResponse: [function (data) {
    // console.log(data)
    let json = {}
    try {
      json = JSON.parse(data)
    } catch (e) {
      json = {}
    }
    if (json.msg === 'session error') {
      console.log('session error')
    }
    return json
  }]
})

axios.interceptors.request.use(config => {
  if (localStorage.getItem('access_token')) {
    config.headers['X-Access-Token'] = localStorage.getItem('access_token')
  }
  return config
}, err => {
  return Promise.reject(err)
})

// // get
// export const _get = (req) => {
//   return axios.get(req.url, {params: req.data})
// }

// // put
// export const _put = (req) => {
//   return axios({ method: 'put', url: `/${req.url}`, data: req.data })
// }

// // post
// export const _post = (req) => {
//   return axios({ method: 'post', url: `/${req.url}`, data: req.data })
// }

// // delete
// export const _delete = (req) => {
//   return axios({ method: 'delete', url: `/${req.url}`, data: req.data })
// }

export default (req) => {
  if (req.type === 'get') {
    return axios.get(req.url, {params: req.data})
  } else if (req.type === 'put') {
    return axios({ method: 'put', url: `/${req.url}`, data: req.data })
  } else if (req.type === 'post') {
    return axios({ method: 'post', url: `/${req.url}`, data: req.data })
  } else if (req.type === 'delete') {
    return axios({ method: 'delete', url: `/${req.url}`, data: req.data })
  }
}
