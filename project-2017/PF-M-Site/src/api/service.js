import { baseUrl } from '@/config/env'

const axios = require('axios').create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformResponse: [function (data) {
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

export default (req) => {
    if (req.type === 'get') {
      return axios.get(req.url, {params: req.data})
    } else if (req.type === 'put') {
      return axios({ method: 'put', url: `${req.url}`, data: req.data })
    } else if (req.type === 'post') {
      return axios({ method: 'post', url: `${req.url}`, data: req.data })
    } else if (req.type === 'delete') {
      return axios({ method: 'delete', url: `${req.url}`, data: req.data })
    }
  }