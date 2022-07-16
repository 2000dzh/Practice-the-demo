import https from '@/utils/request'

/**
 * 获取品牌个数
 * @param {Integer} limit 品牌个数
 * @returns Promise
 */
export const findBrand = (limit = 6) => {
  return https.request({
    url: '/home/brand',
    method: 'GET',
    params: { limit }
  })
}

/**
 * 获取广告图
 * @returns Promise
 */
export const findBanner = () => {
  return https.request({
    url: '/home/banner',
    method: 'GET'
  })
}

/**
 * 获取新鲜好物数据
 * @returns Promise
 */
export const findNew = () => {
  return https.request({
    url: 'home/new',
    method: 'GET',
  })
}

/**
 * 获取人气推荐数据
 * @returns Promise
 */
export const findHot = () => {
  return https.request({
    url: "home/hot",
    method: 'GET'
  })
}

/**
 * 获取商品数据
 * @returns Promise
 */
export const findGoods  = () => {
  return https.request({
    url: 'home/goods',
    method: 'GET'
  })
}

/**
 * 获取最新专题数据
 * @returns Promise
 */
export const findSpecial  = () => {
  return https.request({
    url: 'home/special',
    method: 'GET'
  })
}

