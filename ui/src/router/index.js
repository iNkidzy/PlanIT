import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '../views/ProjectsView.vue'

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
      meta: { requiresAuth: true },
      component: ProjectsView
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },

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
  if (to.meta.requiresAuth && tokenIsExpired()) {
    next("/login")
  } else {
    next()
  }
})

function tokenIsExpired() {
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const now = (new Date()).getTime();
  const isExpired = now >= (payload.exp * 1000);
  return isExpired;
}

export default router