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

    {
      path: '/newsanalyse',
      name: 'newsanalyse',
      component: () => import('../views/LogedinPages/NewsAnalyseView.vue'),
      props: true
    },
    {
      path: '/askquestions',
      name: 'askquestions',
      component: () => import('../views/LogedinPages/AskQuestionsView.vue'),
    }

  ]
})

export default router
