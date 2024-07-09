export default {
    path: '/profile',
    component: () => import('../views/ProfileView.vue'),
    children: [
      /*
      {
        path: '',
        name: 'profile',
        component: () => import('../views/profile/Listing.vue')
      },*/
      {
        path: ':id',
        name: 'profile-edit',
        component: () => import('../views/profile/Edit.vue')
      },
    ]
  }