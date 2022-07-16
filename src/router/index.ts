/*
 * @Author: 丁子豪
 * @Date: 2022-03-12 20:11:07
 * @LastEditTime: 2022-07-16 12:16:54
 * @LastEditors: 丁子豪
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import rabbitFreshRouter from './modules/rabbitFresh' // 兔儿鲜
import dlelemntrouter from './modules/dl-ement' // element-plus
import manageRouter from './modules/manage' //管理系统


const routes: Array<RouteRecordRaw> = [
  ...dlelemntrouter,
  ...manageRouter,
  ...rabbitFreshRouter
]

// 创建路由实例
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 配置路由规则，写法和之前一样
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router
