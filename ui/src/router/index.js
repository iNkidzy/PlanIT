import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '../views/ProjectsView.vue'
import TasksView from '../views/TasksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue')
    },
    {
      path: '/spacefun',
      name: 'spacefun',
      meta: { requiresAuth: true },
      component: () => import('../views/SpacefunView.vue')
    },
    {
      path: '/projects/:id',
      name: 'projects',
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true, requiresAdminAuth: true },

      component: () => import('../views/AdminView.vue')
    },

    // {
    //   path: '/signup',
    //   name: 'signup',

    //   component: () => import('../components/SignupComponents.vue')
    // },
    // {
    //   path: '/login',
    //   name: 'login',

    //   component: () => import('../components/LoginComponents.vue')
    // },

    // default redirect to home page
    //  { path: '/:pathMatch(.*)*', redirect: '/' }

  ]
})
//if the route has auth and the user token is expired, it redirects you to login page everytime
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (to.meta.requiresAuth && tokenIsExpired(payload)) {
    next("/login")
  }
  else if (to.meta.requiresAdminAuth && payload.role != 'ADMIN') {
    next("/spacefun")
  }
  else {
    next()
  }
})

function tokenIsExpired(payload) {

  const now = (new Date()).getTime();
  const isExpired = now >= (payload.exp * 1000);
  return isExpired;
}

export default router