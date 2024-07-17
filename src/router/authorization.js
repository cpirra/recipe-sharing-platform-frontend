export default [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/authorization/LogIn.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/authorization/AuthRegister.vue')
    }
  ]