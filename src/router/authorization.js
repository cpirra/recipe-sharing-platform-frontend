export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/authorization/LoginUser.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/authorization/RegisterUser.vue')
  }
]
