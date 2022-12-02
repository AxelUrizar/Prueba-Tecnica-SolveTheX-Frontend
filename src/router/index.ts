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
    },
    {
      path: '/perfil/:id',
      name: 'perfil',
      component: () => import('@/views/Perfil.vue')
    },
    {
      path: '/editarPerfil/:id',
      name: 'editarPerfil',
      component: () => import('@/views/EditarPerfil.vue')
    },
    {
      path: '/productosUsuario/:id',
      name: 'productosUsuario',
      component: () => import('@/views/ProductosUsuario.vue')
    }
  ]
})

export default router
