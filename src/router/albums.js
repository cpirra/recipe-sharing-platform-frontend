export default {
    path: '/albums',
    component: () => import('../views/albums/Albums.vue'),
    children: [
      {
        path: '',
        name: 'albums',
        component: () => import('../views/albums/Listing.vue')
      },
      {
        path: ':id',
        name: 'album-edit',
        component: () => import('../views/albums/Edit.vue')
      },
    ]
  }