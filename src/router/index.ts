import { createRouter, createWebHistory } from 'vue-router'
import HomeDefault from '@/components/HomeDefault.vue'
import UserManage from '@/components/UserManage/UserManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeDefault,
    },
    {
      path: '/user',
      name: 'user',
      component: UserManage,
    },
  ],
})

export default router
