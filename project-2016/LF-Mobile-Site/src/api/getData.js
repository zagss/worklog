// import fetch from '@/config/fetch'
import fetch from './service'

// 车型库
export const getCar = () => fetch({type: 'get', url: `/cars/car-category`})

export const getCar2 = (id) => fetch({type: 'get', url: `/cars/car-category?level=1&value=${id}`})

export const getCar3 = (id) => fetch({type: 'get', url: `/cars/car-category?level=2&value=${id}`})

// 评估
export const getAssess = (data) => fetch({type: 'get', url: `/cars/assess`, data})
