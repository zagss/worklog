import * as api from './api'

export const login = (data) => api._post({ url: 'users/authentication', data: data }) // 用户登录

export const signOut = () => api._delete({ url: 'users/authentication' }) // 用户退出

export const postDealerList = (data) => api._post({ url: 'dealers', data: data }) // 创建经销商

export const deleteDealer = (id) => api._delete({ url: `dealers/${id}` }) // 删除 门店／经销商／车商

export const getDealerList = (data) => api._get({ url: 'dealers?type=1&expand=available_limit', data: data }) // 查看经销商列表

export const putDealerList = (data, id) => api._put({ url: `dealers/${id}`, data: data }) // 修改经销商

export const getDealerDetail = (id) => api._get({ url: `dealers/${id}?expand=cards,group,incar_dealer,product_ids,products.dealer,city_info,available_limit,ca&with_files=1&with_file_info=1` }) // 查看经销商详情

export const getIncarList = () => api._get({ url: `dealers/incar-dealers?per_page=200` }) // 获取因车列表

export const getStoreList = (type, page) => api._get({ url: `dealers?type=${type}&expand=available_limit&per_page=10&page=${page}&sort=-create_time` }) // 获取门店列表

export const getAttachmentStoreList = (type, id, page) => api._get({ url: `dealers?type=${type}&group_id=${id}&expand=available_limit&per_page=10&page=${page}` }) // 获取附属门店

export const postStaff = (data, id) => api._post({ url: `dealers/${id}/staff`, data: data }) // 创建店员

export const getStaff = (id, page) => api._get({ url: `dealers/${id}/staff?expand=user&per_page=10&page=${page}&sort=-create_time` }) // 获取店员

export const getStaffDetail = (oldid, id) => api._get({ url: `dealers/${oldid}/staff/${id}` }) // 查看店员详情

export const putStaffDetail = (data, oldid, id) => api._put({ url: `dealers/${oldid}/staff/${id}`, data: data }) // 修改店员

export const deleteStaff = (oldid, id) => api._delete({ url: `dealers/${oldid}/staff/${id}` })

export const postLicensees = (data, id) => api._post({ url: `dealers/${id}/licensees`, data: data }) // 创建持牌人

export const getLicensees = (id, page) => api._get({ url: `dealers/${id}/licensees?per_page=10&page=${page}&sort=-create_time` }) // 获取持牌人列表

export const getLicenseesDetail = (oldid, id) => api._get({ url: `dealers/${oldid}/licensees/${id}?with_files=1` }) // 查看持牌人详情

export const putLicenseesDetail = (data, oldid, id) => api._put({ url: `dealers/${oldid}/licensees/${id}`, data: data }) // 修改持牌人详情

export const getUserList = (id) => api._get({ url: `users?role_id=${id}` }) // 获取特定身份用户

export const getUserLists = (page) => api._get({ url: `users?per_page=10&page=${page}&sort=-id` }) // 获取用户列表

export const postUser = (data) => api._post({ url: `users`, data: data }) // 创建用户

export const deleteUser = (id) => api._delete({ url: `users/${id}` }) // 删除用户

export const putUser = (data, id) => api._put({ url: `users/${id}`, data: data }) // 修改用户

export const postProducts = (data) => api._post({ url: 'products', data: data }) // 添加金融产品

export const getProducts = (id, page) => api._get({ url: `products?dealer_id=${id}&per_page=10&page=${page}` }) // 获取金融产品

export const getProductsDetail = (id) => api._get({ url: `products/${id}` }) // 获取金融产品

export const putProductsDetail = (data, id) => api._put({ url: `products/${id}`, data: data }) // 修改金融产品

export const getOrders = (page) => api._get({ url: `orders?expand=dealer,creator,car&per_page=10&page=${page}&sort=-create_time` }) // 获取订单

export const getOrderDetail = (id) => api._get({ url: `orders/${id}?expand=car,dealer,creator,fund_dealer,contracts,licensee&with_order_files=1` }) // 获取订单

export const putOrders = (data, id) => api._put({ url: `orders/${id}/review`, data: data }) // 订单审核

export const getContracts = (id) => api._get({ url: `orders/contracts/${id}/display` }) // 订单查看

export const getOperatorLog = (id) => api._get({ url: `events?expand=operator&data_type=3&data_id=${id}` }) // 获取操作记录

export const getLog = (page) => api._get({ url: `events?expand=operator&per_page=10&page=${page}` }) // 获取操作日志
