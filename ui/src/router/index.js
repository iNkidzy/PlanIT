import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '../views/ProjectsView.vue'
import TasksView from '../views/TasksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/spacefun',
      name: 'spacefun',
      meta: { requiresAuth: true },
      component: () => import('../views/SpacefunView.vue')
    },
    {
      path: '/projects/:id',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/tasks/:id',
      name: 'tasks',
      component: TasksView
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
    {
      path: '/login',
      name: 'login',

      component: () => import('../views/LoginView.vue')
    },



    // default redirect to home page
    //  { path: '/:pathMatch(.*)*', redirect: '/' }

  ]
})
//if the route has auth and the user is not logged in, it redirects you to login page everytime
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    next("/login")
  } else { next() }
})

export default router