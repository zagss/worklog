import city from './cities.json'

// 更改数据格式适配Element组件
function transform (obj) {
  let arr = []
  let ary = {}
  for (let item in obj) {
    if (obj[item].children instanceof Object) {
      let child = transform(obj[item].children)
      ary = {
        value: item,
        label: obj[item].name,
        children: child
      }
    } else {
      ary = {
        value: item,
        label: obj[item].name,
        children: null
      }
    }
    arr.push(ary)
  }
  return arr
}

export const cities = transform(city)

export const newCityArray = function getNewArray (cityId) {
  let Gid = (cityId + '').slice(0, 2) + '0000' // 获取祖父辈
  let Fid = (cityId + '').slice(0, 4) + '00' // 父亲辈
  let Zid = cityId + ''
  let arr = [Gid, Fid, Zid].sort((a, b) => a - b)
  let newArray = Array.from(new Set(arr)) // 数组去重
  return newArray
}
