import fetch from './service'

// 用户登录
export const login = (data) => fetch({ type: 'post', url: 'users/authentication', data: data })

// 获取 经销商／门店／车商／资金方 列表
export const getStoreList = (type, per, page) => fetch({ type: 'get', url: `dealers?type=${type}&per_page=${per}&page=${page}&sort=-create_time&expand=available_limit` })

// 获取附属门店
export const getSubList = (type, per, page, gid) => fetch({ type: 'get', url: `dealers?type=${type}&per_page=${per}&page=${page}&group_id=${gid}&sort=-create_time&expand=available_limit` })

// 获取 经销商／门店／车商／资金方 详情
export const getStoreDetail = (id) => fetch({ type: 'get', url: `dealers/${id}?expand=cards,group,incar_dealer,product_ids,products.dealer,city_info,available_limit,ca&with_files=1&with_file_info=1` })

// 获取因车列表
export const getIncarList = (per) => fetch({ type: 'get', url: `dealers/incar-dealers?per_page=${per}` })

// 获取金融产品
export const getProduct = (id, per, page) => fetch({ type: 'get', url: `products?dealer_id=${id}&per_page=${per}&page=${page}&sort=-create_time` })
