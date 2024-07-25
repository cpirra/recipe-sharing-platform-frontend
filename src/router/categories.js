// src/router/categories.js
const categoriesRoutes = [
  {
    path: '/categories/:id',
    name: 'CategoryDetail',
    component: () => import('../views/recipe/RecipeCategories.vue'),
    props: true
  }
  // Add more routes as needed
];

export default categoriesRoutes;
