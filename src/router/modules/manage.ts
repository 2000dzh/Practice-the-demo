import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const manageRouter: Array<RouteRecordRaw> = [
  {
    path: '/loginbs',
    component: () => import('@/views-bs/login.vue')
  },
  {
    path: '/dl',
    component: Layout,
    redirect: '/dl/workbench',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'table',
        component: () => import('@/views-bs/workbench/index.vue'),
        meta: {
          title: '表格'
        },
        children: [
          {
            path: 'ceshi',
            component: () => import('@/views-bs/generalFormPage/index.vue'),
            meta: {
              title: 'ceshi'
            }
          }
        ]
      },
      {
        path: 'workbench',
        meta: {
          title: '工作台'
        },
        component: () => import('@/views-bs/workbench/index.vue'),
        children: [
          {
            path: 'gongzuotceshi',
            component: () => import('@/views-bs/workbench/index.vue'),
            meta: {
              title: 'gongzuotceshi'
            }
          }
        ]
      },

    ]
  },
]

export default manageRouter

