// src/utils/requireAuth.js
import { useUserStore } from '../stores/userStore';

export function requireAuth(to, from, next) {
  const userStore = useUserStore();
  const isAuthenticated = userStore.isAuthenticated;
  const isAdmin = userStore.isAdmin;

  console.log('Checking route:', to.path); // Add debug log
  console.log('Is authenticated:', isAuthenticated); // Add debug log
  console.log('Is admin:', isAdmin); // Add debug log
  console.log('User info:', userStore.user); // Add detailed log

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    console.log('Redirecting to Auth');
    next({ name: 'Auth' });
  } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
    console.log('Redirecting to Home');
    next({ name: 'Home' });
  } else {
    console.log('Proceeding to route');
    next();
  }
}
