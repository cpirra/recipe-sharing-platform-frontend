// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/general/HomeView.vue'
import { useUserStore } from '../stores/userStore'

// Import routes from other modules
import recipeRoutes from './recipe'
import authorizationRoutes from './authorization'
import profileRoutes from './profile'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import FullLayout from '@/layouts/FullLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Public',
      component: DefaultLayout,
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('../views/general/AboutView.vue')
        },
        // Spread the imported routes
        ...recipeRoutes,
        profileRoutes
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: FullLayout,
      children: [
        // Spread the imported authorization routes
        ...authorizationRoutes
      ]
    }
  ]
})

// Navigation guard to check for authenticated users
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.matched.some((record) => record.meta.requiresAuth) && !userStore.isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
