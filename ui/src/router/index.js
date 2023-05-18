import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '../views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
        path: '/spacefun',
        name: 'spacefun',
        component: () => import('../views/SpacefunView.vue')
    },
    {
      path: '/projects/:id',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/admin',
      name: 'admin',
      
      component: () => import('../views/AdminView.vue')
    },
    
      // default redirect to home page
     //  { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
