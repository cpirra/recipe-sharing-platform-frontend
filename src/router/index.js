// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HomeView from '../views/general/HomeView.vue'
import { useUserStore } from '../stores/userStore'

// Import routes from other modules
import recipeRoutes from './recipe'
import authorizationRoutes from './authorization'
import profileRoutes from './profile'
import cuisines from './cuisines'
import categories from './categories'

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
          component: HomeView,
          props: (route) => ({ recipes: route.query.recipes })
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('../views/general/AboutView.vue')
        },
        // Spread the imported routes
        ...recipeRoutes,
        profileRoutes,
        // Dynamic routes for cuisines and categories
        ...cuisines,
        ...categories
      ]
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../layouts/FullLayout.vue'),
      children: [
        // Spread the imported authorization routes
        ...authorizationRoutes
      ]
    },
    // Catch-all route for handling undefined routes
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
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
