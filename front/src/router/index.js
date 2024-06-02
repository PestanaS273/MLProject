import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../views/PricingView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/newspace',
      name: 'newspace',
      component: () => import('../views/LogedinPages/NewSpaceView.vue')
    },

    {
      path: '/newsassistant/:query',
      name: 'newsassistant',
      component: () => import('../views/LogedinPages/NewAssistantView.vue'),
      props: true
    },

    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: () => import('../views/LogedinPages/DashboardView.vue')
    // }
  ]
})

export default router
