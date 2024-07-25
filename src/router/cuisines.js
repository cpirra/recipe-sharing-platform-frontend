
const cuisinesRoutes = [
    {
      path: '/cuisines/:id',
      name: 'RecipeCuisines',
      component: () => import('../views/recipe/RecipeCuisines.vue')
    }
    // Add more routes as needed
  ];
  
  export default cuisinesRoutes;
  