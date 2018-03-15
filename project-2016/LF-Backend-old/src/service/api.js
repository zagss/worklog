import config from '../config/config'

const baseUrl = `${config.host}/`
const axios = require('axios').create({
  baseURL: baseUrl,
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
  if (sessionStorage.getItem('access_token')) {
    config.headers['X-Access-Token'] = sessionStorage.getItem('access_token')
  }
  return config
}, err => {
  return Promise.reject(err)
})

// get
export const _get = (req) => {
  return axios.get(req.url, {params: req.data})
}

// put
export const _put = (req) => {
  return axios({ method: 'put', url: `/${req.url}`, data: req.data })
}

// post
export const _post = (req) => {
  return axios({ method: 'post', url: `/${req.url}`, data: req.data })
}

// delete
export const _delete = (req) => {
  return axios({ method: 'delete', url: `/${req.url}`, data: req.data })
}
