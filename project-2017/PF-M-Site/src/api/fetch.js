import fetch from './service'
import { myDOM } from '@/common/js/utils'

let pid = myDOM.getQueryStr('pid')

// 获取分类
export const getCategoryList = () => fetch({
    type: 'get',
    url: '/core/category/getCategorylistAjax',
    data: {
        pid: pid
    }
})

// 获取应用
export const getApplicationList = (id) => fetch({
    type: 'get',
    url: '/core/application/getApplicationlistAjax',
    data: {
        pid: pid,
        id: id
    }
})

// 获取轮播图
export const getSliderList = () => fetch({
    type: 'get',
    url: '/core/Adv/advListAjax',
    data: {
        pid: pid
    }
})