/*
 * @Author: 丁子豪
 * @Date: 2022-03-12 23:46:52
 * @LastEditTime: 2022-04-09 18:39:24
 * @LastEditors: 丁子豪
 */
import http from '@/utils/request'


/**
 * 获取所有分类 (顶级, 二级,对应的商品推荐数据)
 */
export const findAllCategory = () => {
  return http.request({
    url: '/home/category/head',
    method: 'GET',
  })
}

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id: string) => {
  return http.request({
    url: '/category',
    method: 'GET',
    params: {
      id
    }
  })
}

/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
 */
export const findSubCategoryFilter = (id: string) => {
  return http.request({
    url: '/category/sub/filter',
    method: 'GET',
    params: {
      id
    }
  })
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
 */
type FIND_SUB_CATEGORY_GOODS = { page: number, pageSize: number, categoryId: string }
export const findSubCategoryGoods = (params: FIND_SUB_CATEGORY_GOODS) => {
  return http.request({
    url: '/category/goods/temporary',
    method: 'POST',
    data: {
      ...params
    }
  })
}

