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
    redirect: '/dl/table',
    children: [
      {
        path: 'table',
        component: () => import('@/views-bs/generalFormPage/index.vue')
      }
    ]
  }
]

export default manageRouter

