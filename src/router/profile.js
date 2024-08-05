// src/router/profile.js
import ProfileView from '../views/general/ProfileView.vue';
import AnotherProfileView from '../views/general/AnotherProfileView.vue'

export default [
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/:userId',
    component: AnotherProfileView,
    meta: { requiresAuth: true },
  }
  
];
