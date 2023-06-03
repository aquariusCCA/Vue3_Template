import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      //路由到的地址(自定义)
      path: '/home',
      component: () => import('../components/HelloWorld.vue'),
      //引入组件，组件Home.vue所在路径
      //Home.vue是需要路由的vue组件
      name: 'Home'
      //组件名称
    }
  ],
  history: createWebHistory()
})

export default router
