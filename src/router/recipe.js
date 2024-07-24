export default [
  {
    path: '/recipes',
    name: 'RecipeList',
    component: () => import('../views/recipe/RecipeListView.vue')
  },
  {
    path: '/recipes/new',
    name: 'RecipeForm',
    component: () => import('../views/recipe/RecipeForm.vue')
    // meta: { requiresAuth: true }
  },
  {
    path: '/recipes/favourites',
    name: 'RecipeFavourites',
    component: () => import('../views/recipe/RecipeFavouritesView.vue')
    // meta: { requiresAuth: true }
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetails',
    component: () => import('../views/recipe/RecipePageView.vue')
  }
]
