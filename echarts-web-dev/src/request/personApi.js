import service from "./axios"

// 获取消费者两性各年龄段人数
export function getAge(data) {
  return service({
    url: '/personAge',
    method: 'post',
    data
  })
}

// 获取各地物流清单数量
export function getLogisticsList(data) {
  return service({
    url: '/personLogisticsList',
    method: 'post',
    data
  })
}

// 获取商品企业货值贡献比值
export function getCompanyGood(data) {
  return service({
    url: '/personCompanyGood',
    method: 'post',
    data
  })
}

// 获取商品——企业——注册时间 关系节点
export function getRelationNodes(data) {
  return service({
    url: '/personRelationNodes',
    method: 'post',
    data
  })
}

// 获取商品——企业——注册时间 关系
export function getRelationLinks(data) {
  return service({
    url: '/personRelationLinks',
    method: 'post',
    data
  })
}
