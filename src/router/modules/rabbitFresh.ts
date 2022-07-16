import { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout.vue' //rabbitFresh

const rabbitFreshRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/category/:id',
        component: () => import('@/views/category/index.vue')
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/category/sub.vue')
      },
      {
        path: '/product',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: '/dzh',
        component: () => import('@/views/ceshi/index.vue')
      }
    ]
  }
]

export default rabbitFreshRouter