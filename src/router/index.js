// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import HomeView from '../views/general/HomeView.vue';
import { requireAuth } from '../utils/requireAuth';
import { useUserStore } from '../stores/userStore'; // Import the user store
import { useAuth0 } from '@auth0/auth0-vue'; // Import useAuth0

// Import routes from other modules
import recipeRoutes from './recipe';
import profileRoutes from './profile';
import cuisines from './cuisines';
import categories from './categories';
import AdminView from '@/views/general/AdminView.vue';
import { authGuard } from '@auth0/auth0-vue';

const routes = [
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
        props: (route) => ({ recipes: route.query.recipes }),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/general/AboutView.vue'),
      },
      // Spread the imported routes
      ...recipeRoutes,
      ...profileRoutes,
      // Dynamic routes for cuisines and categories
      ...cuisines,
      ...categories,
      {
        path: '/admin',
        name: 'AdminDashboard',
        component: AdminView,
        meta: { requiresAuth: true, requiresAdmin: true },
        beforeEnter: [authGuard, requireAuth], // Ensure both guards are applied here
      },
    ],
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../layouts/FullLayout.vue'),
  },
  // Catch-all route for handling undefined routes
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Ensure the global navigation guard is working
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { loginWithRedirect } = useAuth0(); // Use Auth0 login

  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.isAuthenticated) {
    await loginWithRedirect({
      redirect_uri: window.location.origin + to.fullPath,
    });
  } else if (to.matched.some(record => record.meta.requiresAdmin) && !userStore.isAdmin) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
