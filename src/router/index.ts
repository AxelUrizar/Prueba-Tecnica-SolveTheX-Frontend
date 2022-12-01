import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/Signup.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login.vue')
    }
  ]
})

export default router
