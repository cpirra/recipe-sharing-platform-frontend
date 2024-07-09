import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Import routes from other modules
import albumsRoutes from './albums'
import authorizationRoutes from './authorization'
import profileRoutes from './profile'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Public',
      component: DefaultLayout,
      redirect: '/',
      children:[
        {
          path: '/',
          name: 'Home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
        },
        // Spread the imported routes
        albumsRoutes,
        ...authorizationRoutes,
        profileRoutes,
      ]
    },
    
  ]
})

export default router