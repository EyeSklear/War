import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/heroDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
  //路由初始指向
    path: '/',
    name: 'pingxingguan',
    //component:()=>import('../components/echartsTest.vue')
    //component:()=>import('../components/heroDetail.vue'),
    redirect :"/pingxingguan",
    children: [
      {
          path: 'pingxingguanwar',
          name: 'pingxingguanwar',
          component: () => import('../components/PingxingguanWar.vue'),
      },
      {
        path: 'pingxingguan',
        name: 'pingxingguan',
        component: () => import('../components/Pingxingguan.vue'),
    },
      {
        path: 'didian',
        name: 'didian',
        component: () => import('../components/didian.vue'),
    },
      {
        path: 'herodetail',
        name: 'HeroDetail',
        //component:()=>import('../components/echartsTest.vue')
        component:()=>import('../components/heroDetail.vue'),
      },
      {
        path: 'newmap',
        name: 'newmap',
        //component:()=>import('../components/echartsTest.vue')
        component:()=>import('../components/newMap.vue'),
      }
  ]
    //component:()=>import('../components/newMap.vue')
    //component:()=>import('../components/echartsPie.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router