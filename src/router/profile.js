// src/router/profile.js
import ProfileView from '../views/general/ProfileView.vue';

export default [
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  }
];
