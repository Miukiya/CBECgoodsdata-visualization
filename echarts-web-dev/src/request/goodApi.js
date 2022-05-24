import service from "./axios"

// goodtype api
export function getType(data) {
  return service({
    url: '/getTypes',
    method: 'post',
    data
  })
}

// 获取 单类 商品数量 api
export function getSingleQuantity(data) {
  return service({
    url: '/singleGoodQuantity',
    method: 'post',
    data
  })
}

// 获取 多类 商品数量 api
export function getMoreQuantity(data) {
  return service({
    url: '/moreGoodQuantity',
    method: 'post',
    data
  })
}

// 获取 单类 商品货值 api
export function getSingleValue(data) {
  return service({
    url: '/singleGoodValue',
    method: 'post',
    data
  })
}

// 获取 单类 商品货值排序 api
export function getSingleValueRank(data) {
  return service({
    url: '/singleGoodValueRank',
    method: 'post',
    data
  })
}

// 获取 多类 商品货值 api
export function getMoreValue(data) {
  return service({
    url: '/moreGoodValue',
    method: 'post',
    data
  })
}

// 获取 多类 商品货值排序 api
export function getMoreValueRank(data) {
  return service({
    url: '/moreGoodValueRank',
    method: 'post',
    data
  })
}

// 获取 多类 各类商品数量 api
export function getMoreType(data) {
  return service({
    url: '/moreGoodType',
    method: 'post',
    data
  })
}

// 获取 单类 商品各国进出口总额 api
export function getSingleWorldMap(data) {
  return service({
    url: '/singleGoodWorldMap',
    method: 'post',
    data
  })
}

// 获取 多类 商品各国进出口总额 api
export function getMoreWorldMap(data) {
  return service({
    url: '/moreGoodWorldMap',
    method: 'post',
    data
  })
}

// 获取 词云 api
export function getWord(data) {
  return service({
    url: '/goodWord',
    method: 'post',
    data
  })
}

// 获取 单类 商品单价（进出口模式） api
export function getSinglePirce(data) {
  return service({
    url: '/singleGoodPrice',
    method: 'post',
    data
  })
}

// 获取 单类 商品单价（国家） api
export function getSingleCountryPirce(data) {
  return service({
    url: '/singleGoodCountryPrice',
    method: 'post',
    data
  })
}
