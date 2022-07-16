import http from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = (id: string) => {
  return http.request({
    url: '/goods',
    method: 'GET',
    params: {
      id
    }
  })
}

/**
 * 获取商品同类推荐-未传入ID为猜喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 */
export const findRelGoods = (id: string, limit = 16) => {
  return http.request({
    url: '/goods/relevant',
    method: 'GET',
    params: {
      id,
      limit
    }
  })
}

/**
 * 获取热榜商品
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 */
type A = { id: string, type: number, limit: number }
export const findHotGoods = ({ id, type, limit = 3 }: A) => {
  return http.request({
    url: '/goods/hot',
    method: 'GET',
    params: {
      id,
      type,
      limit
    }
  })
}

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 */
export const findCommentInfoByGoods = (id: string) => {
  return http.request({
    url: `/goods/${id}/evaluate`,
    method: 'GET'
  })
}

/**
 * 查询商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 商品ID
 * @returns
 */
export const findGoodsCommentList = (id: string, params: object) => {
  return http.request({
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    method: 'GET',
    params
  })
}