import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import(/* webpackChunkName: "about" */ '../views/TestDemo1.vue')
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: () => import('../views/TestDemo2.vue')
  },
  {
    path: '/demo3',
    name: 'demo3',
    component: () => import('../views/TestDemo3.vue')
  },
  {
    path: '/demo4',
    name: 'demo4',
    component: () => import('../views/TestDemo4.vue')
  },
  {
    path: '/demo5',
    name: 'demo5',
    component: () => import('../views/TestDemo5.vue')
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('../views/CardView.vue')
  },
  {
    path: '/agv',
    name: 'agv',
    component: () => import('../views/AgvView.vue')
  },
  {
    path: '/agv2',
    name: 'agv2',
    component: () => import('../views/AgvView2.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
