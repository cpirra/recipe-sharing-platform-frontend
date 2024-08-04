// src/router/profile.js
import ProfileView from '../views/general/ProfileView.vue';
import ProfileEdit from '../views/profile/ProfileEdit.vue';

export default [
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true },
    children: [
      {
        path: ':id',
        name: 'ProfileEdit',
        component: ProfileEdit,
        // meta: { requiresAuth: true }
      }
    ]
  }
];
