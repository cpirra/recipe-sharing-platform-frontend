export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/authorization/LoginUser.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/authorization/RegisterUser.vue')
  }
]
