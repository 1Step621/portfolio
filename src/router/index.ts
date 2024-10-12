import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('../views/WorksView.vue')
    },
    {
      path: '/works/insane-tweet',
      name: 'insane-tweet',
      component: () => import('../views/works/insane-tweet/InsaneTweet.vue')
    },
    {
      path: '/works/hokora-sweeper',
      name: 'hokora-sweeper',
      component: () => import('../views/works/hokora-sweeper/HokoraSweeper.vue')
    }
  ]
})

export default router
