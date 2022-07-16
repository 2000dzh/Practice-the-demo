import { RouteRecordRaw } from 'vue-router'

const dlelemntrouter: Array<RouteRecordRaw> = [
  {
    path: '/component',
    component: () => import('@/views/dl-ment.vue'),
    // redirect: '/component/input',
    children: [
      {
        path: 'input',
        component: () => import('@/views/dlcomponnets/input.vue')
      },
      {
        path: 'tree',
        component: () => import('@/views/dlcomponnets/tree.vue')
      }
    ]
  }
]

export default dlelemntrouter