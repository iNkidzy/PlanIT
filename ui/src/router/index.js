import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SpaceFunDetailView from '../views/SpaceFunDetailView.vue'

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
        path: '/spacefun',
        name: 'spacefun',
        component: () => import('../views/SpacefunView.vue')
    },
    {
      path: '/spacefunDetail/:id',
      name: 'spacefunDetail',
      component: SpaceFunDetailView
    },


     // default redirect to home page
   //  { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
