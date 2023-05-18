import { createRouter, createWebHistory } from 'vue-router'
import SpaceFunDetailView from '../views/SpaceFunDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/spacefun',
      name: 'spacefun',
      component: () => import('../views/SpacefunView.vue')
    },
    {
      path: '/spacefunDetail/:id',
      name: 'spacefunDetail',
      component: SpaceFunDetailView
    },
    {
      path: '/admin',
      name: 'admin',

      component: () => import('../views/AdminView.vue')
    },

    {
      path: '/signup',
      name: 'signup',

      component: () => import('../views/SignupView.vue')
    },

    // default redirect to home page
    //  { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
